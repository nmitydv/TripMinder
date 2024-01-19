import { Field, Formik, Form, ErrorMessage } from 'formik';
// import { app } from '../firebase';
// import { getAuth } from 'firebase/auth';
import '../styles/login.css';
// import myimage from './styles/image/myimage.svg';
// import '../Forgate.css';
// import '../styles/Forgate.css';
// import {AiOutlineCar} from 'react-icons/fa';
import '../styles/ForgotPassword.css';
// import { AiOutlineCar } from 'react-icons/ai';
// import img from '../image/MyImage.svg';
// import img from '../image/MyImage.svg';
import logo from '../../assets/images/apna_yatri_logo.svg';
import * as Yup from 'yup';
import { useFirebase } from '../../context/Firebase/Firebase';
import { useTranslation } from 'react-i18next';
// import { User } from '../../helpers/types/apiDataTypes';
// const database = getAuth(app);
const ForgotPassword = () => {
    const [t] = useTranslation('global');
    const firebase = useFirebase();
    interface Forgot {
        email: string;
    }

    const initialData: Forgot = {
        email: '',
    };
    const validate = Yup.object().shape({
        email: Yup.string()
            .email()
            .required(t('forgotpassword.emailisrequird')),
    });
    const handleSubmit = (val: Forgot) => {
        if (firebase) {
            firebase
                .forgotPasswordByEmail(val.email)
                .then(() => alert(t('forgotpassword.alertmsg')))
                .catch((err: string) => console.log(err));
        }
    };
    return (
        <>
            <div className=" min-vh-100 d-flex justify-content-center justify-content-md-end align-items-center container-fluid text-black">
                <div className="row rounded me-md-5 bg_white">
                    <div className="row me-md-5">
                        <div className="col-12 pt-5" id="div1">
                            <h3 className="pl-3 font-weight-bold main_colore">
                                {t('forgotpassword.heading')}
                            </h3>
                            <br />
                            <p className="text-secondary pl-3">
                                {t('forgotpassword.subheading')}
                            </p>
                            <br />
                            <Formik
                                initialValues={initialData}
                                onSubmit={handleSubmit}
                                validationSchema={validate}
                            >
                                <Form>
                                    <div>
                                        {/* <label
                                        htmlFor="email"
                                        className="form-label"
                                    >
                                        Enter Your Email Address
                                    </label> */}
                                        <Field
                                            name="email"
                                            type="email"
                                            id="Email " // Add an 'id' attribute to link it with the label
                                            placeholder={t(
                                                'forgotpassword.emailplaceholder'
                                            )}
                                            className="form-control "
                                        />
                                        <p className="text-danger error_size">
                                            <ErrorMessage name="email" />
                                        </p>
                                    </div>
                                    <div className="d-grid gap-2 mb-5">
                                        <br />
                                        <button
                                            className="btn text-light"
                                            id="btn"
                                            type="submit"
                                        >
                                            {t(
                                                'forgotpassword.sendemailbutton'
                                            )}
                                        </button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
            {/* <PageLoader show={showPageLoader} />{' '} */}
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
export default ForgotPassword;
