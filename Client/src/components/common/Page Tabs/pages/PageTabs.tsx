// import { useState } from 'react';
// import '../styles/PageTabs.css';
// import {
//     appRoles,
//     viewDatatype,
// } from '../../../../helpers/constants/idConstants';
// import AddNewVehicleModal from '../../../Vehicle Owner/pages/AddNewVehicleModal';
// import { useTranslation } from 'react-i18next';
// import { FaTableCellsLarge } from 'react-icons/fa6';
// import { PiCardsBold } from 'react-icons/pi';
// import { useLocation } from 'react-router-dom';

// interface PageTabsProps {
//     activeTab: string;
//     isBlocked: boolean;
//     handleTabs: (value: string) => void;
//     handleIsActive: (value: boolean) => void;
//     handleStatus: (value: string) => void;
//     handleDataView: (value: string) => void;
//     tabsData: {
//         name: string;
//         value: string;
//         isActive: boolean;
//         status: string;
//     }[];
// }

// const PageTabs: React.FC<PageTabsProps> = ({
//     activeTab,
//     isBlocked,
//     handleTabs,
//     tabsData,
//     handleIsActive,
//     handleStatus,
//     handleDataView,
// }) => {
//     const userRole = localStorage.getItem('role');
//     const [addNewShow, setAddNewShow] = useState(false);
//     const location = useLocation().pathname;

//     const [t] = useTranslation('global');

//     return (
//         <>
//             {/* <nav>
//                     <div class="nav nav-tabs mb-3" id="nav-tab" role="tablist">
//                         <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Home</button>
//                         <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</button>
//                         <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Contact</button>
//                     </div>
//                 </nav> */}
//             <div
//                 className={`d-flex align-items-center  ${
//                     userRole === 'Admin' ? 'mt-0' : 'mt-3'
//                 }`}
//                 aria-disabled={isBlocked}
//             >
//                 {userRole === appRoles?.vehicleOwner && (
//                     <div className="me-2">
//                         <button
//                             type="button"
//                             className="add_new_btn"
//                             onClick={() => setAddNewShow(true)}
//                         >
//                             {t('pagetabs.vehicleowner.vehicles.add.name')}
//                         </button>
//                     </div>
//                 )}

//                 <div
//                     className={`tab_container nav nav-tabs d-flex align-items-center justify-content-between`}
//                 >
//                     <div className="d-flex align-items-center  justify-content-evenly w-100">
//                         {tabsData?.map((tab, index) => (
//                             <div
//                                 className="nav-link"
//                                 id="nav-home-tab"
//                                 data-bs-toggle="tab"
//                                 key={index}
//                             >
//                                 <button
//                                     type="button"
//                                     onClick={() => {
//                                         handleTabs(tab.value);
//                                         handleIsActive(tab.isActive);
//                                         handleStatus(tab.status);
//                                     }}
//                                     className={`tab_btn fw-bold ${
//                                         activeTab === t(tab.value)
//                                             ? 'active_tab'
//                                             : ''
//                                     }`}
//                                 >
//                                     {t(tab.name)}
//                                 </button>
//                             </div>
//                         ))}
//                     </div>
//                     {(location === '/admin/users' ||
//                         location === '/admin/owners') && (
//                         <div className="d-flex me-3">
//                             <FaTableCellsLarge
//                                 color={'#5A607F'}
//                                 size={25}
//                                 className="mx-3"
//                                 onClick={() =>
//                                     handleDataView(viewDatatype?.table)
//                                 }
//                                 style={{ cursor: 'pointer' }}
//                             />
//                             <PiCardsBold
//                                 color={'#5A607F'}
//                                 size={25}
//                                 onClick={() =>
//                                     handleDataView(viewDatatype?.card)
//                                 }
//                                 style={{ cursor: 'pointer' }}
//                             />
//                         </div>
//                     )}
//                 </div>
//             </div>
//             <AddNewVehicleModal
//                 show={addNewShow}
//                 onHide={() => setAddNewShow(false)}
//             />
//         </>
//     );
// };

