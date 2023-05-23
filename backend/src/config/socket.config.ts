import { MessageService } from '@services/message.service';
import { Server as SocketServer } from 'socket.io';
import { Environment } from './environment.config';
import { Logger } from './logger.config';
import { MESSAGE_TYPE } from '@enums';
import { CloudinaryService } from '@services/cloudinary.service';

class SocketConfig {
  private static instance: SocketConfig;

  private constructor() {}

  socketIo: any;

  users: any = [];

  static getInstance(): SocketConfig {
    if (!SocketConfig.instance) {
      SocketConfig.instance = new SocketConfig();
    }
    return SocketConfig.instance;
  }

  init(server: any): SocketConfig {
    if (!this.socketIo) {
      this.socketIo = new SocketServer(server, {
        allowEIO3: true,
        cors: {
          origin: [Environment.FE_URL, 'http://localhost:3000'],
          methods: ['GET', 'POST'],
        },
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
        console.log('user disconnected', socket.id);
        this.users = this.users.filter((user) => user.socketId !== socket.id);
        console.log({ users: this.users });
      });

      socket.on('identity', (userId) => {
        const existedUser = this.users.find((user) => user.userId === userId);
        console.log({ existedUser });
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

        if (!chatRoomId || !message || !postedBy || !type) return;
        let formattedMessage = message;
        try {
          // console.log('send-message', fields);
          if (type === MESSAGE_TYPE.image) {
            console.log('IAMGE');
            formattedMessage = await CloudinaryService.upload(message);
          }
          const newMessage = await MessageService.createMessage(
            (message = formattedMessage.url),
            chatRoomId,
            type,
            postedBy
          );

          if (!newMessage) return;
          if (partner) {
            const socketUser = this.users.map((item, _) => {
              if ([partner, postedBy].includes(item.userId)) {
                this.socketIo
                  .to(item.socketId)
                  .emit('receive-message', newMessage);
              }
            });
          } else {
            this.socketIo.to(chatRoomId).emit('receive-message', newMessage);
          }
          this.socketIo.to(chatRoomId).emit('notification', newMessage);
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
}
const socketConfig = SocketConfig.getInstance();

export { socketConfig as SocketConfig };
