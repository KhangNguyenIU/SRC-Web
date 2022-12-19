import { Router } from '@classes';
import { PhoneController } from '@controllers/phone.controller';
import { ROLE } from '@enums';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidatorMiddleware } from '@middlewares/validator.middleware';
import { createPhoneSchema } from '@validators/phone.validator';

export class PhoneRoute extends Router {
  constructor() {
    super();
  }
  define(): void {
    this.router
      .route('/create')
      .post(
        AuthMiddleware.checkRole([ROLE.admin, ROLE.staff]),
        ValidatorMiddleware.check(createPhoneSchema),
        PhoneController.createPhone
      );

    this.router
      .route('/delete/:id')
      .delete(
        AuthMiddleware.checkRole([ROLE.admin, ROLE.staff]),
        PhoneController.deletePhoneById
      );

    this.router
      .route('/update/:id')
      .put(
        AuthMiddleware.checkRole([ROLE.admin, ROLE.staff]),
        PhoneController.updatePhoneById
      );
  }
}
