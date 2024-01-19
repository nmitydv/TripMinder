import './styles/Dashboard.css';
import { useEffect, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { FaCar } from 'react-icons/fa';
import { GiSteeringWheel } from 'react-icons/gi';
import { FaUserTie } from 'react-icons/fa';
import PageTabs from '../../common/Page Tabs/pages/PageTabs';
import { vehicleStatus } from '../../../helpers/constants/idConstants';
import { useTranslation } from 'react-i18next';

const AdminDashboard = () => {
    const [t] = useTranslation('global');
    const [activeTab, setActiveTab] = useState('Active');
    const [isTabActive, setIsTabActive] = useState(true);
    const [isTabApproved, setIsTabApproved] = useState(
        vehicleStatus?.requested
    );

    const tabsData = [
        {
            name: 'Vehicles',
            value: 'Requested',
            isActive: true,
            status: vehicleStatus?.requested,
        },
        {
            name: 'Drivers',
            value: 'Rejected',
            isActive: false,
            status: vehicleStatus?.requested,
        },
    ];
    return (
        <div>
            <div className="container-fluid dashboard_ctn_admin">
                <div className="row">
                    <div className="col-md-3">
                        <div className="card-counter primary d-flex justify-content-between ">
                            <div>
                                <span className="count-icon">
                                    <FaUserAlt />
                                </span>
                            </div>
                            <div className="d-block">
                                <div className="count-numbers">812</div>
                                <div className="count-name mt-3">User</div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card-counter danger  d-flex justify-content-between ">
                            <div>
                                <span className="count-icon">
                                    <FaCar />
                                </span>
                            </div>

                            <div className="d-block">
                                <div className="count-numbers">98</div>
                                <div className="count-name mt-3">Vehicles</div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card-counter success d-flex justify-content-between ">
                            <div>
                                <span className="count-icon">
                                    <GiSteeringWheel />
                                </span>
                            </div>
                            <div>
                                <div className="count-numbers">100</div>
                                <div className="count-name mt-3">Driver</div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card-counter info d-flex justify-content-between ">
                            <div>
                                <span className="count-icon">
                                    <FaUserTie />
                                </span>
                            </div>
                            <div>
                                <div className="count-numbers">35</div>
                                <div className="count-name mt-3">Owners</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div
                    className="col-9 mt-3"
                    style={{ borderRight: '2px dashed #D5D7E3' }}
                >
                    Another Data
                    <p>Data</p>
                </div>

                <div className="col-3 mt-3">
                    <PageTabs
                        activeTab={activeTab}
                        handleTabs={(value: string) => setActiveTab(value)}
                        handleIsActive={(value: boolean) =>
                            setIsTabActive(value)
                        }
                        handleStatus={(value: string) =>
                            setIsTabApproved(value)
                        }
                        tabsData={tabsData}
                    />
                    <div
                        className="overflow-auto cards_container mt-3 px-3"
                        id="card_ctn"
                        style={{
                            maxWidth: '100%',
                            minHeight: '66vh',
                            maxHeight: '66vh',
                        }}
                    >
                        <div className="cards">
                            <div className="card-body d-flex justify-content-between ">
                                <div>
                                    <img
                                        className="notification-img"
                                        src="https://cdn.vectorstock.com/i/preview-1x/17/61/male-avatar-profile-picture-vector-10211761.jpg"
                                        alt=".."
                                    />
                                </div>
                                <div>
                                   <div className='notification_name'>Driver_Name</div>
                                    <div className='notification_message mt-1'>You have a Notification</div>
                                </div>
                                <div class="dropdown">
                                    <button
                                        className="btn "
                                        type="button"
                                        id="dropdownMenu2"
                                        data-bs-toggle="dropdown"
                                    >
                                        ...
                                    </button>
                                    <div
                                        className="dropdown-menu"
                                        aria-labelledby="dropdownMenu2"
                                    >
                                        <button
                                            className="dropdown-item"
                                            type="button"
                                        >
                                            View
                                        </button>
                                        <button
                                            className="dropdown-item"
                                            type="button"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            className="dropdown-item"
                                            type="button"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div className="notification_card">
                            <div className=""></div>
                        </div>

                        <div className="card">
                            <div className="card-body"></div>
                        </div>
                      
                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
