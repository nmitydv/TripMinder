import { IoCloseSharp } from 'react-icons/io5';

interface CardHeaderProps {
    title: string;
    onClose: () => void;
}

const CardHeader: React.FC<CardHeaderProps> = ({ title, onClose }) => {
    return (
        <>
            <div className="d-flex justify-content-between align-items-center w-100">
                <div>
                    <h5 className="modal_head_txt fw-bold">{title}</h5>
                </div>
                <div>
                    <div
                        className="close_bg d-flex justify-content-center align-items-center"
                        onClick={() => onClose()}
                    >
                        <IoCloseSharp className="modal_close_icon" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardHeader;
