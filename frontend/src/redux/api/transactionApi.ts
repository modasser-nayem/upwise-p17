import { TServerResponse } from "@/types";
import { baseApi } from "./baseApi";
import { TPaymentResponseForTable } from "@/types/payment.types";

const transactionApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		allTransaction: builder.query<
			TServerResponse<TPaymentResponseForTable[]>,
			void
		>({
			query: () => ({
				url: "/payments",
				method: "GET",
			}),
		}),
		allPayments: builder.query<
			TServerResponse<TPaymentResponseForTable[]>,
			Record<string, string>
		>({
			query: (query) => {
				const params = new URLSearchParams();

				Object.entries(query).forEach(([key, value]) => {
					if (value?.trim().length > 0) {
						params.append(key, value);
					}
				});
				return {
					url: "/payments",
					method: "GET",
					params,
				};
			},
		}),
	}),
});

export const { useAllTransactionQuery, useAllPaymentsQuery } = transactionApi;
