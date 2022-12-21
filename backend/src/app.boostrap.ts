require('module-alias/register');
import { Application } from '@config/app.config';
import { AppDataSource } from '@config/database.config';
import { Environment } from '@config/environment.config';
import { Logger } from '@config/logger.config';
import { Server } from '@config/server.config';
import { RedisCache } from '@config/cache.config';
import {Server as SocketServer} from 'socket.io'

const main = async (): Promise<void> => {
  AppDataSource.initialize()
    .then(async () => {
      Logger.log(
        'info',
        `Connect to database ${Environment.DB_DATABASE} on port ${Environment.DB_PORT}`
      );

      const application = Application;
      const server = Server.init(application).listen() as unknown;
        await RedisCache.connect()
        const redisClient = RedisCache.getClient()
       
        // socket io
        const socketIo = new SocketServer(server)

        global.io =socketIo

        socketIo.on('connection', (socket) => {
            console.log('socket connected')
            socket.on('disconnect', () => {
                console.log('socket disconnected')
            })

            
        })
    })
    .catch((error) => {
      console.log(error);
      Logger.log('error', error);
      Logger.log('info', 'Connect to database failed');
      process.exit(0);
    });
};
main();
