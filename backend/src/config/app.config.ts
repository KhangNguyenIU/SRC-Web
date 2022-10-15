import * as Express from 'express';
import * as Cors from 'cors';
import * as Helmet from 'helmet';
import * as Compression from 'compression';

export class ExpressConfiguration {
  private static instance: ExpressConfiguration;

  application: Express.Application;

  private constructor() {}

  /**
   *
   * @describe Initialize the express application
   */
  static get(): ExpressConfiguration {
    if (!ExpressConfiguration.instance) {
      ExpressConfiguration.instance = new ExpressConfiguration();
    }
    return ExpressConfiguration.instance;
  }

  init(): ExpressConfiguration {
    if (!this.application) {
      this.application = Express();
    }
    return this;
  }

  plug(): ExpressConfiguration {
    this.application.use(Cors());
    this.application.use(Express.json());
    this.application.use(Express.urlencoded({ extended: true }));
    this.application.use(Compression());

    return this;
  }
}

const Application = ExpressConfiguration.get().init().plug().application;

export { Application };
