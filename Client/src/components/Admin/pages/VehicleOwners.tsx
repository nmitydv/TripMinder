// // // import UserCard from '../cards/UserCard';
// // import { useGetAllUsersListByRoleQuery } from '../../../redux/services/adminServices';
// // import { ContentLoader } from '../../../common/Loaders/Loaders';
// // import { appRoles } from '../../../helpers/constants/idConstants';
// // import GlobalPagination from '../../common/Pagination/Pages/GlobalPagination';
// // import { useEffect, useState } from 'react';
// // import { useLocation, useNavigate } from 'react-router-dom';
// // import noDataFound from '../../../assets/images/no_data_found.png';
// // import UserProfileCrad from '../cards/UserProfileCard';
// // import UserProfileCard from '../cards/UserProfileCard';
// // const Users = () => {
// //     // For Pagination
// //     const [total, setTotal] = useState(400);
// //     const [limit, setLimit] = useState(15);
// //     const [activePage, setActivePage] = useState(1);

// //     const navigate = useNavigate();
// //     const location = useLocation();

// //     const [queryParams, setQueryParams] = useState(location.search);

// //     const { data: userData, isLoading } =
// //         useGetAllUsersListByRoleQuery(queryParams);

// //     useEffect(() => {
// //         setTotal(userData?._metadata?.pagination?.total);

// //         const params: {
// //             role?: string;
// //             perPage?: string;
// //             page?: string;
// //         } = {
// //             role: appRoles?.vehicleOwner,
// //             perPage: limit.toString(),
// //             page: activePage.toString(),
// //         };
// //         const searchParams = new URLSearchParams(params);

// //         const options = {
// //             pathname: '/admin/owners',
// //             search: `?${searchParams.toString()}`,
// //         };
// //         setQueryParams(options.search);

// //         navigate(options);
// //     }, [
// //         location.search,
// //         limit,
// //         total,
// //         activePage,
// //         userData?._metadata?.pagination?.total,
// //     ]);

// //     return (
// //         <>
// //             <div className="container-fluid p-0 admin_vehicle_ctn_main">
// //                 <div className="row d-flex mt-2">
// //                     <div className="col-12">
// //                         <div
// //                             className="overflow-auto cards_container user_card_ctn  px-3"
// //                             id="card_ctn"
// //                         >
// //                             <div className="row d-flex justify-content-start">
// //                                 {userData?.data?.length > 0 && (
// //                                     <>
// //                                         {userData?.data?.map(
// //                                             (vehicle, index) => (
// //                                                 <div
// //                                                     className="col-xs-12 col-sm-12 col-md-6
// //                                                     col-lg-6 col-xl-4 col-xxl-4 px-4 py-3"
// //                                                     style={{ height: '100%' }}
// //                                                     key={index}
// //                                                 >
// //                                                     {/* <UserCard data={vehicle} /> */}
// //                                                     <UserProfileCard data={vehicle}/>
// //                                                 </div>
// //                                             )
// //                                         )}
// //                                     </>
// //                                 )}
// //                             </div>

// //                             {isLoading && (
// //                                 <div
// //                                     className="d-flex justify-content-center align-items-center w-100"
// //                                     style={{ height: '70vh' }}
// //                                 >
// //                                     <ContentLoader />
// //                                 </div>
// //                             )}
// //                             {!isLoading && userData?.data?.length <= 0 && (
// //                                 <>
// //                                 <div className="card-body nodata_img_div d-flex justify-content-center align-items-center mt-5">
// //                                             <img
// //                                                 src={noDataFound}
// //                                                 className="nodata_img"
// //                                                 alt="No vechileOwners Found"
// //                                             />
// //                                         </div>
// //                                         {/* <div>
// //                                             <h1 className="text-center">
// //                                               No vechileOwners Found
// //                                             </h1>
// //                                         </div> */}
// //                                 </>
// //                             )}
// //                         </div>
// //                         <div className="mb-1 pt-3">
// //                             <GlobalPagination
// //                                 total={total}
// //                                 limit={limit}
// //                                 activePage={activePage}
// //                                 handleLimit={(value: number) => setLimit(value)}
// //                                 handleActivePage={(value: number) =>
// //                                     setActivePage(value)
// //                                 }
// //                             />
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //         </>
// //     );
// // };

// // export default Users;

