// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import type { Driver } from '../../helpers/types/apiDataTypes';
// import { API_BASE_URL, ApiUrls } from '../../helpers/constants/apiConstants';

// interface RefreshTokenResponse {
//     data: any;
// }

// // Your baseQueryWithReauth function
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
//             if (refreshResult.data) {
//                 localStorage.setItem('token', refreshResult.data?.access_token);
//                 localStorage.setItem(
//                     'refreshToken',
//                     refreshResult.data?.refresh_token
//                 );
//                 result = await baseQuery(args, api, extraOptions);
//             }
//             if (refreshResult.error.status === 403) {
//                 localStorage.clear();
//                 window.location.href = '/login';
//             }
//         } catch (error) {
//             // //('logout after refresh error -', error);
//             localStorage.clear();
//             window.location.href = '/login';
//         }
//     }
//     return result;
// };

// export const driverServices = createApi({
//     reducerPath: 'driverServices',
//     baseQuery: baseQueryWithReauth,
//     refetchOnReconnect: true,
//     endpoints: (builder) => ({
//         createDriverById: builder.mutation<void, Partial<Driver>>({
//             query: (data) => ({
//                 url: `${ApiUrls?.createDriverById}`,
//                 method: 'POST',
//                 body: data,
//             }),
//         }),

//         getDriverByDriverId: builder.query<Driver, string>({
//             query: (driverId) => `${ApiUrls?.getDriverByDriverId}/${driverId}`,
//         }),

//         updateDriverByDriverId: builder.mutation<void, Partial<Driver>>({
//             query: ({ driverId, ...data }) => ({
//                 url: `${ApiUrls?.updateDriverByDriverId}/${driverId}`,
//                 method: 'PUT',
//                 body: data,
//             }),
//         }),

//         approveBookingRequestByBookingId: builder.mutation<
//             void,
//             Partial<Driver>
//         >({
//             query: ({ _id, ...data }) => ({
//                 url: `${ApiUrls?.approveBookingRequestByBookingId}/${_id}`,
//                 method: 'PUT',
//                 body: data,
//             }),
//         }),
//     }),
// });

// export const {
//     useCreateDriverByIdMutation,
//     useGetDriverByDriverIdQuery,
//     useUpdateDriverByDriverIdMutation,
//     useApproveBookingRequestByBookingIdMutation,
// } = driverServices;