// export default PageTabs;

import { useState } from 'react';
import '../styles/PageTabs.css';
import {
    appRoles,
    viewDatatype,
} from '../../../../helpers/constants/idConstants';
import AddNewVehicleModal from '../../../Vehicle Owner/pages/AddNewVehicleModal';
import { useTranslation } from 'react-i18next';
import { FaTableCellsLarge } from 'react-icons/fa6';
import { PiCardsBold } from 'react-icons/pi';
import { useLocation } from 'react-router-dom';

interface PageTabsProps {
    activeTab: string;
    isBlocked: boolean;
    handleTabs: (value: string) => void;
    handleIsActive: (value: boolean) => void;
    handleStatus: (value: string) => void;
    handleDataView: (value: string) => void;
    dataViewType: string;
    tabsData: {
        name: string;
        value: string;
        isActive: boolean;
        status: string;
    }[];
}

const PageTabs: React.FC<PageTabsProps> = ({
    activeTab,
    isBlocked,
    handleTabs,
    tabsData,
    handleIsActive,
    handleStatus,
    handleDataView,
    dataViewType,
}) => {
    const userRole = localStorage.getItem('role');
    const [addNewShow, setAddNewShow] = useState(false);
    const location = useLocation().pathname;

    const [t] = useTranslation('global');

    return (
        <>
            {/* <nav>
                    <div class="nav nav-tabs mb-3" id="nav-tab" role="tablist">
                        <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Home</button>
                        <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</button>
                        <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Contact</button>
                    </div>
                </nav> */}
            <div
                className={`d-flex align-items-center  ${
                    userRole === 'Admin' ? 'mt-0' : 'mt-3'
                }`}
                aria-disabled={isBlocked}
            >
                <div
                    className={`tab_container nav nav-tabs d-flex align-items-center px-4 justify-content-between`}
                >
                    <div className="d-flex align-items-center justify-content-start mt-2">
                        {tabsData?.map((tab, index) => (
                            <div
                                className={`nav-link ${
                                    tab.value === activeTab ? 'active' : ''
                                }`}
                                id="nav-home-tab"
                                data-bs-toggle="tab"
                                key={index}
                            >
                                <button
                                    type="button"
                                    onClick={() => {
                                        handleTabs(tab.value);
                                        handleIsActive(tab.isActive);
                                        handleStatus(tab.status);
                                    }}
                                    className={`tab_btn fw-bold ${
                                        activeTab === t(tab.value)
                                            ? 'active_tab'
                                            : ''
                                    }`}
                                >
                                    {t(tab.name)}
                                </button>
                            </div>
                        ))}
                    </div>
                    <div>
                        {(location === '/admin/users' ||
                            location === '/admin/owners') && (
                            <div className="d-flex me-3 table-card-view">
                                <div
                                    className={`${
                                        dataViewType === viewDatatype?.table
                                            ? 'table-card-view-active'
                                            : ' '
                                    } p-1`}
                                >
                                    <FaTableCellsLarge
                                        // color={'#5A607F'}
                                        size={25}
                                        className="mx-1"
                                        onClick={() =>
                                            handleDataView(viewDatatype?.table)
                                        }
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                                <div
                                    className={`${
                                        dataViewType === viewDatatype?.card
                                            ? 'table-card-view-active'
                                            : ' '
                                    } p-1`}
                                >
                                    <PiCardsBold
                                        // color={'#5A607F'}
                                        className="mx-1"
                                        size={25}
                                        onClick={() =>
                                            handleDataView(viewDatatype?.card)
                                        }
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    {userRole === appRoles?.vehicleOwner && location === '/vehicle/vehicles' && (
                        <div>
                            <div className="me-2">
                                <button
                                    type="button"
                                    className="add_new_btn"
                                    onClick={() => setAddNewShow(true)}
                                >
                                    {t(
                                        'pagetabs.vehicleowner.vehicles.add.name'
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <AddNewVehicleModal
                show={addNewShow}
                onHide={() => setAddNewShow(false)}
            />
        </>
    );
};

export default PageTabs;
