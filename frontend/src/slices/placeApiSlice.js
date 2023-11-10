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
    getPlacesByUserId: builder.query({
      query: (userId) => ({
        url: `${PLACES_URL}/user/${userId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useCreatePlaceMutation, useGetPlacesByUserIdQuery } =
  placeApiSlice;
