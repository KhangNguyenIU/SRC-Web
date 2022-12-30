import { MessageService } from '@services/message.service';
import { Server as SocketServer } from 'socket.io';
import { Environment } from './environment.config';
import {ServerConfiguration} from './server.config'

class SocketConfig {
    private static instance: SocketConfig

    private constructor() {}

    socketIo : any
    static getInstance() : SocketConfig {
        if(!SocketConfig.instance) {
            SocketConfig.instance = new SocketConfig()
        }
        return SocketConfig.instance
    }

    init(server:any): SocketConfig{
        if(!this.socketIo){
            this.socketIo = new SocketServer(server, {
                allowEIO3: true,
                cors: {
                    origin: [Environment.FE_URL,"http://localhost:3000"],
                    methods: ['GET', 'POST'],
                }
             
            });
        }
        return this
    }

    plug(): any{
        this.socketIo.on('connection', (socket) => {
            let users = [];
        
            console.log('a user connected', socket.id);
            socket.on('disconnect', () => {
              console.log('user disconnected', socket.id);
              users.filter((user) => user.socketId !== socket.id);
            });
        
            socket.on('identity', (userId) => {
              console.log('identity', userId);
              users.push({ userId, socketId: socket.id });
            });
        
            socket.on('leaveRoom', (roomId) => {
              socket.leave(roomId);
            });
        
            socket.on('joinRoom', (roomId) => {
              socket.join(roomId);
              this.socketIo.to(roomId).emit('joinRoom', roomId);
            });
        
            socket.on('notification', (data) => console.log('notification', data));
        
            socket.on('send-message', async (fields) => {
              const { chatRoomId, message, postedBy, type } = fields;
              if (!chatRoomId || !message || !postedBy || !type) return;
        
              try {
                const newMessage = await MessageService.createMessage(
                  message,
                  chatRoomId,
                  type,
                  postedBy
                );
                if (!newMessage) return;
                this.socketIo.to(chatRoomId).emit('receive-message', newMessage);
                this.socketIo.to(chatRoomId).emit('notification', newMessage);
              } catch (error) {
                throw new Error(error);
              }
            });
          });
          global.io = this.socketIo;
        return this.socketIo
    }

    getSocketIo(): any{
        return this.socketIo
    }
}
const socketConfig = SocketConfig.getInstance()

export { socketConfig as SocketConfig }