// import UserCard from '../cards/UserCard';
// import { useGetAllUsersListByRoleQuery } from '../../../redux/services/adminServices';
// import { CarAnimation, ContentLoader } from '../../../common/Loaders/Loaders';
// import { appRoles, bookingStatus1 } from '../../../helpers/constants/idConstants';
// import GlobalPagination from '../../common/Pagination/Pages/GlobalPagination';
// import { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import noDataFound from '../../../assets/images/no-data-found.svg';
// import '../pages/styles/UserCard.css';
// import { useTranslation } from 'react-i18next';
// import UserProfileCard from '../cards/UserProfileCard';
// import { adminUserTabs, userDashboardTabs } from '../../../helpers/constants/tabsData';
// import PageTabs from '../../common/Page Tabs/pages/PageTabs';
// import Count from '../cards/Count';
// import { countCards } from '../../../helpers/types/staticJsonTypes';
// const VehicleOwners = () => {
//     const [t] = useTranslation('global');
//     // For Pagination
//     const [total, setTotal] = useState(400);
//     const [limit, setLimit] = useState(15);
//     const [activePage, setActivePage] = useState(1);
//     // blocked user
//     const [activeTab, setActiveTab] = useState('unblockedUsers');

//     const navigate = useNavigate();
//     const location = useLocation();

//     const [queryParams, setQueryParams] = useState(location.search);

//     const { data: userData, isLoading } =
//         useGetAllUsersListByRoleQuery(queryParams);

//     useEffect(() => {
//         setTotal(userData?._metadata?.pagination?.total);

//         const params: {
//             role?: string;
//             perPage?: string;
//             page?: string;
//         } = {
//             role: appRoles?.vehicleOwner,
//             perPage: limit.toString(),
//             page: activePage.toString(),
//         };
//         const searchParams = new URLSearchParams(params);
//         const options = {
//             pathname: '/admin/owners',
//             search: `?${searchParams.toString()}`,
//         };
//         setQueryParams(options.search);

//         navigate(options);
//     }, [
//         location.search,
//         limit,
//         total,
//         activePage,
//         userData?._metadata?.pagination?.total,
//     ]);

//     const blockUnblockUser = (items: any) => {

//         const blockedUsers = userData?.data?.filter((items) => items?.isActive === false) || [];
//         const unblockedUsers = userData?.data?.filter((items) => items?.isActive === true) || [];

//         // if (activeTab === 'blockedUsers') {
//         //     return blockedUsers;
//         // } else if (activeTab === 'unblockedUsers') {
//         //     return unblockedUsers;
//         // }
//         return {
//             blockedUsers: blockedUsers,
//             unblockedUsers: unblockedUsers
//         }

//     };
//     const newData = blockUnblockUser();
//     let filteredData;
//     if (activeTab === 'blockedUsers') {
//         filteredData = newData?.blockedUsers;
//     } else if (activeTab === 'unblockedUsers') {
//         filteredData = newData?.unblockedUsers;
//     }

//     console.log("........total_user", newData);

//     const countsEntry: countCards[] = [
//         {
//             name: t('Unblocked'),
//             value: newData?.unblockedUsers?.length,
//         },
//         {
//             name: t('Blocked'),
//             value: newData?.blockedUsers?.length,
//         }]

//     return (
//         <>
//             <div className="container-fluid p-0 admin_vehicle_ctn_main">

//                 <div className="row d-flex mt-2">
//                     <div className="col-12">

//                         <PageTabs
//                             activeTab={activeTab}
//                             handleTabs={(value: string) => setActiveTab(value)}
//                             handleIsActive={() => null}
//                             tabsData={adminUserTabs}
//                             handleStatus={() => null}
//                         />

//                         {/* <Count countsEntry={countsEntry} /> */}
//                         <div
//                             className="overflow-auto cards_container user_card_ctn  px-3"
//                             id="card_ctn"
//                         >
//                             <div className="row d-flex justify-content-start">
//                                 {userData?.data?.length > 0 && (
//                                     <>
//                                         {filteredData?.map(
//                                             (vehicle, index) => (
//                                                 <div
//                                                     className="col-xs-12 col-sm-12 col-md-6
//                                                      col-lg-6 col-xl-4 col-xxl-4 px-4 py-3"
//                                                     style={{ height: '100%' }}
//                                                     key={index}
//                                                 >
//                                                     {/* <UserCard data={vehicle} /> */}
//                                                     <UserProfileCard data={vehicle} />
//                                                 </div>
//                                             )
//                                         )}
//                                     </>
//                                 )}
//                             </div>

