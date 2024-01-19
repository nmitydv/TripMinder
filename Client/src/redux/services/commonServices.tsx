import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
    Booking,
    Driver,
    Reponse,
    User,
    Vehicle,
} from '../../helpers/types/apiDataTypes';
import { API_BASE_URL, ApiUrls } from '../../helpers/constants/apiConstants';

interface RefreshTokenResponse {
    data: any;
}

// BaseQueryWithReauth function
const baseQuery = fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: async (headers) => {
        const token = localStorage.getItem('token');
        const language = localStorage.getItem('language');
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        if (language) {
            headers.set('x-custom-lang', language);
        }
        return headers;
    },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    const ref_token = localStorage.getItem('refreshToken');
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        try {
            const refreshResult = (await baseQuery(
                {
                    url: ApiUrls?.getRefreshToken,
                    method: 'POST',
                    body: { refreshToken: ref_token },
                },
                api,
                extraOptions
            )) as RefreshTokenResponse;
            if (refreshResult.data) {
                localStorage.setItem('token', refreshResult.data?.access_token);
                localStorage.setItem(
                    'refreshToken',
                    refreshResult.data?.refresh_token
                );
                result = await baseQuery(args, api, extraOptions);
            }
            if (refreshResult.error.status === 403) {
                localStorage.clear();
                window.location.href = '/login';
            }
        } catch (error) {
            localStorage.clear();
            window.location.href = '/login';
        }
    }
    return result;
};

