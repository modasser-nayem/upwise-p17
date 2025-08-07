"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export const userInfo = async () => {
	const cookie = await cookies();
	const token = cookie.get("accessToken")?.value;

	if (!token) {
		return null;
	}

	const user = jwtDecode(token);
	return user;
};
