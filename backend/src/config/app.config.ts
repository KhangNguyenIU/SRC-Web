import * as Express from 'express';
import * as Cors from 'cors';
import * as Helmet from 'helmet';
import * as Compression from 'compression';
import { config as Dotenv } from 'dotenv';
import { ProxyRouter } from '@services/proxy-route.service';
import * as Morgan from 'morgan';

export class ExpressConfiguration {
  private static instance: ExpressConfiguration;

  application: Express.Application;

  private options: Record<string, unknown> = {
    cors: {
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      allowedHeaders: [
        'Accept',
        'Content-Type',
        'Authorization',
        'Origin',
        'From',
      ],
    },
    helmet: {
        hidePoweredBy: true,
        noSniff: true,
        referrerPolicy: { policy: 'no-referrer' }
    }
  };

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
    this.application.use(Cors(this.options.cors));
    this.application.use(Express.json());
    this.application.use(Express.urlencoded({ extended: true }));
    this.application.use(Compression());
    this.application.use(Morgan('dev'))
   
     /**
      * Enable Helmet security
      */

     Object.keys(this.options.helmet).forEach(key =>{
        this.application.use(this.options.helmet[key] && typeof this.options.helmet[key] === 'boolean' ? Helmet[key]() : Helmet[key](this.options.helmet[key]))
     })

     /**
      * Routers
      */
    this.application.use('/api', ProxyRouter.map());
    return this;
  }
}

const Application = ExpressConfiguration.get().init().plug().application;

export { Application };
