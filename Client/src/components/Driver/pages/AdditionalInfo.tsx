import React, { useRef, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useGetUserByEmailQuery } from '../../../redux/services/authServices';
// import { useCreateDriverByIdMutation } from '../../../redux/services/driverServices';
import '../styles/Dashboard.css';
import { VscCloudUpload } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaFileUpload } from 'react-icons/fa';
import { TagPicker } from 'rsuite';
import { vehicleTypeOptionsDriver } from '../../../helpers/constants/idConstants';
import { useCreateDriverByIdMutation } from '../../../redux/services/commonServices';

function AdditionalInfo({
    personlInfo,
    setShowPageLoader,
    sendUserCreate,
}: {
    personlInfo: any;
    setShowPageLoader: any;
    sendUserCreate: any;
}) {
    const [t] = useTranslation('global');
    const userid = localStorage.getItem('userId');
    const email = localStorage.getItem('email');
    const [imageData, setImageData] = useState('');
    const licenceRef = useRef();
    const navigate = useNavigate();

    const [createDriver, response] = useCreateDriverByIdMutation();

    // async function uplodeimage(e){
    //     const file = e.target.files[0];
    //     const base64 = await convertBase64(file);
    //     // //(base64)
    // }
    // function convertBase64 (file) {
    //    return new Promise((resolve,reject) => {
    //     let filereder = new FileReader();
    //      filereder = readAsDataURL(file)

    //      filereder.onload = () => {
    //         resolve(filereder.result);
    //      }

    //      filereder.onerror = ((error) => {
    //            reject(error);
    //      })

    //    })
    // }
    const [selectedVehicleTypes, setSelectedVehicleTypes] = useState([]); // State to store selected vehicle types

    const data = [...vehicleTypeOptionsDriver].map((item) => ({
        label: item,
        value: item,
    }));

    // //('selectedVehicleTypes......', selectedVehicleTypes);

    const postimage = (event, setFieldValue) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const base64Image = e?.target?.result;
            setFieldValue('drivingLicence', base64Image);
            setImageData(base64Image);
        };
        reader.readAsDataURL(file);
    };
    // //('.....image', imageData);

    const initialData = {
        adharNumber: '',
        experience: '',
        vehicleType: [],
        licenseNumber: '',
        drivingLicence: '',
        description: '',
        dayWisePrice: '',
        // availability: 'free',
    };
    const validationSchema = Yup.object({
        adharNumber: Yup.string()
            .matches(/^\d{12}$/, t('validationInfomation.adhar'))
            .required(t('validationInfomation.adhar2')),
        experience: Yup.string().required(t('validationInfomation.experience')),
        // vehicleType: Yup.string().required(t('validationInfomation.vehicle')),
        licenseNumber: Yup.string().required(
            t('validationInfomation.LicenseNumber')
        ),
        // drivingLicence: Yup.string().required('Driving Licence is required'),
        description: Yup.string().required(
            t('validationInfomation.description')
        ),
        dayWisePrice: Yup.number().required(t('validationInfomation.price')),
    });

    const handleSubmit = async (values: any) => {
        setShowPageLoader(true);
        // // //(personlInfo);
        // // //(values);
        // // //(imageData);
        try {
            const resp1 = await sendUserCreate(personlInfo);
            // console.log('resp1-------', resp1?.data?.data?._id);

            const userID = resp1?.data?.data?._id;
            console.log('Before set time out', userID);
            // setShowPageLoader(true);
            setTimeout(async () => {
                console.log('Inside setTimeout', userID);
                // if (userID) {
                values.userId = userID;
                const resp2 = await createDriver(values);
                // //('resp2-------', resp2);
                console.log('resp2......', resp2);
                if (resp2?.data) {
                    setShowPageLoader(false);
                    navigate('/driver/bookings');
                    localStorage.setItem('driverId', resp2?.data?.data?._id);
                }
                // }
            }, 2000);

            // await createDriver(values);
            // const userID =

            // }
        } catch (error) {
            setShowPageLoader(false);
        }
    };

    // //('responce......././///.//../.', response);

    return (
        <>
            <Formik
                initialValues={initialData}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                {({ setFieldValue }) => (
                    <Form>
                        <div className="row">
                            <div className="col-8">
                                <div className="row">
                                    <div className="col-6 d-flex flex-column justify-content-lg-start justify-content-center mt-4 position-relative">
                                        <Field
                                            type="text"
                                            className="form-control input__field"
                                            placeholder=" "
                                            id="adharNumber"
                                            name="adharNumber"
                                        />
                                        <label
                                            htmlFor="adharNumber"
                                            className="lable__box"
                                        >
                                            {t(
                                                'validationInfomation.AdharNumber'
                                            )}
                                        </label>
                                        <div className="err_div mb-3 mt-0">
                                            <p className="text-danger stu_sign_err pt-1">
                                                <ErrorMessage name="adharNumber" />
                                            </p>
                                        </div>
                                    </div>

                                    <div className="col-6 d-flex flex-column justify-content-lg-start justify-content-center mt-4 position-relative">
                                        <Field
                                            type="number"
                                            className="form-control input__field"
                                            placeholder=" "
                                            id="experience"
                                            name="experience"
                                        />
                                        <label
                                            htmlFor="experience"
                                            className="lable__box"
                                        >
                                            {t(
                                                'validationInfomation.experience2'
                                            )}
                                        </label>
                                        <div className="err_div mb-3 mt-0">
                                            <p className="text-danger stu_sign_err pt-1">
                                                <ErrorMessage name="experience" />
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-6 d-flex flex-column justify-content-lg-start justify-content-center mt-4 position-relative">
                                        {/* <Field
                                        type="text"
                                        className="form-control input__field"
                                        placeholder=" "
                                        id="vehicleType"
                                        name="vehicleType"
                                    /> */}
                                        <TagPicker
                                            data={data}
                                            value={selectedVehicleTypes}
                                            onChange={(values) => {
                                                setSelectedVehicleTypes(values);
                                                setFieldValue(
                                                    'vehicleType',
                                                    values
                                                );
                                            }}
                                            // placeholder="Vehicle Types"
                                            placeholder={t('validationInfomation.vehicletypeplaceholder')}
                                            // style={{ width: 300 }}
                                        />
                                        {/* <label
                                        htmlFor="vehicleType"
                                        className="lable__box"
                                    >
                                        {t('validationInfomation.vehicle2')}
                                    </label> */}
                                        <div className="err_div mb-3 mt-0">
                                            <p className="text-danger stu_sign_err pt-1">
                                                <ErrorMessage name="vehicleType" />
                                            </p>
                                        </div>
                                    </div>

                                    <div className="col-6 d-flex flex-column justify-content-lg-start justify-content-center mt-4 position-relative">
                                        <Field
                                            type="text"
                                            className="form-control input__field"
                                            placeholder=" "
                                            id="licenseNumber"
                                            name="licenseNumber"
                                        />
                                        <label
                                            htmlFor="licenseNumber"
                                            className="lable__box"
                                        >
                                            {t(
                                                'validationInfomation.LicenseNumber2'
                                            )}
                                        </label>
                                        <div className="err_div mb-3 mt-0">
                                            <p className="text-danger stu_sign_err pt-1">
                                                <ErrorMessage name="licenseNumber" />
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-6 d-flex flex-column justify-content-lg-start justify-content-center mt-4 position-relative">
                                        <Field
                                            type="number"
                                            className="form-control input__field"
                                            placeholder=" "
                                            id="dayWisePrice"
                                            name="dayWisePrice"
                                        />
                                        <label
                                            htmlFor="dayWisePrice"
                                            className="lable__box"
                                        >
                                            {t(
                                                'validationInfomation.priceofday'
                                            )}
                                        </label>
                                        <div className="err_div mb-3 mt-0">
                                            <p className="text-danger stu_sign_err pt-1">
                                                <ErrorMessage name="dayWisePrice" />
                                            </p>
                                        </div>
                                    </div>

                                    <div className="col-6 d-flex flex-column justify-content-lg-start justify-content-center mt-4 position-relative">
                                        <Field
                                            type="textarea"
                                            className="form-control input__field"
                                            placeholder=" "
                                            id="description"
                                            name="description"
                                        />
                                        <label
                                            htmlFor="description"
                                            className="lable__box"
                                        >
                                            {t('validationInfomation.about')}
                                        </label>
                                        <div className="err_div mb-3 mt-0">
                                            <p className="text-danger stu_sign_err pt-1">
                                                <ErrorMessage name="description" />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-4 d-flex justify-content-center align-items-center ps-3">
                                <div
                                    className="image_box d-flex justify-content-center align-items-center"
                                    onClick={() => {
                                        licenceRef?.current?.click();
                                    }}
                                >
                                    {imageData.length <= 0 ? (
                                        <>
                                            <div>
                                                <VscCloudUpload
                                                    size={130}
                                                    color="#5A607F"
                                                />
                                                <div className="text-center upload_txt fw-bold">
                                                    Upload Licence
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <img
                                            src={imageData}
                                            alt=""
                                            height={'220px'}
                                            width={'190px'}
                                            style={{
                                                borderRadius: '14px',
                                            }}
                                        />
                                    )}
                                </div>

                                <Field name="drivingLicence">
                                    {({ form }) => {
                                        const { setFieldValue } = form;
                                        return (
                                            <input
                                                className="form-control upload__border input__field"
                                                ref={licenceRef}
                                                type="file"
                                                onChange={(e) =>
                                                    postimage(e, setFieldValue)
                                                }
                                                hidden
                                            />
                                        );
                                    }}
                                </Field>
                                <div className="err_div mb-3 mt-0">
                                    <p className="text-danger stu_sign_err pt-1">
                                        <ErrorMessage name="drivingLicence" />
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="d-none"
                            id="driver_additional_info_btn"
                        >
                            {t('usertype.submit')}
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default AdditionalInfo;
