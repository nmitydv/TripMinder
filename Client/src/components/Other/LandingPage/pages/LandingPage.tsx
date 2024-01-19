import app_logo from './../../../../assets/images/apna_yatri_logo.svg';
import white_logo from './../../../../assets/images/APNA _YATRI_WHITE_LOGO.svg';
import silvercar from '../../../../assets/images/silver1 car.jpg';
// import bluecar from '../../../../assets/images/blue car.png';
import bluecar from '../../../../assets/images/blue car5.png';
import '../Styles/LandingPage.css';
import { useNavigate } from 'react-router-dom';
import { CiLocationOn } from 'react-icons/ci';
import { BiCalendar } from 'react-icons/bi';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaCalendarCheck } from 'react-icons/fa6';
import { IoCarSportSharp } from 'react-icons/io5';
import { FaSackDollar } from 'react-icons/fa6';
import { ImUserCheck } from 'react-icons/im';
import { Ri24HoursFill } from 'react-icons/ri';
import { RiFacebookBoxLine } from 'react-icons/ri';
import { FaInstagram } from 'react-icons/fa';
import { FiYoutube } from 'react-icons/fi';
import { PiPhoneCallThin } from 'react-icons/pi';
import { CiMail } from 'react-icons/ci';
import { IoCarSportOutline } from 'react-icons/io5';
import { PiCarProfileThin } from 'react-icons/pi';
import { PiCarLight } from 'react-icons/pi';
import { CiUser } from 'react-icons/ci';
import { IoIosSend } from 'react-icons/io';
import LanguageDropdown from '../../../common/Navbar/LanguageDropDown';
import { useTranslation } from 'react-i18next';
import { IoLanguage } from 'react-icons/io5';

import { Navbar, Container, Nav, Button, Dropdown } from 'react-bootstrap';