//                             {isLoading && (
//                                 <div
//                                     className="d-flex justify-content-center align-items-center w-100"
//                                     style={{ height: '70vh' }}
//                                 >
//                                     {/* <ContentLoader /> */}
//                                     <CarAnimation />
//                                 </div>
//                             )}
//                             {!isLoading && userData?.data?.length <= 0 && (
//                                 <>
//                                     <div className="card-body nodata_img_div d-flex justify-content-center align-items-center mt-5">
//                                         <img
//                                             src={noDataFound}
//                                             className="nodata_img"
//                                             alt=""
//                                         />
//                                     </div>
//                                     {/* <div>
//                                     <div className="card-body nodata_img_div d-flex justify-content-center align-items-center mt-5">
//                                         <img
//                                             src={noDataFound}
//                                             className="nodata_img"
//                                             alt=""
//                                         />
//                                     </div>
//                                     {/* <div>
//                                     <h1 className="text-center">
//                                       No Request Found
//                                     </h1>
//                                 </div> */}
//                                 </>
//                             )}
//                         </div>
//                         <div className="mb-1 pt-3">
//                             <GlobalPagination
//                                 total={total}
//                                 limit={limit}
//                                 activePage={activePage}
//                                 handleLimit={(value: number) => setLimit(value)}
//                                 handleActivePage={(value: number) =>
//                                     setActivePage(value)
//                                 }
//                             />
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </>
//     );
// };

// export default VehicleOwners;

