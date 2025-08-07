export type TUserRequest = {
	name: string;
	email: string;
	password: string;
};
export type TUserResponse = {
	_id: string;
	name: string;
	email: string;
	role: string;
	avatar: string;
	phone: string;
	isDeleted: boolean;
	createdAt: string;
	updatedAt: string;
};
