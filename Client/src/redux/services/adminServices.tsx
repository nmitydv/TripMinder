import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Driver, User, Vehicle } from '../../helpers/types/apiDataTypes';
import { API_BASE_URL, ApiUrls } from '../../helpers/constants/apiConstants';

interface RefreshTokenResponse {
    data: any;
}

// Your baseQueryWithReauth function
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
    // //('result : ', result);
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

export const adminServices = createApi({
    tagTypes: ['ApproveVehicle', 'ApproveDriver', 'BlockUser', 'BlockDriver'],
    reducerPath: 'adminServices',
    baseQuery: baseQueryWithReauth,
    refetchOnReconnect: true,
    endpoints: (builder) => ({
        getAllUsersList: builder.query<User, string>({
            query: () => `${ApiUrls?.getAllUsersList}`,
            providesTags: ['ApproveDriver', 'BlockUser', 'BlockDriver'],
        }),

        getAllUsersListByRole: builder.query<User, string>({
            query: (queryParams) =>
                `${ApiUrls?.getAllUsersListByRole}/${
                    queryParams ? '?' + new URLSearchParams(queryParams) : ''
                }`,
            providesTags: ['ApproveDriver', 'BlockUser'],
        }),

        getDriversCountStatusWise: builder.query<User, string>({
            query: () => `${ApiUrls?.getDriversCountStatusWise}`,
            providesTags: ['ApproveDriver', 'BlockDriver'],
        }),

        getVehiclesCountStatusWise: builder.query<User, string>({
            query: () => `${ApiUrls?.getVehiclesCountStatusWise}`,
            providesTags: ['ApproveVehicle', 'BlockUser'],
        }),

        getAllVehiclesByFiltersAndStatus: builder.query<Vehicle, string>({
            query: (queryParams) =>
                `${ApiUrls?.getAllVehiclesByFiltersAndStatus}/${
                    queryParams ? '?' + new URLSearchParams(queryParams) : ''
                }`,
            providesTags: ['ApproveVehicle', 'BlockUser'],
        }),

        getAllDriversByFiltersAndStatus: builder.query<User, string>({
            query: (queryParams) => {
                const params = new URLSearchParams(queryParams);
                params.delete('tab');
                const updatedParams = params.toString();
                return `${ApiUrls?.getAllDriversByFiltersAndStatus}/${
                    updatedParams ? '?' + updatedParams : ''
                }`;
            },
            providesTags: ['ApproveDriver', 'BlockDriver'],
        }),

        creteApproveVehicles: builder.mutation<
            Driver,
            { vehicleId: string; isApproved: string }
        >({
            query: ({ vehicleId, isApproved }) => ({
                url: `${ApiUrls?.creteApproveVehicles}/${vehicleId}/${isApproved}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['ApproveVehicle'],
        }),

        creteApproveDriver: builder.mutation<
            Driver,
            { driverId: string; isApproved: string }
        >({
            query: ({ driverId, isApproved }) => ({
                url: `${ApiUrls?.creteApproveDriver}/${driverId}/${isApproved}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['ApproveDriver'],
        }),

        blockUnblockUser: builder.mutation<
            Driver,
            { userId: string; isActive: boolean }
        >({
            query: ({ userId, isActive }) => ({
                url: `${ApiUrls?.blockUnblockUser}/${userId}/${isActive}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['BlockUser', 'BlockDriver'],
        }),
    }),
});

export const {
    useGetAllUsersListQuery,
    useCreteApproveVehiclesMutation,
    useGetAllUsersListByRoleQuery,
    useGetDriversCountStatusWiseQuery,
    useGetVehiclesCountStatusWiseQuery,
    useGetAllDriversByFiltersAndStatusQuery,
    useGetAllVehiclesByFiltersAndStatusQuery,
    useCreteApproveDriverMutation,
    useBlockUnblockUserMutation,
} = adminServices;
