import React from 'react';
import { BiLike } from 'react-icons/bi';
import { FaCarRear } from 'react-icons/fa6';
import { GiCarSeat, GiPriceTag } from 'react-icons/gi';
import { IoLogoModelS } from 'react-icons/io';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import { SlCreditCard } from 'react-icons/sl';
import { Badge } from 'rsuite';
import { vehicleStatus } from '../../../../../helpers/constants/idConstants';
import { CgUnavailable } from 'react-icons/cg';
import { formateDateYYYYMMDD } from '../../../../../helpers/Functions/dateFormaters';
import date_picker from '../../../../../assets/images/date_picker.svg';
import { useTranslation } from 'react-i18next';

const DropTabOne = ({ data }) => {
    const [t] = useTranslation('global');
    return (
        <>
            <div
                style={{
                    minHeight: '237px',
                    maxHeight: '237px',
                }}
            >
                <div className="d-flex justify-content-between">
                    <div className="col d-flex align-items-center justify-content-between more_row">
                        <div className="col-2">
                            <FaCarRear size={30} />
                        </div>
                        <div className="col-4">
                            <h6>{t('droptabone.type')}</h6>
                        </div>
                        <div className="col-6 text-end">
                            <h6>{data?.vehicleType}</h6>
                        </div>
                    </div>
                    <div className="col d-flex align-items-center justify-content-between more_row">
                        <div className="col-2">
                            <GiCarSeat size={30} />
                        </div>
                        <div className="col-5">
                            <h6>{t('droptabone.passangercapacity')}</h6>
                        </div>
                        <div className="col-5 text-end">
                            <h6>{data?.seaters}</h6>
                        </div>
                    </div>
                    <div className="col d-flex align-items-center justify-content-between more_row">
                        <div className="col-2">
                            <GiPriceTag size={30} />
                        </div>
                        <div className="col-4">
                            <h6>{t('droptabone.price')}</h6>
                        </div>
                        <div className="col-6 text-end">
                            <h6>{data?.kmPrice} Rs.</h6>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-between">
                    <div className="col d-flex align-items-center justify-content-between more_row">
                        <div className="col-2">
                            <IoLogoModelS size={30} />
                        </div>
                        <div className="col-4">
                            <h6>{t('droptabone.modalno')}</h6>
                        </div>
                        <div className="col-6 text-end">
                            <h6>{data?.modelNumber}</h6>
                        </div>
                    </div>
                    <div className="col d-flex align-items-center justify-content-between more_row">
                        <div className="col-2">
                            <SlCreditCard size={30} />
                        </div>
                        <div className="col-4">
                            <h6>{t('droptabone.vehicleno')}</h6>
                        </div>
                        <div className="col-6 text-end">
                            <h6>{data?.vehicleNumber}</h6>
                        </div>
                    </div>
                    <div className="col d-flex align-items-center justify-content-between more_row">
                        <div className="col-2">
                            <BiLike size={30} />
                        </div>
                        <div className="col-4">
                            <h6>{t('droptabone.isactive')}</h6>
                        </div>
                        <div className="col-6 d-flex align-items-center justify-content-end">
                            <Badge
                                color={`${data?.isActive ? 'green' : 'red'}`}
                                className="large-badge me-3"
                            />
                            <h6>{data?.isActive === true ? 'Yes' : 'No'}</h6>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-between">
                    <div className="col d-flex align-items-center justify-content-between more_row">
                        <div className="col-2">
                            {/* <IoLogoModelS size={30} /> */}
                            <img
                                src={date_picker}
                                style={{
                                    height: '30px',
                                    width: '30px',
                                }}
                            />
                        </div>
                        <div className="col-4">
                            <h6>{t('droptabone.joiningdate')}</h6>
                        </div>
                        <div className="col-6 text-end">
                            <h6>{formateDateYYYYMMDD(data?.joiningDate)}</h6>
                        </div>
                    </div>
                    <div className="col d-flex align-items-center justify-content-between more_row">
                        <div className="col-2">
                            <IoCheckmarkDoneCircleSharp size={30} />
                        </div>
                        <div className="col-4">
                            <h6>{t('droptabone.status')}</h6>
                        </div>
                        <div className="col-6 d-flex align-items-center justify-content-end">
                            <Badge
                                color={`${
                                    data?.isApprove === vehicleStatus?.requested
                                        ? 'yellow'
                                        : data?.isApprove ===
                                          vehicleStatus?.rejected
                                        ? 'red'
                                        : data?.isApprove ===
                                          vehicleStatus?.approved
                                        ? 'green'
                                        : ''
                                }`}
                                className="large-badge me-3"
                            />
                            <h6>
                                {data?.isApprove === vehicleStatus?.requested
                                    ? 'Pending'
                                    : data?.isApprove ===
                                      vehicleStatus?.rejected
                                    ? 'Rejected'
                                    : data?.isApprove ===
                                      vehicleStatus?.approved
                                    ? 'Approved'
                                    : ''}
                            </h6>
                        </div>
                    </div>
                    <div className="col d-flex align-items-center justify-content-between more_row">
                        <div className="col-2">
                            <CgUnavailable size={30} />
                        </div>
                        <div className="col-4">
                            <h6>{t('droptabone.available')}</h6>
                        </div>
                        <div className="col-6 d-flex align-items-center justify-content-end">
                            <Badge
                                color={`${
                                    data?.availability ? 'green' : 'red'
                                }`}
                                className="large-badge me-3"
                            />
                            <h6>
                                {data?.availability === true ? 'Yes' : 'No'}
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DropTabOne;
