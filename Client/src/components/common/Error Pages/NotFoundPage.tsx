import React from 'react';
import './NotFoundPage.css';
import { Navigate, useNavigate } from 'react-router';
import image from "../../../assets/images/404page.png";
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {

    const [t] = useTranslation('global');
    const navigate = useNavigate();
    const refresh = () => window.location.reload(true)

    return (
        <>
            <div className="container-fluid d-flex justify-content-center align-items-center "
                style={{ height: '100vh' }}
            >
                <div className=''>

                    <div className="page_notfound_image">
                        <img
                            src={image}
                            alt=""
                        />
                    </div>

                    <div className="error_text d-flex justify-content-center">
                        <h1>Error</h1>
                    </div>

                    <div className="notFound_text justify-content-center text-black">
                        <h2 className='text-center'>
                            {/* Page Not Found */}
                            {t('nointernetpagemessage.pagenotfound')}
                        </h2>
                        <h5 className='text-center'>
                            {t('nointernetpagemessage.sorry')}
                            {/* Soory, The page you are looking for could not be found */}
                        </h5>
                    </div>

                    <div className="page_notFound_btn d-flex justify-content-center py-3">

                        <div className="goBack_btn p-3 ">
                            <button className="button" onClick={() => navigate(-1)}>
                                {t('nointernetpagemessage.goback')}
                                {/* Go Back */}
                            </button>
                        </div>
                        <div className="reload_btn p-3">
                            <button className="button" onClick={refresh} >
                                {t('nointernetpagemessage.reloadbutton')}
                                {/* Reload */}
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
};

export default NotFoundPage;
