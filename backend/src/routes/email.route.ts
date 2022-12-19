import { Router } from '@classes';
import { EmailController } from '@controllers/email.controller';
import { ROLE } from '@enums';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidatorMiddleware } from '@middlewares/validator.middleware';
import { createEmailSchema } from '@validators/email.validator';

export class EmailRoute extends Router {
  constructor() {
    super();
  }

  define(): void {
    this.router
      .route('/create')
      .post(
        AuthMiddleware.checkRole([ROLE.admin, ROLE.staff]),
        ValidatorMiddleware.check(createEmailSchema),
        EmailController.createEmail
      );

    this.router
      .route('/delete/:id')
      .delete(
        AuthMiddleware.checkRole([ROLE.admin, ROLE.staff]),
        EmailController.deleteEmailById
      );

    this.router
      .route('/update/:id')
      .put(
        AuthMiddleware.checkRole([ROLE.admin, ROLE.staff]),
        EmailController.updateEmailById
      );
  }
}
