import PageTabs from '../../common/Page Tabs/pages/PageTabs';
import VehicleCard from '../../common/Cards/Owner Vehicle/pages/VehicleCard';
import { useEffect, useState } from 'react';
import { CarAnimation, ContentLoader } from '../../../common/Loaders/Loaders';
import { useNavigate } from 'react-router-dom';
import { vehicleStatus } from '../../../helpers/constants/idConstants';
import type { Vehicle } from '../../../helpers/types/apiDataTypes';
// import { useGetAllVehiclesByOwnerIdQuery } from '../../../redux/services/vehicleOwnerServices';
import { vehicleOwnerVehicleTabs } from '../../../helpers/constants/tabsData';
import noDataFound from '../../../assets/images/no-data-found.svg';
// import AddNewVehicleModal from './AddNewVehicleModal';
import { useTranslation } from 'react-i18next';
import { useGetAllVehiclesByOwnerIdQuery } from '../../../redux/services/commonServices';

const OwnerVehicles = () => {
    const [t] = useTranslation('global');
    const userId = localStorage.getItem('userId');
    const lang = localStorage.getItem('language');

    const [activeTab, setActiveTab] = useState(
        vehicleOwnerVehicleTabs[0]?.value
    );
    const [isTabActive, setIsTabActive] = useState(true);
    const [isTabApproved, setIsTabApproved] = useState(vehicleStatus?.approved);

    const {
        data: vehiclesData,
        isLoading,
        refetch,
    } = useGetAllVehiclesByOwnerIdQuery({
        userId: userId ?? '',
        isActive: isTabActive,
        isApprove: isTabApproved,
    });

    const navigate = useNavigate();

    useEffect(() => {
        const params = {
            tab: activeTab,
            isActive: isTabActive.toString(),
            isApprove: isTabApproved,
        };
        const searchParams = new URLSearchParams(params);
        const options = {
            pathname: '/vehicle/vehicles',
            search: `?${searchParams.toString()}`,
        };
        navigate(options, { replace: true });
    }, [activeTab, isTabActive, isTabApproved, lang]);

    useEffect(() => {
        refetch();
    }, [activeTab]);

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div
                        className="col-12"
                        style={{ borderRight: '2px dashed #D5D7E3' }}
                    >
                        <div className="data_main_ctn owner_vehicle_ctn">
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
                                tabsData={vehicleOwnerVehicleTabs}
                            />
                            <div
                                className="overflow-auto cards_container owner_vehicle_inner_ctn px-3 mx-2 py-3"
                                id="card_ctn"
                                style={{
                                    maxWidth: '100%',
                                    minHeight: 'calc(100vh - 170px)',
                                    maxHeight: 'calc(100vh - 170px)',
                                }}
                            >
                                {/* {vehiclesData && vehiclesData.data.length > 0 && (
                                <>
                                    {vehiclesData?.data?.map(
                                        (vehicle: Vehicle) => (
                                            <>
                                                <VehicleCard data={vehicle} />
                                            </>
                                        )
                                    )}
                                </>
                            )} */}
                                <div className="row d-flex justify-content-start">
                                    {vehiclesData &&
                                        vehiclesData.data.length > 0 && (
                                            <>
                                                {vehiclesData?.data?.map(
                                                    (vehicle, index) => (
                                                        <>
                                                            <div
                                                                className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-3 mb-3"
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
                                    vehiclesData &&
                                    vehiclesData?.data?.length <= 0 && (
                                        <>
                                            <div className="card-body nodata_img_div d-flex justify-content-center align-items-center mt-5">
                                                <img
                                                    src={noDataFound}
                                                    className="nodata_img"
                                                    alt="No Vehicles Found"
                                                />
                                            </div>
                                            {/* <div>
                                            <h1 className="text-center">
                                                {t('createvehicle.nodata')}
                                            </h1>
                                        </div> */}
                                        </>
                                    )}
                            </div>
                        </div>
                    </div>
                    {/* <div className="col-3">
                        <h1>Filters</h1>
                    </div> */}
                </div>
            </div>
            {/* <AddNewVehicleModal
                show={addNewShow}
                onHide={() => setAddNewShow(false)}
            /> */}
        </>
    );
};

export default OwnerVehicles;
