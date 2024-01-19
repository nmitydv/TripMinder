import { Field, Formik, Form, ErrorMessage } from 'formik';
import '../styles/singup.css';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../../context/Firebase/Firebase';
import * as Yup from 'yup';
// import SignupImage from '../../assets/sign.jpg';
// import googleImage from '../../assets/google.png';
import logogoogle from '../../assets/google.png';
import logo from '../../assets/images/apna_yatri_logo.svg';
import { useTranslation } from 'react-i18next';
import PageLoader from '../../common/Loaders/Loaders';
import Swal from 'sweetalert2';
import { useState } from 'react';

const Signup = () => {
    const firebase = useFirebase();
    const [t] = useTranslation('global');
    const [showPageLoader, setShowPageLoader] = useState(false);
    // // //('firebase is available', firebase);
    const navigate = useNavigate();
    const initialData = {
        email: '',
        password: '',
    };

    const validate = Yup.object().shape({
        email: Yup.string().email().required(t('login.emailrequired')),
        password: Yup.string()
            .required(t('login.passwordrequired'))
            .min(6, t('singup.passwordmin')),
    });

    const handelLogin = () => {
        // //('login');
        navigate('/login');
    };

    const handleSubmit = (val: any) => {
        setShowPageLoader(true);
        if (firebase) {
            firebase
                ?.signupUserWithEmailPassword(val.email, val.password)
                .then((value: any) => {
                    // //('value', value);
                    localStorage.setItem('token', value?.user?.accessToken);
                    localStorage.setItem('email', value?.user?.email);
                    localStorage.setItem(
                        'refreshToken',
                        value?._tokenResponse?.refreshToken
                    );
                    setShowPageLoader(false);
                    navigate('/user_type');
                })
                .catch((error: any) => {
                    setShowPageLoader(false);
                    if (
                        error?.code === 400 ||
                        error?.code === 'auth/email-already-in-use'
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
        }
    };

    const handleGoogleSignup = () => {
        firebase
            ?.signinWithGoogle()
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // const credential =
                //     GoogleAuthProvider.credentialFromResult(result);
                // const token = credential?.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data  using getAdditionalUserInfo(result)
                localStorage.setItem('token', user?.accessToken);
                localStorage.setItem('email', user?.email);
                localStorage.setItem(
                    'refreshToken',
                    result?._tokenResponse?.refreshToken
                );
                navigate('/user_type');
            })
            .catch(() => {
                // Handle Errors here.
                // const errorCode = error.code;
                // const errorMessage = error.message;
                // The email of the user's account used.
                // const email = error.customData.email;
                // The AuthCredential type that was used.
                // const credential =
                    // GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    };

    return (
        <>
            {/* <div className="container-fluid d-flex justify-content-center align-items-center login_ctn">
                <div className="d-flex bg-white justify-content-center rounded row">
                

                    <div className="col-lg-8">
                        <div className="container ">
                            <br />
                            <img
                                src={SignupImage}
                                className="image-fluid mt-5"
                            />
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="vh-100 d-flex justify-content-center justify-content-md-end align-items-center container-fluid text-black">
                <div className="justify-content-center d-flex rounded me-md-5 ">
                    <div className="text_col me-md-5 bg_white p-5 rounded-3">
                        <h3 className="fw-bolder">{t('singup.heading')}</h3>
                        <p className="ext_text">
                            {t('singup.subheading')}
                            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                        </p>

                        <Formik
                            initialValues={initialData}
                            onSubmit={handleSubmit}
                            validationSchema={validate}
                        >
                            <Form>
                                <div className="col-sm-12 mt-4">
                                    {/* <label> </label> */}
                                    <Field
                                        type="email"
                                        name="email"
                                        placeholder={t(
                                            'singup.emailplaceholder'
                                        )}
                                        className="form-control"
                                    ></Field>
                                    <p className="text-danger element">
                                        {' '}
                                        <ErrorMessage name="email" />
                                    </p>
                                </div>

                                <div className="col-sm-12 mt-3 pt-2">
                                    <Field
                                        type="password"
                                        name="password"
                                        placeholder={t(
                                            'singup.passwordplaceholder'
                                        )}
                                        className="form-control"
                                    ></Field>
                                    <p className="text-danger element">
                                        {' '}
                                        <ErrorMessage name="password" />
                                    </p>
                                </div>
                                <div className="d-flex justify-content-between mt-3 ">
                                    <div>
                                        <p
                                            className="forgo"
                                            // onClick={handelForgotPassword}
                                        >
                                            {' '}
                                        </p>
                                    </div>
                                    <div>
                                        <p
                                            className="login"
                                            onClick={handelLogin}
                                        >
                                            {' '}
                                            {t('singup.loginsubbutton')}{' '}
                                            <button className="btn_login">
                                                {t('singup.loginbutton')}
                                            </button>{' '}
                                        </p>
                                    </div>
                                </div>
                                {/* <p
                                    className="text-center login"
                                    onClick={handelLogin}
                                >
                                    {' '}
                                    Already have an Account ?{' '}
                                    <button className="btn_login">
                                        Login
                                    </button>{' '}
                                </p> */}
                                <div className="col-md-12 mt-1 ">
                                    <button
                                        type="submit"
                                        value="submit"
                                        className=" login_col mt-2 w-100 rounded"
                                    >
                                        {' '}
                                        {t('singup.singupbutton')}{' '}
                                    </button>
                                </div>
                                {/* <button
                                    type="submit"
                                    className="btn_singup w-100 rounded"
                                >
                                    Sign Up
                                </button> */}

                                <div className="text-center mt-4 mb-4 position-relative mx-3 or_color">
                                    <hr className="w-100" />
                                    <div className="position-absolute top-50 start-50 translate-middle px-2 bg-white">
                                        {t('singup.or')}
                                    </div>
                                </div>
                                {/* <div className="text-center">
                                    <button
                                        type="button"
                                        className="btn_signWgoogle justify-content w-100 rounded"
                                        onClick={() => handleGoogleSignup()}
                                    >
                                        <img
                                            src={googleImage}
                                            className="img-fluid float-start rounded-circle "
                                            width={30}
                                            height={30}
                                        />
                                        Signup With Google
                                    </button>
                                </div> */}
                                <div className="d-flex justify-content-center align-items-center">
                                    <button
                                        type="button"
                                        className="btn btn-white w-100 border border-dark last_btn d-flex align-items-center"
                                        onClick={() => handleGoogleSignup()}
                                    >
                                        <div className="img-fluid">
                                            <img
                                                src={logogoogle}
                                                width="35"
                                                className="d-inline-block "
                                                alt=""
                                            />
                                        </div>
                                        <div className="mx-auto ">
                                            {t('singup.singupbuttonwithgoogle')}
                                        </div>
                                    </button>
                                </div>
                            </Form>
                        </Formik>
                    </div>

                    {/* LOGIN */}
                </div>
            </div>
            <PageLoader show={showPageLoader} />{' '}
            <div className="login_background d-none d-md-block">
                {/* {" "} */}
                <div className="d-flex justify-content-start ms-5 mt-3">
                    <img
                        src={logo}
                        className="img-fluid mt-4"
                        alt="Apna Yatri Logo"
                        width="120"
                        height="120"
                    />
                </div>
            </div>
            <div className="login_background_mobile d-md-none">
                {/* {" "} */}
            </div>
        </>
    );
};

export default Signup;
