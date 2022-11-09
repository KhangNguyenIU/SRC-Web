import { ROLE } from '@enums';
import * as jwt from 'jsonwebtoken';
import {UserDecode} from  "@interfaces/user.interface"

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
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    },
  };

  private constructor() {}
  async generateToken(userData: UserDecode): Promise<string> {
    return jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1h',
    });
  }

  async verifyToken(token: string): Promise<UserDecode> {
    return await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  }
}

const jwtService = JWTService.get();

export { jwtService as JWTService };
