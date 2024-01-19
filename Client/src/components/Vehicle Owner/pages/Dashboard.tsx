import { useState } from 'react';
import '../styles/Dashboard.css';
import AddNewVehicleModal from './AddNewVehicleModal';
import { useTranslation } from 'react-i18next';
const OwnerDashboard = () => {
    const [addNewShow, setAddNewShow] = useState(false);
    const [t] = useTranslation('global');

    const handleChangeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    const lang = localStorage.getItem('language');

    return (
        <>
            <div className="container-fluid">
                <button onClick={() => setAddNewShow(true)}>
                    {t('createvehicle.addnewvehicle')}
                </button>
            </div>

            <AddNewVehicleModal
                show={addNewShow}
                onHide={() => setAddNewShow(false)}
            />

            <div>
                <h1>
                    {t('header.message', {
                        name: lang === 'en' ? 'Shubham Meena' : 'शुभम मीणा',
                    })}
                </h1>
            </div>
            <div>
                <p>{t('home.body')}</p>
            </div>
        </>
    );
};

export default OwnerDashboard;
