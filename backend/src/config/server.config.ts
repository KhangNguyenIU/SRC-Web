import { Application } from 'express';
import { Server as HTTPServer, createServer } from 'http';

export class ServerConfiguration {
  private static instance: ServerConfiguration;

  private server: Application | HTTPServer;

  private constructor() {}

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
    const port = process.env.PORT || 3000;
    return this.server.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  }
}

const Server = ServerConfiguration.get();

export { Server };
