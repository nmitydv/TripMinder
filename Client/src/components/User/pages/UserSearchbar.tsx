import { Field, Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from 'react';
import '../style/UserSearchbar.css';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { formateDateYYYYMMDD } from '../../../helpers/Functions/dateFormaters';
import { useTranslation } from 'react-i18next';

const UserSearchbar = () => {
    const [t] = useTranslation('global');
    interface searchData {
        pickupLocation: string;
        dropLocation: string;
        startDate: string;
        endDate: string;
    }
    const navigate = useNavigate();

    const [inputdata, setInputdata] = useState({
        pickupLocation: '',
        dropLocation: '',
        startDate: new Date(),
        endDate: new Date(),
    });

    function changehandle(e: any) {
        setInputdata({
            ...inputdata,
            pickupLocation: e.target.value,
        });
    }

    const initialData = {
        pickupLocation: '',
        dropLocation: '',
        startDate: new Date(),
        endDate: new Date(),
    };
    // //('Initial data', initialData);
    const validation_Schema = yup.object({

    });

    const onSubmit = (para: searchData) => {
        // //(para);
        const existingSearchParams = new URLSearchParams(location.search);
        existingSearchParams.set('pickupLocation', para.pickupLocation);
        existingSearchParams.set('dropLocation', para.dropLocation);

        const options = {
            pathname: `/user/dashboard/${formateDateYYYYMMDD(
                para.startDate
            )}/${formateDateYYYYMMDD(para.endDate)}`,
            search: `?${existingSearchParams.toString()}`,
        };
        navigate(options);
    };

    return (
        <>
            <div className="container-fluid row gx-2 d-flex col-lg-12 col-md-12 ">
                <div className="col-12 search_all">
                    <div className="d-flex">
                        <Formik
                            initialValues={initialData}
                            validationSchema={validation_Schema}
                            onSubmit={onSubmit}
                        >
                            <Form className="d-flex col-12  rounded text_size align-items-center">
                                <div className="d-flex justify-content-evenly align-items-center col-12 text_size p-3 text_size">
                                    {/* <div className="d-flex flex-column m-1">
                                        <label>{t('searchbar.pickup')} </label>
                                        <Field
                                            type="text"
                                            name="pickupLocation"
                                            placeholder={t(
                                                'searchbar.pickupplaceholder'
                                            )}
                                            className="form_widt form-control text_size"
                                        ></Field>
                                        <p className="text-danger element">
                                            <ErrorMessage name="pickupLocation" />{' '}
                                        </p>
                                    </div> */}


                                    {/* email......... */}

                                    {/* <div className="d-flex flex-column mt-1 position-relative">
                                        <Field
                                            type="text"
                                            className="form-control input__field"
                                            placeholder=" "
                                            id="pickupLocation"
                                            name="pickupLocation"
                                            readOnly={false}
                                        />
                                        <label
                                            htmlFor="pickupLocation"
                                            className="lable__box"
                                        >
                                            Pick-up 
                                        </label>
                                        <div className="err_div mb-3 mt-0">
                                            <p className="text-danger stu_sign_err pt-1">
                                                <ErrorMessage name="pickupLocation" />
                                            </p>
                                        </div>
                                    </div> */}

                                    <div className="d-flex flex-column mt-1">
                                    <label>{t('searchbar.pickup')} </label>
                                        <Field
                                            type="text"
                                            className="form-control form_widt"
                                            // placeholder=" "
                                            placeholder={t(
                                                'searchbar.pickupplaceholder'
                                            )}
                                            id="pickupLocation"
                                            name="pickupLocation"
                                            readOnly={false}
                                            // style={{
                                            //     fontSize: '1rem'
                                            // }}
                                        />
                                         <p className="text-danger element">
                                            <ErrorMessage name="pickupLocation" />{' '}
                                        </p>
                                    </div>

                                    <div className="d-flex flex-column m-1">
                                        <label>{t('searchbar.drop')} </label>
                                        <Field
                                            type="text"
                                            name="dropLocation"
                                            placeholder={t(
                                                'searchbar.dropplaceholder'
                                            )}
                                            className="form_widt form-control"
                                        ></Field>
                                        <p className="text-danger element">
                                            <ErrorMessage name="dropLocation" />{' '}
                                        </p>
                                    </div>
                                    <div className="d-flex flex-column m-1">
                                        <label>
                                            {t('searchbar.pickupdate')}
                                        </label>
                                        <Field
                                            type="text"
                                            name="startDate"
                                            // placeholder="Enter Pickup Date"
                                            placeholder= {t('searchbar.pickupdatePlaceholder')}
                                            className="form-control form_widt "
                                            value={inputdata.startDate}
                                            onChange={changehandle}
                                        >
                                            {({ field, form }: any) => (
                                                <DatePicker
                                                    id="startDate"
                                                    className="form-control form_widt"
                                                    autoComplete="off"
                                                    {...field}
                                                    selected={field.value}
                                                    onChange={(date) =>
                                                        form.setFieldValue(
                                                            field.name,
                                                            date
                                                        )
                                                    }
                                                    minDate={new Date()}
                                                />
                                            )}
                                        </Field>
                                        <p className="text-danger element">
                                            <ErrorMessage name="startDate" />{' '}
                                        </p>
                                    </div>
                                    <div className="d-flex flex-column m-1">
                                        <label htmlFor="Drop_date">
                                            {t('searchbar.Dropdate')}
                                        </label>
                                        <Field
                                            type="text"
                                            name="endDate"
                                            // placeholder="Enter Drop Date"
                                            placeholder= {t('searchbar.dropdatePlaceholder')}
                                            className="form-control form_widt"
                                        >
                                            {({ field, form }: any) => (
                                                <DatePicker
                                                    id="endDate"
                                                    className="form-control form_widt"
                                                    autoComplete="off"
                                                    {...field}
                                                    selected={field.value}
                                                    onChange={(date) =>
                                                        form.setFieldValue(
                                                            field.name,
                                                            date
                                                        )
                                                    }
                                                    minDate={new Date()}
                                                />
                                            )}
                                        </Field>
                                        <p className="text-danger element">
                                            <ErrorMessage name="endDate" />{' '}
                                        </p>
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center mt-3">
                                        <button
                                            className="search_button "
                                            type="submit"
                                        >
                                            {' '}
                                            <FiSearch /> {t('searchbar.search')}
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    );
};
export default UserSearchbar;
