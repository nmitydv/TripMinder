import '../../styles/User.css';
import carr from '../../../assets/IMG-20231103-WA0003.jpg';
import { t } from 'i18next';
const UserNavbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary m-50">
                <div className=" main_div container-fluid d-flex justify-content-between">
                    <div>
                        <a className="navbar-brand" href="#">
                            <img
                                src={carr}
                                alt="Logo"
                                width="30"
                                height="30"
                                className="d-inline-block align-text-top me-2  img-fluid car_clas"
                            />
                        </a>
                    </div>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="col-sm-8  d-flex ">
                        <div
                            className="collapse navbar-collapse d-flex justify-content-evenly"
                            id="navbarSupportedContent"
                        >
                            <div className="">
                                <a>{t('vehicleCard.user')}</a>
                            </div>
                            <div>
                                <a>{t('vehicleCard.driver')}</a>
                            </div>
                            <div>
                                <a>{t('vehicleCard.vehicle')}</a>
                            </div>
                            <div>
                                <img
                                    src={carr}
                                    alt=""
                                    width="30"
                                    height="30"
                                    className=" me-2 img-fluid car_clas"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};
export default UserNavbar;
