"use server";

import { config } from "@/config";

import { cookies } from "next/headers";

export const setCookie = async (token: string) => {
   try {
      const cookieStore = await cookies();
      cookieStore.set("accessToken", token, {
         httpOnly: false, // readable by JS and middleware
         secure: config.NODE_ENV === "production",
         sameSite: "lax",
         path: "/",
         maxAge: 15 * 60 * 1000, // 15 min
      });
   } catch (error) {
      console.log(error);
   }
};

export const removeCookie = async () => {
   try {
      const cookieStore = await cookies();
      cookieStore.delete("accessToken");
   } catch (error) {
      console.log(error);
   }
};
