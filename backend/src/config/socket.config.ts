import { MessageService } from '@services/message.service';
import { Server as SocketServer } from 'socket.io';
import { Environment } from './environment.config';
import { Logger } from './logger.config';
import { MESSAGE_TYPE } from '@enums';
import { CloudinaryService } from '@services/cloudinary.service';
import { Socket } from 'dgram';
import { FireBaseDB } from './firebasedb.config';

class SocketConfig {
  private static instance: SocketConfig;

  private constructor() {}

  socketIo: SocketServer;

  users: any = [];

  static getInstance(): SocketConfig {
    if (!SocketConfig.instance) {
      SocketConfig.instance = new SocketConfig();
    }
    return SocketConfig.instance;
  }

//   init(server: any): SocketConfig {
//     if (!this.socketIo) {
//       this.socketIo = new SocketServer(server, {
//         path: '/socket.io',
//         allowEIO3: true,
//         cors: {
//           origin: [...Environment.FE_URL, 'http://localhost:3000'],
//           methods: ['GET', 'POST'],
//           credentials: true,
//         },
//       });
//     }
//     return this;
//   }

init(server: any): SocketConfig {
        if (!this.socketIo) {
          this.socketIo = new SocketServer(server, {
            cors:{
                origin: '*',
                methods: ['GET', 'POST'],
            }
          });
        }
        return this;
      }

  plug(): any {
    this.socketIo.on('connection', (socket) => {
      Logger.log('info', `Socket connected ${socket.id}`);

      socket.on('request-users-list', () => {
        socket.emit('users-list', this.users);
      });

      socket.on('disconnect', () => {
        // console.log('user disconnected', socket.id);
        this.users = this.users.filter((user) => user.socketId !== socket.id);
        // console.log({ users: this.users });
      });

      socket.on('identity', (userId) => {
        const existedUser = this.users.find((user) => user.userId === userId);
        // console.log({ existedUser });
        if (!existedUser) {
          this.users.push({ userId, socketId: socket.id });
        }
        console.log({ users: this.users });
      });

      socket.on('leaveRoom', (roomId) => {
        socket.leave(roomId);
      });

      socket.on('joinRoom', (roomId) => {
        console.log('joinRoom', roomId, socket.id);
        socket.join(roomId);
        this.socketIo.to(roomId).emit('joinRoom', roomId);
      });

      socket.on('notification', (data) => console.log('notification', data));

      socket.on('user-typing', (fields) => {
        const { chatRoomId, user } = fields;
        // console.log('user-typing', fields)
        this.socketIo.to(chatRoomId).emit('user-typing', {
          user: user,
          isTyping: true,
        });
      });

      socket.on('user-stop-typing', (fields) => {
        const { chatRoomId, user } = fields;
        this.socketIo.to(chatRoomId).emit('user-typing', {
          user: user,
          isTyping: false,
        });
      });

      socket.on('send-message', async (fields) => {
        let { chatRoomId, message, postedBy, type, partner } = fields;
        console.log('send-message', fields);
        // console.log({fields})
        if (!chatRoomId || !message || !postedBy || !type) return;
        let formattedMessage = message;
        try {
          if (type === MESSAGE_TYPE.image) {
            // console.log('IAMGE');
            formattedMessage = await CloudinaryService.upload(message);
            formattedMessage = formattedMessage.url;
          }
          //   console.log('formattedMessage', formattedMessage);
          const newMessage = await MessageService.createMessage(
            formattedMessage,
            chatRoomId,
            type,
            postedBy
          );

          if (!newMessage) return;
          if (partner) {
            console.log({ partner, postedBy });
            const socketUser = this.users.map((item, _) => {
              if ([partner, postedBy].includes(item.userId)) {
                this.socketIo
                  .to(item.socketId)
                  .emit('receive-message', newMessage);
                  this.setUnreadMessage(partner, chatRoomId);
              }
            });
          } else {
            this.socketIo.to(chatRoomId).emit('receive-message', newMessage);
          }
          //   this.socketIo.to(chatRoomId).emit('notification', newMessage);
        } catch (error) {
          throw new Error(error);
        }
      });
    });
    global.io = this.socketIo;
    return this.socketIo;
  }

  getSocketIo(): any {
    return this.socketIo;
  }

  private setUnreadMessage(userId, conversationId): void {
    console.log('setUnreadMessage', userId, conversationId);
    const firebaseDBUnreadRef = FireBaseDB.ref('/unread_messages');
    const userRef = firebaseDBUnreadRef.child(`user_${userId}`);
    userRef.once('value', (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        console.log({obj:{
            [`user_${userId}`]: {
              [`con_${conversationId}`]: 1,
            },
          }})
        firebaseDBUnreadRef.update({
          [`user_${userId}`]: {
            [`con_${conversationId}`]: 1,
          },
        });
        return;
      }else{
        console.log('data', data[conversationId])
        userRef.update({
            [`con_${conversationId}`]: ++data[`con_${conversationId}`] || 1,
          });
      }

    });
  }
}
const socketConfig = SocketConfig.getInstance();

export { socketConfig as SocketConfig };
