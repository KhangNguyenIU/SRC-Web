import { AppDataSource } from '@config/database.config';
import { Logger } from '@config/logger.config';
import { Feedback } from '@entities/feedback.entity';
import { User } from '@entities/user.entity';
import { ROLE } from '@enums';
import { Request, Response } from 'express';
class FeedbackController {
  private static instance: FeedbackController;

  private constructor() {}

  static get(): FeedbackController {
    if (!FeedbackController.instance) {
      FeedbackController.instance = new FeedbackController();
    }
    return FeedbackController.instance;
  }

  async createFeedback(
    req: Request,
    res: Response
  ): Promise<Response<string | any>> {
    try {
      const { comment, rating } = req.body;
      const { id } = req.user;
      const userRepo = await AppDataSource.getRepository(User);
      const user = await userRepo.findOneBy({ id });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      const feedback = new Feedback();
      feedback.comment = comment;
      feedback.user = user;
      feedback.rating = rating;
      await AppDataSource.manager.save(feedback);
      return res.status(200).json({ message: 'Create new feedback success' });
    } catch (error) {
      if (error.code === '23505') {
        return res.status(400).json({ message: 'Feedback already exists' });
      }
      Logger.log('error', error);
      return res
        .status(400)
        .json({ error: 'Error occurs when creating feedback' });
    }
  }
  async getFeedbacks(req: Request, res: Response): Promise<Response<string>> {
    try {
      const FeedbackRepo = AppDataSource.manager.getRepository(Feedback);
      const feedbacks = await AppDataSource.getRepository(Feedback)
        .createQueryBuilder('feedback')
        .select(['count(*) as total'])
        .select(["feedback.rating"])
        .addSelect(['sum(feedback.rating) as rating'])
        .addSelect(['count(feedback.rating) as count'])
        .groupBy('feedback.rating')
        .getRawMany();


      return res.status(200).json({ feedbacks });
    } catch (error) {
      Logger.log('error', error);
      return res
        .status(400)
        .json({ error: 'Error occurs when getting feedbacks' });
    }
  }

  async getFeedbackByUserId(req: Request, res: Response): Promise<Response<string>> {
    try {
        // const { id } = req.params as unknown as { id: number };
        const id = req.user.id
        const feedback = await AppDataSource.getRepository(Feedback)
        .createQueryBuilder('feedback')
        .leftJoin('feedback.user', 'user')
        .addSelect(['user.id','user.avatar','user.username'])
        .where('user.id = :id', { id })
        .getOne();

        // if(!feedback) {
        //     return res.status(200).json({ message: 'Feedback not found' });
        // }
        return res.status(200).json({ feedback });
    } catch (error) {
        Logger.log('error', error);
        return res
        .status(400)
        .json({ error: 'Error occurs when getting user feedback' });
    }
    }

  async deleteFeedBack(req: Request, res: Response): Promise<Response<string>> {
    try {
      const { id } = req.params as unknown as { id: number };
      const FeedbackRepo = await AppDataSource.getRepository(Feedback);


      const feedback = await FeedbackRepo.createQueryBuilder('feedback')
        .leftJoinAndSelect('feedback.user', 'user')
        .where('feedback.id = :id', { id })
        .getOne();

      if (!feedback) {
        return res.status(400).json({ message: 'Feedback not found' });
      }

        if (feedback.user.id === req.user.id || req.user.role === ROLE.admin) {
          await FeedbackRepo.delete(id);
          return res.status(200).json({ message: 'Delete feedback success' });
        }

      return res
        .status(200)
        .json({ message: 'Unauthorize to delete this feedback' });
    } catch (error) {
      Logger.log('error', error);
      return res
        .status(400)
        .json({ error: 'Error occurs when deleting feedback' });
    }
  }

  async updateFeedback(req: Request, res: Response) : Promise<Response<string>> {
    try {
      const { id } = req.params as unknown as { id: number };
      const { comment, rating } = req.body;
      const FeedbackRepo = await AppDataSource.getRepository(Feedback);

      const feedback = await FeedbackRepo.createQueryBuilder('feedback')
      .leftJoinAndSelect('feedback.user', 'user')
      .where('feedback.id = :id', { id })
      .getOne();
      if (!feedback) {
        return res.status(400).json({ message: 'Feedback not found' });
      }

      if (feedback.user.id === req.user.id || req.user.role === ROLE.admin) {
        feedback.comment = comment;
        feedback.rating = rating;
        await AppDataSource.manager.save(feedback);
        return res.status(200).json({ message: 'Update feedback success' });
      }

      return res
        .status(200)
        .json({ message: 'Unauthorize to update this feedback' });
    } catch (error) {
      Logger.log('error', error);
      return res
        .status(400)
        .json({ error: 'Error occurs when updating feedback' });
    }
  }
}

const feedbackController = FeedbackController.get();
export { feedbackController as FeedbackController };
