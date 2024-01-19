import './NoInternetPage.css';
import img from '../../../assets/images/Internet Day-amico (1).png';
import { useTranslation } from 'react-i18next';

const NoInternetPage = () => {

    const [t] = useTranslation('global');
    const refresh = () => window.location.reload(true);
    return (
        <>
            <div
                className="container-fluid d-flex justify-content-center align-items-center"
                style={{ height: '100vh' }}
            >
                <div className="">
                    <div className="noInternet_image ">
                        <img src={img} alt="" />
                    </div>

                    <p className='Connection_text text-center py-3'>
                        {/* You must be Connected to the Internet to complete this
                        action */}
                        {t('nointernetpagemessage.connectinternet')}
                    </p>
                    <div className="d-flex justify-content-center">
                        <button className="button mt-1" onClick={refresh}>
                            {/* Reload */}
                            {t('nointernetpagemessage.reloadbutton')}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NoInternetPage;
