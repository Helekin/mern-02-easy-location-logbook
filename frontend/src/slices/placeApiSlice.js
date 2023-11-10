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
    updatePlace: builder.mutation({
      query: (data, placeId) => ({
        url: `${PLACES_URL}/${placeId}`,
        method: "UPDATE",
        body: data,
      }),
      invalidatesTags: ["Places"],
    }),
    deletePlace: builder.mutation({
      query: (placeId) => ({
        url: `${PLACES_URL}/${placeId}`,
        method: "DELETE",
      }),
    }),
    getPlaceById: builder.query({
      query: (placeId) => ({
        url: `${PLACES_URL}/${placeId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getPlacesByUserId: builder.query({
      query: (userId) => ({
        url: `${PLACES_URL}/user/${userId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useCreatePlaceMutation,
  useUpdatePlaceMutation,
  useDeletePlaceMutation,
  useGetPlaceByIdQuery,
  useGetPlacesByUserIdQuery,
} = placeApiSlice;
