// import * as Icon from 'react-bootstrap-icons';
// import Button from 'react-bootstrap/Button';
// import Collapse from 'react-bootstrap/Collapse';
// import { useState } from 'react';


// import './style.css'
// import carImage from '../../../assets/IMG-20231103-WA0003.jpg';
// function Cards() {

//   const [open, setOpen] = useState(null);

//   const handleToggle = (index:any) => {
//     setOpen((prevIndex) => (prevIndex === index ? null : index));
//   };

//   const { data: vData, isLoading, isError, isSuccess, error } = useGetAllActiveVehiclesQuery({ isActive: 'true,false' });
//   // //('......vData', vData)

//   // //("loading....", isLoading);
//   // //("erroris....", isError);
//   // //("success....", isSuccess);
//   // //("error....", error);
//   return (
//     <>
//        {
//          vData?.data.map((Data: any, index:number) => {
//            return (
//              <>
//              <div className='d-flex position-relative mx-3 my-3'>
//                {/* style={{ height: 200 }} */}
//                <div className='card bg-info shadow p-2 bg-body-tertiary rounded col-8  flex-column' >
//                 <div className='d-flex col-12 '>
//                    <div className='col-md-4 d-flex justify-content-center flex-column  align-items-center'><img src={carImage} alt='........' className='img-fluid h-75 w-75' />
//                   </div>
//                    {/* className='position-absolute top-100  col-8' */}
//                    <div className='col-md-8 d-flex'>
      
//                      <div className='d-flex col-12 flex-column'>
//                        <div className=''>
//                          <p className='card-title mt-3'><h2>{Data.vehicleName}</h2></p>
//                          <p className='card-title mt-1'><h5>{Data.modelNumber}</h5></p>
//                        </div>
      
//                        <div className='d-flex row'>
//                          <div className='d-flex flex-row align-items-center justify-content-between'>
//                            <div className='first_box d-flex justify-content-center flex-column  align-items-center'>
//                              <Icon.Speedometer2 />
//                              <h6>{Data.vehicleType}</h6>
//                            </div>
      
//                            <div className='first_box d-flex justify-content-center flex-column  align-items-center'>
//                            <Icon.Speedometer2 />
//                             <h6>{Data.seaters}</h6>
//                          </div>
      
//                         <div className='first_box d-flex justify-content-center flex-column  align-items-center'>
//                              <Icon.Speedometer2 />
//                              <h6>KM/Price</h6>
//                            </div>
                          
                         
//                            <div className='d-flex justify-content-center align-items-center'>
      
//                                    <Button
//                               onClick={() => handleToggle(index)}
//                               aria-controls={`example-collapse-text${index}`}
//                               aria-expanded={open===index}
//                             >
//                               View More specification
//                             </Button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                    </div>
//                  </div>
//                  <div className='d-flex justify-content-end align-items-center'>
//                    <Button>Book Now</Button>
//                 </div>
      
//               <Collapse in={open===index} >
//                      <div id={`example-collapse-text${index}`} >
//                        <div className='col-8 d-flex'>
//                          <div className='d-flex justify-content-center align-items-center'>
//                            <div><p>All Specification</p></div>
//                            <div><p>Image Galary</p></div>
//                            <div><p>Features</p></div>
//                            <div><p>Update</p></div>
//                          </div>
//                        </div>
//                      </div>
//                    </Collapse>
//                </div>
      
// //               {/* <Collapse in={open} >
// //                 <div id="example-collapse-text" className='position-absolute top-100  col-8'>
// //                   Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
// //                   terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
// //                   labore wes anderson cred nesciunt sapiente ea proident.
// //                 </div>
// //               </Collapse> */}
      
// //               {/* <div className='col-4'>
// //                 <div className='card'>
// //                   <h3 className='card-title'>Card filter</h3>
// //                 </div>
// //               </div> */}
//              </div>
//            </>
//           )
//           }
//         )       }
//      </>
//    )
//  }
//  export default Cards