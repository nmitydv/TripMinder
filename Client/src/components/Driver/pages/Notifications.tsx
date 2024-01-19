// import React, { useState } from 'react';
// import { useGetAllBookingsByDriverIdQuery } from '../../../redux/services/commonServices';
// import '../styles/Notifications.css';
// // import { useGetAllBookingsByDriverIdQuery } from "../../../redux/services/commonServices";

// import {
//     Modal,
//     Button,
//     Accordion,
//     Row,
//     Col,
// } from 'react-bootstrap';
// import { FaUser } from 'react-icons/fa6';
// import { CiCalendarDate } from 'react-icons/ci';
// import { IoLocation } from 'react-icons/io5';


// function DriverNotifications() {
//     const [showModal, setShowModal] = useState(false);
//     const [showAccordion, setShowAccordion] = useState(true);
//     const [isContentVisible, setContentVisibility] = useState(true);
//     //  const {data,error,isLoading} = useGetAllBookingsByDriverIdQuery('');
//     //  // //(isLoading + 'Lod data');
//     //  // //(data);

//     const complete = () => {
//         setShowAccordion(false);
//         closeModal();
//     };

//     const openModal = () => {
//         setShowModal(true);
//     };

//     const closeModal = () => {
//         setShowModal(false);
//     };

//     const toggleContentVisibility = () => {
//         setContentVisibility((prevVisibility) => !prevVisibility);
//     };
//     return (
//         <>
//             <div
//                 className="overflow-auto cards_container mt-3 px-3"
//                 id="card_ctn"
//                 style={{
//                     maxWidth: '100%',
//                     minHeight: '80vh',
//                     maxHeight: '100vh',
//                 }}
//             >
//                 <Row className=" mt-2">
//                     <Col sm={12} md={12}>
//                         {showAccordion && (
//                             <Accordion>
//                                 <Accordion.Item eventKey="0">
//                                     <Accordion.Header
//                                         className="custom-accordion-header"
//                                         onClick={toggleContentVisibility}
//                                     >
//                                         <div>
//                                             <img
//                                                 // src={user}
//                                                 height={30}
//                                                 width={30}
//                                                 className="img-fluid user-image-notification"
//                                             />
//                                             <span className="user-image-text">
//                                                 {isContentVisible
//                                                     ? 'You have a new book request for Jayprakash from goula.'
//                                                     : ''}
//                                             </span>
//                                         </div>
//                                     </Accordion.Header>
//                                     <Accordion.Body>
                                        
//                                             <h5>Hii Jayprakash Gurjar</h5>
//                                             <h6>
//                                                 You have a new book request by{' '}
//                                             </h6>
//                                             <div >
//                                             <p className='main_text'>
//                                                     <FaUser /> 
//                                                     UserName :
                                                
//                                                 Jayprakash Gurjar</p>
//                                             <p className='main_text'>
                                               
                                                
//                                                     <IoLocation /> Picuup 
//                                                     Locations :
                                                
//                                                  Handiya
//                                             </p>
//                                             <p className='main_text'>
                                                
//                                                     <IoLocation /> Droup 
//                                                     Locations :
                                                
//                                                 Harda
//                                             </p>
//                                             <p className='main_text'>
//                                             <CiCalendarDate /> 
//                                              Joining Date :
//                                          14-08-2023</p>
//                                         <p className='main_text'>
//                                             <CiCalendarDate />
//                                             Drop Date :
//                                         16-08-2023</p>

//                                             <div className="d-flex justify-content-end">
//                                                 <div
//                                                     className="btn save-button bg-info"
//                                                     onClick={complete}
//                                                 >
//                                                     Accept
//                                                 </div>
//                                                 <div
//                                                     className="btn reject-button bg-info"
//                                                     onClick={openModal}
//                                                 >
//                                                     Reject
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </Accordion.Body>
//                                 </Accordion.Item>
//                             </Accordion>
//                         )}

//                         <Modal show={showModal} onHide={closeModal} centered>
//                             <Modal.Header closeButton>
//                                 <Modal.Title>
//                                     Please share your reason for rejecting the
//                                     booking request
//                                 </Modal.Title>
//                             </Modal.Header>
//                             <Modal.Body>
//                                 <form>
//                                     <div className="form-group">
//                                         <label
//                                             htmlFor="message-text"
//                                             className="col-form-label"
//                                         >
//                                             Message:
//                                         </label>
//                                         <textarea
//                                             className="form-control"
//                                             id="message-text"
//                                         ></textarea>
//                                     </div>
//                                 </form>
//                             </Modal.Body>
//                             <Modal.Footer>
//                                 <div className="d-flex justify-content-center align-items-center">
//                                     <Button
//                                         variant="primary"
//                                         onClick={complete}
//                                     >
//                                         Confirm Reject
//                                     </Button>
//                                 </div>
//                             </Modal.Footer>
//                         </Modal>
//                     </Col>
//                 </Row>
//             </div>
//         </>
//     );
// }

// export default DriverNotifications;


import React from 'react'

function Notifications() {
  return (
    <div>Notifications</div>
  )
}

export default Notifications

