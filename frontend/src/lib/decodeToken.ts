import { jwtDecode } from "jwt-decode";

type JwtPayload = {
	id: string;
	email: string;
	name: string;
	role: string;
	iat: number;
	exp: number;
};
export const decodeToken = (token?: string): JwtPayload | null => {
	if (!token) return null;

	const result = jwtDecode<JwtPayload>(token);

	return result;
};
