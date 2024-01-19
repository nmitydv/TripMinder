
// remove DriverDashboard file from this project 


import { Button, Col, Dropdown, Modal, Row } from 'react-bootstrap';
import '../styles/Dashboard.css';
import PageTabs from '../../common/Page Tabs/pages/PageTabs';
import user from '/src/assets/images/user.jpg';
import { SlOptions } from 'react-icons/sl';
import { CiCalendarDate } from 'react-icons/ci';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { useState } from 'react';
import { useGetAllBookingsByDriverIdQuery } from '../../../redux/services/commonServices';
import { useNavigate } from 'react-router';
//  import 'chart.js/auto';
// import {Line } from 'react-chartjs-2';

const DriverDashboard = ({ booking }) => {
    // //(booking);
    const [showModal, setShowModal] = useState(false);
    const userID = localStorage.getItem('userId');
    // //('userID', userID);
    const navigate = useNavigate();
    const openModal = () => {
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
    };

    const onViewClick = () => {
        const userId = '123';
        const url = `/driver/bookings?bookingRequest=pending&userId=${userId}`;
        navigate(url);
    };

    return (
        <>
            <div className="row mt-2">
                <div className="col-8 col-sm-8 col-md-8 border">
                    <h1>Heloo</h1>
                </div>
                <div className="col-4 col-sm-4 col-md-4 border">
                    <div
                        className="overflow-auto cards_container mt-3 px-3"
                        id="card_ctn"
                        style={{
                            maxWidth: '100%',
                            minHeight: '80vh',
                            maxHeight: '66vh',
                        }}
                    >
                        <div className="row notification_main mt-2 pb-2">
                            <div className="col-10 col-sm-10 col-md-10 mt-2">
                                <span className="notification_font">
                                    Jayprakash Gurjar Harda requested form
                                    booking
                                </span>
                                <div className=" d-flex justify-content-between mt-2">
                                    <img
                                        src={user}
                                        alt="user_image"
                                        className="notification_image"
                                    />
                                    <div className="d-flex justify-content-between notification_font">
                                        <span className="date-span">
                                            14-10-2023
                                        </span>
                                        <span className="arrow-span">
                                            <FaLongArrowAltRight />
                                        </span>
                                        <span className="date-span ml-2">
                                            14-10-2023
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-2 col-sm-2 col-md-2">
                                <Dropdown>
                                    <Dropdown.Toggle
                                        id="custom-dropdown-toggle"
                                        className="custom-dropdown-toggle"
                                    >
                                        <SlOptions className="custom-icon" />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className="custom-dropdown-menu">
                                        <Dropdown.Item>Accept</Dropdown.Item>
                                        <Dropdown.Item onClick={openModal}>
                                            Reject
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={onViewClick}>
                                            View
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body"></div>
                        </div>
                        \
                        <div className="card">
                            <div className="card-body"></div>
                        </div>
                        <div className="card">
                            <div className="card-body"></div>
                        </div>
                        <div className="card">
                            <div className="card-body"></div>
                        </div>
                        <div className="card">
                            <div className="card-body"></div>
                        </div>
                        <div className="card">
                            <div className="card-body"></div>
                        </div>
                        <div className="card">
                            <div className="card-body"></div>
                        </div>
                        <div className="card">
                            <div className="card-body"></div>
                        </div>
                        <div className="card">
                            <div className="card-body"></div>
                        </div>
                        <div className="card">
                            <div className="card-body"></div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showModal} onHide={closeModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span className="resont_text">
                            {' '}
                            Please share your reason for rejecting the booking
                            request
                        </span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label
                                htmlFor="message-text"
                                className="col-form-label"
                            >
                                Message:
                            </label>
                            <textarea
                                className="form-control"
                                id="message-text"
                            ></textarea>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex justify-content-center align-items-center">
                        <Button variant="primary">Confirm Reject</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DriverDashboard;
