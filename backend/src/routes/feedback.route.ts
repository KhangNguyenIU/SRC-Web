import { Router } from '@classes';
import { FeedbackController } from '@controllers/feedback.controller';
import { ROLE } from '@enums';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidatorMiddleware } from '@middlewares/validator.middleware';
import {
  createFeedbackValidator,
  deleteFeedBackSchema,
} from '@validators/feedback.validator';

export class FeedbackRoute extends Router {
  constructor() {
    super();
  }

  define(): void {
    this.router
      .route('/create')
      .post(
        AuthMiddleware.checkRole([ROLE.user, ROLE.staff, ROLE.admin]),
        ValidatorMiddleware.check(createFeedbackValidator),
        FeedbackController.createFeedback
      );

    /**
     * @description Get all feedbacks
     */
    this.router.route('/').get(FeedbackController.getFeedbacks);

    /*
     * @description Get feedback by id
     */
    this.router
      .route('/user')
      .get(
        AuthMiddleware.checkRole([ROLE.admin, ROLE.staff, ROLE.user]),
        FeedbackController.getFeedbackByUserId
      );

    /**
     * @description Delete feedback
     */
    this.router
      .route('/delete/:id')
      .delete(
        AuthMiddleware.checkRole([ROLE.user, ROLE.staff, ROLE.admin]),
        ValidatorMiddleware.check(deleteFeedBackSchema),
        FeedbackController.deleteFeedBack
      );

    /**
     * @description Update feedback
     */
    this.router
      .route('/update/:id')
      .put(
        AuthMiddleware.checkRole([ROLE.user, ROLE.staff, ROLE.admin]),
        ValidatorMiddleware.check(createFeedbackValidator),
        FeedbackController.updateFeedback
      );
  }
}
