import { Server as HTTPServer } from "http";
import { Server as IOServer } from "socket.io";
import { envConfig } from "./config";

let io: IOServer;
const userSocketMap = new Map<string, string>(); // userId <-> socketId

export const initSocket = (server: HTTPServer) => {
   io = new IOServer(server, {
      cors: {
         origin: [envConfig.FRONTEND_URL, "http://localhost:3000"],
         credentials: true,
      },
   });

   io.on("connection", (socket) => {
      const userId = socket.handshake.query.userId as string;
      if (userId) {
         userSocketMap.set(userId, socket.id);
      }

      socket.on("disconnect", () => {
         if (userId) userSocketMap.delete(userId);
      });
   });
};

export const getIO = () => {
   if (!io) {
      throw new Error("Socket.io is not initialized!");
   }
   return io;
};

export const getUserSocketMap = () => userSocketMap;