// import UserCard from '../cards/UserCard';
import { useGetAllUsersListByRoleQuery } from '../../../redux/services/adminServices';
import { CarAnimation } from '../../../common/Loaders/Loaders';
import {
    appRoles,
    // bookingStatus1,
    viewDatatype,
} from '../../../helpers/constants/idConstants';
import GlobalPagination from '../../common/Pagination/Pages/GlobalPagination';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../pages/styles/UserCard.css';
import noDataFound from '../../../assets/images/no-data-found.svg';
import { useTranslation } from 'react-i18next';
import UserProfileCard from '../cards/UserProfileCard';
import {
    adminUserTabs,
    // userDashboardTabs,
} from '../../../helpers/constants/tabsData';
import PageTabs from '../../common/Page Tabs/pages/PageTabs';
// import Count from '../cards/Count';
import { countCards } from '../../../helpers/types/staticJsonTypes';
// import UsersDataTable from '../../common/Data Tables/UsersDataTable';
// import { Table } from 'react-bootstrap';
import CustomTable from '../../common/Data Tables/CustomTable';
const VehicleOwners = () => {
    const [t] = useTranslation('global');
    // For Pagination
    const [total, setTotal] = useState(400);
    const [limit, setLimit] = useState(15);
    const [activePage, setActivePage] = useState(1);
    const [dataLoading, setDataLoading] = useState(false);

    // blocked user
    const [activeTab, setActiveTab] = useState('unblockedUsers');
    const [isActiveUser, setIsActiveUser] = useState(adminUserTabs[0].isActive);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setActivePage(1);
    }, [limit]);

    const [queryParams, setQueryParams] = useState(
        location.search.includes('isActive=true')
            ? location.search
            : `?role=VehicleOwner&perPage=15&page=1&isActive=true`
    );

    const [dataViewType, setDataViewType] = useState(viewDatatype?.table);
    // console.log('Data View Type: ', dataViewType);

    const {
        data: userData,
        isLoading,
        refetch,
    } = useGetAllUsersListByRoleQuery(queryParams);

    useEffect(() => {
        setTotal(userData?._metadata?.pagination?.total);

        const params: {
            role?: string;
            perPage?: string;
            page?: string;
            isActive?: string;
        } = {
            role: appRoles?.vehicleOwner,
            perPage: limit.toString(),
            page: activePage.toString(),
            isActive: isActiveUser.toString(),
        };
        const searchParams = new URLSearchParams(params);

        const options = {
            pathname: '/admin/owners',
            search: `?${searchParams.toString()}`,
        };
        setQueryParams(options.search);

        navigate(options);
    }, [
        location.search,
        limit,
        total,
        activePage,
        userData?._metadata?.pagination?.total,
        isActiveUser,
    ]);

    useEffect(() => {
        setDataLoading(true);
        setTimeout(() => {
            if (!isLoading) {
                setDataLoading(false);
            }
        }, 1500);
    }, [queryParams, activeTab, isLoading]);

    useEffect(() => {
        refetch();
    }, [queryParams]);

    // const blockUnblockUser = () => {
    //     const blockedUsers =
    //         userData?.data?.filter((items) => items?.isActive === false) || [];
    //     const unblockedUsers =
    //         userData?.data?.filter((items) => items?.isActive === true) || [];

    //     // if (activeTab === 'blockedUsers') {
    //     //     return blockedUsers;
    //     // } else if (activeTab === 'unblockedUsers') {
    //     //     return unblockedUsers;
    //     // }
    //     return {
    //         blockedUsers: blockedUsers,
    //         unblockedUsers: unblockedUsers,
    //     };
    // };
    // const newData = blockUnblockUser();
    // let filteredData;
    // if (activeTab === 'blockedUsers') {
    //     filteredData = newData?.blockedUsers;
    // } else if (activeTab === 'unblockedUsers') {
    //     filteredData = newData?.unblockedUsers;
    // }

    // console.log('........total_user', newData);

    // const countsEntry: countCards[] = [
    //     {
    //         name: t('Unblocked'),
    //         value: newData?.unblockedUsers?.length,
    //     },
    //     {
    //         name: t('Blocked'),
    //         value: newData?.blockedUsers?.length,
    //     },
    // ];

    // const tableHeadings = [
    //     t('tableHeading.Sr'),
    //     t('tableHeading.Profile'),
    //     t('tableHeading.Name'),
    //     t('tableHeading.Email'),
    //     t('tableHeading.Mobile'),
    //     t('tableHeading.Age'),
    //     t('tableHeading.Gender'),
    //     t('tableHeading.Location'),
    //     t('tableHeading.joiningdate'),
    //     t('tableHeading.Action'),
    // ];

    const tableHeadings = [
        {name: t('tableHeading.Sr'), size: '0%'},
        {name: t('tableHeading.Profile'),size: '10%' },
        {name: t('tableHeading.Name'),size: '10%' },
        {name: t('tableHeading.Email'),size: '20%' },
        {name: t('tableHeading.Mobile'),size: '10%' },
        {name: t('tableHeading.Age'),size: '5%' },
        {name: t('tableHeading.Gender'),size: '5%' },
        {name: t('tableHeading.Location'),size: '20%' },
        {name: t('tableHeading.joiningdate'),size: '10%' },
        {name: t('tableHeading.Action'),size: '5%' }
    ]

    return (
        <>
            <div className="container-fluid p-0 admin_vehicle_ctn_main">
                <div className="row d-flex mt-2">
                    <div className="col-12">
                        <div className="data_main_ctn">
                            <PageTabs
                                activeTab={activeTab}
                                handleTabs={(value: string) =>
                                    setActiveTab(value)
                                }
                                handleIsActive={(value: boolean) =>
                                    setIsActiveUser(value)
                                }
                                tabsData={adminUserTabs}
                                handleStatus={() => null}
                                handleDataView={(value: string) =>
                                    setDataViewType(value)
                                }
                                dataViewType={dataViewType}
                            />

                            <div className="main_data_ctn">
                                {dataLoading && (
                                    <div
                                        className="d-flex justify-content-center align-items-center w-100"
                                        style={{ height: '70vh' }}
                                    >
                                        {/* <ContentLoader /> */}
                                        <CarAnimation />
                                    </div>
                                )}
                                {!dataLoading &&
                                    userData?.data?.length <= 0 && (
                                        <>
                                            <div className="card-body nodata_img_div d-flex justify-content-center align-items-center mt-5">
                                                <img
                                                    src={noDataFound}
                                                    className="nodata_img"
                                                    alt=""
                                                />
                                            </div>
                                        </>
                                    )}

                                {!dataLoading &&
                                dataViewType === viewDatatype?.card ? (
                                    <div
                                        className="overflow-auto cards_container user_card_ctn mt-3 mx-2 px-3"
                                        id="card_ctn"
                                        style={{
                                            display: dataLoading
                                                ? 'none'
                                                : 'block',
                                        }}
                                    >
                                        <div className="row d-flex justify-content-start">
                                            {userData?.data?.length > 0 && (
                                                <>
                                                    {userData?.data?.map(
                                                        (vehicle, index) => (
                                                            <div
                                                                className="col-xs-12 col-sm-12 col-md-6
                                                     col-lg-6 col-xl-4 col-xxl-4 px-4 py-3"
                                                                style={{
                                                                    height: '100%',
                                                                }}
                                                                key={index}
                                                            >
                                                                <UserProfileCard
                                                                    data={
                                                                        vehicle
                                                                    }
                                                                />
                                                            </div>
                                                        )
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {!dataLoading && (
                                            <div
                                                style={{
                                                    display: dataLoading
                                                        ? 'none'
                                                        : 'block',
                                                }}
                                            >
                                                {/* <UsersDataTable
                                                    data={userData?.data}
                                                    headings={tableHeadings}
                                                /> */}
                                                <CustomTable
                                                    data={userData?.data}
                                                    headings={tableHeadings}
                                                />
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                            <div className="mb-1 pt-1">
                                <GlobalPagination
                                    total={total}
                                    limit={limit}
                                    activePage={activePage}
                                    handleLimit={(value: number) =>
                                        setLimit(value)
                                    }
                                    handleActivePage={(value: number) =>
                                        setActivePage(value)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VehicleOwners;
