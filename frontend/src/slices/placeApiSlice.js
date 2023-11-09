import { PLACES_URL } from "../constants/constants";

import { apiSlice } from "./apiSlice";

export const placeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPlace: builder.mutation({
      query: (data) => ({
        url: `${PLACES_URL}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreatePlaceMutation } = placeApiSlice;
