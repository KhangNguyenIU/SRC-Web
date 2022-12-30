require('module-alias/register');
import { Application } from '@config/app.config';
import { AppDataSource } from '@config/database.config';
import { Environment } from '@config/environment.config';
import { Logger } from '@config/logger.config';
import { Server } from '@config/server.config';
import { RedisCache } from '@config/cache.config';
import { Server as SocketServer } from 'socket.io';
import { Message } from '@entities/message.entity';
import { MessageService } from '@services/message.service';
import { SocketConfig } from '@config/socket.config';

const main = async (): Promise<void> => {
  //Connect database
  AppDataSource.initialize()
    .then(async () => {
      Logger.log(
        'info',
        `Connect to database ${Environment.DB_DATABASE} on port ${Environment.DB_PORT}`
      );
      //init serve
      const application = Application;
      const server = Server.init(application).listen() as unknown;

      //init socket server
      SocketConfig.init(server).plug();
    })
    .catch((error) => {
      console.log(error);
      Logger.log('error', error);
      Logger.log('info', 'Connect to database failed');
      process.exit(0);
    });
};
main();
