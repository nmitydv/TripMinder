import Modal from 'react-bootstrap/Modal';
import ResumeMainPage from './Create Vehicle/CreateVehicleForm';
import CardHeader from '../../../common/Card Header/CardHeader';
import { useTranslation } from 'react-i18next';

const AddNewVehicleModal = (props) => {
    const [t] = useTranslation('global');
    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <CardHeader
                    onClose={() => props?.onHide()}
                    title={t('createvehicle.title')}
                />
                <ResumeMainPage onDone={() => props.onHide()} />
            </Modal.Body>
        </Modal>
    );
};

export default AddNewVehicleModal;
