import React from 'react';
// import { FaCar, FaUserCheck } from 'react-icons/fa6';
import { MdOutlineEqualizer } from 'react-icons/md';

import { TiTickOutline } from 'react-icons/ti';
import { RxTimer } from 'react-icons/rx';
import { MdErrorOutline } from 'react-icons/md';
import { CardLoader } from '../../../common/Loaders/Loaders';
import '../pages/styles/Count.css';
// import { useTranslation } from 'react-i18next';
interface CountEntryProps {
    countsEntry: {
        name: string;
        value: number;
    }[];
    countLoading: boolean;
}

const Count: React.FC<CountEntryProps> = ({ countsEntry, countLoading }) => {
    // const [t] = useTranslation('global');
    return (
        <>
            <div>
                <div className="col-12 d-flex flex-column">
                    <div className="row row-cols-1 row-cols-md-4 mb-1">
                        {countsEntry &&
                            countsEntry?.map((item, index) => (
                                <div className="col mb-2">
                                    <div className="Admin_count_cards px-3 py-3 mt-0">
                                        {!countLoading ? (
                                            <>
                                                <div className="count_card-body d-flex justify-content-between ">
                                                    <div className="d-block ms-3">
                                                        <div className="title fw-medium">
                                                            {' '}
                                                            {item?.name}
                                                        </div>
                                                        <div className="value fw-semibold">
                                                            {item?.value?.toString()}
                                                        </div>
                                                        {/* <div className="progress mt-2" style={{height:'5px'}}>
                                                            <div
                                                                className="progress-bar"
                                                                role="progressbar"
                                                                style={{height: '5px', width:'50%'}}
                                                            >
                                                               
                                                            </div>
                                                        </div> */}
                                                    </div>

                                                    <div className="expt-icon ms-5">
                                                        {index === 0 && (
                                                            <div className="expt-icon icon__1 d-flex justify-content-center align-items-center">
                                                                <MdOutlineEqualizer />
                                                            </div>
                                                        )}
                                                        {index === 1 && (
                                                            <div className="expt-icon icon__1 d-flex  justify-content-center align-items-center">
                                                                {' '}
                                                                <TiTickOutline />
                                                            </div>
                                                        )}
                                                        {index === 2 && (
                                                            <div className="expt-icon icon__1 d-flex  justify-content-center align-items-center">
                                                                {' '}
                                                                <RxTimer />
                                                            </div>
                                                        )}
                                                        {index === 3 && (
                                                            <div className="expt-icon icon__1 d-flex  justify-content-center align-items-center">
                                                                {' '}
                                                                <MdErrorOutline />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div
                                                className="d-flex justify-content-center align-items-center"
                                                // style={{ height: '92px' }}
                                            >
                                                <CardLoader />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}

                        {/* {countsEntry &&
                            countsEntry?.map((item, index) => (
                                <div className="col mb-2 ">
                                    <div className="card">
                                        {!countLoading ? (
                                            <>
                                                <div className="card-body">
                                                    <div>
                                                        {' '}
                                                        <span className="title">
                                                            {' '}
                                                            {item?.name}
                                                        </span>
                                                    </div>
                                                    <br />
                                                    <div className="value d-flex">
                                                        <i className="icon">
                                                            {index === 0 && (
                                                                <div className="expt-icon d-flex justify-content-center align-items-center">
                                                                    <FaCar />
                                                                </div>
                                                            )}
                                                            {index === 1 && (
                                                                <div className="expt-icon d-flex justify-content-center align-items-center">
                                                                    {' '}
                                                                    <FaUserCheck />
                                                                </div>
                                                            )}
                                                            {index === 2 && (
                                                                <div className="expt-icon d-flex justify-content-center align-items-center">
                                                                    {' '}
                                                                    <FaRegCircleQuestion />
                                                                </div>
                                                            )}
                                                            {index === 3 && (
                                                                <div className="expt-icon d-flex justify-content-center align-items-center">
                                                                    {' '}
                                                                    <FaRegCircleQuestion />
                                                                </div>
                                                            )}
                                                        </i>{' '}
                                                        {item?.value?.toString()}
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div
                                                className="d-flex justify-content-center align-items-center"
                                                style={{ height: '92px' }}
                                            >
                                                <CardLoader />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))} */}
                    </div>
                </div>
            </div>
        </>
    );
};
export default Count;
