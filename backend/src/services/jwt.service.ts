import { ROLE } from '@enums';
import * as jwt from 'jsonwebtoken';
import {UserDecode} from  "@interfaces/user.interface"
import { Environment } from '@config/environment.config';

class JWTService {
  private static instance: JWTService;

  static get(): JWTService {
    if (!JWTService.instance) {
      JWTService.instance = new JWTService();
    }
    return JWTService.instance;
  }

  private options = {
    jwt: {
      secretOrKey: Environment.JWT_SECRET,
    },
  };

  private constructor() {}
  async generateToken(userData: UserDecode): Promise<string> {
    return jwt.sign(userData, this.options.jwt.secretOrKey, {
      expiresIn: '1h',
    });
  }

  async verifyToken(token: string): Promise<any> {
    return await jwt.verify(token, Environment.JWT_SECRET);
  }
}

const jwtService = JWTService.get();

export { jwtService as JWTService };