export const commonServices = createApi({
    tagTypes: [
        'updateProfile',
        'ActivateVehicle',
        'AddNewVehicle',
        'CreateBooking',
        'UpdateBookings',
        'CreateRatings',
    ],
    reducerPath: 'commonServices',
    baseQuery: baseQueryWithReauth,
    refetchOnReconnect: true,
    // keepUnusedDataFor: 5,
    endpoints: (builder) => ({
        pushNotification: builder.mutation<void, Partial<Vehicle>>({
            query: ({ userId, notifyToken }) => ({
                url: `${ApiUrls?.pushNotification}/${userId}/${notifyToken}`,
                method: 'POST',
            }),
        }),

        getUserById: builder.query<User, string>({
            query: (id) => `${ApiUrls?.getUserById}/${id}`,
            providesTags: ['updateProfile'],
        }),

        getUserByEmail: builder.query<User, string>({
            query: (email) => `${ApiUrls?.getUserByEmail}/${email}`,
        }),

        getAllVehiclesByRequest: builder.query<Vehicle, string>({
            query: (status) => `${ApiUrls?.getAllVehiclesByRequest}/${status}`,
        }),

        getAllActiveVehicles: builder.query<Vehicle, string>({
            query: (params: string) =>
                `${ApiUrls?.getAllActiveVehicles}${
                    params ? '?' + new URLSearchParams(params) : ''
                }`,
        }),

        getAllBookingsByDriverId: builder.query<Vehicle, string>({
            query: (params: string) =>
                `${ApiUrls?.getAllBookingsByDriverId}${
                    params ? '?' + new URLSearchParams(params) : ''
                }`,
            providesTags: ['UpdateBookings'],
        }),

        getAllDriversByStatus: builder.query<Driver, string>({
            query: (status) => `${ApiUrls?.getAllDriversByStatus}/${status}`,
        }),

        UpdateProfile: builder.mutation({
            query: ({ userId, ...updateprofiledata }) => {
                return {
                    url: `${ApiUrls?.updateprofile}/${userId}`,
                    method: 'PUT',
                    body: updateprofiledata,
                };
            },
            invalidatesTags: ['updateProfile'],
        }),

        // For Vehicle Owner Only
        addNewVehicles: builder.mutation<void, Partial<Vehicle>>({
            query: (data) => ({
                url: `${ApiUrls?.addNewVehicle}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['AddNewVehicle'],
        }),

        activateDeactivateVehicle: builder.mutation<void, Partial<Vehicle>>({
            query: ({ vehicleId, IsActive }) => ({
                url: `${ApiUrls?.activateDeactivateVehicle}/${vehicleId}/${IsActive}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['ActivateVehicle'],
        }),

        getAllVehiclesByOwnerId: builder.query<
            Reponse<Vehicle[]>,
            { userId: string; isActive: boolean; isApprove: string }
        >({
            query: ({ userId, isActive, isApprove }) =>
                `${ApiUrls?.getAllVehiclesByOwnerId}/${userId}/${isActive}/${isApprove}`,
            keepUnusedDataFor: 1,
            providesTags: ['ActivateVehicle', 'AddNewVehicle'],
        }),

        getOwnerBookingsByVehicleidAndStatus: builder.query<User, string>({
            query: (queryParams) =>
                `${ApiUrls?.getOwnerBookingsByVehicleidAndStatus}/${
                    queryParams ? '?' + new URLSearchParams(queryParams) : ''
                }`,
            providesTags: ['UpdateBookings'],
        }),

        // For user Only
        createBookingByUserId: builder.mutation<void, Partial<Booking>>({
            query: (data) => ({
                url: `${ApiUrls?.createBookingByUserId}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['CreateBooking'],
        }),

        getFilteredVehicleByAvailability: builder.query<
            Reponse<Vehicle[]>,
            { startDate: string; endDate: string; queryParams: string }
        >({
            query: ({ startDate, endDate, queryParams }) =>
                `${
                    ApiUrls?.getFilteredVehicleByAvailability
                }/${startDate}/${endDate}/${
                    queryParams ? '?' + new URLSearchParams(queryParams) : ''
                }`,
            providesTags: ['CreateBooking'],
        }),

        getFilteredDriversByAvailability: builder.query<
            Reponse<Vehicle[]>,
            { startDate: string; endDate: string; queryParams: string }
        >({
            query: ({ startDate, endDate, queryParams }) =>
                `${
                    ApiUrls?.getFilteredDriversByAvailability
                }/${startDate}/${endDate}/${
                    queryParams ? '?' + new URLSearchParams(queryParams) : ''
                }`,
            providesTags: ['CreateBooking'],
        }),

        getBookingIdByUserId: builder.query<Booking[], { UserId: string }>({
            query: ({ UserId }) => `${ApiUrls?.getBookingIdByUserId}/${UserId}`,
            providesTags: ['UpdateBookings'],
        }),

        getBookingByUserRequest: builder.query<Booking[], string>({
            query: (queryParams) =>
                `${ApiUrls?.getBookingByUserRequest}${queryParams}`,
            providesTags: ['UpdateBookings', 'CreateRatings'],
        }),

        // Driver's only
        createDriverById: builder.mutation<void, Partial<Driver>>({
            query: (data) => ({
                url: `${ApiUrls?.createDriverById}`,
                method: 'POST',
                body: data,
            }),
        }),

        getDriverByDriverId: builder.query<Driver, string>({
            query: (driverId) => `${ApiUrls?.getDriverByDriverId}/${driverId}`,
        }),

        getRatingsByBookingsId: builder.query<Driver, string>({
            query: (bookingId) =>
                `${ApiUrls?.getRatingsByBookingsId}/${bookingId}`,
            providesTags: ['CreateRatings'],
        }),

        createRatingsByBooking: builder.mutation<void, Partial<Driver>>({
            query: (data) => ({
                url: `${ApiUrls?.createRatingsByBooking}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['CreateRatings'],
        }),

        updateDriverByDriverId: builder.mutation<void, Partial<Driver>>({
            query: ({ driverId, ...data }) => ({
                url: `${ApiUrls?.updateDriverByDriverId}/${driverId}`,
                method: 'PUT',
                body: data,
            }),
        }),

        approveBookingRequestByBookingId: builder.mutation<
            void,
            Partial<Driver>
        >({
            query: ({ _id, ...data }) => ({
                url: `${ApiUrls?.approveBookingRequestByBookingId}/${_id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['UpdateBookings'],
        }),
    }),
});

export const {
    usePushNotificationMutation,
    useUpdateProfileMutation,
    useGetUserByIdQuery,
    useGetAllVehiclesByRequestQuery,
    useGetAllActiveVehiclesQuery,
    useGetAllBookingsByDriverIdQuery,
    useGetAllDriversByStatusQuery,
    useGetRatingsByBookingsIdQuery,
    useCreateRatingsByBookingMutation,

    // VehicleOwner Only
    useAddNewVehiclesMutation,
    useGetAllVehiclesByOwnerIdQuery,
    useGetOwnerBookingsByVehicleidAndStatusQuery,
    useActivateDeactivateVehicleMutation,

    // For user Only
    useCreateBookingByUserIdMutation,
    useGetFilteredVehicleByAvailabilityQuery,
    useGetFilteredDriversByAvailabilityQuery,
    useGetBookingIdByUserIdQuery,
    useGetBookingByUserRequestQuery,

    // For Driver Only
    useCreateDriverByIdMutation,
    useGetDriverByDriverIdQuery,
    useUpdateDriverByDriverIdMutation,
    useApproveBookingRequestByBookingIdMutation,
} = commonServices;
