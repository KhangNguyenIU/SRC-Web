import { Request, Response, NextFunction } from 'express';
import { JWTService } from '@services/jwt.service';
import { ROLE } from '@enums';
import { UserDecode } from 'types/interfaces/user.interface';
import { Logger } from '@config/logger.config';

class AuthMiddleware {
  private static instance: AuthMiddleware;

  constructor() {}

  static get(): AuthMiddleware {
    if (!AuthMiddleware.instance) {
      AuthMiddleware.instance = new AuthMiddleware();
    }
    return AuthMiddleware.instance;
  }

  checkRole = (role: ROLE[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      const token = req.cookies.accessToken;
      console.log({ token });
      if (!token) {
        return res.status(403).send('Unauthorized');
      }
      try {
        const decoded: UserDecode = await JWTService.verifyToken(
          token as string
        );
        console.log({ decoded });
        if (role.includes(decoded.role as ROLE)) {
          console.log({ bol: role.includes(decoded.role as ROLE) });
          req.user = decoded;
          next();
        } else {
          return res.status(403).send('Unauthorized??');
        }
      } catch (error) {
        Logger.log("error", error);
        return res.status(401).send('Unauthorized!');
      }
    };
  };
}

const authMiddleWare = AuthMiddleware.get();

export { authMiddleWare as AuthMiddleware };
