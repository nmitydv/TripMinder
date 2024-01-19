import '../styles/UserType.css';
// import vehicle_owner from '../../assets/images/vehicle_owner.svg';/
import vehicle_owner from '../../../assets/images/vehicle_owner.svg';
import vehicle_driver from '../../../assets/images/vehicle_driver.svg';
import vehicle_customer from '../../../assets/images/vehicle_customer.svg';

import { useEffect, useRef, useState } from 'react';
import { FaArrowRightLong, FaArrowLeftLong } from 'react-icons/fa6';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { VscCloudUpload } from 'react-icons/vsc';
import * as Yup from 'yup';
import PageLoader from '../../../common/Loaders/Loaders';
import imageCompression from 'browser-image-compression';
import {
    useCreateUserByRoleMutation,
    useGetUserByEmailQuery,
} from '../../../redux/services/authServices';
import AdditionalInfo from '../../Driver/pages/AdditionalInfo';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { formateDateYYYYMMDD } from '../../../helpers/Functions/dateFormaters';
import { useTranslation } from 'react-i18next';
// import { formateDateYYYYMMDD } from '../../../helpers/Functions/dateFormaters';
const UserType = () => {
    const [t] = useTranslation('global');
    const [step, setStep] = useState(1);
    const [role, setRole] = useState<UserRole | undefined>();
    const [sendUserCreate, responce] = useCreateUserByRoleMutation();
    const [showPageLoader, setShowPageLoader] = useState(false);
    const [personlInfo, setPersonlInfo] = useState({} as any);
    const navigate = useNavigate();
    const userEmail = localStorage.getItem('email');
    const [imageData, setImageData] = useState('');
    const fileref = useRef();

    const [drop_value, setValue] = useState('');
    const [toggle, setToggle] = useState();

    const value_drop = (anything) => {
        setValue(anything);
        setToggle(!toggle);
    };

    const handleSubmitChildForm = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Access the child form's imperative methods and submit the form
        document.getElementById('driver_additional_info_btn')?.click();
    };
    const handleSubmitForm = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Access the child form's imperative methods and submit the form
        document.getElementById('personal_info_btn')?.click();
    };
    // // //('User Type Responce', responce);

    const email = localStorage.getItem('email');
    // //(email);
    const {
        data: userData,
        error,
        isLoading: loding,
    } = useGetUserByEmailQuery(email);
    // //(userData);

    enum UserRole {
        CUSTOMER = 'User',
        DRIVER = 'Driver',
        VEHICLE_OWNER = 'VehicleOwner',
    }

    const initialData = {
        name: '',
        email: userEmail,
        location: '',
        gender: '',
        mobileNumber: '',
        role: '',
        profilePicture: '',
        age: null,
    };

    const validate = Yup.object().shape({
        email: Yup.string().email().required(t('usertype.requiredfield')),
        name: Yup.string().required(t('usertype.requiredfield')),
        location: Yup.string().required(t('usertype.requiredfield')),
        // gender: Yup.string().required(t('usertype.requiredfield')),
        mobileNumber: Yup.string().required(t('usertype.requiredfield')),
        age: Yup.number().required(t('usertype.requiredfield')),
        profilePicture: Yup.string().required(t('usertype.requiredfield')),
    });

    const handleSubmit = (val: any) => {
        val.role = role;
        val.gender = drop_value;
        // //('val', val);
        localStorage.setItem('role', role!);
        setPersonlInfo(val);
        if (role === UserRole.DRIVER) {
            setStep(3);
        } else {
            setShowPageLoader(true);
            sendUserCreate(val);
        }
    };

    // const postimage = (event, setFieldValue) => {
    //     const file = event.target.files[0];
    //     const reader = new FileReader();

    //     reader.onload = (e) => {
    //         const base64Image = e?.target?.result;
    //         setFieldValue('profilePicture', base64Image);
    //         // //('WITHOUT COMPRESSION IMAGE SIZE:', base64Image)
    //         setImageData(base64Image);
    //     };
    //     reader.readAsDataURL(file);
    // };

    const postimage = (event, setFieldValue) => {
        let files = event.target.files[0];
        // setLogoName(files.name);
        const options = {
            maxSizeMB: 0.3,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };
        let reader = new FileReader();
        imageCompression(files, options).then((compressedimg) => {
            // // //('coresseding', compressedimg);
            reader.readAsDataURL(compressedimg);
            reader.onload = (e) => {
                setFieldValue('profilePicture', e.target.result);
                setImageData(e.target.result);
                // //('WITH COMPRESSION IMAGE SIZE', e.target.result);
            };
            // reader.readAsDataURL(files);
        });
    };

    useEffect(() => {
        if (responce?.isSuccess && responce?.data) {
            // // //('Inside if condition', responce);
            localStorage.setItem('userId', responce?.data?.data?._id);

            if (role === UserRole.CUSTOMER) {
                setShowPageLoader(false);
                navigate(
                    `/user/dashboard/${formateDateYYYYMMDD(
                        new Date()
                    )}/${formateDateYYYYMMDD(new Date())}`
                );
            } else if (role === UserRole.DRIVER) {
                // navigate('/driver/bookings');
                //    if(!userData?.adharNumber){
                //        navigate('/driver/information')
                //    }
                //    else{
                //      navigate('/driver/dashboard');
                //    }
            } else if (role === UserRole.VEHICLE_OWNER) {
                setShowPageLoader(false);
                navigate('/vehicle/vehicles');
            }
        } else if (responce?.isError) {
            setShowPageLoader(false);
            // alert('Something went wrong');
        }
    }, [handleSubmit, responce]);

    return (
        <>
            <div className="container-fluid d-flex justify-content-center align-items-center type_ctn">
                <div>
                    {step === 1 && (
                        <h1 className="role_head text-center fw-bold pb-5">
                            {t('usertype.heading')}
                        </h1>
                    )}
                    {step === 2 && (
                        <h1 className="role_head text-center fw-bold pb-5">
                            {t('usertype.subheading')}
                        </h1>
                    )}
                    {step === 3 && (
                        <h1 className="role_head text-center fw-bold pb-5">
                            {t('usertype.step3heading')}
                        </h1>
                    )}

                    <div className="d-flex justify-content-center align-items-center form_box_role">
                        {step === 1 && (
                            <div className="col d-flex justify-content-center">
                                <div
                                    className={`role_box d-flex justify-content-center align-items-center ${
                                        role === UserRole.CUSTOMER
                                            ? 'box_active'
                                            : ''
                                    }`}
                                    onClick={() => setRole(UserRole.CUSTOMER)}
                                >
                                    <div className="d-block">
                                        <img
                                            src={vehicle_customer}
                                            className="role_img"
                                            alt="customer"
                                        />
                                        <span className="d-block text-center fw-semibold mb-4 role_txt">
                                            {t('usertype.customer')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                        {step === 1 && (
                            <div className="col d-flex justify-content-center">
                                <div
                                    className={`role_box d-flex justify-content-center align-items-center ${
                                        role === UserRole.VEHICLE_OWNER
                                            ? 'box_active'
                                            : ''
                                    }`}
                                    onClick={() =>
                                        setRole(UserRole.VEHICLE_OWNER)
                                    }
                                >
                                    <div className="d-block">
                                        <img
                                            src={vehicle_owner}
                                            className="role_img"
                                            alt=""
                                        />
                                        <span className="d-block text-center fw-semibold mb-4 role_txt">
                                            {t('usertype.owner')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                        {step === 1 && (
                            <div className="col d-flex justify-content-center">
                                <div
                                    className={`role_box d-flex justify-content-center align-items-center ${
                                        role === UserRole.DRIVER
                                            ? 'box_active'
                                            : ''
                                    }`}
                                    onClick={() => setRole(UserRole.DRIVER)}
                                >
                                    <div className="d-block">
                                        <img
                                            src={vehicle_driver}
                                            className="role_img"
                                            alt=""
                                        />
                                        <span className="d-block text-center fw-semibold mb-4 role_txt">
                                            {t('usertype.driver')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <>
                                <Formik
                                    initialValues={initialData}
                                    onSubmit={handleSubmit}
                                    validationSchema={validate}
                                >
                                    <Form>
                                        <div className="row w-100">
                                            <div className="col-8">
                                                <div className="row">
                                                    <div className="col-6 d-flex flex-column justify-content-lg-start justify-content-center mt-4 position-relative">
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
                                                            {t(
                                                                'usertype.email'
                                                            )}
                                                        </label>
                                                        <div className="err_div mb-3 mt-0">
                                                            <p className="text-danger stu_sign_err pt-1">
                                                                <ErrorMessage name="email" />
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="col-6 d-flex flex-column justify-content-lg-start justify-content-center mt-4 position-relative">
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
                                                            {t('usertype.name')}
                                                        </label>
                                                        <div className="err_div mb-3 mt-0">
                                                            <p className="text-danger stu_sign_err pt-1">
                                                                <ErrorMessage name="name" />
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-6 d-flex flex-column justify-content-lg-start justify-content-center mt-4 position-relative">
                                                        {/* <Field
                                                            type="text"
                                                            className="form-control input__field"
                                                            placeholder=" "
                                                            id="gender"
                                                            name="gender"
                                                        />
                                                        <label
                                                            htmlFor="gender"
                                                            className="lable__box"
                                                        >
                                                            Gender
                                                        </label>
                                                        <div className="err_div mb-3 mt-0">
                                                            <p className="text-danger stu_sign_err pt-1">
                                                                <ErrorMessage name="gender" />
                                                            </p>
                                                        </div> */}

                                                        <div className="dropdown__bunddle">
                                                            <div className="d-flex justify-content-center">
                                                                <Field
                                                                    type="text"
                                                                    id="gender"
                                                                    placeholder=" "
                                                                    value={
                                                                        drop_value
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        setValue(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        );
                                                                    }}
                                                                    className="form-control input__field"
                                                                    onFocus={() =>
                                                                        setToggle(
                                                                            !toggle
                                                                        )
                                                                    }
                                                                />
                                                                <label
                                                                    htmlFor="Industry"
                                                                    className="lable__box dropdown__lable"
                                                                >
                                                                    {t(
                                                                        'usertype.gender'
                                                                    )}
                                                                </label>

                                                                <span
                                                                    onClick={() => {
                                                                        setToggle(
                                                                            !toggle
                                                                        );
                                                                    }}
                                                                    className="dropdown__button"
                                                                >
                                                                    {toggle ? (
                                                                        <BsChevronUp />
                                                                    ) : (
                                                                        <BsChevronDown />
                                                                    )}
                                                                </span>
                                                            </div>
                                                            {toggle && (
                                                                <div className="dropdown__option">
                                                                    <div
                                                                        className="option_li"
                                                                        onClick={() => {
                                                                            value_drop(
                                                                                'Male'
                                                                            );
                                                                        }}
                                                                    >
                                                                        {t(
                                                                            'usertype.male'
                                                                        )}
                                                                    </div>
                                                                    <div
                                                                        className="option_li"
                                                                        onClick={() => {
                                                                            value_drop(
                                                                                'Female'
                                                                            );
                                                                        }}
                                                                    >
                                                                        {t(
                                                                            'usertype.female'
                                                                        )}
                                                                    </div>
                                                                    <div
                                                                        className="option_li"
                                                                        onClick={() => {
                                                                            value_drop(
                                                                                'Other'
                                                                            );
                                                                        }}
                                                                    >
                                                                        {t(
                                                                            'usertype.other'
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="col-6 d-flex flex-column justify-content-lg-start justify-content-center mt-4 position-relative">
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
                                                            {t('usertype.age')}
                                                        </label>
                                                        <div className="err_div mb-3 mt-0">
                                                            <p className="text-danger stu_sign_err pt-1">
                                                                <ErrorMessage name="age" />
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-6 d-flex flex-column justify-content-lg-start justify-content-center mt-4 position-relative">
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
                                                            {t(
                                                                'usertype.mobile'
                                                            )}
                                                        </label>
                                                        <div className="err_div mb-3 mt-0">
                                                            <p className="text-danger stu_sign_err pt-1">
                                                                <ErrorMessage name="mobileNumber" />
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="col-6 d-flex flex-column justify-content-lg-start justify-content-center mt-4 position-relative">
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
                                                            {t(
                                                                'usertype.location'
                                                            )}
                                                        </label>
                                                        <div className="err_div mb-3 mt-0">
                                                            <p className="text-danger stu_sign_err pt-1">
                                                                <ErrorMessage name="location" />
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-4 d-flex justify-content-center align-items-center ps-3">
                                                <div
                                                    className="image_box d-flex justify-content-center align-items-center"
                                                    onClick={() => {
                                                        fileref?.current?.click();
                                                    }}
                                                >
                                                    {imageData.length <= 0 ? (
                                                        <div>
                                                            <VscCloudUpload
                                                                size={130}
                                                                color="#5A607F"
                                                            />
                                                            <div className="text-center upload_txt fw-bold">
                                                            {t(
                                                                'usertype.uploadprofile'
                                                            )}
                                                                {/* Upload Profile */}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <img
                                                            src={imageData}
                                                            alt=""
                                                            height={'220px'}
                                                            width={'190px'}
                                                            style={{
                                                                borderRadius:
                                                                    '14px',
                                                            }}
                                                        />
                                                    )}
                                                </div>

                                                <Field name="bookImage">
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
                                            <button
                                                type="submit"
                                                className="d-none"
                                                id="personal_info_btn"
                                            >
                                                {t('usertype.submit')}
                                            </button>
                                        </div>
                                    </Form>
                                </Formik>
                            </>
                        )}

                        {step === 3 && UserRole.DRIVER && (
                            <AdditionalInfo
                                personlInfo={personlInfo}
                                setShowPageLoader={setShowPageLoader}
                                sendUserCreate={sendUserCreate}
                                responce={responce}
                            />
                        )}
                    </div>

                    <div className="d-flex align-items-center dot_div">
                        <div className="col-4">
                            <div></div>
                        </div>
                        <div className="d-flex justify-content-center col-4">
                            <div
                                className={`progress_dot mx-2 ${
                                    step === 1 ? 'active_dot' : ''
                                }`}
                                onClick={() => setStep(1)}
                            ></div>
                            <div
                                className={`progress_dot mx-2 ${
                                    step === 2 ? 'active_dot' : ''
                                }`}
                                onClick={() => setStep(2)}
                            ></div>
                            {role === UserRole.DRIVER && (
                                <div
                                    className={`progress_dot mx-2 ${
                                        step === 3 ? 'active_dot' : ''
                                    }`}
                                    // onClick={() => setStep(3)}
                                ></div>
                            )}
                        </div>
                        <div className="d-flex col-4 justify-content-end pe-3">
                            <button
                                disabled={step === 1 ? true : false}
                                style={{
                                    cursor:
                                        step === 1 ? 'not-allowed' : 'pointer',
                                }}
                                type="button"
                                className="back_btn d-flex me-5 fw-bold align-items-center"
                                onClick={() => setStep(step - 1)}
                            >
                                <FaArrowLeftLong className="me-2" />{' '}
                                {t('usertype.back')}
                            </button>
                            {step === 1 && (
                                <button
                                    type="button"
                                    className="continue_btn fw-bold"
                                    onClick={() => setStep(2)}
                                >
                                    {t('usertype.continue')}{' '}
                                    {/* <FaArrowRightLong className="" /> */}
                                </button>
                            )}

                            {step === 2 && (
                                <button
                                    // type="submit"
                                    type="button"
                                    onClick={handleSubmitForm}
                                    className="continue_btn fw-bold d-flex justify-content-center align-items-center"
                                >
                                    {responce?.isLoading ? (
                                        <div
                                            className="spinner-border"
                                            role="status"
                                        >
                                            <span className="visually-hidden">
                                                Loading...
                                            </span>
                                        </div>
                                    ) : role !== UserRole.DRIVER ? (
                                        t('usertype.submit')
                                    ) : (
                                        t('usertype.continue')
                                    )}
                                </button>
                            )}
                            {step === 3 && role === UserRole.DRIVER && (
                                <button
                                    onClick={handleSubmitChildForm}
                                    type="button"
                                    className="continue_btn fw-bold d-flex justify-content-center align-items-center"
                                >
                                    {responce?.isLoading ? (
                                        <div
                                            className="spinner-border"
                                            role="status"
                                        >
                                            <span className="visually-hidden">
                                                Loading...
                                            </span>
                                        </div>
                                    ) : (
                                        t('usertype.submit')
                                    )}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* <div className="d-flex justify-content-center align-items-center mt-5">
                        <button
                            disabled={step === 1 ? true : false}
                            style={{
                                cursor: step === 1 ? 'not-allowed' : 'pointer',
                            }}
                            type="button"
                            className="back_btn me-5 d-flex align-items-center"
                            onClick={() => setStep(step - 1)}
                        >
                            <FaArrowLeftLong className="me-3" />{' '}
                            {t('usertype.back')}
                        </button>
                        {step === 1 && (
                            <button
                                type="button"
                                className="continue_btn fw-bold"
                                onClick={() => setStep(2)}
                            >
                                {t('usertype.continue')}{' '}
                                <FaArrowRightLong className="ms-3" />
                            </button>
                        )}

                        {step === 2 && (
                            <button
                                // type="submit"
                                type="button"
                                onClick={handleSubmitForm}
                                className="continue_btn fw-bold d-flex justify-content-center align-items-center"
                            >
                                {responce?.isLoading ? (
                                    <div
                                        className="spinner-border"
                                        role="status"
                                    >
                                        <span className="visually-hidden">
                                            {t('vehicleCard.loading')}
                                        </span>
                                    </div>
                                ) : role !== UserRole.DRIVER ? (
                                    'Submit'
                                ) : (
                                    'Continue'
                                )}
                            </button>
                        )}
                        {step === 3 && role === UserRole.DRIVER && (
                            <button
                                onClick={handleSubmitChildForm}
                                type="button"
                                className="continue_btn fw-bold d-flex justify-content-center align-items-center"
                            >
                                {responce?.isLoading ? (
                                    <div
                                        className="spinner-border"
                                        role="status"
                                    >
                                        <span className="visually-hidden">
                                            {t('vehicleCard.loading')}
                                        </span>
                                    </div>
                                ) : (
                                    'Submit Data'
                                )}
                            </button>
                        )}
                    </div> */}
                </div>
            </div>
            <PageLoader show={showPageLoader} />
        </>
    );
};

export default UserType;
