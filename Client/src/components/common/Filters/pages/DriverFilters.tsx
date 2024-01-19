import {
    Checkbox,
    CheckboxGroup,
    InputGroup,
    InputNumber,
    RangeSlider,
    TagInput,
} from 'rsuite';
import '../styles/VehicleFilters.css';
import {
    vehicleTypeOptions,
    vehicleTypeOptionsDriver,
} from '../../../../helpers/constants/idConstants';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/VehicleFilters.css';
import { FaSearch } from 'react-icons/fa';
const DriverFilters = ({
    vehicleData,
    handleAppliedFilters,
    searchValues,
    handleSearch,
}) => {
    const [t] = useTranslation('global');
    const location = useLocation();
    const navigate = useNavigate();

    const [selectedVehicleType, setSelectedVehicleType] = useState(null);
    const [selectedPriceRange, setSelectedPriceRange] = useState([0, 0]);
    const [selectedExprience, setSelectedExprience] = useState([0, 0]);

    const [isValidInput, setIsValidInput] = useState(true);

    // // //(
    //     'Selected Driver Price Range: ',
    //     selectedSeaters[0],
    //     selectedSeaters[1]
    // );

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
        const appliedFilters = {
            paymentRange: selectedPriceRange,
            exprienceRange: selectedExprience,
            vehiclesType: selectedVehicleType,
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
            <div>
                <h4 className="fw-bold filter_heading">
                    {t('driver.headings')}
                </h4>
            </div>
            <CheckboxGroup
                name="vehicleType"
                value={selectedVehicleType}
                onChange={handleTabChange}
                className="mt-3"
            >
                <div className="row">
                    {vehicleTypeOptionsDriver.map((item) => (
                        <div
                            className="col-12 d-flex align-items-center"
                            key={item}
                        >
                            <div className="fw-bold filter_lable">
                                <Checkbox
                                    value={item}
                                    style={{
                                        fontSize: '18px',
                                        fontWeight: 'bolder',
                                    }}
                                >
                                    {item} {t('driver.headings')}
                                </Checkbox>
                            </div>
                        </div>
                    ))}
                </div>
            </CheckboxGroup>

            <div>
                <h4 className="fw-bold mt-5 mb-3 filter_heading">
                    {t('driver.pricerange')}
                </h4>
            </div>

            <RangeSlider
                min={0}
                max={2000}
                progress
                style={{ marginTop: 16 }}
                value={selectedPriceRange}
                onChange={(value) => {
                    setSelectedPriceRange(value);
                }}
            />

            {/* <InputGroup className='d-flex mt-4'> */}
            {/* <div className="d-flex align-items-center mt-3">
                <InputNumber
                    min={0}
                    max={5000}
                    value={selectedPriceRange[0]}
                    onChange={(nextValue) => {
                        const [start, end] = selectedPriceRange;
                        if (nextValue > end) {
                            return;
                        }
                        setSelectedPriceRange([nextValue, end]);
                    }}
                    className="w-50 me-2"
                />
                <span className="fw-bold">To</span>
                <InputNumber
                    min={0}
                    max={5000}
                    value={selectedPriceRange[1]}
                    className=""
                    onChange={(nextValue) => {
                        const [start, end] = selectedPriceRange;
                        if (start > nextValue) {
                            return;
                        }
                        setSelectedPriceRange([start, nextValue]);
                    }}
                    className="w-50 ms-2"
                />
            </div> */}
            {/* </InputGroup> */}

            <div>
                <h4 className="fw-bold mt-5 mb-3 filter_heading">
                    {t('driver.experiencerange')}
                </h4>
            </div>

            <RangeSlider
                min={0}
                max={30}
                progress
                style={{ marginTop: 16 }}
                value={selectedExprience}
                onChange={(value) => {
                    setSelectedExprience(value);
                }}
            />

            {/* <div className="d-flex align-items-center mt-3">
                <InputNumber
                    min={0}
                    max={50}
                    value={selectedExprience[0]}
                    onChange={(nextValue) => {
                        const [start, end] = selectedExprience;
                        if (nextValue > end) {
                            return;
                        }
                        setSelectedExprience([nextValue, end]);
                    }}
                    className="w-50 me-2"
                />
                <span className="fw-bold">To</span>
                <InputNumber
                    min={0}
                    max={50}
                    value={selectedExprience[1]}
                    className=""
                    onChange={(nextValue) => {
                        const [start, end] = selectedExprience;
                        if (start > nextValue) {
                            return;
                        }
                        setSelectedExprience([start, nextValue]);
                    }}
                    className="w-50 ms-2"
                />
            </div> */}

            <div className="mt-5 d-flex justify-content-end align-items-center">
                <button
                    className="btn apply_filter_btn fw-bold"
                    onClick={() => applyFilters()}
                >
                    {t('driver.filterbutton')}
                </button>
            </div>

            {/* <div className='mb-0'>
                <img
                style={{ width: '100%', height: '100%' }}
                src="https://img.freepik.com/free-vector/road-trip-by-car-summer-vacation-travel-trip_107791-9489.jpg?w=1380&t=st=1701772173~exp=1701772773~hmac=44569d256cfad7120e8cc208862ae673a49498206d923f252c1f984e55e4d1fb" alt="" />
            </div> */}
        </>
    );
};

export default DriverFilters;
