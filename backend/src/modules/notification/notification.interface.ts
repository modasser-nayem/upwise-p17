import { Types } from "mongoose";

export interface INotification {
	user: Types.ObjectId;
	message: string;
	isRead: boolean;
	link: string;
	type: string;
}
