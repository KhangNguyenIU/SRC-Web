require('module-alias/register');

import { Application } from '@config/app.config';
import { Server } from '@config/server.config';

const application = Application;
const server = Server.init(application).listen() as unknown;

export { application, server };
