require('module-alias/register');
import { Application } from '@config/app.config';
import { AppDataSource } from '@config/database.config';
import { Environment } from '@config/environment.config';
import { Logger } from '@config/logger.config';
import { Server } from '@config/server.config';
// import { RedisCache } from '@config/cache.config';
// import { Server as SocketServer } from 'socket.io';

import { SocketConfig } from '@config/socket.config';
// import ServiceAccount from '../fb-service.json';
import { firebaseServiceAccount } from '@config/firebaseServiceAccount';
import firebase from 'firebase-admin';
import { FireBaseDB } from '@config/firebasedb.config';

const main = async (): Promise<void> => {
  //Connect database
  AppDataSource.initialize()
    .then(async () => {
      Logger.log(
        'info',
        `Connect to database ${Environment.DB_DATABASE} on port ${Environment.DB_PORT}`
      );
      //init server
      const application = Application;
      const server = Server.init(application).listen() as unknown;

      //init socket server
      SocketConfig.init(server).plug();

      //   const ref = db.ref('/admin')

      const ref = FireBaseDB.ref('/unread_messages');
        // ref.set({
        //     1: {
        //         2:3
        //     }
        // }) 
      const user1 = ref.child("2");

    //   user1.once("value", (snapshot) => {
    //         console.log("user1 Once",snapshot.val());
    //         let data = snapshot.val();
    //         if(!data){
    //             ref.update({
    //                 9:1
    //             })
    //             return
    //         }  
    //         user1.update({
    //             2: ++data[2],
    //             3: ++data[3] ||1
    //         })
    //   })
        // user1.transaction((current_value) => {
        //     console.log({current_value})
        //     return current_value ; 
        // })
      ref.once('value', function (snapshot) {
        console.log({ snapshot: snapshot.val() });
      });
    })
    .catch((error) => {
      console.log(error);
      Logger.log('error', error);
      Logger.log('info', 'Connect to database failed');
      process.exit(0);
    });
};
main();
