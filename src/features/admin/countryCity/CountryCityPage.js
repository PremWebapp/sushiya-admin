
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import $ from 'jquery'
import { useSelector, useDispatch } from "react-redux";
import { Table, Switch, Upload, Button, Select, Tag } from 'antd';
import { cityFetchData, countryFetchData, addCountry, removeCountry, updateCountryStatus, updateCountry, addCity, updateCity, updateCityStatus, removeCity, dataForFilters } from "../../../redux/reducers/country&cityReducer";
import { toast } from 'react-toastify';
import { GiCrossMark } from "react-icons/gi";
import TagRender from "./tagRender";

function CountryCityPage() {
    const { userData: { token, user } } = useSelector(state => state.auth)
    const { countryList, cityList, countryListForFilter, countryListActiveForFilter, cityListForFilter,
        cityListActiveForFilter, coucityLoading } = useSelector(state => state.countryAcity)
    const dispatch = useDispatch()

    const options = [
        {
            value: 'Last 7 Days',
        },
        {
            value: 'Last Month',
        },
        {
            value: 'Last 6 Month',
        },
    ];

    const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];
    const [selectedItems, setSelectedItems] = useState([]);
    const filteredOptions = OPTIONS.filter((val) => !selectedItems.includes(val))

    // For Image Data 
    const [selectedImage, setSelectedImage] = useState();
    const [img, setimg] = useState();
    const [country, setCountry] = useState(true);
    const [city, setCity] = useState(false);
    const [countryId, setCountryId] = useState('');
    const [cityId, setCityId] = useState('');
    const [coutryUpdateImg, setcoutryUpdateImg] = useState();
    const [coutryUpdate64Img, setcoutryUpdate64Img] = useState();
    const [updateCountryData, setupdateCountryData] = useState();
    const [updateCityData, setupdateCityData] = useState();

    // For City Form Data 
    let [cityData, setCityData] = useState({
        city: '',
        applicable_taxes: '',
        country_id: '',

    });

    const CityhandleChange = e => {
        let name = e.target.name;
        let value = e.target.value;
        cityData[name] = value;
        setCityData(cityData);
    };

    const updateCityhandleChange = e => {
        const { name, value } = e.target
        setupdateCityData({ ...updateCityData, [name]: value })
    };

    useEffect(() => { setupdateCountryData(countryId) }, [countryId])
    useEffect(() => { setupdateCityData(cityId) }, [cityId])

    const countryColumn = [
        {
            title: 'Image',
            dataIndex: 'country_image',
            key: 'country_image',
            render: (text, record) => (
                <span>{(record.country_image ? <span><img alt='Menu_image' src={record.country_image} style={{ width: "30px", height: "30px", borderRadius: "25px" }} /> </span> : <span> <img alt='demo_image' style={{ width: "100px" }} /></span>)}</span>
            )
        },
        {
            title: 'Country Id',
            dataIndex: 'id',
            key: 'id',
            sorter: {
                compare: (a, b) => a.id - b.id,
            },
        },

        {
            title: 'Country Name',
            dataIndex: 'country',
            key: 'country',
        },
        {
            title: 'Currency',
            dataIndex: 'currency',
            key: 'currency',
        },
        {
            title: 'Action',
            dataIndex: 'image',
            key: 'name',
            render: (text, record) => (
                <span>
                    <i class="fa-solid fa-pen-to-square fa-lg  rounded-circle curcer" data-toggle="modal" data-target="#CountryUpdateModal" onClick={() => setCountryId(record)} style={{ color: '#fc6011' }} id={record.id} ></i>
                    <span className="px-3  rounded-circle ">
                        <Switch size="small" defaultChecked={record.status === '0' ? false : true} id={record.id} data-bs-toggle="modal" data-bs-target="#updateCountryStatus" onClick={() => setCountryId(record)} />
                    </span >
                    <i className="curcer fa fa-trash fa-lg rounded-circle  bg-light text-danger" data-bs-toggle="modal" data-bs-target="#remodeCountry" id={record.id} onClick={() => setCountryId(record)}></i></span>
            )
        },
    ]
    const cityColumn = [
        {
            title: 'City Id',
            dataIndex: 'country_id',
            key: 'id',
            sorter: {
                compare: (a, b) => a.id - b.id,
                multiple: 3,
            }
        },
        {
            title: 'Alloted Country',
            dataIndex: 'country',
            key: 'country',
        },
        {
            title: 'City Name',
            dataIndex: 'city',
            key: 'city',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: '',
            render: (text, record) => (
                <span>
                    <i class="fa-solid fa-pen-to-square fa-lg  rounded-circle curcer" data-toggle="modal" data-target="#updateCityModal" onClick={() => setCityId(record)} style={{ color: '#fc6011' }} id={record.id} ></i>
                    <span className="px-3  rounded-circle ">
                        <Switch size="small" defaultChecked={record.status === '0' ? false : true} id={record.id} data-bs-toggle="modal" data-bs-target="#updateCityStatus" onClick={() => setCityId(record)} />
                    </span >
                    <i className="curcer fa fa-trash fa-lg rounded-circle  bg-light text-danger" data-bs-toggle="modal" data-bs-target="#removeCity" id={record.id} onClick={() => setCityId(record)}></i></span>
            )
        },
    ]

    // For Open Country and City Modal
    const openCity = (e) => {
        setCountry(false);
        setCity(true);
        e.target.classList.add('active');
        $("#country").css("background-color", "#fff");
        $("#country").css("color", "#858796");
        $("#city").css("background-color", "#fc6011",);
        $("#city").css("color", "#fff");
        $('#country').removeClass('active');
    }

    const openCountry = (e) => {
        setCountry(true);
        setCity(false);
        e.target.classList.add('active');
        $("#city").css("background-color", "#fff");
        $("#city").css("color", "#858796");
        $("#country").css("background-color", "#fc6011");
        $("#country").css("color", "#fff");
        $('#city').removeClass('active');
    }

    // For Save Country Form Data 
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        if (selectedImage) {
            let dd = new FormData();
            dd.append('country_image', selectedImage);
            dd.append('country', data.country);
            dd.append('currency', data.currency);

            // add counrty
            dispatch(addCountry({ formData: dd, token }))

            //get country
            setTimeout(() => {
                dispatch(countryFetchData({ token }))
            }, 2000)
        } else toast.warning('Please select a country image!')
    };


    // For Save City Form Data 
    const saveCityData = (e) => {
        e.preventDefault();

        dispatch(addCity({ data: cityData, token }))

        setTimeout(() => {
            dispatch(cityFetchData({ token }))
        }, 2000)
    }
    const saveCityUpdateData = (e) => {
        e.preventDefault();
        dispatch(updateCity({ data: updateCityData, token }))

        setTimeout(() => {
            dispatch(cityFetchData({ token }))
        }, 2000)
    }

    // fetch country and city
    useEffect(() => {
        $("#country").css("background-color", "#fc6011");
        $("#country").css("color", "white");

        dispatch(countryFetchData({ token }))
        dispatch(cityFetchData({ token }))

        setTimeout(() => {
            dispatch(dataForFilters())
        }, 2000)

    }, [])


    const handleImgChange = (info) => {
        setSelectedImage(info.file.originFileObj);
        getBase64(info.file.originFileObj, (url) => {
            setimg(url)
        });
    };
    const handleCountryUpdateImgChange = (info) => {
        setcoutryUpdateImg(info.file.originFileObj);
        getBase64(info.file.originFileObj, (url) => {
            setcoutryUpdate64Img(url)
        });
    };

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const uploadButton = (
        <div>
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    const handleCountryRemove = () => {
        dispatch(removeCountry({ id: { id: countryId.id }, token }))
        setTimeout(() => {
            dispatch(countryFetchData({ token }))
        }, 2000)
    }

    const handleCityRemove = () => {
        dispatch(removeCity({ id: { id: cityId.id }, token }))
        setTimeout(() => {
            dispatch(cityFetchData({ token }))
        }, 2000)
    }

    const handleCountryStatus = () => {
        let status = ''
        countryId.status === '0' ? status = '1' : status = '0'
        dispatch(updateCountryStatus({ formData: { id: countryId.id, status: status }, token }))
        setTimeout(() => {
            dispatch(countryFetchData({ token }))
        }, 2000)
    }

    const handleCityStatus = () => {
        let status = ''
        cityId.status === '0' ? status = '1' : status = '0'
        dispatch(updateCityStatus({ data: { id: cityId.id, status: status }, token }))
        setTimeout(() => {
            dispatch(cityFetchData({ token }))
        }, 2000)
    }

    const handelCountryupdatChange = (e) => {
        const { name, value } = e.target
        setupdateCountryData({ ...updateCountryData, [name]: value })
    }

    const handleCountryUpdateSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('id', updateCountryData.id)
        formData.append('country', updateCountryData.country)
        formData.append('currency', updateCountryData.currency)
        formData.append('country_image', coutryUpdateImg)

        dispatch(updateCountry({ formData, token }))

        setTimeout(() => {
            dispatch(countryFetchData({ token }))
        }, 2000)
        setcoutryUpdateImg()
    }

    return (
        <>
            <div class="row">

                <div class="col-lg-12">

                    <div class="card">

                        <div class="card-body">
                            <h4 className="ml-5 colorblack bold">Country & City Management</h4>
                            <div className="mt-4 text-center">
                                <div class="btn-group" style={{ minWidth: '50%' }}>
                                    <button type="button" class="btn active border" id="country" onClick={openCountry}>Country</button>
                                    <button type="button" class="btn border" onClick={openCity} id="city">City</button>

                                </div>
                                &nbsp;&nbsp;
                                {
                                    country && (<button type="button" class="btn btn-outline-dark" style={{ minWidth: '20%', float: 'right' }} data-toggle="modal" data-target="#CountryModal">Add</button>)
                                }
                                {
                                    city && (<button type="button" class="btn btn-outline-dark" style={{ minWidth: '20%', float: 'right' }} data-toggle="modal" data-target="#CityModal">Add</button>)
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* lists */}
            <div className="container-fluid ">
                <div className="row">
                    <div className="col-md-12 col-lg-12 col-sm-12 ">

                        {
                            country && <>
                                <div className="row row-cols-1 row-cols-sm-5 row-cols-md-5 row-cols-lg-5  py-4 bg-white border rounded my-4">
                                    <div className="col ">
                                        <div class="input-group mb-2 d-flex">
                                            <span class="input-group-text " id="basic-addon1"><i className="fa fa-search"></i></span>
                                            <Select
                                                mode="multiple"
                                                allowClear
                                                placeholder="Search By Name"
                                                showArrow
                                                style={{
                                                    width: '85%',
                                                }}
                                                options={countryListForFilter}
                                            />
                                        </div>
                                    </div>

                                    <div className="col ">
                                        <div class="input-group mb-2">
                                            <Select
                                                mode="single"
                                                allowClear
                                                placeholder="Search By Duration"
                                                showArrow
                                                style={{
                                                    width: '100%',
                                                }}
                                                options={options}
                                            />

                                        </div>
                                    </div>
                                    <div className="col ">
                                        <div class="input-group mb-2">
                                            <Select
                                                mode="single"
                                                allowClear
                                                placeholder="Search By Country"
                                                showArrow
                                                style={{
                                                    width: '100%',
                                                }}
                                                options={countryListForFilter}
                                            />

                                        </div>
                                    </div>
                                    <div className="col ">
                                        <div class="input-group mb-2">
                                            <Select
                                                mode="single"
                                                allowClear
                                                placeholder="Search By Active Country"
                                                showArrow
                                                style={{
                                                    width: '100%',
                                                }}
                                                options={countryListActiveForFilter}
                                            />

                                        </div>
                                    </div>
                                    <div className="col">
                                        <div class="input-group mb-2 ">
                                            <Button type="danger " className=' px-4 ' icon={GiCrossMark}>Clear</Button>
                                            <Button type="primary" className="mx-2">Submit</Button>
                                        </div>
                                    </div>
                                </div>

                            </>
                        }
                        {
                            city && <>
                                <div className="row row-cols-1 row-cols-sm-5 row-cols-md-5 row-cols-lg-5  py-4 bg-white border rounded my-4">

                                    <div className="col ">
                                        <div class="input-group mb-3">
                                            <span class="input-group-text " id="basic-addon1"><i className="fa fa-search"></i></span>
                                            <Select
                                                mode="multiple"
                                                allowClear
                                                placeholder="Search By Name"
                                                showArrow
                                                style={{
                                                    width: '85%',
                                                }}
                                                options={cityListForFilter}
                                            />
                                        </div>
                                    </div>
                                    <div className="col ">
                                        <div class="input-group mb-3">
                                            <Select
                                                mode="multiple"
                                                allowClear
                                                placeholder="Search By Duration"
                                                showArrow
                                                style={{
                                                    width: '100%',
                                                }}
                                                options={options}
                                            />
                                        </div>
                                    </div>
                                    <div className="col ">
                                        <div class="input-group mb-3">
                                            <Select
                                                mode="multiple"
                                                allowClear
                                                placeholder="Search By Country"
                                                showArrow
                                                style={{
                                                    width: '100%',
                                                }}
                                                options={cityListForFilter}
                                            />
                                        </div>
                                    </div>
                                    <div className="col ">
                                        <div class="input-group mb-3">
                                            <Select
                                                mode="multiple"
                                                allowClear
                                                placeholder="Search By Active Country"
                                                showArrow
                                                style={{
                                                    width: '100%',
                                                }}
                                                options={countryListForFilter}
                                            />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div class="input-group mb-2 ">
                                            <Button type="danger " className=' px-4 ' icon={GiCrossMark}>Clear</Button>
                                            <Button type="primary" className="mx-2">Submit</Button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }

                        {country ?
                            <Table loading={coucityLoading} dataSource={countryList} columns={countryColumn} pagination={{ defaultPageSize: 6, showSizeChanger: true, pageSizeOptions: ['05', '10', '20', '30'] }} /> :
                            <Table loading={coucityLoading} dataSource={cityList} columns={cityColumn} pagination={{ defaultPageSize: 6, showSizeChanger: true, pageSizeOptions: ['05', '10', '20', '30'] }} />}
                    </div>
                </div>
            </div>


            {/* Country Modal */}
            <div class="modal fade" id="CountryModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title ml-auto colorblack bold" id="exampleModalLongTitle" >Add Country</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div class="modal-body">
                                <div className="row">
                                    <div className="col-md-6 col-lg-6 col-sm-12">
                                        <label className="colorblack bold">Country Name</label>
                                        <input className="form-control" name='country'  {...register("country", { required: true, maxLength: 20 })} />
                                    </div>
                                    <div className="col-md-6 col-lg-6 col-sm-12">
                                        <label className="colorblack bold d-block ">Country Currency</label>
                                        <select className="form-control d-block w-100 pt-1" {...register("currency", { required: true })}>
                                            <option value="USD">USD</option>
                                            <option value="EUR">EUR</option>
                                            <option value="GBP">GBP</option>
                                            <option value="KRW">KRW</option>
                                            <option value="EUR">EUR</option>
                                            <option value="INR">INR</option>

                                        </select>
                                    </div>

                                    <div className="col-md-6 col-lg-6 col-sm-12 mt-4">
                                        <Upload
                                            name="avatar"
                                            listType="picture-card"
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                            onChange={handleImgChange}
                                        >
                                            {img ? (
                                                <img
                                                    src={img}
                                                    alt="avatar"
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                />
                                            ) : (
                                                uploadButton
                                            )}
                                        </Upload>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-primary">Add Country</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>



            {/* update Country   */}
            <div class="modal fade" id="CountryUpdateModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title ml-auto colorblack bold" id="exampleModalLongTitle" >Update Country</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={handleCountryUpdateSubmit}>
                            <div class="modal-body">
                                <div className="row">
                                    <div className="col-md-6 col-lg-6 col-sm-12">
                                        <label className="colorblack bold">Country Name</label>
                                        <input onChange={handelCountryupdatChange} className="form-control" name='country' defaultValue={countryId.country} />
                                    </div>
                                    <div className="col-md-6 col-lg-6 col-sm-12">
                                        <label className="colorblack bold d-block ">Country Currency</label>
                                        <select onChange={handelCountryupdatChange} defaultValue={countryId.currency} className="form-control d-block w-100" name='currency'>
                                            <option selected={countryId.currency == "USD" ? true : false} value="USD">USD</option>
                                            <option selected={countryId.currency == "EUR" ? true : false} value="EUR">EUR</option>
                                            <option selected={countryId.currency == "GBP" ? true : false} value="GBP">GBP</option>
                                            <option selected={countryId.currency == "KRW" ? true : false} value="KRW">KRW</option>
                                            <option selected={countryId.currency == "EUR" ? true : false} value="EUR">EUR</option>
                                            <option selected={countryId.currency == "INR" ? true : false} value="INR">INR</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6 col-lg-6 col-sm-12 mt-4">
                                        <Upload
                                            name="avatar"
                                            listType="picture-card"
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                            onChange={handleCountryUpdateImgChange}
                                        >
                                            <img
                                                src={coutryUpdate64Img || countryId.country_image}
                                                alt="avatar"
                                                style={{
                                                    width: '100%',
                                                }}
                                            />
                                        </Upload>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-primary">Update Country</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* City MOdal  */}
            <div class="modal fade" id="CityModal" tabindex="-1" role="dialog" aria-labelledby="CityModalTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title ml-auto colorblack bold" id="exampleModalLongTitle" >Add City</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={saveCityData}>
                            <div class="modal-body">
                                <div className="row">
                                    <div className="col-md-6 col-lg-6 col-sm-12">
                                        <label className="colorblack bold">Country Name</label>
                                        <select className="form-control" name='country_id' onChange={CityhandleChange} required>
                                            <option value="">Select Country</option>
                                            {countryList?.map(val => {
                                                return <option key={val.id} value={val.id}>{val.country}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="col-md-6 col-lg-6 col-sm-12">
                                        <label className="colorblack bold">City</label>
                                        <input className="form-control" type="text" name="city" onChange={CityhandleChange} required />
                                    </div>
                                    <div className="col-md-6 col-lg-6 col-sm-12">
                                        <label className="colorblack bold">Payable Tax</label>
                                        <input className="form-control" min='0' type="number" name="applicable_taxes" onChange={CityhandleChange} required />
                                    </div>
                                </div>
                            </div>

                            <div class="modal-footer">
                                {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> */}
                                <button type="submit" class="btn btn-primary">Add City</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* update city */}

            <div class="modal fade" id="updateCityModal" tabindex="-1" role="dialog" aria-labelledby="CityModalTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title ml-auto colorblack bold" id="exampleModalLongTitle" >Update City</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={saveCityUpdateData}>
                            <div class="modal-body">
                                <div className="row">
                                    <div className="col-md-6 col-lg-6 col-sm-12">
                                        <label className="colorblack bold">Country Name</label>
                                        <select className="form-control" name='country_id' onChange={updateCityhandleChange} required>
                                            <option value="">Select Country</option>
                                            {countryList?.map(val => {
                                                return <option selected={val.country == cityId.country} key={val.country_id} value={val.country_id}>{val.country}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="col-md-6 col-lg-6 col-sm-12">
                                        <label className="colorblack bold">City</label>
                                        <input className="form-control" defaultValue={cityId.city} type="text" name="city" onChange={updateCityhandleChange} required />
                                    </div>
                                    <div className="col-md-6 col-lg-6 col-sm-12">
                                        <label className="colorblack bold">Payable Tax</label>
                                        <input className="form-control" defaultValue={cityId.applicable_taxes} min='0' type="number" name="applicable_taxes" onChange={updateCityhandleChange} required />
                                    </div>
                                </div>
                            </div>

                            <div class="modal-footer">
                                {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> */}
                                <button type="submit" class="btn btn-primary">Update City</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/*  remove country  popup */}
            <div class="modal fade" id="remodeCountry" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Ready to Remove?</h5>
                            <button className="close" type="button" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to remove your country!
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" aria-label="Close" onClick={() => handleCountryRemove()}>Remove</button>
                        </div>
                    </div>
                </div>
            </div>

            {/*  remove city  popup */}
            <div class="modal fade" id="removeCity" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Ready to Remove?</h5>
                            <button className="close" type="button" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to remove your city!
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" aria-label="Close" onClick={() => handleCityRemove()}>Remove</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* update country status */}
            <div class="modal fade" id="updateCountryStatus" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Ready to Update Status?</h5>
                            <button className="close" type="button" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to update your country status!
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" aria-label="Close" onClick={() => handleCountryStatus(countryId)}>Update</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* update city status */}
            <div class="modal fade" id="updateCityStatus" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Ready to Update Status?</h5>
                            <button className="close" type="button" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to update your city status!
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" aria-label="Close" onClick={() => handleCityStatus(cityId)}>Update</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CountryCityPage