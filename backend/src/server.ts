import app from "./app";
import mongoose from "mongoose";
import { envConfig } from "./config";
import { createServer } from "http";
import { initSocket } from "./socket";

async function main() {
   try {
      await mongoose.connect(envConfig.DATABASE_URL as string);

      const server = createServer(app);

      // Init Socket.IO
      initSocket(server);

      server.listen(envConfig.PORT, () => {
         console.log(`SERVER IS RUNNING AT ${envConfig.PORT}`);
      });
   } catch (err) {
      console.log(err);
   }
}

main();
