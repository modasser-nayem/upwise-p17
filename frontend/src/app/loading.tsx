"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils"; // optional: your className helper

type AppLoadingProps = {
   message?: string;
   className?: string;
};

const AppLoading = ({ message = "Loading...", className }: AppLoadingProps) => {
   return (
      <div
         className={cn(
            "flex flex-col items-center justify-center h-full py-20",
            className
         )}
      >
         <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
         <p className="text-lg text-muted-foreground font-medium">{message}</p>
      </div>
   );
};

export default AppLoading;
