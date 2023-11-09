import { PLACES_URL } from "../constants/constants";

import { apiSlice } from "./apiSlice";

export const placeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPlace: builder.mutation({
      query: () => ({
        url: PLACES_URL,
        method: "POST",
      }),
      invalidatesTags: ["Place"],
    }),
  }),
});

export const { useCreatePlaceMutation } = placeApiSlice;
