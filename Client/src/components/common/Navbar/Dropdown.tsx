import React, { useEffect } from 'react';
import './AppNavbar.css';
import LanguageDropdown from './LanguageDropDown';
import { FaLanguage, FaUser } from 'react-icons/fa6';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PageLoader from '../../../common/Loaders/Loaders';
import { useGetUserByIdQuery } from '../../../redux/services/commonServices';
import { imageBaseUrl } from '../../../helpers/constants/idConstants';
import { Form } from 'react-bootstrap';
import { CiEdit, CiLight } from 'react-icons/ci';
import { MdOutlineDarkMode } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { Toggle } from 'rsuite';
import './AppNavbar.css';

const DropDownProfile = ({
    setModalShow,
    showModal,
    selectedTheme,
    toggleTheme,
}) => {
    const [t] = useTranslation('global');
    const userId = localStorage.getItem('userId');
    const {
        data: userData,
        error: userError,
        isLoading: userLoading,
    } = useGetUserByIdQuery(userId);

    const [isToggled, setIsToggled] = useState(false);

    const navigate = useNavigate();
    const [showPageLoader, setShowPageLoader] = useState(false);
    const handleLogout = () => {
        setShowPageLoader(true);
        setTimeout(() => {
            localStorage.clear();
            navigate('/');
        }, 2000);
    };

    // useEffect(() => {
    //     document.body.className = theme;
    // }, [theme]);

    return (
        <>
            <div className="user_profile_nav_dropdown ">
                <div className="main d-flex align-items-center user_profile_main px-2">
                    <div>
                        <img
                            src={`${imageBaseUrl}${userData?.data?.profilePicture}`}
                            alt="Profile"
                            className="profile_img "
                        />
                    </div>
                    <div className="information">
                        <p
                            className="dropdown-name"
                            style={{ fontSize: `16px`, fontWeight: `bolder` }}
                        >
                            {userData?.data?.name}
                        </p>
                        <p
                            style={{
                                fontSize: `14px`,
                                margin: `0`,
                                fontWeight: `480`,
                            }}
                        >
                            {userData?.data?.email}
                        </p>
                    </div>
                </div>
                <div className="separator"></div>
                <div className="d-flex align-items-center">
                    <button
                        onClick={() => setModalShow(!showModal)}
                        className="edit_button edit_profile_field d-flex align-items-center mt-0 mb-0"
                    >
                        <div className="px-2">
                            <FaUser size={20} className="_icon" />

                            <span>{t('profiledropdown.headingprofile')}</span>

                            <span className="edit_icone">
                                <CiEdit />
                            </span>
                        </div>
                    </button>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                    <div>
                        <button className="edit_button edit_profile_field">
                            <div className="px-2">
                                <FaLanguage size={20} className="_icon" />
                                <span>{t('profiledropdown.language')}</span>
                            </div>
                        </button>
                    </div>
                    <div>
                        <LanguageDropdown />
                    </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                    <div>
                        <button className="edit_button edit_profile_field">
                            <div className="px-2">
                                {selectedTheme == 'li' ? (
                                    <CiLight
                                        size={27}
                                        className="language_icon"
                                    />
                                ) : (
                                    <MdOutlineDarkMode
                                        size={27}
                                        className="language_icon"
                                    />
                                )}
                                <span>{t('profiledropdown.theme')}</span>
                            </div>
                        </button>
                    </div>
                    <div>
                        <span
                            onClick={(e) => {
                                (e.target as HTMLInputElement).value =
                                    selectedTheme === 'li' ? 'da' : 'li';
                                toggleTheme(e);
                            }}
                        >
                            <Toggle
                                checked={selectedTheme === 'li'}
                                size="lg"
                                checkedChildren="Light"
                                unCheckedChildren="Dark"
                            />
                        </span>
                    </div>
                </div>
                {/* <div className="px-2 d-flex justify-content-between"> */}
                {/* <div className="separator"></div> */}
                {/* <div className="select_language ms-2 d-flex justify-content-left align-items-left ">
                        <label htmlFor="theme">
                            {' '}
                            {selectedTheme == 'li' ? (
                                <CiLight size={27} className="language_icon" />
                            ) : (
                                <MdOutlineDarkMode
                                    size={27}
                                    className="language_icon"
                                />
                            )} */}
                {/* Select Theme : &nbsp;{' '} */}
                {/* </label> */}
                {/* <select
                        id="theme"
                        value={selectedTheme}
                        onChange={(e) => toggleTheme(e)}
                    >
                        <option value="li">Light</option>
                        <option value="da">Dark</option>
                    </select> */}
                {/* <span
                            onClick={(e) => {
                                (e.target as HTMLInputElement).value =
                                    selectedTheme === 'li' ? 'da' : 'li';
                                toggleTheme(e);
                            }}
                        >
                            <Toggle
                                checked={selectedTheme === 'li'}
                                size="lg"
                                checkedChildren="Light"
                                unCheckedChildren="Dark"
                            />
                        </span> */}
                {/* </div>
                </div> */}

                <div className="separator"></div>
                <div className="logout_field text-center">
                    <button onClick={handleLogout} className="logout_btn">
                        <FaSignOutAlt size={22} className="_icon" />
                        {t('profiledropdown.headinglogout')}
                    </button>
                </div>
            </div>
            <PageLoader show={showPageLoader} />
        </>
    );
};

export default DropDownProfile;
