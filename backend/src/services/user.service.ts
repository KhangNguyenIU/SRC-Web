import { MockData } from '@mock/mockdata';
import slugify from 'slugify';
import { Faculty } from '@entities/faculty.entity';
import { AppDataSource } from '@config/database.config';
import { User } from '@entities/user.entity';
import { ROLE } from '@enums';
import * as bcrypt from 'bcrypt';
import { Feedback } from '@entities/feedback.entity';
import { Email } from '@entities/email.entity';
import { Phone } from '@entities/phone.entity';
import { Category } from '@entities/category.entity';
import { Post } from '@entities/post.entity';
import {faker} from '@faker-js/faker'
import provinces from '@mock/provinces';
const means = ['Mạng Xã Hội', 'Bạn Bè', 'Tin Tức', 'Khác'];

const schools = [
  'THPT Nguyễn Trãi',
  'THPT Nguyễn Du',
  'THPT Nguyễn Khuyến',
  'THPT Nguyễn Văn Linh',
  'THPT Nguyễn Văn Cừ',
  'THPT Nguyễn Văn Huyên',
];

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
      // Mock Categories
      await Promise.all(
        MockData.category.map(async (cate, i) => {
          const newCategory = new Category();
          newCategory.name = cate;
          newCategory.slug = slugify(cate, { lower: true, locale: 'vi' });
          await AppDataSource.manager.save(newCategory);
        })
      );

      // Mock faculties
      await Promise.all(
        MockData.faculty.map(async (faculty) => {
          let newFaculty = new Faculty();
          newFaculty.name = faculty.name;
          newFaculty.slug = slugify(faculty.name, {
            lower: true,
            locale: 'vi',
          });
          newFaculty.avatar = faculty.avatar;
          await AppDataSource.manager.save(newFaculty);
        })
      );

      // Mock accounts
      await Promise.all(

        // Mock ADMIN & STAFF and fixed USER
        MockData.users.map(async (user) => {
          let newUser = new User();
          newUser.salt = await bcrypt.genSalt();
          newUser.email = user.email;
          newUser.password = await bcrypt.hash('123456', newUser.salt);
          newUser.role = user.role;
          newUser.avatar = user.avatar;
          if(user.role === ROLE.user) {
            newUser.firstName = user.firstName;
            newUser.lastName = user.lastName;
            newUser.username = user.email.split('@')[0];
            newUser.location = user.location.province;
            newUser.mean= user.mean;
            newUser.lvInterest = user.interest;
            newUser.school = user.school;
          }
          else if (user.role === ROLE.staff) {
            const existedFaculty = await AppDataSource.getRepository(
              Faculty
            ).findOneBy({ id: user.facultyId });

            newUser.username = user.username;
            newUser.faculty = existedFaculty;
            newUser.username = user.username;

            const email = new Email();
            email.email = user.email;
            email.faculty = existedFaculty;

            await AppDataSource.manager.save(email);

            const phone = new Phone();
            phone.phone = user.phone;
            phone.faculty = existedFaculty;

            await AppDataSource.manager.save(phone);
          } else {
            newUser.username = user.username;
          }

          await AppDataSource.manager.save(newUser);
        })

        // Mock USERs

        // create array of 10 elements  
      );

        await Promise.all(Array.from(Array(20)).map(async ()=>{
            let newUser = new User();
            newUser.salt = await bcrypt.genSalt();
            newUser.email = faker.internet.email();
            newUser.password = await bcrypt.hash('123456', newUser.salt);
            newUser.role = ROLE.user;
            newUser.avatar = faker.image.avatar();
            newUser.firstName = faker.name.firstName();
            newUser.lastName = faker.name.lastName();
            newUser.username = newUser.email.split('@')[0];
            newUser.location = provinces[Math.floor(Math.random() *5)].province;
            newUser.mean= means[Math.floor(Math.random() *4)];
            newUser.lvInterest = Math.floor(Math.random() * 5 + 1);
            newUser.school = schools[Math.floor(Math.random() *6)];
            
            await AppDataSource.manager.save(newUser);
        }))

      //Mock feedback
      await Promise.all(
        Array.from(Array(MockData.users.length)).map(async (user, index) => {
          const existedUser = await AppDataSource.getRepository(User).findOneBy(
            { id: index + 1 }
          );
          if (existedUser) {
            const feedback = new Feedback();
            feedback.rating = Math.floor(Math.random() * 5 + 1);
            feedback.user = existedUser;

            await AppDataSource.manager.save(feedback);
          }
        })
      );

      //mock post
      await Promise.all(
        MockData.post.map(async (post, i) => {
          const newPost = new Post();
          newPost.title = post.title;
          newPost.slug = slugify(post.title, { lower: true, locale: 'vi' });
          newPost.body = post.body;
          newPost.keywords = post.keywords;
          newPost.year = post.year;
          newPost.category = await AppDataSource.getRepository(
            Category
          ).findOneBy({ id: post.category });
          newPost.postedBy = await AppDataSource.getRepository(User).findOneBy({
            id: 8,
          });
          await AppDataSource.manager.save(newPost);
        })
      );
      return true;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async statUsersBy(field: string) : Promise<any> {
    try{
        const userRepo = await AppDataSource.getRepository(User);


        const roleStat = async ()=>{
            return await userRepo.createQueryBuilder('user')
            .select(['user.role'])
            .addSelect(['COUNT(user.role) as Count'])
            .groupBy('user.role')
            .getRawMany()
        }

        const locationStat = async ()=>{
            return await userRepo.createQueryBuilder('user')
            .select(['user.location'])
            .addSelect(['COUNT(user.location) as Count'])
            .groupBy('user.location')
            .having('COUNT(user.location) > 0')
            .getRawMany()
        }

        const schoolStat = async ()=>{
            return await userRepo.createQueryBuilder('user')
            .select(['user.school'])
            .addSelect(['COUNT(user.school) as Count'])
            .groupBy('user.school')
            .having('COUNT(user.school) > 0')
            .getRawMany()
        }

        const meanStat = async ()=>{
            return await userRepo.createQueryBuilder('user')
            .select(['user.mean'])
            .addSelect(['COUNT(user.mean) as Count'])
            .groupBy('user.mean')
            .having('COUNT(user.mean) > 0')
            .getRawMany()
        }

        const interestStat = async ()=>{
            return await userRepo.createQueryBuilder('user')
            .select(['user.lvInterest'])
            .addSelect(['COUNT(user.lvInterest) as Count'])
            .groupBy('user.lvInterest')
            .having('COUNT(user.lvInterest) > 0')
            .orderBy('user.lvInterest', 'ASC')
            .getRawMany()
        }

        const [role, location,school, mean, interest] = await Promise.all([roleStat(), locationStat(), schoolStat(), meanStat(), interestStat()]);
        return {role, location, school, mean, interest};

    }catch(error){
        console.log(error);
        throw new Error(error);
    }
}
}

const userService = UserService.get();

export { userService as UserService };
