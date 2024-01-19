import { Field, Formik, Form, ErrorMessage } from 'formik';
import '../styles/login.css';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../../context/Firebase/Firebase';
import * as Yup from 'yup';
// import loginImage from './../../assets/confirmed-concept-illustration_114360-416.avif';

import PageLoader from '../../common/Loaders/Loaders';
import { useState } from 'react';
import { API_BASE_URL, ApiUrls } from '../../helpers/constants/apiConstants';
// import logo from '../../assets/Logo.jpg';
import logogoogle from '../../assets/google.png';
import { appRoles } from '../../helpers/constants/idConstants';
import { GoogleAuthProvider } from 'firebase/auth';
import logo from '../../assets/images/apna_yatri_logo.svg';
import { formateDateYYYYMMDD } from '../../helpers/Functions/dateFormaters';
// import { FaEye, FaEyeSlash } from 'react-icons/fa6';
// import { VscKey } from 'react-icons/vsc';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
// import { ContentLoader } from '../../common/Loaders/Loaders';

const Login = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();
    const [t] = useTranslation('global');
    const [showPageLoader, setShowPageLoader] = useState(false);
    // const [showPassword, setShowPassword] = useState(false);
    interface loginTypes {
        email: string;
        password: string;
    }

    const initialData: loginTypes = {
        email: '',
        password: '',
    };

    const validate = Yup.object().shape({
        email: Yup.string()
            .email(t('login2.msg'))
            .required(t('login.emailrequired')),
        password: Yup.string()
            .required(t('login.passwordrequired'))
            .min(4, t('login.passwordrequired')),
    });

    const handleSubmit = (val: loginTypes) => {
        setShowPageLoader(true);
        firebase
            ?.signInUserWithEmailPassword(val?.email, val?.password)
            .then((value: any) => {
                // //('value', value);
                localStorage.setItem('token', value?.user?.accessToken);
                localStorage.setItem(
                    'refreshToken',
                    value?._tokenResponse?.refreshToken
                );
                localStorage.setItem('email', value?.user?.email);

                const apiUrl = `${API_BASE_URL}${ApiUrls?.getUserByEmail}/${value?.user?.email}`;

                fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                })
                    .then((response) => {
                        // //(response);
                        if (!response.ok && response.status === 404) {
                            navigate('/user_type');
                        }
                        return response.json();
                    })
                    .then((result) => {
                        console.log('Result from login', result);
                        if (result?.data?.user?.isActive === false) {
                            Swal.fire({
                                title: 
                                'Error',
                                text: 
                                'You are not active user. Please contact to admin. support@apnayatri.com',
                                icon: 'error',
                                
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
                            setShowPageLoader(false);
                            localStorage.clear();
                            navigate('/login');
                            return;
                        }

                        if (result?.data?.user?.role === appRoles?.admin) {
                            localStorage.setItem(
                                'role',
                                result?.data?.user?.role
                            );
                            localStorage.setItem(
                                'userId',
                                result?.data?.user?._id
                            );
                            navigate('/admin/vehicles');
                        } else if (
                            result?.data?.user?.role === appRoles?.vehicleOwner
                        ) {
                            localStorage.setItem(
                                'role',
                                result?.data?.user?.role
                            );
                            localStorage.setItem(
                                'userId',
                                result?.data?.user?._id
                            );
                            navigate('/vehicle/vehicles');
                        } else if (
                            result?.data?.user?.role === appRoles?.driver
                        ) {
                            localStorage.setItem(
                                'role',
                                result?.data?.user?.role
                            );
                            localStorage.setItem(
                                'userId',
                                result?.data?.user?._id
                            );
                            localStorage.setItem(
                                'driverId',
                                result?.data?.driverInfo?._id
                            );
                            navigate('/driver/bookings');
                        } else if (
                            result?.data?.user?.role === appRoles?.user
                        ) {
                            localStorage.setItem(
                                'role',
                                result?.data?.user?.role
                            );
                            localStorage.setItem(
                                'userId',
                                result?.data?.user?._id
                            );
                            navigate(
                                `/user/dashboard/${formateDateYYYYMMDD(
                                    new Date()
                                )}/${formateDateYYYYMMDD(new Date())}`
                            );
                        }
                        setShowPageLoader(false);
                    })
                    .catch(() => {
                        // //('error using pass', error);
                        setShowPageLoader(false);
                    });
            })
            .catch((error: any) => {
                setShowPageLoader(false);
                if (
                    error?.code === 400 ||
                    error?.code === 'auth/invalid-credential'
                ) {
                    Swal.fire({
                        title: t('login2.errtitle'),
                        text: t('login2.errtext'),
                        icon: 'error',
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
                // //('err', error?.code);
            });
    };

    const handelSignUp = () => {
        // //('SignUp');
        navigate('/signup');
    };
    const handleGoogleLogin = async () => {
        firebase
            ?.signinWithGoogle()
            .then((result) => {
                // //('resulttttttttttttt', result?.data);
                // This gives you a Google Access Token. You can use it to access the Google API.
                // const credential =
                //     GoogleAuthProvider.credentialFromResult(result);
                // const token = credential?.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data  using getAdditionalUserInfo(result)
                // ...
                // // //('user: ', user?.accessToken);
                localStorage.setItem('token', user?.accessToken);
                localStorage.setItem(
                    'refreshToken',
                    result?._tokenResponse?.refreshToken
                );
                localStorage.setItem('email', user?.email);
                const apiUrl = `${API_BASE_URL}${ApiUrls?.getUserByEmail}/${user?.email}`;

                fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                })
                    .then((response) => {
                        // //(response);
                        if (!response.ok && response.status === 404) {
                            navigate('/user_type');
                        }
                        return response.json();
                    })
                    .then((result) => {
                        // //(result);
                        localStorage.setItem('role', result?.data?.role);
                        localStorage.setItem('userId', result?.data?._id);
                        if (result?.data?.user?.role === appRoles?.admin) {
                            localStorage.setItem(
                                'role',
                                result?.data?.user?.role
                            );
                            localStorage.setItem(
                                'userId',
                                result?.data?.user?._id
                            );
                            navigate('/admin/vehicles');
                        } else if (
                            result?.data?.user?.role === appRoles?.vehicleOwner
                        ) {
                            localStorage.setItem(
                                'role',
                                result?.data?.user?.role
                            );
                            localStorage.setItem(
                                'userId',
                                result?.data?.user?._id
                            );
                            navigate('/vehicle/vehicles');
                        } else if (
                            result?.data?.user?.role === appRoles?.driver
                        ) {
                            localStorage.setItem(
                                'role',
                                result?.data?.user?.role
                            );
                            localStorage.setItem(
                                'userId',
                                result?.data?.user?._id
                            );
                            localStorage.setItem(
                                'driverId',
                                result?.data?.driverInfo?._id
                            );
                            navigate('/driver/bookings');
                        } else if (
                            result?.data?.user?.role === appRoles?.user
                        ) {
                            localStorage.setItem(
                                'role',
                                result?.data?.user?.role
                            );
                            localStorage.setItem(
                                'userId',
                                result?.data?.user?._id
                            );
                            navigate(
                                `/user/dashboard/${formateDateYYYYMMDD(
                                    new Date()
                                )}/${formateDateYYYYMMDD(new Date())}`
                            );
                        }
                        setShowPageLoader(false);
                    })
                    .catch(() => {
                        setShowPageLoader(false);
                    });

                // navigate('/user_type');
                // // //('token: ', token);
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
                console.log(
                    'error--------: ',
                    error,
                    errorCode,
                    errorMessage,
                    email,
                    credential
                );

                // ...
            });
    };

    const handelForgotPassword = () => {
        // //('ForgotPassword');
        navigate('/forgot');
    };
    // const handleShowPassword = () => {
    //     setShowPassword(!showPassword);
    // };

    // const handelCarddata = () => {
    //     // //('Card');
    //     navigate('/cards');
    // };
    const LoginComponent = () => {
        return (
            <div className=" text_col me-md-5 bg_white p-5 rounded-3">
                <div>
                    <h3 className="fw-bolder">{t('login.heading')}</h3>
                    <p className="ext_text"> {t('login.subheading')} </p>
                    {/* <button
            type="button"
            onClick={() => handelCarddata()}
        >
            {' '}
            Card{' '}
        </button> */}
                </div>
                <div>
                    <Formik
                        initialValues={initialData}
                        validationSchema={validate}
                        onSubmit={handleSubmit}
                    >
                        <Form>
                            <div className="col-sm-12 mt-4">
                                {/* <label> </label> */}
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder={t('login.emailplaceholder')}
                                    className="form-control"
                                ></Field>
                                <p className="text-danger element">
                                    {' '}
                                    <ErrorMessage name="email" />
                                </p>
                            </div>

                            <div className="col-sm-12 mt-3 pt-2">
                                <div className="">
                                    <Field
                                        name="password"
                                        placeholder={t(
                                            'login.passwordplaceholder'
                                        )}
                                        // type={
                                        //     showPassword ? 'text' : 'password'
                                        // }
                                        type='password'
                                        className="form-control pass_input_box"
                                    />
                                    {/* <div className="input-group-append">
                                        <span className="input-group-text custom_eye_box">
                                            {showPassword ? (
                                                <FaEye
                                                    className="eye_btn"
                                                    size={23}
                                                    onClick={handleShowPassword}
                                                />
                                            ) : (
                                                <FaEyeSlash
                                                    className="eye_btn"
                                                    size={23}
                                                    onClick={handleShowPassword}
                                                />
                                            )}
                                        </span>
                                    </div> */}
                                </div>
                                <p className="text-danger element">
                                    <ErrorMessage name="password" />
                                </p>
                            </div>
                            <div className="d-flex justify-content-between mt-3 ">
                                <div>
                                    <p
                                        className="forgo"
                                        onClick={handelForgotPassword}
                                    >
                                        {' '}
                                        {t('login.forgotbutton')}{' '}
                                    </p>
                                </div>
                                <div>
                                    <p
                                        className=" signn"
                                        onClick={handelSignUp}
                                    >
                                        {' '}
                                        {t('login.singupbutton')}{' '}
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-12 mt-1 ">
                                <button
                                    type="submit"
                                    value="submit"
                                    className=" login_col mt-2 w-100 rounded"
                                >
                                    {' '}
                                    {t('login.loginbutton')}{' '}
                                </button>
                            </div>

                            <div className="text-center mt-4 mb-4 position-relative mx-3 or_color">
                                <hr className="w-100" />
                                <div className="position-absolute top-50 start-50 translate-middle px-2 bg-white">
                                    {t('login.or')}
                                </div>
                            </div>

                            <div className="d-flex justify-content-center align-items-center">
                                <button
                                    type="button"
                                    className="btn btn-white w-100 border border-dark last_btn d-flex align-items-center"
                                >
                                    <div className="img-fluid">
                                        <img
                                            src={logogoogle}
                                            width="35"
                                            className="d-inline-block "
                                            alt=""
                                        />
                                    </div>
                                    <div
                                        className="mx-auto "
                                        onClick={() => handleGoogleLogin()}
                                    >
                                        {t('login.loginbuttonwithgoogle')}
                                    </div>
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        );
    };
    return (
        <>
            {/*Nikita Code */}
            <div className="vh-100 d-flex justify-content-center justify-content-md-end align-items-center container-fluid text-black">
                <div className="justify-content-center d-flex rounded me-md-5 ">
                    <LoginComponent />

                    {/* LOGIN */}
                </div>
            </div>
            <PageLoader show={showPageLoader} />{' '}
            <div className="login_background d-none d-md-block">
                <div className="d-flex justify-content-start ms-5 mt-3">
                    <img
                        src={logo}
                        className="img-fluid mt-4"
                        alt="Apna Yatri Logo"
                        width="120"
                        height="120"
                    />
                </div>
                {/* {" "} */}
            </div>
            <div className="login_background_mobile d-md-none">
                {/* {" "} */}
            </div>
        </>
    );
};

export default Login;
