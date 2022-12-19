import { AppDataSource } from '@config/database.config';
import { Logger } from '@config/logger.config';
import { Faculty } from '@entities/faculty.entity';
import { Phone } from '@entities/phone.entity';
import { ErrorHandler } from '@utils/errorHandler';
import { Request, Response } from 'express';
class PhoneController {
  private static instance: PhoneController;

  private constructor() {}

  static get(): PhoneController {
    if (!PhoneController.instance) {
      PhoneController.instance = new PhoneController();
    }
    return PhoneController.instance;
  }

  async createPhone(
    req: Request,
    res: Response
  ): Promise<Response<string | any>> {
    try {
      const { phone, facultyId }: { phone: string; facultyId: number } =
        req.body;
      const FacultyRepo = await AppDataSource.getRepository(Faculty);
      const faculty: Faculty = await FacultyRepo.findOneBy({ id: facultyId });
      if (!faculty)
        return res.status(400).json({ error: 'Faculty not existed' });

      const newPhone: Phone = new Phone();
      newPhone.phone = phone;
      newPhone.faculty = faculty;
      await AppDataSource.manager.save(newPhone);
      return res.status(200).json({ message: 'Create new phone success' });
    } catch (error) {
      Logger.log('error', error);
      return res
        .status(400)
        .send(
          ErrorHandler.santinizeError(error, 'Error occurs when create phone')
        );
    }
  }

  async deletePhoneById(
    req: Request,
    res: Response
  ): Promise<Response<string | any>> {
    try {
      const { id } = req.params as unknown as { id: number };
      const phoneRepo = await AppDataSource.getRepository(Phone);
      const phone: Phone = await phoneRepo.findOneBy({ id: id });
      if (!phone) return res.status(400).json({ error: 'Phone not existed' });
      await AppDataSource.manager.remove(phone);
      return res.status(200).json({ message: 'Delete phone success' });
    } catch (error) {
      Logger.log('error', error);
      return res
        .status(400)
        .send(
          ErrorHandler.santinizeError(error, 'Error occurs when delete phone')
        );
    }
  }

  async updatePhoneById(
    req: Request,
    res: Response
  ): Promise<Response<string | any>> {
    try {
      const { id } = req.params as unknown as { id: number };
      const { phone } = req.body as unknown as { phone: string };
      const phoneRepo = await AppDataSource.getRepository(Phone);
      const newPhone: Phone = await phoneRepo.findOneBy({ id: id });
      if (!newPhone)
        return res.status(400).json({ error: 'Phone not existed' });
      newPhone.phone = phone;
      await AppDataSource.manager.save(newPhone);
      return res.status(200).json({ message: 'Update phone success' });
    } catch (error) {
      Logger.log('error', error);
      return res
        .status(400)
        .send(
          ErrorHandler.santinizeError(error, 'Error occurs when update phone')
        );
    }
  }
}

const phone: PhoneController = PhoneController.get();

export { phone as PhoneController };