const LandingPage = () => {
    const [t] = useTranslation('global');
    const navigate = useNavigate();

    const handelLogin = () => {
        // //('login');
        navigate('/login');
    };

    const handelSignUp = () => {
        // //('SignUp');
        navigate('/signup');
    };

    return (
        <>
            {/* header  */}

            {/* <div className=" header d-flex col-12 mt-3">
                    <img className="header_logo" src={app_logo} alt="logo" />

                    <div className="d-flex align-items-center">
                        <button
                            className="login_btn fw-bold mx-5"
                            onClick={handelLogin}
                        >
                            {t('landing.login')}
                        </button>
                        <button
                            className="landing_page_btn fw-semibold"
                            onClick={handelSignUp}
                        >
                            {t('landing.signup')}
                        </button>
                        
                            <div className="language_btn">
                                <LanguageDropdown />
                            </div>
                      
                       
                    </div>
                </div> */}

            {/* <div className=" col-12 landing_page_body d-flex ">
                    <div className="col-3 landing_page_body_text">
                        <h1>
                            {t('landing.heading')}
                            <span className="text-primary">
                                {' '}
                                {t('landing.easily')}
                            </span>
                        </h1>
                        <div className="paragrap_text">
                            {' '}
                            <p className="main_subheading">
                                {t('landing.subheading')}
                            </p>
                            <h6>
                                Get a car wherever and whenever you need it with
                                your IOS and Android device
                            </h6> 
                        </div>
                    </div>
                    <div className="">
                        <img
                            className="landing_page_body_img"
                            src={bluecar}
                            // src="https://purepng.com/public/uploads/large/purepng.com-blue-jaguar-f-type-luxury-sports-carcarvehicletransportjaguarsports-carluxury-car-9615246508952odg6.png"
                            alt=""
                        />
                    </div>
                </div> */}

            {/* <div className="d-flex justify-content-center">
                    <div className=" d-flex justify-content-center form_ctn align-items-center">
                        <div className="d-flex">
                            <div className="mx-2">
                                <h4>
                                    {' '}
                                    <FaMapMarkerAlt />
                                </h4>
                            </div>
                            <div className="mx-2">
                                <h4>{t('landing.location')}</h4>
                                <span>{t('landing.selectlocation')}</span>``
                            </div>
                        </div>

                        <div className="vr mx-4 my-2"></div>
                        <div className="d-flex">
                            <div className="mx-3">
                                {' '}
                                <h4>
                                    <BiCalendar />
                                </h4>
                            </div>
                            <div>
                                <h4> {t('landing.pickupdate')}</h4>
                                <span>{t('landing.pickupdate1')}</span>
                            </div>
                        </div>
                        <div className="vr mx-4 my-2"></div>
                        <div className="d-flex">
                            <div className="mx-3">
                                {' '}
                                <h4>
                                    <BiCalendar />
                                </h4>
                            </div>
                            <div>
                                <h4> {t('landing.returndate')}</h4>
                                <span>{t('landing.returndate1')}</span>
                            </div>
                        </div>
                        <div>
                           
                            <button
                                className="searchbar_btn"
                                onClick={handelLogin}
                            >
                                {t('landing.search')}
                            </button>
                        </div>

                      
                    </div>
                </div>  */}

            {/* Navar Section Landing Page */}
            <div style={{ height: '100vh' }}>
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="main_logo">
                        <img
                            className="header_logo"
                            src={app_logo}
                            alt="logo"
                        />
                    </div>

                    <button
                        type="button"
                        className="navbar-toggler"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarCollapse"
                    >
                        <div className="navbar-nav ms-auto main_button">
                            <div className="d-flex align-items-center">
                                <button
                                    className="login_btn fw-bold mx-5"
                                    onClick={handelLogin}
                                >
                                    {t('landing.login')}
                                </button>
                                <button
                                    className="landing_page_btn fw-semibold"
                                    onClick={handelSignUp}
                                >
                                    {t('landing.signup')}
                                </button>

                                <div className="language_btn">
                                    <LanguageDropdown />
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Car and HAding Section */}
                <div className="container-fluid">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 col-xxl-5 ">
                            <div className="landing_page_body_text p-5">
                                <h1>
                                    {t('landing.heading')}
                                    <span className="text-primary">
                                        {' '}
                                        {t('landing.easily')}
                                    </span>
                                </h1>
                                <div className="paragrap_text">
                                    {' '}
                                    <p className="main_subheading">
                                        {t('landing.subheading')}
                                    </p>
                                    {/* <h6 className='main_text'>
                                Get a car wherever and whenever you need it with
                                your IOS and Android device
                            </h6>  */}
                                </div>
                            </div>
                        </div>

                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-7 col-xl-7 col-xxl-7">
                            <div className=" ">
                                <img
                                    className="landing_page_body_img img-fluid"
                                    src={bluecar}
                                    // src="https://purepng.com/public/uploads/large/purepng.com-blue-jaguar-f-type-luxury-sports-carcarvehicletransportjaguarsports-carluxury-car-9615246508952odg6.png"
                                    alt="main_car"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/*Serch bar Section 1*/}
                <div className=" container-fluid mt-4 ">
                    <div className="row">
                        <div className="col-10 col-sm-10 col-md-10 col-lg-8 col-xl-8 col-xxl-8 mx-auto form_ctn_1">
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3 d-flex justify-content-center align-items-center mt-3 mb-3">
                                    <div className=" d-flex justify-content-center align-items-center">
                                        <div className="mx-2">
                                            <h4>
                                                {' '}
                                                <FaMapMarkerAlt />
                                            </h4>
                                        </div>
                                        <div className="">
                                            <h4>{t('landing.location')}</h4>
                                            <span>
                                                {t('landing.selectlocation')}
                                            </span>
                                            ``
                                        </div>
                                    </div>
                                </div>

                                <div className=" col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3 d-flex justify-content-center align-items-center mt-3 mb-3">
                                    <div className="d-flex">
                                        <div className="mx-2">
                                            {' '}
                                            <h4>
                                                <BiCalendar />
                                            </h4>
                                        </div>
                                        <div className="">
                                            <h4> {t('landing.pickupdate')}</h4>
                                            <span>
                                                {t('landing.pickupdate1')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3 d-flex justify-content-center align-items-center mt-3 mb-3">
                                    <div className="d-flex">
                                        <div className="mx-2">
                                            {' '}
                                            <h4>
                                                <BiCalendar />
                                            </h4>
                                        </div>
                                        <div>
                                            <h4> {t('landing.returndate')}</h4>
                                            <span>
                                                {t('landing.returndate1')}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className=" col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3  d-flex justify-content-center align-items-center mt-3 mb-3">
                                    <button
                                        className="searchbar_btn"
                                        onClick={handelLogin}
                                    >
                                        {t('landing.search')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*Serch bar Section  2*/}

            <div className=" container-fluid ride_main_ctn">
                <div className="row">
                    <div className=" col-xs-12 col-sm-12 col-md-12 col-xl-12 col-xxl-12">
                        <div className=" justify-content-center">
                            <h2>{t('landing2.heading')}</h2>
                            <h1>{t('landing2.subheading')}</h1>
                        </div>
                    </div>
                </div>

                <div className=" row mt-5">
                    <div className=" col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 ">
                        <div className="box mt-5">
                            <div className="d-flex justify-content-center">
                                <div className="box_icon mb-3">
                                    {' '}
                                    <FaMapMarkerAlt />
                                </div>
                            </div>
                            <h3>{t('landing2.chooselocation')}</h3>
                            <p>{t('landing2.choosepara')}</p>
                        </div>
                    </div>

                    <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 ">
                        <div className="box mt-5">
                            <div className="d-flex justify-content-center">
                                <div className="box_icon mb-3">
                                    {' '}
                                    <FaCalendarCheck />
                                </div>
                            </div>

                            <h3>{t('landing2.pickupdate')}</h3>
                            <p>{t('landing2.pickuppara')}</p>
                        </div>
                    </div>

                    <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 ">
                        <div className="box mt-5">
                            <div className="d-flex justify-content-center">
                                <div className="box_icon mb-3">
                                    {' '}
                                    <IoCarSportSharp />
                                </div>
                            </div>

                            <h3>{t('landing2.bookacar')}</h3>
                            <p>{t('landing2.bookacarpara')}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/*App feuther Section */}
            <div className="container-fluid row mt-5">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                    <div className=" d-flex justify-content-center align-items-center image_div">
                        <img
                            className="silver_img img-fluid"
                            src={silvercar}
                            // src="https://media.istockphoto.com/id/468686480/photo/modern-generic-car-on-white-background.jpg?s=612x612&w=0&k=20&c=FOdVZRWrqaBULZlv-kkP6ypfNmILkgu0bsuy8c7LAdg="
                            alt=""
                        />
                    </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                    <div className="row">
                        <div className=" col-xs-12 col-sm-12 col-md-12 clo-lg-12 col-xl-12 col-xxl-12">
                            <div>
                                <h6 className="why_text mb-4">
                                    {t('landing2.whychooseus')}
                                </h6>
                                <h2 className="block_text mb-5">
                                    {t('landing2.whychooseusheading')}
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xs-2 col-xxl-2 ">
                            <div className="box_icon mb-5">
                                {' '}
                                <FaSackDollar />
                            </div>
                        </div>

                        <div className=" col-xs-10 col-sm-10 col-md-10 col-xs-10 col-xxl-10">
                            <div>
                                {' '}
                                <h5 className="block_text">
                                    {t('landing2.heading1')}
                                </h5>
                                <p>{t('landing2.subheading1')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xs-2 col-xxl-2">
                            <div className="box_icon mb-5">
                                {' '}
                                <ImUserCheck />
                            </div>
                        </div>

                        <div className="col-xs-10 col-sm-10 col-md-10 col-xs-10 col-xxl-10">
                            <div>
                                {' '}
                                <h5 className="block_text">
                                    {t('landing2.heading2')}
                                </h5>
                                <p className="">{t('landing2.subheading2')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xs-2 col-xxl-2">
                            <div className="box_icon mb-5">
                                {' '}
                                <Ri24HoursFill />
                            </div>
                        </div>
                        <div className="col-xs-10 col-sm-10 col-md-10 col-xs-10 col-xxl-10">
                            <div>
                                {' '}
                                <h5 className="block_text">
                                    {t('landing2.heading3')}
                                </h5>
                                <div className="col-10">
                                    <p>{t('landing2.subheading3')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xs-2 col-xxl-2">
                            <div className="box_icon mb-5">
                                {' '}
                                <IoCarSportSharp />
                            </div>
                        </div>
                        <div className="col-xs-10 col-sm-10 col-md-10 col-xs-10 col-xxl-10">
                            <div>
                                {' '}
                                <h5 className="block_text">
                                    {t('landing2.heading4')}
                                </h5>
                                <p>{t('landing2.subheading4')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*Footer Section*/}
            <div className=" container-fluid">
                <div className="row mt-5 footer_ctn_1">
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-3 col-xl-3 col-xxl-3 px-4 mt-3 ">
                        <div className="">
                            <img
                                className="footer_logo"
                                src={white_logo}
                                alt=""
                            />
                            <p className="app_story mt-3">
                                {t('landingfooter.subparagraph')}
                            </p>
                        </div>
                    </div>

                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-3 col-xl-3 col-xxl-3 mt-3">
                        <p className="footer_heading">
                            {' '}
                            {t('landingfooter.heading1')}
                        </p>
                        <div className="d-flex align-items-center">
                            <div className="col-1 me-4 my-1 footer_icon">
                                {' '}
                                <PiCarLight />
                            </div>
                            <div className="col my-2 ">
                                {' '}
                                {t('landingfooter.vehicles')}
                            </div>
                        </div>

                        <div className="d-flex align-items-center">
                            <div className="col-1 me-4 my-1 footer_icon">
                                {' '}
                                <CiUser />
                            </div>
                            <div className="col my-2 ">
                                {' '}
                                {t('landingfooter.drivers')}{' '}
                            </div>
                        </div>
                    </div>

                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-3 col-xl-3 col-xxl-3 mt-3">
                        <p className="footer_heading">
                            {' '}
                            {t('landingfooter.heading2')}
                        </p>

                        <div className="d-flex align-items-center">
                            <div className="col-1 me-4 my-1 footer_icon">
                                {' '}
                                <PiPhoneCallThin />
                            </div>
                            <div className="col my-2">6232710975</div>
                        </div>

                        <div className="d-flex align-items-center">
                            <div className="col-1 me-4 my-1 footer_icon">
                                {' '}
                                <CiMail />
                            </div>
                            <div className="col my-2">
                                kuldeepp.bca2020@ssism.org{' '}
                            </div>
                        </div>

                        <div className="d-flex align-items-center">
                            <div className="col-1 me-4 my-1 footer_icon">
                                {' '}
                                <CiLocationOn />
                            </div>
                            <div className="col my-2 ">
                                {t('landingfooter.location')}
                            </div>
                        </div>
                    </div>

                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-3 col-xl-3 col-xxl-3 mt-3 ">
                        <p className="footer_heading">
                            {' '}
                            {t('landingfooter.heading3')}
                        </p>
                        <div className="d-flex">
                            <div className="footer_icon ">
                                <RiFacebookBoxLine />
                            </div>
                            <div className="footer_icon ms-3">
                                {' '}
                                <FaInstagram />
                            </div>
                            <div className="footer_icon ms-3">
                                {' '}
                                <FiYoutube />
                            </div>
                        </div>
                        <p className="footer_heading mt-3">
                            {' '}
                            {t('landingfooter.getintouch')}
                        </p>

                        <div className="input_icon d-flex align-items-center mt-2">
                            <input type="text" className='input_touch w-50' />
                            <span className="search_icon">
                                <IoIosSend />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default LandingPage;
