import Modal from 'react-bootstrap/Modal';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import CardHeader from '../../../common/Card Header/CardHeader';
import * as Yup from 'yup';

import {
    useGetUserByIdQuery,
    useUpdateDriverByDriverIdMutation,
    useUpdateProfileMutation,
} from '../../../redux/services/commonServices';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import './AppNavbar.css';
import { useEffect, useId, useRef, useState } from 'react';
import { imageBaseUrl } from '../../../helpers/constants/idConstants';
import { useTranslation } from 'react-i18next';
// import {
//     // useGetDriverByDriverIdQuery,
//     // useUpdateDriverByDriverIdMutation,
// } from '../../../redux/services/driverServices';
import { CgRowLast } from 'react-icons/cg';
import { FaCamera } from 'react-icons/fa6';
import PageLoader, { CarLoaderModal } from '../../../common/Loaders/Loaders';
function ProfileEditModal(props) {
    const [t] = useTranslation('global');
    const [imageData, setImageData] = useState('');
    const [isProfilePictureUpdated, setProfilePictureUpdated] = useState(false);
    const fileref = useRef();

    const userId = localStorage.getItem('userId');
    const driverId = '732c7212-21c1-4432-bb10-11babe2ccdd2';
    const role = localStorage.getItem('role');
    const [showPageLoader, setShowPageLoader] = useState(false);

    // //(userId);
    const {
        data: userData,
        // error: userError,
        // isLoading: userLoading,
    } = useGetUserByIdQuery(userId);

    // const {
    //     data: driverData,
    //     error: errormsg,
    //     isLoading: driverLoding,
    // } = useGetDriverByDriverIdQuery(driverId);

    if (userData) {
        // //(userData);
    }
    // if (driverData) {
    //     // //('Driver Data', driverData);
    // }

    const [sendUpdate] = useUpdateProfileMutation();
    const [sendUpdateDriver] = useUpdateDriverByDriverIdMutation();

    // const [formData, setFormData] = useState({
    //     dayWisePrice: driverData?.data?.dayWisePrice,
    //     experience: driverData?.data?.experience,
    //     vehicleType: driverData?.data?.vehicleType,

    // });

    const initialData = {
        name: userData?.data?.name,
        email: userData?.data?.email,
        location: userData?.data?.location,
        gender: userData?.data?.gender,
        mobileNumber: userData?.data?.mobileNumber,
        profilePicture: userData?.data?.profilePicture,
        age: userData?.data?.age,
        // dayWisePrice: driverData?.data?.dayWisePrice,
        // experience: driverData?.data?.experience,
        // vehiclesType: driverData?.data?.vehiclesType,
    };

    const validate = Yup.object().shape({
        // email: Yup.string().email().required('Requiredd field!'),

        name: Yup.string().required(t('editprofile.namevalidation')),
        // name: Yup.string().required('Name is Requiredd field!'),
        location: Yup.string().required(t('editprofile.locationvalidation')),
        // location: Yup.string().required('Location is Requiredd field!'),
        gender: Yup.string().required(t('editprofile.gendervalidation')),
        // gender: Yup.string().required('Gender Requiredd field!'),
        mobileNumber: Yup.string().required(t('editprofile.contactvalidation')),
        // mobileNumber: Yup.string().required('MobileNumber Requiredd field!'),
        age: Yup.number().required(t('editprofile.agevalidation')),
        // age: Yup.number().required('Age Required field!'),
        //  dayWisePrice: Yup.number().required('dayWisePrice is required!'),
        // experience:Yup.number().required('experience is required field!'),
        // vehicleType:Yup.number().required('vehicleType is required field!')

        // dayWisePrice: Yup.number(),
        // experience:Yup.number(),
        // vehiclesType:Yup.number(),
    });

    const submitData = async (val: {
        // dayWisePrice: any;
        // vehiclesType: any;
        // experience: any;
        // email: any;
        // age: any;
        // gender: any;
        // mobileNumber: any;
        // name: any;
        // location: any;
        // driverId: string | null;
        userId: string | null;
    }) => {
        // //('Form submitted with values:', val);
        // val.userId = userId;
        try {
            setShowPageLoader(true);
            // sendUpdate(val);
            // // //('Profile updated successfully!');
            // props?.onHide();
            // Swal.fire('Success', 'Profile updated successfully!', 'success');

            //    const updatedUserData = {
            //     email:val.email,
            //     name:val.name,
            //     location:val.location,
            //     gender:val.gender,
            //     mobileNumber:val.mobileNumber,
            //     age:val.age,
            //     // userId:val.userId,
            //    }

            //    const updatedDriverData = {
            //     dayWisePrice:val.dayWisePrice,
            //     experience:val.experience,
            //     vehiclesType:val.vehiclesType,

            //    }

            // if (role === 'Driver') {
            // val.driverId = driverId;
            // val.userId = userId;

            //  const updateData = {
            //     dayWisePrice:val.dayWisePrice,
            //     experience:val.experience,
            //     vehiclesType:val.vehiclesType,

            //  }
            // const response = await sendUpdateDriver({
            //     driverId:driverId,
            //     ...updateData,
            // });
            // const responseUser = await sendUpdate(val);
            // const responseDriver = await sendUpdateDriver(val);

            //     const responseUser = await sendUpdate(updatedUserData);
            //     const responseDriver = await sendUpdateDriver(updatedDriverData);

            //     if (responseUser?.data?.statusCode === 200 &&  responseDriver?.data?.statusCode === 200 ) {
            //         props?.onHide();
            //         Swal.fire(
            //             t('popupstatus.heading'),
            //             t('popupstatus.subheading'),
            //             'success'
            //         );
            //     }
            //     if (responseUser?.data?.statusCode === 200 || responseDriver?.data?.statusCode === 200 ) {
            //         Swal.fire(
            //             'Error',
            //             'Failed to update profile. Please try again later.',
            //             'error'
            //         );
            //     }
            // } else {
            val.userId = userId;
            const response = await sendUpdate(val);
            // const response = await sendUpdate(updatedUserData);

            if (response?.data?.statusCode === 200) {
                setShowPageLoader(false);
                props?.onHide();
                Swal.fire({
                    title: t('popupstatus.heading'),
                    text: t('popupstatus.subheading'),
                    confirmButtonText : t('popupstatus.okbtn'),
                    icon: 'success',
                    showClass: {
                        popup: `
                      animate__animated
                      animate__fadeInUp
                      animate__faster
                    `,
                    },
                    hideClass: {
                        popup: `
                      animate__animated
                      animate__fadeOutDown
                      animate__faster
                    `,
                    },
                });
            }
            if (response?.data?.statusCode === 400) {
                Swal.fire(
                    t('popupstatus.heading2'),
                    t('popupstatus.subheading2'),
                    'error'
                );
            }
            if (response?.data?.statusCode === 500) {
                Swal.fire(
                    t('popupstatus.heading2'),
                    t('popupstatus.subheading2'),

                    'error'
                );
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            Swal.fire(
                t('popupstatus.heading2'),
                t('popupstatus.subheading2'),
                'error'
            );
        }
    };

    const postimage = (event, setFieldValue) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const base64Image = e?.target?.result;
            setFieldValue('profilePicture', base64Image);
            setImageData(base64Image);
            setProfilePictureUpdated(true);
        };
        reader.readAsDataURL(file);
    };

    const queryParams = new URLSearchParams(useLocation().search);

    return (
        <>
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <div className="main_modal">
                    <Modal.Body className="">
                        <CardHeader
                            onClose={() => props?.onHide()}
                            title={t('editprofile.heading')} // title={''}
                        />

                        <div className="mt-3">
                            <Formik
                                initialValues={initialData}
                                onSubmit={submitData}
                                validationSchema={validate}
                            >
                                <Form>
                                    {/* <div className='row'>
                    <div className='col-12 d-flex justify-content-between'>
                          
                 <div className='edit_profile_text'>Your Profile</div>
                  
                  <div className=' d-inline d-flex justify-content-end align-items-center mb-3'> */}
                                    {/* <img
                            src={`${imageBaseUrl}${userData?.data?.profilePicture}`}
                            alt="_Profile" className='profile_image_edit border'
                        />   */}

                                    {/* <div onClick={() => fileref?.current?.click()}>
                                            <img
                                                src={imageData || `${imageBaseUrl}${userData?.data?.profilePicture}`}
                                                alt="_Profile"
                                                className='profile_image_edit border'
                                            />
                                            <Field name="profilePicture">
                                                {({ form }) => {
                                                    const { setFieldValue } = form;
                                                    return (
                                                        <input
                                                            className="form-control upload__border input__field"
                                                            ref={fileref}
                                                            type="file"
                                                            onChange={(e) => postimage(e, setFieldValue)}
                                                            hidden
                                                        />
                                                    );
                                                }}
                                            </Field>
                                        </div>
                                               

                            
                                 
                                            
                    </div>
                

                    </div>
                          </div> */}

                                    <div className="row">
                                        <div className="col-6 d-flex justify-content-center">
                                            <div className="d-inline d-flex justify-content-end align-items-center mb-3">
                                                <div
                                                    onClick={() =>
                                                        fileref?.current?.click()
                                                    }
                                                >
                                                    <div className="camera-container ">
                                                        <FaCamera className="camera-icon" />
                                                        <img
                                                            src={
                                                                imageData ||
                                                                `${imageBaseUrl}${userData?.data?.profilePicture}`
                                                            }
                                                            alt="_Profile"
                                                            className="profile_image_edit"
                                                        />
                                                    </div>
                                                    <Field name="profilePicture">
                                                        {({ form }) => {
                                                            const {
                                                                setFieldValue,
                                                            } = form;
                                                            return (
                                                                <input
                                                                    className="form-control upload__border input__field"
                                                                    ref={
                                                                        fileref
                                                                    }
                                                                    type="file"
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        postimage(
                                                                            e,
                                                                            setFieldValue
                                                                        )
                                                                    }
                                                                    hidden
                                                                />
                                                            );
                                                        }}
                                                    </Field>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <div className="col-6 d-flex justify-content-center">
                                        <div className=" d-inline d-flex justify-content-end align-items-center mb-3">
                                            <div
                                                onClick={() =>
                                                    fileref?.current?.click()
                                                }
                                            
                                            >
                                                <img
                                                    // src={
                                                    //     `${imageBaseUrl}${userData?.data?.profilePicture}`
                                                    // }

                                                    // src={
                                                    //     isProfilePictureUpdated
                                                    //         ? imageData
                                                    //         : `${imageBaseUrl}${userData?.data?.profilePicture}`
                                                    // }

                                                    // src={isProfilePictureUpdated ? imageData : `${imageBaseUrl}${userData?.data?.profilePicture}`}

                                                    // src={imageData || `${imageBaseUrl}${userData?.data?.profilePicture}`}
                                                    src={
                                                        imageData ||
                                                        `${imageBaseUrl}${userData?.data?.profilePicture}`
                                                    }
                                                    alt="_Profile"
                                                    className="profile_image_edit"
                                                />
                                                <Field name="profilePicture">
                                                    {({ form }) => {
                                                        const {
                                                            setFieldValue,
                                                        } = form;
                                                        return (
                                                            <input
                                                                className="form-control upload__border input__field"
                                                                ref={fileref}
                                                                type="file"
                                                                onChange={(e) =>
                                                                    postimage(
                                                                        e,
                                                                        setFieldValue
                                                                    )
                                                                }
                                                                hidden
                                                            />
                                                        );
                                                    }}
                                                </Field>
                                            </div>
                                        </div>
                                    </div> */}

                                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 d-flex flex-column justify-content-lg-start justify-content-center mt-4 position-relative">
                                            <Field
                                                type="text"
                                                className="form-control input__field"
                                                placeholder=" "
                                                id="email"
                                                name="email"
                                                readOnly={true}
                                            />
                                            <label
                                                htmlFor="name"
                                                className="lable__box"
                                            >
                                                {t('editprofile.email')}
                                            </label>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-sm-6 col-md-6 d-flex flex-column justify-content-lg-start justify-content-center mt-4 position-relative">
                                            <Field
                                                type="text"
                                                className="form-control input__field"
                                                placeholder=" "
                                                id="name"
                                                name="name"
                                            />
                                            <label
                                                htmlFor="name"
                                                className="lable__box"
                                            >
                                                {t('editprofile.name')}
                                            </label>
                                            <div className="err_div mb-3 mt-0">
                                                <p className="text-danger stu_sign_err pt-1">
                                                    <ErrorMessage name="name" />
                                                </p>
                                            </div>
                                        </div>

                                        <div className="col-12 col-sm-6 col-md-6 d-flex flex-column justify-content-lg-start justify-content-center mt-4 position-relative">
                                            <Field
                                                type="text"
                                                className="form-control input__field"
                                                placeholder=" "
                                                id="mobileNumber"
                                                name="mobileNumber"
                                            />
                                            <label
                                                htmlFor="mobileNumber"
                                                className="lable__box"
                                            >
                                                {t('editprofile.mobile')}
                                            </label>
                                            <div className="err_div mb-3 mt-0">
                                                <p className="text-danger stu_sign_err pt-1">
                                                    <ErrorMessage name="mobileNumber" />
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row ">
                                        <div className="col-12 col-sm-6 col-md-6 d-flex flex-column justify-content-lg-start justify-content-center mt-4 position-relative">
                                            <Field
                                                type="number"
                                                className="form-control input__field"
                                                placeholder=" "
                                                id="age"
                                                name="age"
                                            />
                                            <label
                                                htmlFor="age"
                                                className="lable__box"
                                            >
                                                {t('editprofile.age')}
                                            </label>
                                            <div className="err_div mb-3 mt-0">
                                                <p className="text-danger stu_sign_err pt-1">
                                                    <ErrorMessage name="age" />
                                                </p>
                                            </div>
                                        </div>

                                        {/* <div className="col-12 col-sm-6 col-md-6 d-flex flex-column justify-content-lg-start justify-content-center mt-4 position-relative">
                                        <Field
                                            type="text"
                                            className="form-control input__field"
                                            placeholder=" "
                                            id="gender"
                                            name="gender"
                                        />
                                        <label
                                            htmlFor=" gender"
                                            className="lable__box"
                                        >
                                            {t('editprofile.gender')}
                                        </label>
                                        <div className="err_div mb-3 mt-0">
                                            <p className="text-danger stu_sign_err pt-1">
                                                <ErrorMessage name="gender" />
                                            </p>
                                        </div>
                                    </div> */}

                                    <div className="col-12 col-sm-6 col-md-6 d-flex flex-column justify-content-lg-start justify-content-center mt-4 position-relative">
                                        <Field
                                            as="select" // Change the input type to "select"
                                            className="form-select input__field" // Use "form-select" class for styling
                                            id="gender"
                                            name="gender"
                                        >
                                            <option value="" disabled>
                                                Select Gender
                                            </option>
                                            <option value="male">Male</option>
                                            <option value="female">
                                                Female
                                            </option>
                                        </Field>
                                        <label
                                            htmlFor="gender"
                                            className="lable__box"
                                        >
                                            {t('editprofile.gender')}
                                        </label>
                                        <div className="err_div mb-3 mt-0">
                                            <p className="text-danger stu_sign_err pt-1">
                                                <ErrorMessage name="gender" />
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                    <div className="row ">
                                        <div className="col-12  col-sm-12 col-md-12 d-flex flex-column justify-content-lg-start justify-content-center mt-4 position-relative">
                                            <Field
                                                type="text"
                                                className="form-control input__field"
                                                placeholder=" "
                                                id="location"
                                                name="location"
                                            />
                                            <label
                                                htmlFor="location"
                                                className="lable__box"
                                            >
                                                {t('editprofile.location')}
                                            </label>
                                            <div className="err_div mb-3 mt-0">
                                                <p className="text-danger stu_sign_err pt-1">
                                                    <ErrorMessage name="location" />
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className="row">
                                <div className="col-12 col-sm-6 col-md-6 d-flex flex-column justify-content-lg-start justify-content-center mt-4">
                                    <button className="update_profile">
                                        {t('editprofile.updateprofile')}
                                    </button>
                                </div> */}
                                    {/* <div>
                                    <>
                                    {role==='Driver' && (
                                        <div className="col-12 col-sm-6 col-md-6 d-flex flex-column justify-content-lg-start justify-content-center mt-4 position-relative">
                                        <Field
                                            type="number"
                                            className="form-control input__field"
                                            placeholder="vehicleType"
                                            id="vehicleType"
                                            name="experience"
                                        />
                                        <label htmlFor="vehicleType" className="lable__box">
                                            {t('editprofile.dayWisePrice')}
                                        </label>
                                        <div className="err_div mb-3 mt-0">
                                            <p className="text-danger stu_sign_err pt-1">
                                                <ErrorMessage name="vehicleType" />
                                            </p>
                                        </div>
                                    </div>
                                    
                                    )}
                                    </>
                                </div> */}

                                    <div className="row">
                                        {/* {role === 'Driver' ? (
                                        <>
                                            <div className="col-12 col-sm-6 col-md-6 d-flex flex-column justify-content-lg-start justify-content-center mt-4 position-relative">
                                                <Field
                                                    type="number"
                                                    className="form-control input__field"
                                                    placeholder="vehiclesType"
                                                    id="vehiclesType"
                                                    name="vehiclesType"
                                                />
                                                <label
                                                    htmlFor="vehiclesType"
                                                    className="lable__box"
                                                >
                                                    {t(
                                                        'editprofile.vehiclesTyp'
                                                    )}
                                                </label>
                                                <div className="err_div mb-3 mt-0">
                                                    <p className="text-danger stu_sign_err pt-1">
                                                        <ErrorMessage name="vehiclesType" />
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="col-12 col-sm-6 col-md-6 d-flex flex-column justify-content-lg-start justify-content-center mt-4">
                                                <button className="update_profile">
                                                    {t(
                                                        'editprofile.updateprofile'
                                                    )}
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="col-12 col-sm-6 col-md-6 d-flex flex-column justify-content-lg-start justify-content-center mt-4">
                                            <button
                                                type="submit"
                                                className="update_profile"
                                            >
                                                {t('editprofile.updateprofile')}
                                            </button>
                                        </div>
                                    )} */}

                                        <div className="col-12 col-sm-6 col-md-6 d-flex flex-column justify-content-lg-start justify-content-center mt-4">
                                            <button className="update_profile">
                                                {t('editprofile.updateprofile')}
                                            </button>
                                        </div>
                                    </div>

                                    {/* <div className="col-12 col-sm-6 col-md-6 d-flex flex-column justify-content-lg-start justify-content-center mt-4">
                                    <button className="update_profile">
                                        {t('editprofile.updateprofile')}
                                    </button>
                                </div> */}
                                    {/* </div> */}
                                </Form>
                            </Formik>
                        </div>
                    </Modal.Body>
                </div>
            </Modal>
            <PageLoader show={showPageLoader} />{' '}
        </>
    );
}

export default ProfileEditModal;
