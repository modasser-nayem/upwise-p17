export type TPaymentResponseForTable = {
	_id: string;
	paymentIntentId: string;
	student: {
		name: string;
	};
	course: {
		title: string;
	};
	amount: number;
};
