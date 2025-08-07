import { TServerResponse } from "@/types";
import { baseApi } from "./baseApi";
type TRevenue = {
	_id: string;
	amount: number;
	createdAt: string;
};
const metaDataApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		generalInformation: builder.query({
			query: () => ({
				url: "/meta-data/general-information",
				method: "GET",
			}),
		}),
		revenue: builder.query<TServerResponse<TRevenue[]>, void>({
			query: () => ({
				url: "/meta-data/revenue",
				method: "GET",
			}),
		}),
	}),
});

export const { useGeneralInformationQuery, useRevenueQuery } = metaDataApi;
