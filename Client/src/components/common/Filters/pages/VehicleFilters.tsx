import { Checkbox, CheckboxGroup, TagInput } from 'rsuite';
import '../styles/VehicleFilters.css';
import { vehicleTypeOptions } from '../../../../helpers/constants/idConstants';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSearch } from 'react-icons/fa';

const VehicleFilters = ({
    vehicleData,
    handleAppliedFilters,
    searchValues,
    handleSearch,
}) => {
    // const location = useLocation();
    // const navigate = useNavigate();
    const [t] = useTranslation('global');
    const seaterOptions = [
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
    ];

    const [selectedVehicleType, setSelectedVehicleType] = useState(null);
    const [selectedSeaters, setSelectedSeaters] = useState([]);
    const [isValidInput, setIsValidInput] = useState(true);

    const handleTabChange = (value) => {
        setSelectedVehicleType(value);
    };

    const handleSeaters = (values) => {
        const isValid = values.every((value) => /^\d+$/.test(value));
        setIsValidInput(isValid);
        if (isValid) {
            setSelectedSeaters(values);
        }
    };

    const onChangeSearch = (e) => {
        handleSearch(e.target.value);
    };

    const applyFilters = () => {
        let appliedFilters = {
            vehicleType: selectedVehicleType,
            seater: selectedSeaters,
        };

        handleAppliedFilters(appliedFilters);
    };

    return (
        <>
            <img
                style={{ width: '100%', height: '25%', borderRadius: '10px' }}
                className=" img-fluid"
                src="https://img.freepik.com/free-vector/road-trip-by-car-summer-vacation-travel-trip_107791-9489.jpg?w=1380&t=st=1701772173~exp=1701772773~hmac=44569d256cfad7120e8cc208862ae673a49498206d923f252c1f984e55e4d1fb"
                alt=""
            />

            <div className="mt-4 mb-4">
                <div className="d-flex align-items-center">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        className="form-control search_input"
                        value={searchValues}
                        onChange={onChangeSearch}
                    />
                    <span className="search_btn">
                        {' '}
                        <FaSearch />
                    </span>
                </div>
            </div>
            <div className="mt-2">
                <h4 className="fw-bold filter_heading">
                    {t('vehiclefilter.heading')}
                </h4>
            </div>
            <CheckboxGroup
                name="vehicleType"
                value={selectedVehicleType}
                onChange={handleTabChange}
                className="mt-3"
            >
                <div className="row">
                    {vehicleTypeOptions.map((item) => (
                        <div
                            className="col-12 d-flex align-items-center"
                            key={item}
                        >
                            <div style={{ height: '45px' }}>
                                <Checkbox
                                    value={t(item)}
                                    style={{
                                        fontSize: '18px',
                                        fontWeight: 'bolder',
                                    }}
                                >
                                    {t(item)} {t('driver.headings')}
                                </Checkbox>
                            </div>
                        </div>
                    ))}
                </div>
            </CheckboxGroup>

            <div>
                <h4 className="fw-bold mt-5 mb-3 filter_heading">
                    {t('vehiclefilter.subheading')}
                </h4>
            </div>
            <div style={{ width: '100%' }}>
                <TagInput
                    block
                    size="lg"
                    placeholder={t('vehiclefilter.passangerplaceholder')}
                    data={seaterOptions}
                    value={selectedSeaters}
                    className="tagInput"
                    onChange={handleSeaters}
                    onInputChange={(inputValue) =>
                        /^\d*$/.test(inputValue) ? inputValue : ''
                    }
                />
                {!isValidInput && (
                    <p className="text-danger mt-2">
                        {t('vehiclefilter.filtervalidation')}
                    </p>
                )}
            </div>

            <div className="mt-5 d-flex justify-content-end align-items-center">
                <button
                    className="btn apply_filter_btn fw-bold"
                    onClick={() => applyFilters()}
                >
                    {t('vehiclefilter.filterbutton')}
                </button>
            </div>
            {/* <img
                style={{ width: '100%', height: '25%' }}
                src="https://img.freepik.com/free-vector/road-trip-by-car-summer-vacation-travel-trip_107791-9489.jpg?w=1380&t=st=1701772173~exp=1701772773~hmac=44569d256cfad7120e8cc208862ae673a49498206d923f252c1f984e55e4d1fb"
                alt=""
            />
            <div>
                <h4>Search according to your ... </h4>
            </div>
            <h5 className="filter_heading mt-3">{t('vehiclefilter.heading')}</h5>
            <div>
                <div className=" d-flex mx-3 my-2">
                    <div className="form-check mt-2 me-5">
                        <input
                            className="form-check-input filter_checkBox"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                        />
                        <label
                            className="form-check-label filter_lable"
                            for="flexCheckDefault"
                        >
                            Two
                        </label>
                    </div>
                    <div className="form-check mt-2 mx-5">
                        <input
                            className="form-check-input filter_checkBox"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                        />
                        <label
                            className="form-check-label filter_lable"
                            for="flexCheckDefault"
                        >
                            Three
                        </label>
                    </div>
                </div>

                <div className=" d-flex mx-3 my-2">
                    <div className="form-check mt-2 me-5">
                        <input
                            className="form-check-input filter_checkBox"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                        />
                        <label
                            className="form-check-label filter_lable"
                            for="flexCheckDefault"
                        >
                            Four
                        </label>
                    </div>
                    <div className="form-check mt-2 mx-5">
                        <input
                            className="form-check-input filter_checkBox"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                        />
                        <label
                            className="form-check-label filter_lable"
                            for="flexCheckDefault"
                        >
                            Six
                        </label>
                    </div>
                </div>

                <div className=" d-flex mx-3 my-2">
                    <div className="form-check mt-2 me-5">
                        <input
                            className="form-check-input filter_checkBox"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                        />
                        <label
                            className="form-check-label filter_lable"
                            for="flexCheckDefault"
                        >
                            Eight
                        </label>
                    </div>

                    <div className="form-check mt-2 mx-5    ">
                        <input
                            className="form-check-input filter_checkBox"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                        />
                        <label
                            className="form-check-label filter_lable"
                            for="flexCheckDefault"
                        >
                            twelve
                        </label>
                    </div>
                </div>
            </div>

            <h5 className="filter_heading mt-4">  {t('vehiclefilter.subheading')}</h5>
            <div className="mt-3">
                {' '}
                <div style={{ width: '100%' }} className="">
                    <TagInput
                        block
                        size="lg"
                        placeholder={t('vehiclefilter.passangerplaceholder')}
                        data={seaterOptions}
                        value={selectedSeaters}
                        onChange={handleSeaters}
                        onInputChange={(inputValue) =>
                            /^\d*$/.test(inputValue) ? inputValue : ''
                        }
                    />
                    {!isValidInput && (
                        <p className="text-danger mt-2">
                            {t('vehiclefilter.filtervalidation')}
                        </p>
                    )}
                </div>
            </div>
            <div className="mt-4 ">
                <button
                    className="btn btn-outline-primary w-100"
                    onClick={() => applyFilters()}
                >
                    Search */}
            {/* {t('vehiclefilter.filterbutton')} */}
            {/* </button>
            </div> */}
        </>
    );
};

export default VehicleFilters;
