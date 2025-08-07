import { cn } from "@/lib/utils";
import React from "react";

type GeometricBackgroundProps = {
   children: React.ReactNode;
   className?: string;
};

export default function GeometricBackground({
   children,
   className,
}: GeometricBackgroundProps) {
   return (
      <div className={cn("h-auto w-full relative", className)}>
         <div
            className="absolute inset-0 -z-20"
            style={{
               backgroundColor: "#ffffff", // white background
               backgroundImage: `
            linear-gradient(to right, #e6f4ea 1px, transparent 1px),
            linear-gradient(to bottom, #e6f4ea 1px, transparent 1px),
            radial-gradient(circle 350px at 50% 50%, #ccead5, transparent)
          `,
               backgroundSize: "120px 120px, 120px 120px, 100% 100%",
            }}
         />
         {children}
      </div>
   );
}
