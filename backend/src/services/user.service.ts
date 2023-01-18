import { MockData } from '@mock/mockdata';
import slugify from 'slugify';
import { Faculty } from '@entities/faculty.entity';
import { AppDataSource } from '@config/database.config';
import { User } from '@entities/user.entity';
import { ROLE } from '@enums';
import * as bcrypt from 'bcrypt';
import { Feedback } from '@entities/feedback.entity';

class UserService {
  private static instance: UserService;

  static get(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  async massCreateUsers(): Promise<any> {
    try {
      await Promise.all(
        MockData.faculty.map(async (faculty) => {
          let newFaculty = new Faculty();
          newFaculty.name = faculty;
          newFaculty.slug = slugify(faculty, { lower: true, locale: 'vi' });
          await AppDataSource.manager.save(newFaculty);
        })
      );

      await Promise.all(
        MockData.users.map(async (user) => {
          let newUser = new User();
          newUser.salt = await bcrypt.genSalt();
          newUser.email = user.email;
          newUser.password = await bcrypt.hash('123456', newUser.salt);
          newUser.role = user.role;
          if (user.role === ROLE.user) {
            newUser.firstName = user.firstName;
            newUser.lastName = user.lastName;
            newUser.username = user.email.split('@')[0];
          } else if (user.role === ROLE.staff) {
            const existedFaculty = await AppDataSource.getRepository(
              Faculty
            ).findOneBy({ id: user.facultyId });

            newUser.username = user.username;
            newUser.faculty = existedFaculty;
            newUser.username = user.username;
          } else {
            newUser.username = user.username;
          }

          await AppDataSource.manager.save(newUser);
        })
      );

      await Promise.all(
        Array.from(Array(MockData.users.length)).map(async (user, index) => {
          const existedUser = await AppDataSource.getRepository(User).findOneBy(
            { id: index + 1 }
          );
          if (existedUser) {
            const feedback = new Feedback();
            feedback.rating = Math.floor(Math.random() * 5 + 1);
            feedback.user = existedUser;

            await AppDataSource.manager.save(feedback)
          }
        })
      );
      return true;
    } catch (error) {
        console.log(error)
      throw new Error(error);
    }
  }
}

const userService = UserService.get();

export { userService as UserService };
