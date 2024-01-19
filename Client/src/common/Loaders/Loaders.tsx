// import Modal from 'react-bootstrap/Modal';
// import styles from './Loaders.module.css';
// import Lottie from 'react-lottie';
// import animationData from './data.json';

// export const CarAnimation = () => {
//     defaultOptions = {
//         autoplay: true,
//         loop: true,
//         animationData: animationData,
//     };

//     eventListeners = [
//         {
//             eventName: 'loopComplete',
//             callback: () => console.log('a loop complete'),
//         },
//     ];
//     return (
//         <Lottie
//             width={300}
//             eventListeners={this.eventListeners}
//             options={this.defaultOptions}
//         />
//     );
// };

import Modal from 'react-bootstrap/Modal';
import styles from './Loaders.module.css';
import Lottie from 'react-lottie';
import animationData from './data.json';
type ModalProps = React.ComponentProps<typeof Modal>;

export const CarAnimation = () => {
    const defaultOptions = {
        autoplay: true,
        loop: true,
        animationData: animationData,
    };

    const eventListeners = [
        {
            eventName: 'loopComplete',
            callback: () => console.log('a loop complete'),
        },
    ];

    return (
        <Lottie
            width={300}
            eventListeners={eventListeners}
            options={defaultOptions}
        />
    );
};

// export default CarAnimation;

export const CardLoader = () => {
    return (
        <>
            <div className={`${styles.lds_ripple}`}>
                <div></div>
                <div></div>
            </div>
        </>
    );
};

export const ContentLoader = () => {
    return (
        <>
            <div className={`${styles.lds_ring}`}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </>
    );
};

const PageLoader = (props: any) => {
    return (
        <>
            <Modal
                {...props}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                contentClassName={`${styles.transparent_modal_content}`}
            >
                <Modal.Body className="d-flex justify-content-center align-items-center">
                    <div className={`${styles.lds_spinner}`}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export const CarLoaderModal = (props: ModalProps) => {
    return (
        <>
            <Modal
                {...props}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                contentClassName={`${styles.transparent_modal_content}`}
            >
                <Modal.Body className="d-flex justify-content-center align-items-center">
                    <CarAnimation />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default PageLoader;
