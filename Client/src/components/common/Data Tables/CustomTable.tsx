import { Popover, Whisper } from 'rsuite';
import { imageBaseUrl } from '../../../helpers/constants/idConstants';
import defaultUser from '../../../assets/images/default_user.jpg';
import { formateDateYYYYMMDD } from '../../../helpers/Functions/dateFormaters';
import { useTranslation } from 'react-i18next';
import './DataTables.css';

const CustomTable = ({ data, headings }) => {
    const [t] = useTranslation('global');
    return (
        <>
            <div>
                <div className="table">
                    <div>
                        <div className="d-flex justify-content-around px-3 me-4">
                            {headings?.map((heading, index) => (
                                <span
                                    className="col text-center align-middle"
                                    style={{
                                        minWidth: `${heading?.size}`,
                                        maxWidth: `${heading?.size}`,
                                    }}
                                    key={index}
                                >
                                    {heading?.name}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div
                        className="table-container px-3 py-3 mx-2"
                        id="card_ctn"
                    >
                        <div>
                            {data?.map((item, index) => (
                                <>
                                    <div
                                        className="d-flex justify-content-around"
                                        key={index}
                                    >
                                        <span
                                            className="col d-flex text-center align-middle"
                                            style={{
                                                minWidth: '0%',
                                                maxWidth: '0%',
                                            }}
                                        >
                                            {index + 1}
                                        </span>
                                        <span
                                            className="col text-center align-middle"
                                            style={{
                                                minWidth: '10%',
                                                maxWidth: '10%',
                                            }}
                                        >
                                            <Whisper
                                                placement="top"
                                                trigger="hover"
                                                controlId="control-id-hover-enterable"
                                                speaker={
                                                    <Popover>
                                                        <img
                                                            src={`${imageBaseUrl}${item?.profilePicture}`}
                                                            alt="User profile picture"
                                                            style={{
                                                                minHeight:
                                                                    '140px',
                                                                minWidth:
                                                                    '130px',
                                                                maxWidth:
                                                                    '130px',
                                                                maxHeight:
                                                                    '140px',
                                                            }}
                                                        />
                                                    </Popover>
                                                }
                                                enterable
                                            >
                                                <img
                                                    src={
                                                        item?.profilePicture
                                                            ? `${imageBaseUrl}${item?.profilePicture}`
                                                            : defaultUser
                                                    }
                                                    alt="User profile picture"
                                                    className="table_profile_img"
                                                />
                                            </Whisper>
                                        </span>
                                        <span
                                            style={{
                                                textTransform: 'capitalize',
                                                maxWidth: '10%',
                                                minWidth: '10%',
                                            }}
                                            className="col text-center"
                                        >
                                            {item?.name}
                                        </span>
                                        <span
                                            className="col text-center align-middle"
                                            style={{
                                                minWidth: '20%',
                                                maxWidth: '20%',
                                            }}
                                        >
                                            {item?.email}
                                        </span>
                                        <span
                                            className="col text-center align-middle"
                                            style={{
                                                minWidth: '10%',
                                                maxWidth: '10%',
                                            }}
                                        >
                                            {item?.mobileNumber}
                                        </span>
                                        <span
                                            className="col text-center align-middle"
                                            style={{
                                                minWidth: '5%',
                                                maxWidth: '5%',
                                            }}
                                        >
                                            {item?.age}
                                        </span>
                                        <span
                                            className="col text-center align-middle"
                                            style={{
                                                minWidth: '5%',
                                                maxWidth: '5%',
                                            }}
                                        >
                                            {item?.gender}
                                        </span>
                                        <span
                                            className="col text-center align-middle"
                                            style={{
                                                minWidth: '20%',
                                                maxWidth: '20%',
                                            }}
                                        >
                                            {item?.location}
                                        </span>
                                        <span
                                            className="col text-center align-middle"
                                            style={{
                                                minWidth: '10%',
                                                maxWidth: '10%',
                                            }}
                                        >
                                            {formateDateYYYYMMDD(
                                                item?.joiningDate
                                            )}
                                        </span>
                                        <span
                                            className="col text-center align-middle"
                                            style={{
                                                minWidth: '5%',
                                                maxWidth: '5%',
                                            }}
                                        >
                                            {item?.isActive === true && (
                                                <button
                                                    className="btn bg-primary custom-btn-non-primary fw-bold px-3 me-1"
                                                    // onClick={() =>
                                                    //     handleBlockUser(item?._id)
                                                    // }
                                                >
                                                    {t(
                                                        'usertabledata.blockbutton'
                                                    )}
                                                </button>
                                            )}
                                            {item?.isActive === false && (
                                                <button
                                                    className="btn bg-primary custom-btn-non-primary fw-bold px-3 me-1"
                                                    // onClick={() =>
                                                    //     handleUnblockUser(item?._id)
                                                    // }
                                                >
                                                    {t(
                                                        'usertabledata.unblockbutton'
                                                    )}
                                                </button>
                                            )}
                                        </span>
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomTable;
