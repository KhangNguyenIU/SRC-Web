import { Router } from '@classes';
import { MessageController } from '@controllers/message.controller';
import { ROLE } from '@enums';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidatorMiddleware } from '@middlewares/validator.middleware';
import { createMessageSchema } from '@validators/message.validator';

export class MessageRoute extends Router {
  constructor() {
    super();
  }

  define(): void {
    this.router.post(
      '/create',
      ValidatorMiddleware.check(createMessageSchema),
      AuthMiddleware.checkRole([ROLE.admin, ROLE.staff, ROLE.user]),
      MessageController.createMessage
    );
  }
}
