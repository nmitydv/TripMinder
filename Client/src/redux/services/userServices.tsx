// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import type {
//     Booking,
//     Vehicle,
// } from '../../helpers/types/apiDataTypes';
// import { API_BASE_URL, ApiUrls } from '../../helpers/constants/apiConstants';
// // import {}

// interface RefreshTokenResponse {
//     data: any;
// }

// const baseQuery = fetchBaseQuery({
//     baseUrl: API_BASE_URL,
//     prepareHeaders: async (headers) => {
//         const token = localStorage.getItem('token');
//         const language = localStorage.getItem('language');
//         if (token) {
//             headers.set('authorization', `Bearer ${token}`);
//         }
//         if (language) {
//             headers.set('x-custom-lang', language);
//         }
//         return headers;
//     },
// });

// const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
//     const ref_token = localStorage.getItem('refreshToken');
//     let result = await baseQuery(args, api, extraOptions);
//     // //('result : ', result);
//     if (result.error && result.error.status === 401) {
//         try {
//             const refreshResult = (await baseQuery(
//                 {
//                     url: ApiUrls?.getRefreshToken,
//                     method: 'POST',
//                     body: { refreshToken: ref_token },
//                 },
//                 api,
//                 extraOptions
//             )) as RefreshTokenResponse;
//             // //('refreshResult', refreshResult);
//             if (refreshResult.data) {
//                 localStorage.setItem('token', refreshResult.data?.access_token);
//                 localStorage.setItem(
//                     'refreshToken',
//                     refreshResult.data?.refresh_token
//                 );
//                 // //('refreshResult.data', refreshResult.data);
//                 result = await baseQuery(args, api, extraOptions);
//             }
//             if (refreshResult.error.status === 403) {
//                 localStorage.clear();
//                 window.location.href = '/login';
//             }
//         } catch (error) {
//             // //('logout after refresh error -', error);
//         }
//     }
//     return result;
// };

// export const userServices = createApi({
//     reducerPath: 'userServices',
//     tagTypes: ['CreateBooking', 'ApproveDriver'],
//     baseQuery: baseQueryWithReauth,
//     refetchOnReconnect: true,
//     endpoints: (builder) => ({
//         createBookingByUserId: builder.mutation<void, Partial<Booking>>({
//             query: (data) => ({
//                 url: `${ApiUrls?.createBookingByUserId}`,
//                 method: 'POST',
//                 body: data,
//             }),
//             invalidatesTags: ['CreateBooking'],
//         }),

//         getFilteredVehicleByAvailability: builder.query<Vehicle, string>({
//             query: ({ startDate, endDate, queryParams }) =>
//                 `${
//                     ApiUrls?.getFilteredVehicleByAvailability
//                 }/${startDate}/${endDate}/${
//                     queryParams ? '?' + new URLSearchParams(queryParams) : ''
//                 }`,
//             providesTags: ['CreateBooking'],
//         }),

//         getFilteredDriversByAvailability: builder.query<Vehicle, string>({
//             query: ({ startDate, endDate, queryParams }) =>
//                 `${
//                     ApiUrls?.getFilteredDriversByAvailability
//                 }/${startDate}/${endDate}/${
//                     queryParams ? '?' + new URLSearchParams(queryParams) : ''
//                 }`,
//             providesTags: ['CreateBooking'],
//         }),

//         // getAllDriver: builder.query<Driver, string>({
//         //     query:()=> `${ApiUrls?.getAllDriver}`
//         // }),

//         getBookingIdByUserId: builder.query<Booking[], { UserId: string }>({
//             query: ({ UserId }) => `${ApiUrls?.getBookingIdByUserId}/${UserId}`,
//         }),

//         getBookingByUserRequest: builder.query<Booking[], string>({
//             query: (queryParams) =>
//                 `${ApiUrls?.getBookingByUserRequest}${queryParams}`,
//         }),
//     }),
// });

// export const {
//     // useCreateBookingByUserIdMutation,
//     // useGetFilteredVehicleByAvailabilityQuery,
//     // useGetFilteredDriversByAvailabilityQuery,
//     // useGetBookingIdByUserIdQuery,
//     // useGetBookingByUserRequestQuery,
//     // useGetAllDriverQuery
// } = userServices;
