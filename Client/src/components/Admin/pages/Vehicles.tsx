import { useEffect, useState } from 'react';
import './styles/Vehicles.css';
import '../../common/Page Tabs/styles/PageTabs.css';
import { useGetAllVehiclesByFiltersAndStatusQuery } from '../../../redux/services/adminServices';
import VehicleCard from '../../common/Cards/Owner Vehicle/pages/VehicleCard';
import PageTabs from '../../common/Page Tabs/pages/PageTabs';
import { vehicleStatus } from '../../../helpers/constants/idConstants';
import { CarAnimation, ContentLoader } from '../../../common/Loaders/Loaders';
import { useLocation, useNavigate } from 'react-router-dom';
import Count from '../cards/Count';
import { useGetVehiclesCountStatusWiseQuery } from '../../../redux/services/adminServices';
import { countCards } from '../../../helpers/types/staticJsonTypes';
import GlobalPagination from '../../common/Pagination/Pages/GlobalPagination';
import VehicleFilters from '../../common/Filters/pages/VehicleFilters';
import noDataFound from '../../../assets/images/no-data-found.svg';
import { useTranslation } from 'react-i18next';
import { adminVehiclesTabs } from '../../../helpers/constants/tabsData';

const Vehicles = () => {
    const [t] = useTranslation('global');
    // const userId = localStorage.getItem('userId');

    // For Tabs
    const [activeTab, setActiveTab] = useState(adminVehiclesTabs[0]?.value);
    const [isTabActive, setIsTabActive] = useState(false);
    const [isTabApproved, setIsTabApproved] = useState(
        vehicleStatus?.requested
    );

    const [appliedFilters, setAppliedFilters] = useState({});
    const [value1, setValue] = useState('');

    // For Pagination
    const [total, setTotal] = useState(400);
    const [limit, setLimit] = useState(20);
    const [activePage, setActivePage] = useState(1);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setActivePage(1);
    }, [limit]);

    console.log(location.search);
    const [queryParams, setQueryParams] = useState(
        location.search.includes('isApprove=Pending')
            ? location.search
            : '?tab=pending&perPage=20&page=1&isActive=false&isApprove=Pending'
    );

    const {
        data: vehiclesData,
        isLoading,
        refetch,
    } = useGetAllVehiclesByFiltersAndStatusQuery(queryParams);

    useEffect(() => {
        setTotal(vehiclesData?._metadata?.pagination?.total);

        let params: {
            tab: string;
            isActive?: string;
            isApprove?: string;
            perPage?: string;
            page?: string;
            vehicleType?: string;
        } = {
            tab: activeTab,
            perPage: limit.toString(),
            page: activePage.toString(),
        };

        if (appliedFilters?.vehicleType) {
            params = {
                ...params,
                vehicleType: appliedFilters.vehicleType,
            };
        }
        if (appliedFilters?.seater) {
            params = {
                ...params,
                seaters: appliedFilters?.seater?.toString(),
            };
        }
        if (isTabActive === true) {
            params = {
                ...params,
                isActive: 'true,false',
                isApprove: isTabApproved,
            };
        }
        if (isTabActive === false) {
            params = {
                ...params,
                isActive: isTabActive.toString(),
                isApprove: isTabApproved,
            };
        }
        const searchParams = new URLSearchParams(params);

        const options = {
            pathname: '/admin/vehicles',
            search: `?${searchParams.toString()}`,
        };
        setQueryParams(options.search);

        navigate(options);
    }, [
        location.search,
        activeTab,
        isTabActive,
        isTabApproved,
        appliedFilters,
        limit,
        total,
        vehiclesData?._metadata?.pagination?.total,
        activePage,
    ]);

    useEffect(() => {
        refetch();
    }, [queryParams]);

    const { data: countsData, isLoading: countLoading } =
        useGetVehiclesCountStatusWiseQuery('');

    let newVehicleData = vehiclesData;

    const countsEntry: countCards[] = [
        {
            name: t('adminvehicles.totalvehicles'),
            value: countsData?.data?.TotalVehicles,
        },
        {
            name: t('adminvehicles.Approvedvehicles'),
            value: countsData?.data?.TotalApprovedVehicle,
        },
        {
            name: t('adminvehicles.pendingvehicles'),
            value: countsData?.data?.TotalPendingVehicle,
        },
        {
            name: t('adminvehicles.rejectedvehicles'),
            value: countsData?.data?.TotalRejectedVehicle,
        },
    ];
    return (
        <>
            <div className="container-fluid p-0 admin_vehicle_ctn_main">
                <Count countLoading={countLoading} countsEntry={countsEntry} />

                <div className="row ">
                    <div className="col-2 filters_col">
                        <div className="inner_filter admin_filer">
                            <VehicleFilters
                                vehicleData={vehiclesData}
                                handleSearch={(value) => setValue(value)}
                                searchValues={value1}
                                handleAppliedFilters={(appliedFilters) => {
                                    setAppliedFilters((priviousFilters) => {
                                        return {
                                            ...priviousFilters,
                                            seater: appliedFilters?.seater,
                                            vehicleType:
                                                appliedFilters?.vehicleType,
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
                                handleTabs={(value: string) =>
                                    setActiveTab(value)
                                }
                                handleIsActive={(value: boolean) =>
                                    setIsTabActive(value)
                                }
                                handleStatus={(value: string) =>
                                    setIsTabApproved(value)
                                }
                                tabsData={adminVehiclesTabs}
                            />
                            <div
                                className="overflow-auto cards_container admin_vehicle mt-3 mx-2 px-3"
                                id="card_ctn"
                            >
                                <div className="row d-flex justify-content-start">
                                    {newVehicleData?.data?.length > 0 && (
                                        <>
                                            {newVehicleData?.data
                                                ?.filter((item) => {
                                                    const searchTerm =
                                                        value1?.toLowerCase();
                                                    const vehicleName =
                                                        item?.vehicleName?.toLowerCase();

                                                    return vehicleName.includes(
                                                        searchTerm
                                                    );
                                                })
                                                ?.map((vehicle, index) => (
                                                    <>
                                                        <div
                                                            className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 col-xxl-4 mb-3"
                                                            style={{
                                                                height: '100%',
                                                            }}
                                                            //  key={index}
                                                        >
                                                            <VehicleCard
                                                                data={vehicle}
                                                                index={index}
                                                            />
                                                        </div>
                                                    </>
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
                                {!isLoading &&
                                    newVehicleData?.data?.length <= 0 && (
                                        <>
                                            <div className="card-body nodata_img_div d-flex justify-content-center align-items-center">
                                                <img
                                                    src={noDataFound}
                                                    className="nodata_img"
                                                    alt=""
                                                />
                                            </div>
                                            {/* <div>
                                            <h1 className="text-center">
                                                {t('adminvehicles.novehicle')}
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

export default Vehicles;
