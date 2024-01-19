// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import type {
//     Vehicle,
//     Reponse,
//     Bookings,
//     User,
// } from '../../helpers/types/apiDataTypes';
// import { API_BASE_URL, ApiUrls } from '../../helpers/constants/apiConstants';
// interface RefreshTokenResponse {
//     data: any; // Adjust the data type based on your actual response
// }

// // Your baseQueryWithReauth function
// const baseQuery = fetchBaseQuery({
//     baseUrl: API_BASE_URL,
//     prepareHeaders: async (headers, { getState }) => {
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
//     if (result.error && result?.error?.data?.statusCode === 401) {
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

// export const vehicleOwnerServices = createApi({
//     tagTypes: ['ActivateVehicle', 'AddNewVehicle'],
//     reducerPath: 'vehicleOwnerServices',
//     // baseQuery: fetchBaseQuery({
//     //     baseUrl: API_BASE_URL,
//     //     prepareHeaders: async (headers) => {
//     //         const token = localStorage.getItem('token');
//     //         const language = localStorage.getItem('language');
//     //         if (token) {
//     //             headers.set('authorization', `Bearer ${token}`);
//     //         }
//     //         if (language) {
//     //             headers.set('x-custom-lang', language);
//     //         }
//     //         return headers;
//     //     },
//     // }),
//     baseQuery: baseQueryWithReauth,
//     refetchOnReconnect: true,
//     endpoints: (builder) => ({
//         addNewVehicles: builder.mutation<void, Partial<Vehicle>>({
//             query: (data) => ({
//                 url: `${ApiUrls?.addNewVehicle}`,
//                 method: 'POST',
//                 body: data,
//             }),
//             invalidatesTags: ['AddNewVehicle'],
//         }),

//         activateDeactivateVehicle: builder.mutation<void, Partial<Vehicle>>({
//             query: ({ vehicleId, IsActive }) => ({
//                 url: `${ApiUrls?.activateDeactivateVehicle}/${vehicleId}/${IsActive}`,
//                 method: 'PATCH',
//             }),
//             invalidatesTags: ['ActivateVehicle'],
//         }),

//         getAllVehiclesByOwnerId: builder.query<
//             Reponse<Vehicle[]>,
//             { userId: string; isActive: boolean; isApprove: string }
//         >({
//             query: ({ userId, isActive, isApprove }) =>
//                 `${ApiUrls?.getAllVehiclesByOwnerId}/${userId}/${isActive}/${isApprove}`,
//             keepUnusedDataFor: 1,
//             providesTags: ['ActivateVehicle', 'AddNewVehicle'],
//         }),

//         getOwnerBookingsByVehicleidAndStatus: builder.query<User, string>({
//             query: (queryParams) =>
//                 `${ApiUrls?.getOwnerBookingsByVehicleidAndStatus}/${
//                     queryParams ? '?' + new URLSearchParams(queryParams) : ''
//                 }`,
//         }),
//     }),
// });

// export const {
//     // useAddNewVehiclesMutation,
//     // useGetAllVehiclesByOwnerIdQuery,
//     // useGetOwnerBookingsByVehicleidAndStatusQuery,
//     // useActivateDeactivateVehicleMutation,
// } = vehicleOwnerServices;
