import React from "react";
import AppLoading from "./loading";

const page = () => {
   return (
      <div className="h-screen flex items-center justify-center">
         <h2 className="text-4xl w-auto">
            Hello, Welcome to Upwise Learning Management System
         </h2>
         <div>
            <AppLoading />
         </div>
      </div>
   );
};

export default page;
