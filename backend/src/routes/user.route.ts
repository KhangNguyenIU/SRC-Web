import { Router } from '@classes';

import { UserController } from '@controllers/user.controller';
import { ROLE } from '@enums';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidatorMiddleware } from '@middlewares/validator.middleware';
import { createUserSchema } from '@validators/user.validator';

export class UserRoute extends Router {
  constructor() {
    super();
  }

  define(): void {
    this.router
      .route('/signin')
      .post(ValidatorMiddleware.check(createUserSchema), UserController.signIn);

    this.router.route('/signup').post(UserController.signUp);

    /**
     * @description: create staff account
     */
    this.router
      .route('/signin/staff')
      .post(AuthMiddleware.checkRole([ROLE.admin]), UserController.signInStaff);

    /**
     * @description: create admin account
     */
    this.router
      .route('/signin/admin')
      .post(AuthMiddleware.checkRole([ROLE.admin]), UserController.signInAdmin);

    /**
     * @description: disactive account
     */
    this.router
      .route('/disactive/:id')
      .put(
        AuthMiddleware.checkRole([ROLE.admin]),
        UserController.disactiveAccount
      );

    /**
     * @description: active account
     */
    this.router
      .route('/activate/:id')
      .put(
        AuthMiddleware.checkRole([ROLE.admin]),
        UserController.activateAccount
      );

    this.router
      .route('/auth')
      .post(AuthMiddleware.checkRole([ROLE.staff]), UserController.auth);
  }
}
