import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';

import { AppDataSource } from '@config/database.config';
import { User } from '@entities/user.entity';
import { JWTService } from '@services/jwt.service';
import { ACCOUNT_STATUS, ROLE } from '@enums';
import { UserDecode } from '@interfaces/user.interface';
import { Logger } from '@config/logger.config';
import { Faculty } from '@entities/faculty.entity';

class UserController {
  private static instance: UserController;

  private constructor() {}

  static get(): UserController {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }
    return UserController.instance;
  }

  async signIn(req: Request, res: Response): Promise<Response<string | any>> {
    try {
      const UserRepo = await AppDataSource.getRepository(User);
      const { firstName, lastName, email, password } = req.body;

      // check existed account
      const existedUser = await UserRepo.findOneBy({ email });
      if (existedUser) {
        return res.status(400).json({
          message: 'Email is existed',
        });
      }

      const user = new User();
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.salt = await bcrypt.genSalt();
      user.role = ROLE.user;
      user.password = await bcrypt.hash(password, user.salt);
      user.username = email.split('@')[0];
      await AppDataSource.manager.save(user);
      return res.status(200).json({
        message: 'Create new account success',
      });
    } catch (error) {
      Logger.log('error', error);
      return res.status(400).json({ error: 'Failed to sign in' });
    }
  }

  async signInStaff(
    req: Request,
    res: Response
  ): Promise<Response<string | any>> {
    try {
      const UserRepo = await AppDataSource.getRepository(User);
      const FacultyRepo = await AppDataSource.getRepository(Faculty);
      const { firstName, lastName, email, password, facultyId } = req.body;

      // check existed account
      const existedUser = await UserRepo.findOneBy({ email });
      if (existedUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // check existed faculty
        const existedFaculty = await FacultyRepo.findOneBy({ id: facultyId });
        if (!existedFaculty) {
            return res.status(400).json({ message: 'Faculty not found' });
        }

      const user = new User();
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.salt = await bcrypt.genSalt();
      user.role = ROLE.staff;
      user.password = await bcrypt.hash(password, user.salt);
      user.username = email.split('@')[0];
      user.faculty = existedFaculty;

      await AppDataSource.manager.save(user);
      return res.status(200).json({ message: 'Create new account success' });
    } catch (error) {
      Logger.log('error', error);
    }
  }

  async signInAdmin(
    req: Request,
    res: Response
  ): Promise<Response<string | any>> {
    try {
      const UserRepo = await AppDataSource.getRepository(User);
      const { firstName, lastName, email, password } = req.body;

      // check existed account
      const existedUser = await UserRepo.findOneBy({ email });
      if (existedUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const user = new User();
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.salt = await bcrypt.genSalt();
      user.role = ROLE.admin;
      user.password = await bcrypt.hash(password, user.salt);
      user.username = email.split('@')[0];

      await AppDataSource.manager.save(user);
      return res.status(200).json({ message: 'Create new account success' });
    } catch (error) {
      Logger.log('error', error);
    }
  }

  async signUp(req: Request, res: Response): Promise<Response<string | any>> {
    try {
      const UserRepo = await AppDataSource.getRepository(User);
      const { email, password } = req.body;
      const user = await UserRepo.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
      }

      if (user.enabled === ACCOUNT_STATUS.inactive) {
        return res.status(400).json({ message: 'User is inactive' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Password is not valid' });
      }

      const userData = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        role: user.role as ROLE,
      } as UserDecode;

      const accessToken: string = await JWTService.generateToken(userData);
      if (!accessToken) {
        return res.status(400).json({ message: 'Access token is not valid' });
      }

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });

      return res.status(200).json({
        message: 'Login success',
        user: userData,
        accessToken,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  async disactiveAccount(
    req: Request,
    res: Response
  ): Promise<Response<string | any>> {
    try {
      const UserRepo = await AppDataSource.getRepository(User);
      let { id } = req.params as unknown as { id: number };
      const user = await UserRepo.findOne({ where: { id } });
      console.log(user);
      if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
      }

      user.enabled = ACCOUNT_STATUS.inactive;
      await AppDataSource.manager.save(user);
      return res.status(200).json({ message: 'Disactive account success' });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  async activateAccount(
    req: Request,
    res: Response
  ): Promise<Response<string | any>> {
    try {
      const UserRepo = await AppDataSource.getRepository(User);
      let { id } = req.params as unknown as { id: number };
      const user = await UserRepo.findOne({ where: { id } });
      if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
      }

      user.enabled = ACCOUNT_STATUS.active;
      await AppDataSource.manager.save(user);
      return res.status(200).json({ message: 'Activate account success' });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  async auth(req: Request, res: Response): Promise<Response<string | Error>> {
    return res.status(200).json({ user: req.user });
  }

  async logout(req: Request, res: Response): Promise<Response<string | Error>> {
    try {
      res.clearCookie('accessToken');
      return res.status(200).json({ message: 'Logout success' });
    } catch (error) {
      return res.status(400).json({ error: 'Error while logout' });
    }
  }

  async getAllUsers(
    req: Request,
    res: Response
  ): Promise<Response<string | any>> {
    try {
      const UserRepo = await AppDataSource.getRepository(User);
    const users = await UserRepo.createQueryBuilder('user')
    .leftJoin('user.faculty', 'faculty')
    .addSelect(['faculty'])
    .getMany()
    
      return res.status(200).json({ users });
    } catch (error) {
        console.log(error)
        Logger.log('error', error);
      return res.status(400).send(error);
    }
  }
}

const userController = UserController.get();

export { userController as UserController };
