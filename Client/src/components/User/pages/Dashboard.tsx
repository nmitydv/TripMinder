import UserSearchbar from './UserSearchbar';
import VehicleCard from '../../common/Cards/Owner Vehicle/pages/VehicleCard';
// import { useGetAllDriversByStatusQuery } from '../../../redux/services/commonServices';
import PageTabs from '../../common/Page Tabs/pages/PageTabs';
import GlobalPagination from '../../common/Pagination/Pages/GlobalPagination';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
// import { vehicleStatus } from '../../../helpers/constants/idConstants';
import DuserCards from '../../common/Cards/DriverUserCards/pages/DuserCards';
import '../style/Dashboard.css';
import VehicleFilters from '../../common/Filters/pages/VehicleFilters';
import // useGetFilteredDriversByAvailabilityQuery,
// useGetFilteredVehicleByAvailabilityQuery,
'../../../redux/services/userServices';
import { formateDateYYYYMMDD } from '../../../helpers/Functions/dateFormaters';
import DriverFilters from '../../common/Filters/pages/DriverFilters';
import noDataFound from '../../../assets/images/no-data-found.svg';
import { t } from 'i18next';
import { userDashboardTabs } from '../../../helpers/constants/tabsData';
// import type { Driver } from '../../helpers/types/apiDataTypes';
import type { Driver } from '../../../helpers/types/apiDataTypes';
import { CarAnimation, ContentLoader } from '../../../common/Loaders/Loaders';
import {
    useGetFilteredDriversByAvailabilityQuery,
    useGetFilteredVehicleByAvailabilityQuery,
} from '../../../redux/services/commonServices';
const Dashboard = () => {
    const [total, setTotal] = useState(400);
    const [limit, setLimit] = useState(20);
    const [activePage, setActivePage] = useState(1);
    const [activeTab, setActiveTab] = useState('Vehicle');
    const [appliedFilters, setAppliedFilters] = useState({});
    const [value1, setValue] = useState('');
    console.log('Search Values', value1);

    const [total1, setTotal1] = useState(400);
    const [limit1, setLimit1] = useState(20);
    const [activePage1, setActivePage1] = useState(1);
    const [appliedFilters1, setAppliedFilters1] = useState({});
    const [value2, setValue2] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setActivePage(1);
    }, [limit]);
    useEffect(() => {
        setActivePage1(1);
    }, [limit1]);

    const [queryParams, setQueryParams] = useState(
        location.search.includes('page')
            ? location.search
            : '?perPage=20&page=1'
    );
    const [queryParams1, setQueryParams1] = useState(location.search);

    // const { data: drivers } = useGetAllDriversByStatusQuery(
    //     vehicleStatus?.requested
    // );
    console.log(activeTab);

    const { startDate, endDate } = useParams();

    const {
        data: vehiclesFiltered,
        refetch,
        isLoading: vehicleLoading,
    } = useGetFilteredVehicleByAvailabilityQuery({
        startDate: startDate,
        endDate: endDate,
        queryParams: queryParams,
    });

    const { data: driverFiltered, refetch: refetchDriver } =
        useGetFilteredDriversByAvailabilityQuery({
            startDate: startDate,
            endDate: endDate,
            queryParams: queryParams1,
        });

    useEffect(() => {
        navigate(
            `/user/dashboard/${formateDateYYYYMMDD(
                new Date()
            )}/${formateDateYYYYMMDD(new Date())}`
        );
    }, []);
    const [startLoading, setStartLoading] = useState(false);

    useEffect(() => {
        // if (activeTab == 'Vehicle') {
        setStartLoading(true);
        setTotal(vehiclesFiltered?._metadata?.pagination?.total);

        const existingSearchParams = new URLSearchParams(location.search);
        existingSearchParams.set('perPage', limit.toString());
        existingSearchParams.set('page', activePage.toString());

        if (appliedFilters?.vehicleType) {
            existingSearchParams?.set(
                'vehicleType',
                appliedFilters.vehicleType
            );
        }
        if (appliedFilters?.seater?.length > 0) {
            existingSearchParams.set(
                'seaters',
                appliedFilters?.seater?.toString()
            );
        }

        const options = {
            pathname: `/user/dashboard/${startDate}/${endDate}`,
            search: `?${existingSearchParams.toString()}`,
        };
        setQueryParams(options.search);
        setStartLoading(false);
        navigate(options, { replace: true });
        // }
    }, [
        limit,
        appliedFilters,
        appliedFilters1,
        activePage,
        total,
        vehiclesFiltered?._metadata?.pagination?.total,
        location.search,
    ]);

    useEffect(() => {
        // if (activeTab == 'Driver') {
        setTotal1(driverFiltered?._metadata?.pagination?.total);

        const existingSearchParams = new URLSearchParams(location.search);
        existingSearchParams.set('perPage', limit1.toString());
        existingSearchParams.set('page', activePage1.toString());

        if (
            appliedFilters1?.paymentRange &&
            appliedFilters1?.paymentRange[0] >= 0 &&
            appliedFilters1?.paymentRange[1] > 0
        ) {
            existingSearchParams.set(
                'dayWisePrice',
                appliedFilters1?.paymentRange
            );
        }
        if (appliedFilters1?.vehiclesType) {
            existingSearchParams.set(
                'vehiclesType',
                appliedFilters1?.vehiclesType?.toString()
            );
        }
        if (
            appliedFilters1?.exprienceRange &&
            appliedFilters1?.exprienceRange[0] >= 0 &&
            appliedFilters1?.exprienceRange[1] > 0
        ) {
            existingSearchParams.set(
                'experience',
                appliedFilters1?.exprienceRange?.toString()
            );
        }

        const options = {
            pathname: `/user/dashboard/${startDate}/${endDate}`,
            search: `?${existingSearchParams.toString()}`,
        };
        console.log(options);
        setQueryParams1(options.search);
        navigate(options, { replace: true });

        // }
    }, [
        limit1,
        appliedFilters1,
        activePage1,
        total1,
        driverFiltered?._metadata?.pagination?.total,
        location.search,
    ]);

    useEffect(() => {
        setStartLoading(true);
        refetch();
        setStartLoading(false);
    }, [queryParams]);

    useEffect(() => {
        refetchDriver();
    }, [queryParams1]);

    // useEffect(() => {
    //     if (vehiclesFiltered?.data) {
    //         const newData = vehiclesFiltered?.data?.filter((item) => {
    //             const searchTerm = value1?.toLowerCase();
    //             const vehicleName = item?.vehicleName?.toLowerCase();

    //             return vehicleName.includes(searchTerm);
    //         });
    //         console.warn('New Data', newData);
    //     }
    // }, [value1]);

    return (
        <>
            <div
                className="container-fluid p-0"
                style={{ height: '87vh', margin: 0 }}
            >
                <div className="row">
                    {activeTab == 'Vehicle' && (
                        <div className="col-2 filters_col">
                            <div className="inner_filter">
                                <VehicleFilters
                                    vehicleData={vehiclesFiltered}
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
                    )}
                    {activeTab == 'Driver' && (
                        <div className="col-2 filters_col">
                            <div className="inner_filter">
                                <DriverFilters
                                    vehicleData={driverFiltered}
                                    handleSearch={(value) => setValue2(value)}
                                    searchValues={value2}
                                    handleAppliedFilters={(appliedFilters) => {
                                        setAppliedFilters1(
                                            (priviousFilters) => {
                                                return {
                                                    ...priviousFilters,
                                                    paymentRange:
                                                        appliedFilters?.paymentRange,
                                                    vehiclesType:
                                                        appliedFilters?.vehiclesType,
                                                    exprienceRange:
                                                        appliedFilters?.exprienceRange,
                                                };
                                            }
                                        );
                                    }}
                                />
                            </div>
                        </div>
                    )}
                    <div
                        className="col-10"
                        // style={{ borderRight: '2px dashed #D5D7E3' }}
                    >
                        <UserSearchbar />
                        <div className="data_main_ctn">
                            <PageTabs
                                activeTab={activeTab}
                                handleTabs={(value: string) =>
                                    setActiveTab(value)
                                }
                                tabsData={userDashboardTabs}
                            />

                            {activeTab == 'Vehicle' ? (
                                <>
                                    <div
                                        className="overflow-auto cards_container user_vehicle_card_ctn px-3 py-3
                                         mx-2"
                                        id="card_ctn"
                                    >
                                        {/* {vehiclesFiltered?.data?.length > 0 && (
                                        <>gkk//////
                                            {vehiclesFiltered?.data?.map(
                                                (vehicle: any) => (
                                                    <>
                                                        <VehicleCard
                                                            data={vehicle}
                                                        />
                                                    </>
                                                )
                                            )}
                                        </>
                                    )} */}
                                        <div className="row d-flex justify-content-start">
                                            {vehiclesFiltered?.data?.length >
                                                0 && (
                                                <>
                                                    {vehiclesFiltered?.data
                                                        ?.filter((item) => {
                                                            const searchTerm =
                                                                value1?.toLowerCase();
                                                            const vehicleName =
                                                                item?.vehicleName?.toLowerCase();

                                                            return vehicleName.includes(
                                                                searchTerm
                                                            );
                                                        })
                                                        ?.map(
                                                            (
                                                                vehicle,
                                                                index
                                                            ) => (
                                                                <>
                                                                    <div
                                                                        className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 col-xxl-4 mb-3"
                                                                        style={{
                                                                            height: '100%',
                                                                        }}
                                                                        //  key={index}
                                                                    >
                                                                        <VehicleCard
                                                                            data={
                                                                                vehicle
                                                                            }
                                                                            index={
                                                                                index
                                                                            }
                                                                        />
                                                                    </div>
                                                                </>
                                                            )
                                                        )}
                                                </>
                                            )}
                                        </div>
                                        {vehicleLoading && (
                                            <div
                                                className="d-flex justify-content-center align-items-center w-100"
                                                style={{ height: '70vh' }}
                                            >
                                                {/* <ContentLoader /> */}
                                                <CarAnimation />
                                            </div>
                                        )}
                                        {!vehicleLoading &&
                                            vehiclesFiltered?.data?.length <=
                                                0 && (
                                                <>
                                                    <div className="card-body nodata_img_div d-flex justify-content-center align-items-center mt-5">
                                                        <img
                                                            src={noDataFound}
                                                            className="nodata_img"
                                                            alt="No Data Found"
                                                        />
                                                    </div>
                                                    {/* <div>
                                                <h1 className="text-center">
                                                    {t('vehicleCard.nodata')}
                                                </h1>
                                            </div> */}
                                                </>
                                            )}
                                    </div>
                                    <div className="mb-4 pt-3">
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
                                </>
                            ) : (
                                ''
                            )}

                            {activeTab == 'Driver' ? (
                                <>
                                    <div
                                        className="overflow-auto cards_container user_vehicle_card_ctn px-3 py-3 mx-2"
                                        id="card_ctn"
                                    >
                                        <div
                                            className="row d-flex justify-content-start"
                                            // style={{ minHeight: '565px' }}
                                        >
                                            {driverFiltered?.data?.length >
                                                0 && (
                                                <>
                                                    {driverFiltered?.data
                                                        ?.filter((item) => {
                                                            const searchTerm =
                                                                value2?.toLowerCase();
                                                            const driverName =
                                                                item?.user[0]?.name?.toLowerCase();

                                                            return driverName?.includes(
                                                                searchTerm
                                                            );
                                                        })
                                                            ?.map(
                                                            (
                                                                driver: Driver,
                                                                index: number
                                                            ) => (
                                                                <>
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="col-12 col-lg-6 col-xl-4 mt-3"
                                                                        style={{
                                                                            height: '100%',
                                                                        }}
                                                                    >
                                                                        <DuserCards
                                                                            data={
                                                                                driver
                                                                            }
                                                                        />
                                                                    </div>
                                                                </>
                                                            )
                                                        )}
                                                </>
                                            )}
                                            {driverFiltered?.Data?.length <
                                                0 && (
                                                <>
                                                    <div className="card-body nodata_img_div d-flex justify-content-center align-items-center mt-5">
                                                        <img
                                                            src={noDataFound}
                                                            className="nodata_img"
                                                            alt="No Data Found"
                                                        />
                                                    </div>
                                                    {/* <div>
                                                    <h1 className="text-center">
                                                        {t(
                                                            'vehicleCard.nodata'
                                                        )}
                                                    </h1>
                                                </div> */}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mb-4 pt-3">
                                        <GlobalPagination
                                            total={total1}
                                            limit={limit1}
                                            activePage={activePage1}
                                            handleLimit={(value: number) =>
                                                setLimit1(value)
                                            }
                                            handleActivePage={(value: number) =>
                                                setActivePage1(value)
                                            }
                                        />
                                    </div>
                                </>
                            ) : (
                                ''
                            )}
                        </div>
                    </div>{' '}
                </div>
            </div>
        </>
    );
};

export default Dashboard;
