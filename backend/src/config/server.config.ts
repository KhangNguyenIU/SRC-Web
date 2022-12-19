import { Application } from 'express';
import { Server as HTTPServer, createServer } from 'http';
import { Environment } from './environment.config';
import { Logger } from './logger.config';
import cluster from 'cluster';
import * as  os from 'os';


export class ServerConfiguration {
  private static instance: ServerConfiguration;

  private server: Application | HTTPServer;

  private constructor() {}

  private readonly totalCPUs = os.cpus().length;

  static get(): ServerConfiguration {
    if (!ServerConfiguration.instance)
      ServerConfiguration.instance = new ServerConfiguration();
    return ServerConfiguration.instance;
  }

  init(app: Application) {
 
        this.server = !this.server ? createServer(app) : this.server;
        return this;
    
  }

  listen(): any {
    const port = process.env.PORT;
    return this.server.listen(port, () => {
      Logger.log('info', `Server started on port ${process.env.PORT}`);
    });
  }
}

const Server = ServerConfiguration.get();

export { Server };
