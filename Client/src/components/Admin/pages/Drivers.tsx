import DriverCard from '../../common/Cards/Driver ProfileCard/pages/DriverCard';
// import { useGetAllDriversByStatusQuery } from '../../../redux/services/commonServices';
import { CarAnimation, ContentLoader } from '../../../common/Loaders/Loaders';
import Count from '../cards/Count';
import { vehicleStatus } from '../../../helpers/constants/idConstants';
import {
    useGetDriversCountStatusWiseQuery,
    useGetAllDriversByFiltersAndStatusQuery,
} from '../../../redux/services/adminServices';
import { countCards } from '../../../helpers/types/staticJsonTypes';
import PageTabs from '../../common/Page Tabs/pages/PageTabs';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GlobalPagination from '../../common/Pagination/Pages/GlobalPagination';
import noDataFound from '../../../assets/images/no-data-found.svg';
import { useTranslation } from 'react-i18next';
import DriverFilters from '../../common/Filters/pages/DriverFilters';
import { adminDriversTabs } from '../../../helpers/constants/tabsData';

const AdminDrivers = () => {
    const [t] = useTranslation('global');
    // For Tabs
    const [activeTab, setActiveTab] = useState(adminDriversTabs[0]?.value);
    const [isTabActive, setIsTabActive] = useState(false);
    const [isTabApproved, setIsTabApproved] = useState(
        vehicleStatus?.requested
    );
    const [appliedFilters1, setAppliedFilters1] = useState({
        paymentRange: [0, 0],
        // vehiclesType: [0, 0],
        exprienceRange: [0, 0],
    });
    const [value1, setValue] = useState('');
    // //('appliedFilters1: ', appliedFilters1);

    // For Pagination
    const [total, setTotal] = useState(400);
    const [limit, setLimit] = useState(20);
    const [activePage, setActivePage] = useState(1);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setActivePage(1);
    }, [limit]);

    const [queryParams, setQueryParams] = useState(
        location.search.includes('isApproved=Pending')
            ? location.search
            : '?tab=pending&perPage=20&page=1&isApproved=Pending'
    );

    const {
        data: driverData,
        isLoading,
        refetch,
    } = useGetAllDriversByFiltersAndStatusQuery(queryParams);

    const { data: countsData, isLoading: countLoading } =
        useGetDriversCountStatusWiseQuery('');

    useEffect(() => {
        setTotal(driverData?._metadata?.pagination?.total);

        const existingSearchParams = new URLSearchParams(location.search);
        existingSearchParams.set('tab', activeTab);
        existingSearchParams.set('perPage', limit.toString());
        existingSearchParams.set('page', activePage.toString());
        existingSearchParams.set('isApproved', isTabApproved);
        if (appliedFilters1?.paymentRange[1] !== 0) {
            existingSearchParams.set(
                'dayWisePrice',
                appliedFilters1?.paymentRange?.toString()
            );
        }
        if (appliedFilters1?.vehiclesType) {
            existingSearchParams.set(
                'vehiclesType',
                appliedFilters1?.vehiclesType?.toString()
            );
        }
        if (appliedFilters1?.exprienceRange[1] !== 0) {
            existingSearchParams.set(
                'experience',
                appliedFilters1?.exprienceRange?.toString()
            );
        }

        // const params: {
        //     tab: string;
        //     perPage?: string;
        //     page?: string;
        //     isApprove?: string;
        //     orderBy?: string;
        //     orderDirection?: string;

        //     dayWisePrice?: string;
        //     vehiclesType?: string;
        //     experience?: string;

        //     // http://15.206.66.147/api/v1/vehicle/All/vehicles?perPage=20&page=1&orderBy=createdAt&orderDirection=asc&isApprove=Pending
        // } = {
        //     tab: activeTab,
        //     perPage: limit.toString(),
        //     isApproved: isTabApproved,
        //     orderBy: 'createdAt',
        //     orderDirection: 'asc',
        //     dayWisePrice: appliedFilters1?.paymentRange?.toString(),
        //     vehiclesType: appliedFilters1?.vehiclesType?.toString(),
        //     experience: appliedFilters1?.exprienceRange?.toString(),
        // };
        // const searchParams = new URLSearchParams(params);

        const options = {
            pathname: '/admin/drivers',
            search: `?${existingSearchParams.toString()}`,
        };
        setQueryParams(options.search);

        navigate(options, { replace: true });
    }, [
        location.search,
        activeTab,
        // isTabActive,
        isTabApproved,
        limit,
        total,
        driverData?._metadata?.pagination?.total,
        activePage,
        appliedFilters1,
    ]);

    useEffect(() => {
        setActivePage(1);
    }, [activeTab, limit, isTabApproved]);

    useEffect(() => {
        refetch();
    }, [queryParams]);

    let newDriverData = driverData;

    const countsEntry: countCards[] = [
        {
            name: t('admindriver.totaldriver'),
            value: countsData?.data?.TotalDrivers,
        },
        {
            name: t('admindriver.Approveddriver'),
            value: countsData?.data?.TotalApprovedDrivers,
        },
        {
            name: t('admindriver.pendingdriver'),
            value: countsData?.data?.TotalPendingDrivers,
        },
        {
            name: t('admindriver.rejecteddriver'),
            value: countsData?.data?.TotalRejectedDrivers,
        },
    ];
    return (
        <div className="container-fluid p-0 admin_vehicle_ctn_main">
            <Count countLoading={countLoading} countsEntry={countsEntry} />

            <div className="row">
                <div className="col-2 filters_col">
                    <div className="inner_filter admin_filer">
                        <DriverFilters
                            vehicleData={newDriverData}
                            handleSearch={(value) => setValue(value)}
                            searchValues={value1}
                            handleAppliedFilters={(appliedFilters) => {
                                setAppliedFilters1((priviousFilters) => {
                                    return {
                                        ...priviousFilters,
                                        paymentRange:
                                            appliedFilters?.paymentRange,
                                        vehiclesType:
                                            appliedFilters?.vehiclesType,
                                        exprienceRange:
                                            appliedFilters?.exprienceRange,
                                    };
                                });
                            }}
                        />
                    </div>
                </div>
                <div
                    className="col-10"
                    // style={{ borderLeft: '2px dashed #D5D7E3' }}
                >
                    <div className="data_main_ctn">
                        <PageTabs
                            activeTab={activeTab}
                            handleTabs={(value: string) => setActiveTab(value)}
                            handleIsActive={(value: boolean) =>
                                setIsTabActive(value)
                            }
                            handleStatus={(value: string) =>
                                setIsTabApproved(value)
                            }
                            tabsData={adminDriversTabs}
                        />

                        <div
                            className="overflow-auto cards_container admin_vehicle mt-3 px-3 mx-2"
                            id="card_ctn"
                        >
                            {/* {newDriverData?.data?.length > 0 && (
                            <>
                                {newDriverData?.data?.map((driver: any) => (
                                    <>
                                        <DriverCard data={driver} />
                                    </>
                                ))}
                            </>
                        )}
                        {isLoading && (
                            <div
                                className="d-flex justify-content-center align-items-center w-100"
                                style={{ height: '70vh' }}
                            >
                                <ContentLoader />
                            </div>
                        )}
                        {!isLoading && newDriverData?.data?.length <= 0 && (
                            <div className="card-body">
                                <h1>No Driver Found</h1>
                            </div>
                        )} */}
                            <div className="row d-flex justify-content-start">
                                {newDriverData?.data?.length > 0 && (
                                    <>
                                        {newDriverData?.data
                                            ?.filter((item) => {
                                                const searchTerm =
                                                    value1?.toLowerCase();
                                                const vehicleName =
                                                    item?.userId?.name?.toLowerCase();

                                                return vehicleName.includes(
                                                    searchTerm
                                                );
                                            })
                                            ?.map((driver: any) => (
                                                <div
                                                    className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-6 mb-3"
                                                    style={{ height: '100%' }}
                                                     key={driver?.userId?._id}
                                                >
                                                    <DriverCard data={driver} />
                                                </div>
                                            ))}
                                    </>
                                )}
                            </div>
                            {isLoading && (
                                <div
                                    className="d-flex justify-content-center align-items-center w-100"
                                    style={{ height: '70vh' }}
                                >
                                    {/* <ContentLoader /> */}
                                    <CarAnimation />
                                </div>
                            )}
                            {!isLoading && newDriverData?.data?.length <= 0 && (
                                <>
                                    <div className="card-body nodata_img_div d-flex justify-content-center">
                                        <img
                                            src={noDataFound}
                                            className="nodata_img"
                                            alt=""
                                        />
                                    </div>
                                    {/* <div>
                                    <h1 className="text-center">
                                        {t('admindriver.nodriver')}
                                    </h1>
                                </div> */}
                                </>
                            )}
                        </div>
                        <div className="mb-1 pt-3">
                            <GlobalPagination
                                total={total}
                                limit={limit}
                                activePage={activePage}
                                handleLimit={(value: number) => setLimit(value)}
                                handleActivePage={(value: number) =>
                                    setActivePage(value)
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDrivers;

// localStorage.setItem(
//     'role',
//     result?.data?.userId?.role
// );localStorage.setItem(
//     'userId',
//     result?.data?.userId?._id
// );dhemde aaj[ bki]
