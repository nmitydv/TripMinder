import { useTranslation } from 'react-i18next';
import { imageBaseUrl } from '../../../helpers/constants/idConstants';
import '../pages/styles/UserCard.css';
// import { User } from '../../../helpers/types/apiDataTypes';

const UserCard = ({ data }) => {
    const [t] = useTranslation('global');
    return (
        <>
            {/* <div className='container'> */}

            <div className="user_card col d-flex">
                <div className="user_card_body col d-flex">
                    <div className="col-5">
                        <img
                            src={`${imageBaseUrl}${data?.profilePicture}`}
                            //src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNR7FvvC_9X1l2xqi2rdkStAHaSRMmg89O_g&usqp=CAU'}
                            className="profile_img_user w-100 p-1"
                            alt=""
                        />
                    </div>

                    <div className="col-7 d-flex justify-content-between ">
                        <div className="row d-flex">
                            <div className="row mb-2">
                                <div className="col-4">
                                    {t('adminuserinfo.name')}
                                </div>
                                <div className=" col-8">{data?.name} </div>
                            </div>

                            <div className="row d-flex mb-2">
                                <div className="col-4">
                                    {t('adminuserinfo.age')}
                                </div>
                                <div className=" col-8">{data?.age}</div>
                            </div>

                            <div className="row d-flex mb-2">
                                <div className="col-4">
                                    {t('adminuserinfo.gender')}
                                </div>
                                <div className=" col-8 ">{data?.gender}</div>
                            </div>

                            <div className="row d-flex mb-2">
                                <div className="col-4">
                                    {t('adminuserinfo.location')}
                                </div>
                                <div className="col-8">{data?.location}</div>
                            </div>

                            <div className="row d-flex mb-2">
                                <div className="col-4">
                                    {t('adminuserinfo.contact')}{' '}
                                </div>
                                <div className="col-8">
                                    {data?.mobileNumber}
                                </div>
                            </div>

                            <div className="row d-flex mb-2">
                                <div className="col-4">
                                    {t('adminuserinfo.email')}{' '}
                                </div>
                                <div className="col-8 text-break">
                                    {data?.email}
                                    {/* 'shubhammeena1913@gmail.com' */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </>
    );
};
export default UserCard;
