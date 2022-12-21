import { CategoryRoute } from '@routes/category.route';
import { ConversationRoute } from '@routes/conversation.route';
import { EmailRoute } from '@routes/email.route';
import { FacultyRoute } from '@routes/faculty.route';
import { FeedbackRoute } from '@routes/feedback.route';
import { MessageRoute } from '@routes/message.route';
import { PhoneRoute } from '@routes/phone.route';
import { PostRoute } from '@routes/post.route';
import { TestRoute } from '@routes/test.route';
import { UploadRoute } from '@routes/upload.route';
import { UserRoute } from '@routes/user.route';
import { Router } from 'express';

export interface IRoute {
  segment: string;

  provider: any | Router;

  serialize: boolean;
}

class ProxyRouter {
  private static instance: ProxyRouter;

  private router: Router = Router();

  private readonly routes = [
    { segment: '/user', provider: UserRoute },
    { segment: '/category', provider: CategoryRoute },
    { segment: '/post', provider: PostRoute },
    { segment: '/feedback', provider: FeedbackRoute },
    { segment: '/test', provider: TestRoute },
    { segment: '/upload', provider: UploadRoute },
    { segment: '/phone', provider: PhoneRoute },
    { segment: '/email', provider: EmailRoute },
    { segment: '/faculty', provider: FacultyRoute },
    { segment: '/conversation', provider: ConversationRoute },
    { segment: '/message', provider: MessageRoute },
  ];

  private constructor() {}

  static get(): ProxyRouter {
    if (!ProxyRouter.instance) {
      ProxyRouter.instance = new ProxyRouter();
    }
    return ProxyRouter.instance;
  }

  map(): Router {
    this.routes.forEach((route: IRoute) => {
      const instance = new route.provider() as { router: Router };
      this.router.use(route.segment, instance.router);
    });
    return this.router;
  }
}

const proxyRouter = ProxyRouter.get();

export { proxyRouter as ProxyRouter };
