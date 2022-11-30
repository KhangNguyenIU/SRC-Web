import { Request, Response, NextFunction } from 'express';
import { JWTService } from '@services/jwt.service';
import { ROLE } from '@enums';
import { UserDecode } from 'types/interfaces/user.interface';

class AuthMiddleware {
  private static instance: AuthMiddleware;

  constructor() {}

  static get(): AuthMiddleware {
    if (!AuthMiddleware.instance) {
      AuthMiddleware.instance = new AuthMiddleware();
    }
    return AuthMiddleware.instance;
  }

  async verifyToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    console.log(req.headers);
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(403).send('No token provided');
    }
    try {
      const decoded = await JWTService.verifyToken(token as string);
      req.body.userId = decoded.id;
      next();
    } catch (error) {
      return res.status(401).send('Unauthorized');
    }
  }

  checkRole = (role: ROLE[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      const token = req.cookies.accessToken;
      if (!token) {
        return res.status(403).send('Unauthorized');
      }
      try {
        const decoded: UserDecode = await JWTService.verifyToken(
          token as string
        );
        if (role.includes(decoded.role as ROLE)) {
          req.user = decoded;
          next();
        } else {
          return res.status(403).send('Unauthorized??');
        }
      } catch (error) {
        return res.status(401).send('Unauthorized');
      }
    };
  };
}

const authMiddleWare = AuthMiddleware.get();

export { authMiddleWare as AuthMiddleware };
