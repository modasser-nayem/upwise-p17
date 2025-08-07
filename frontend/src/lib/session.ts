"use server";

import { cookies } from "next/headers";

export const userFromCookie = async () => {
	const cookie = await cookies();

	const userToken = cookie.get("accessToken")?.value;
	return userToken;
};
