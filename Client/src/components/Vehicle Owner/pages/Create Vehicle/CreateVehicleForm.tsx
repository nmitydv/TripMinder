import React, { useRef, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { MdOutlineArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import * as yup from 'yup';
import '../../styles/CreateVehicleForm.css';
import ProgressCircle from './ProgressCircle';
import { useEffect } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Vehicle } from '../../../../helpers/types/apiDataTypes';
// import { useAddNewVehiclesMutation } from '../../../../redux/services/vehicleOwnerServices';
import imageCompression from 'browser-image-compression';
import { BsChevronDown, BsChevronUp, BsCloudUpload } from 'react-icons/bs';
import { CgClose } from 'react-icons/cg';
import { useTranslation } from 'react-i18next';
import { vehicleTypeOptions } from '../../../../helpers/constants/idConstants';
import Swal from 'sweetalert2';
import { useAddNewVehiclesMutation } from '../../../../redux/services/commonServices';
import PageLoader, { CarLoaderModal } from '../../../../common/Loaders/Loaders';
import { FaCarOn } from 'react-icons/fa6';

const ResumeMainPage = ({ onDone }) => {
    const [t] = useTranslation('global');
    const [sendCreateVehicle, responce] = useAddNewVehiclesMutation();
    const [step, setStep] = useState(1);
    const [circle] = useState(4);
    const [Active, setActive] = useState(1);
    const [width, setWidth] = useState(0);
    const [allFeatures, setFeatures] = useState('');
    const [newFeatures, setNewfeatures] = useState([]);
    const [imageData, setImageData] = useState('');
    const [newImageData, setNewImageData] = useState([]);
    const [numberPlatePic, setNumberPlatePic] = useState('');
    const fileref = useRef();
    const numberPlateRef = useRef();
    const [showPageLoader, setShowPageLoader] = useState(false);

    useEffect(() => {
        setWidth((100 / (circle - 1)) * Active * 1);
    }, [circle, Active]);
    const arr = [];

    const [drop_value, setValue] = useState('');
    const [toggle, setToggle] = useState();

    const value_drop = (anything) => {
        setValue(anything);
        setToggle(!toggle);
    };

    for (let i = 1; i < circle; i++) {
        arr.push(
            <ProgressCircle
                outerclass={
                    i <= Active ? 'dash__circle-rsm active' : 'dash__circle-rsm'
                }
                classname={i <= Active ? 'circle-rsm active' : 'circle-rsm'}
                key={i}
            >
                {i}
            </ProgressCircle>
        );
    }

    const prev = () => {
        // if (step > 1) {
        //     setStep((pre) => pre - 1);
        // }
        Active <= 1 ? setActive(1) : setActive(Active - 1);
    };
    const next = () => {
        Active >= circle - 1 ? setActive(circle - 1) : setActive(Active + 1);
    };
    // //(width);

    const handleSetFeatures = (value: string) => {
        console.log('..........', value);
        if (value) {
            setFeatures(value);
        }
    };

    const handleAddFeaturesBtn = () => {
        if (allFeatures.length > 0) {
            setNewfeatures([...newFeatures, allFeatures]);
        }
        setFeatures('');
    };

    const handleRemoveFeature = (index: number) => {
        newFeatures.splice(index, 1);
        setNewfeatures([...newFeatures]);
    };

    // // //('New Features : ', newFeatures);

    const initialvalue = {
        ownerId: localStorage.getItem('userId'),
        vehicleName: '',
        vehicleNumber: '',
        modelNumber: '',
        vehicleType: '',
        numberPlatePic: '',
        registrationNumber: '',
        kmPrice: 0,
        seaters: 0,
        description: '',

        features: [],

        vehiclePictures: [],
    };

    const validationSchema = [
        yup.object().shape({
            vehicleName: yup
                .string()
                .required(t('createvehicle.namevalidation')),
            vehicleNumber: yup
                .string()
                .required(t('createvehicle.numbervalidation')),
            modelNumber: yup
                .string()
                .required(t('createvehicle.modalnumbervalidation')),
            numberPlatePic: yup
                .string()
                .required(t('createvehicle.numbaerplatevalidation')),
            registrationNumber: yup
                .string()
                .required(t('createvehicle.registrationvalidation')),
            kmPrice: yup
                .number()
                .required(t('createvehicle.pricevalidation'))
                .min(1, t('createvehicle.minprice'))
                .max(100, t('createvehicle.maxprice')),
            seaters: yup
                .number()
                .required(t('createvehicle.seatervalidation'))
                .min(1, t('createvehicle.minseat'))
                .max(20, t('createvehicle.maxseat')),
            // vehiclePictures: yup
            //     .string()
            //     .required(t('createvehicle.vehiclePicturesvalidation')),
        }),
    ];

    const postimage = (event, setFieldValue) => {
        let files = event.target.files[0];
        const options = {
            maxSizeMB: 0.3,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };
        let reader = new FileReader();
        imageCompression(files, options).then((compressedimg) => {
            reader.readAsDataURL(compressedimg);
            reader.onload = (e) => {
                setImageData(e.target.result);
                setFieldValue('vehiclePictures', e.target.result);
                // //('WITH COMPRESSION IMAGE SIZE', e.target.result);
                setNewImageData([...newImageData, e.target.result]);
                setImageData('');
            };
        });
        // handleAddImagesBtn();
    };

    const postNumberPlate = (event, setFieldValue) => {
        let files = event.target.files[0];
        const options = {
            maxSizeMB: 0.3,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };
        let reader = new FileReader();
        imageCompression(files, options).then((compressedimg) => {
            reader.readAsDataURL(compressedimg);
            reader.onload = (e) => {
                setFieldValue('numberPlatePic', e.target.result);
                setNumberPlatePic(e.target.result);
            };
        });
    };

    const handleAddImagesBtn = () => {
        setNewImageData([...newImageData, imageData]);
        setImageData('');
    };

    const handleRemoveImages = (index: number) => {
        newImageData.splice(index, 1);
        setNewImageData([...newImageData]);
    };

    // //(imageData);
    const currentValidationSchema = validationSchema[step - 1];

    const submit = async (value: Vehicle, { setSubmitting }) => {
        if (step === 3) {
            setShowPageLoader(true);
            if (step === 2) {
                currentValidationSchema.fields.vehiclePictures = yup
                    .string()
                    .required(t('createvehicle.vehiclePicturesvalidation'));
            }
            value.features = newFeatures;
            value.vehiclePictures = newImageData;
            if (drop_value === 'चार' || drop_value === 'Four') {
                value.vehicleType = 'Four';
            } else if (drop_value === 'दो' || drop_value === 'Two') {
                value.vehicleType = 'Two';
            }
            try {
                const resp = await sendCreateVehicle(value);
                console.log('....Create Vehicle Success:', resp);
                if (resp?.data?.statusCode === 201) {
                    setShowPageLoader(false);
                    onDone();
                    Swal.fire({
                        title: t('createvehicle.title1'),
                        text: t('createvehicle.text1'),
                        icon: 'success',
                        confirmButtonText: t('booking.ok'),
                        showClass: {
                            popup: `
                          animate__animated
                          animate__fadeInUp
                          animate__faster
                        `,
                        },
                        hideClass: {
                            popup: `
                          animate__animated
                          animate__fadeOutDown
                          animate__faster
                        `,
                        },
                    });
                }
                if (resp?.error?.data?.statusCode === 400) {
                    setShowPageLoader(false);
                    Swal.fire({
                        // title: 'Invalid data',
                        title: t('createvehicle.title2'),
                        text: `${resp?.error?.data?.message}`,
                        icon: 'error',
                        showClass: {
                            popup: `
                          animate__animated
                          animate__fadeInUp
                          animate__faster
                        `,
                        },
                        hideClass: {
                            popup: `
                          animate__animated
                          animate__fadeOutDown
                          animate__faster
                        `,
                        },
                    });
                }
            } catch (error) {
                setShowPageLoader(false);
                Swal.fire({
                    // title: 'Error',
                    title: t('createvehicle.title3'),
                    // text: 'Error occured while creating vehicle, try again.',
                    text: t('createvehicle.text3'),
                    icon: 'error',
                    showClass: {
                        popup: `
                      animate__animated
                      animate__fadeInUp
                      animate__faster
                    `,
                    },
                    hideClass: {
                        popup: `
                      animate__animated
                      animate__fadeOutDown
                      animate__faster
                    `,
                    },
                });
            }
        } else {
            // //('Form Values : ', value);
            setStep((prev) => prev + 1);
            Active >= circle - 1
                ? setActive(circle - 1)
                : setActive(Active + 1);
            // Active >= circle - 1
            //     ? setActive(circle - 1)
            //     : setActive(Active + 1);
            setSubmitting(false);
        }
    };

    return (
        <>
            <div className="crt-rsm-body">
                <div className="row my-row d-flex w-100 align-items-center justify-content-around">
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="w-100 align-items-center">
                            <div className="p-progressbar-rsm d-flex justify-content-between align-items-center">
                                <div
                                    className="p-progress-rsm"
                                    style={{ width: width + '%' }}
                                ></div>
                                {arr}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center progress__tittle-rsm w-100">
                    <div className="text-title">
                        {t('createvehicle.basicdetails')}
                    </div>
                    <div className="text-title">
                        {t('createvehicle.features')}
                    </div>
                    <div className="text-title">{t('createvehicle.image')}</div>
                    {/* <div className="text-title">PREVIEW</div> */}
                </div>
                <Formik
                    initialValues={initialvalue}
                    validationSchema={currentValidationSchema}
                    onSubmit={submit}
                >
                    <Form>
                        <div className="form_content_box" id="style-2">
                            {step === 1 && (
                                <div className="page-1-items">
                                    <div
                                        className="row d-flex"
                                        style={{ marginBottom: '21px' }}
                                    >
                                        <div className="col d-flex flex-column justify-content-lg-end justify-content-center position-relative">
                                            <Field
                                                type="text"
                                                className="form-control input_field_rsm"
                                                placeholder=" "
                                                id="vehicleName"
                                                name="vehicleName"
                                            />
                                            <label
                                                htmlFor="vehicleName"
                                                className="lable_box_rsm"
                                            >
                                                {t('createvehicle.vehiclename')}
                                            </label>
                                            <div className="err_div mb-3 mt-0">
                                                <p className="text-danger stu_sign_err pt-1">
                                                    <ErrorMessage name="vehicleName" />
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col d-flex flex-column justify-content-lg-end justify-content-center position-relative">
                                            <Field
                                                type="text"
                                                className="form-control input_field_rsm"
                                                placeholder=" "
                                                id="vehicleNumber"
                                                name="vehicleNumber"
                                            />
                                            <label
                                                htmlFor="vehicleNumber"
                                                className="lable_box_rsm"
                                            >
                                                {t(
                                                    'createvehicle.vehiclenumber'
                                                )}
                                            </label>
                                            <div className="err_div mb-3 mt-0">
                                                <p className="text-danger stu_sign_err pt-1">
                                                    <ErrorMessage name="vehicleNumber" />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="row d-flex"
                                        style={{ marginBottom: '21px' }}
                                    >
                                        <div className="col d-flex flex-column justify-content-lg-end justify-content-center position-relative">
                                            <Field
                                                type="text"
                                                className="form-control input_field_rsm"
                                                placeholder=" "
                                                id="modelNumber"
                                                name="modelNumber"
                                            />
                                            <label
                                                htmlFor="modelNumber"
                                                className="lable_box_rsm"
                                            >
                                                {t('createvehicle.modelnumber')}
                                            </label>
                                            <div className="err_div mb-3 mt-0">
                                                <p className="text-danger stu_sign_err pt-1">
                                                    <ErrorMessage name="modelNumber" />
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col d-flex flex-column justify-content-lg-end justify-content-center position-relative">
                                            {/* <Field
                                                type="text"
                                                className="form-control input_field_rsm"
                                                placeholder=" "
                                                id="vehicleType"
                                                name="vehicleType"
                                            />
                                            <label
                                                htmlFor="vehicleType"
                                                className="lable_box_rsm"
                                            >
                                                {t('createvehicle.vehicletype')}
                                            </label> */}
                                            <div className="dropdown__bunddle">
                                                <div className="d-flex justify-content-center">
                                                    <Field
                                                        type="text"
                                                        id="vehicleType"
                                                        placeholder=" "
                                                        value={drop_value}
                                                        onChange={(e) => {
                                                            setValue(
                                                                e.target.value
                                                            );
                                                        }}
                                                        className="form-control input_field_rsm"
                                                        onFocus={() =>
                                                            setToggle(!toggle)
                                                        }
                                                        readOnly
                                                        name="vehicleType"
                                                    />
                                                    <label
                                                        htmlFor="Wheeler"
                                                        className="lable_box_rsm dropdown__lable"
                                                    >
                                                        {t(
                                                            'createvehicle.vehicletype'
                                                        )}
                                                    </label>

                                                    <span
                                                        onClick={() => {
                                                            setToggle(!toggle);
                                                        }}
                                                        className="dropdown__button"
                                                    >
                                                        {toggle ? (
                                                            <BsChevronUp />
                                                        ) : (
                                                            <BsChevronDown />
                                                        )}
                                                    </span>
                                                </div>
                                                {toggle && (
                                                    <div className="dropdown__option">
                                                        {vehicleTypeOptions?.map(
                                                            (item) => (
                                                                <div
                                                                    className="option_li"
                                                                    onClick={() => {
                                                                        value_drop(
                                                                            t(
                                                                                item
                                                                            )
                                                                        );
                                                                    }}
                                                                >
                                                                    {t(item)}
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                )}
                                                <div className="err_div mb-3 mt-0">
                                                    <p className="text-danger stu_sign_err pt-1">
                                                        <ErrorMessage name="vehicleType" />
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="row d-flex"
                                        style={{ marginBottom: '21px' }}
                                    >
                                        <div className="col d-flex flex-column justify-content-lg-end justify-content-center position-relative">
                                            <div className="upload_border d-flex align-items-center justify-content-between ps-2">
                                                {numberPlatePic ? (
                                                    <img
                                                        src={numberPlatePic}
                                                        className="preview_image_plate"
                                                        alt=""
                                                    />
                                                ) : (
                                                    t(
                                                        'createvehicle.numberplatelabel'
                                                    )
                                                )}
                                                <span
                                                    onClick={() => {
                                                        numberPlateRef?.current?.click();
                                                    }}
                                                    className="Upload__button"
                                                >
                                                    <BsCloudUpload size={30} />
                                                </span>
                                            </div>
                                            <Field name="numberPlatePic">
                                                {({ form }) => {
                                                    const { setFieldValue } =
                                                        form;
                                                    return (
                                                        <input
                                                            className="form-control upload_border"
                                                            ref={numberPlateRef}
                                                            type="file"
                                                            onChange={(e) =>
                                                                postNumberPlate(
                                                                    e,
                                                                    setFieldValue
                                                                )
                                                            }
                                                            hidden
                                                        />
                                                    );
                                                }}
                                            </Field>

                                            <div className=""></div>
                                            <div className="err_div mb-3 mt-0">
                                                <p className="text-danger stu_sign_err pt-1">
                                                    <ErrorMessage name="numberPlatePic" />
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col d-flex flex-column justify-content-lg-end justify-content-center position-relative">
                                            <Field
                                                type="text"
                                                className="form-control input_field_rsm"
                                                placeholder=" "
                                                id="registrationNumber"
                                                name="registrationNumber"
                                            />
                                            <label
                                                htmlFor="registrationNumber"
                                                className="lable_box_rsm"
                                            >
                                                {t('createvehicle.reg.no')}
                                            </label>
                                            <div className="err_div mb-3 mt-0">
                                                <p className="text-danger stu_sign_err pt-1">
                                                    <ErrorMessage name="registrationNumber" />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="row d-flex"
                                        style={{ marginBottom: '21px' }}
                                    >
                                        <div className="col d-flex flex-column justify-content-lg-end justify-content-center position-relative">
                                            <Field
                                                type="number"
                                                className="form-control input_field_rsm"
                                                placeholder=" "
                                                id="kmPrice"
                                                name="kmPrice"
                                            />
                                            <label
                                                htmlFor="kmPrice"
                                                className="lable_box_rsm"
                                            >
                                                {t('createvehicle.price')}
                                            </label>
                                            <div className="err_div mb-3 mt-0">
                                                <p className="text-danger stu_sign_err pt-1">
                                                    <ErrorMessage name="kmPrice" />
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col d-flex flex-column justify-content-lg-end justify-content-center position-relative">
                                            <Field
                                                type="number"
                                                className="form-control input_field_rsm"
                                                placeholder=" "
                                                id="seaters"
                                                name="seaters"
                                                max={20}
                                            />
                                            <label
                                                htmlFor="seaters"
                                                className="lable_box_rsm"
                                            >
                                                {t('createvehicle.seater')}
                                            </label>
                                            <div className="err_div mb-3 mt-0">
                                                <p className="text-danger stu_sign_err pt-1">
                                                    <ErrorMessage name="seaters" />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="row d-flex"
                                        style={{ marginBottom: '21px' }}
                                    >
                                        <div className="col d-flex flex-column justify-content-lg-end justify-content-center position-relative">
                                            <Field
                                                as="textarea"
                                                className="form-control input_field_rsm"
                                                style={{ minHeight: '100px' }}
                                                placeholder=" "
                                                id="description"
                                                name="description"
                                            />
                                            <label
                                                htmlFor="description"
                                                className="lable_box_rsm"
                                            >
                                                {t('createvehicle.description')}
                                            </label>
                                            <div className="err_div mb-3 mt-0">
                                                <p className="text-danger stu_sign_err pt-1">
                                                    <ErrorMessage name="description" />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {step === 2 && (
                                <div className="page-1-items">
                                    <div
                                        className="row d-flex"
                                        style={{ marginBottom: '21px' }}
                                    >
                                        <div className="col-12 d-flex align-items-center position-relative">
                                            <input
                                                type="text"
                                                className="form-control input_field_rsm feature_inp"
                                                placeholder=" "
                                                value={allFeatures}
                                                onChange={(e) =>
                                                    handleSetFeatures(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <label
                                                htmlFor="vehicleName"
                                                className="lable_box_rsm"
                                            >
                                                {t('createvehicle.addfeatures')}
                                            </label>
                                            {/* <div className="upload_border d-flex align-items-center justify-content-between">
                                                {numberPlatePic ? (
                                                    <img
                                                        src={numberPlatePic}
                                                        className="preview_image_plate"
                                                        alt=""
                                                    />
                                                ) : (
                                                    ''
                                                )} */}
                                            <span
                                                onClick={handleAddFeaturesBtn}
                                                className="Upload__button2"
                                            >
                                                <button
                                                    type="button"
                                                    className="add_feature_btn px-4 fw-semibold"
                                                >
                                                    {t(
                                                        'createvehicle.addfeatures'
                                                    )}
                                                </button>
                                            </span>
                                            {/* </div> */}
                                        </div>

                                        {/* <div className="col-2">
                                            <button
                                                type="button"
                                                className="btn btn-outline-primary"
                                                onClick={handleAddFeaturesBtn}
                                            >
                                                {t('createvehicle.addfeatures')}
                                            </button>
                                        </div> */}
                                    </div>
                                    <div
                                        className="feature_box overflow-auto"
                                        id="features_ctn"
                                    >
                                        {newFeatures?.map((feature, index) => (
                                            <>
                                                <div className="d-flex justify-content-between align-items-center feature_list">
                                                    <div
                                                        key={index}
                                                        className="feature_item d-flex align-items-center py-2 my-2"
                                                    >
                                                        <div className="me-3 pe-3" style={{borderRight: "2px solid red"}}>
                                                            <FaCarOn
                                                                size={25}
                                                            />
                                                        </div>
                                                        <h6 className="m-0">
                                                            {feature}
                                                        </h6>
                                                    </div>
                                                    <div>
                                                        <RiDeleteBin6Line
                                                            className="delete_icon"
                                                            onClick={() =>
                                                                handleRemoveFeature(
                                                                    index
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {step === 3 && (
                                <div className="page-1-items">
                                    <div
                                        className="row d-flex"
                                        style={{ marginBottom: '21px' }}
                                    >
                                        <div className="col-12 d-flex flex-column justify-content-lg-end justify-content-center">
                                            <div className="upload_border d-flex align-items-center justify-content-center">
                                                <span
                                                    onClick={() => {
                                                        fileref?.current?.click();
                                                    }}
                                                    className="fw-bold"
                                                    style={{
                                                        fontSize: '18px',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    <BsCloudUpload
                                                        size={30}
                                                        className="me-1"
                                                    />{' '}
                                                    {t('createvehicle.choose')}
                                                </span>
                                            </div>
                                            <Field name="vehiclePictures">
                                                {({ form }) => {
                                                    const { setFieldValue } =
                                                        form;
                                                    return (
                                                        <input
                                                            className="form-control upload__border input__field"
                                                            ref={fileref}
                                                            type="file"
                                                            onChange={(e) =>
                                                                postimage(
                                                                    e,
                                                                    setFieldValue
                                                                )
                                                            }
                                                            hidden
                                                        />
                                                    );
                                                }}
                                            </Field>
                                        </div>
                                        <div className="err_div mb-3 mt-0">
                                            <p className="text-danger stu_sign_err pt-1">
                                                <ErrorMessage name="vehiclePictures" />
                                            </p>
                                        </div>

                                        {/* <div className="col-2">
                                            <button
                                                type="button"
                                                className="upload_submit_btn fw-bold"
                                                onClick={handleAddImagesBtn}
                                            >
                                                {t('createvehicle.add')}
                                            </button>
                                        </div> */}
                                    </div>
                                    <div
                                        className="vehicle_img_box overflow-auto"
                                        id="features_ctn"
                                    >
                                        <div className="row d-flex row_cards d-flex justify-content-start align-items-center w-100 h-100">
                                            {newImageData?.map(
                                                (images, index) => (
                                                    <>
                                                        <div className="col-3 d-flex justify-content-center align-items-center image_view_card p-2 my-4">
                                                            <div
                                                                key={index}
                                                                className="w-100 inner_img_card"
                                                            >
                                                                {/* <div className="w-100 d-flex justify-content-end">
                                                                    <div className="d-flex justify-content-center align-items-center icon_div_cross">
                                                                        <CgClose
                                                                            className="delete_icon_img"
                                                                            onClick={() =>
                                                                                handleRemoveImages(
                                                                                    index
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div> */}
                                                                <img
                                                                    src={images}
                                                                    alt=""
                                                                    className="view_img_vehicle"
                                                                />
                                                                <div
                                                                    className="d-flex justify-content-center align-items-center delete_icon_div"
                                                                    onClick={() =>
                                                                        handleRemoveImages(
                                                                            index
                                                                        )
                                                                    }
                                                                >
                                                                    <RiDeleteBin6Line
                                                                        size={
                                                                            25
                                                                        }
                                                                        className="delete_icon"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* {step === 4 && (
                                <div className="page-1-items">
                                    <h1>Preview Page</h1>
                                </div>
                            )} */}
                        </div>

                        <div className="d-flex justify-content-end align-items-center footer_div mt-3 pb-3">
                            {step !== 1 && (
                                <button
                                    className="footer_back"
                                    type="button"
                                    // onClick={() => prev()}
                                    onClick={() => {
                                        step > 1
                                            ? setStep((pre) => pre - 1)
                                            : '';
                                        prev();
                                    }}
                                >
                                    <MdOutlineArrowBackIos />{' '}
                                    {t('createvehicle.back')}
                                </button>
                            )}
                            <button
                                className="footer_next"
                                type="submit"
                                // onClick={next}
                            >
                                {step === 3 ? (
                                    responce?.isLoading ? (
                                        <div
                                            className="spinner-border spinner_custom"
                                            role="status"
                                        >
                                            <span className="visually-hidden">
                                                {t('booking.cancle')}
                                            </span>
                                        </div>
                                    ) : (
                                        t('usertype.submit')
                                    )
                                ) : (
                                    <span>
                                        {t('createvehicle.next')}{' '}
                                        <MdArrowForwardIos />
                                    </span>
                                )}
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
            <PageLoader show={showPageLoader} />{' '}
        </>
    );
};

export default ResumeMainPage;
