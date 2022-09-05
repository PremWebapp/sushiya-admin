import React, { useState, useEffect } from 'react'
import Footer from '../../footer/Footer'
import SideNav from '../../sidenav/SideNav'
import TopBar from '../../topbar/TopBar'
import { DoubleRightOutlined, StepBackwardOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { Card, Spin, message } from 'antd';
import axios from 'axios';
import { Token, PathUrl } from '../../../../config/Config'
import { useForm } from 'react-hook-form';

function PromoCodePage() {
    const token = Token().token;
    const url = PathUrl().urlData.production;

    const [countryData, setCountryData] = useState([])
    const [loader, setLoader] = useState(false)
    const [moreLoader, setMoreLoader] = useState(false)
    const [discountLoader, setDiscountLoader] = useState(false)
    // const [cityData, setCityData] = useState([])
    // const [cityData1, setCityData1] = useState([])

    // const [menuData, setMenuData] = useState([])
    // const [categoryData, setCategoryData] = useState([])

    const [selectedImage, setSelectedImage] = useState();

    const { register, handleSubmit, reset } = useForm();

    const { register: SpendMoreEarn, handleSubmit: handleSubmit1, reset:resetEarn} = useForm({ mode: "onBlur", });

    const { register: GiveDiscount, handleSubmit: handleSubmit2, reset:resetDiscount } = useForm({ mode: "onBlur", });

    const [giveDiscount, setGiveDiscount] = useState(false)

    const [spendEarn, setSpendEarn] = useState(false)

    const [deliverBoy, setDeliverBoy] = useState(true)

    useEffect(() => {
        CountryList()
    },[])

    // For Country List 
    const CountryList = e => {
        axios.get(`${url}/country`, { headers: { Authorization: 'Bearer ' + token } })
            .then((response) => {
                setCountryData(response.data)
            })
            .catch((response) => {

                console.error(response.error);

            });
    }


    const handleChange = event => {
        const target = event.target
        const name = target.name
        const value = target.value

        if (value === '1') {
            setDeliverBoy(true)
            setGiveDiscount(false)
            setSpendEarn(false)
        } else if (value === '2') {
            setDeliverBoy(false)
            setGiveDiscount(false)
            setSpendEarn(true)
        } else {
            setDeliverBoy(false)
            setGiveDiscount(true)
            setSpendEarn(false)
        }
        setFormType({
            ...formType,
            [name]: value
        })
    };


    // For delivery Boy Form Data Submit 

    let onSubmit = data => {
        let dd = new FormData();
        dd.append('image', selectedImage)
        dd.append('coupon_code', data.coupon_code)
        dd.append('discount', data.discount)
        dd.append('discount_type', data.discount_type)
        dd.append('from', data.from)
        dd.append('title', data.title)
        dd.append('to', data.to)
        dd.append('description', data.description)
        setLoader(true)
        axios.post(`${url}/PromoCodeDelivery`, dd, { headers: { Authorization: 'Bearer ' + token } })
            .then((response) => {
                reset()
                setSelectedImage("")
                setLoader(false)
                message.success("Deliver Boy Promocode Created..!!")
            })
            .catch((error) => {
                setLoader(false)

                var { coupon_code, discount_type, discount, from, title, to,description } = error.response.data.data;

                if (description) {
                    alert(description[0])
                }

                if (coupon_code) {
                    alert(coupon_code[0])
                }

                if (discount_type) {
                    alert(discount_type[0])
                }

                if (discount) {
                    alert(discount[0])
                }

                if (from) {
                    alert(from[0])
                }

                if (title) {
                    alert(title[0])
                }

                if (to) {
                    alert(to[0])
                }
            });

    }

    // For Spend More Earn Form Data 

    const onSubmitSpendEarn = data => {

        setMoreLoader(true)
        axios.post(`${url}/PromoCodeSpendMore`, data, { headers: { Authorization: 'Bearer ' + token } })
            .then((response) => {
                resetEarn()
                setSelectedImage("")
                setMoreLoader(false)
                message.success("Spend More Earn Promocode Created..!!")

            })
            .catch((error) => {
                setMoreLoader(false)

                var { coupon_code, discount_type, discount, from, title, to, min, max, country,description } = error.response.data.data;
                if (description) {
                    alert(description[0])
                }
                if (country) {
                    alert(country[0])
                }

                if (coupon_code) {
                    alert(coupon_code[0])
                }

                if (discount_type) {
                    alert(discount_type[0])
                }

                if (discount) {
                    alert(discount[0])
                }

                if (from) {
                    alert(from[0])
                }

                if (title) {
                    alert(title[0])
                }

                if (to) {
                    alert(to[0])
                }

                if (min) {
                    alert(min[0])
                }

                if (max) {
                    alert(max[0])
                }
            });


    }

    // For Give Discount Form Data 

    const onSubmitGiveDiscount = data => {

        setDiscountLoader(true)

        axios.post(`${url}/PromoCodeGiveDiscount`, data, { headers: { Authorization: 'Bearer ' + token } })
            .then((response) => {
                resetDiscount()
                setSelectedImage("")
                setDiscountLoader(false)
                message.success("give Discount Promocode Created..!!")
            })
            .catch((error) => {
                setDiscountLoader(false)

                var { coupon_code, discount_type, discount, from, title, to, country,description } = error.response.data.data;

                if (description) {
                    alert(description[0])
                }

                if (country) {
                    alert(country[0])
                }

                if (coupon_code) {
                    alert(coupon_code[0])
                }

                if (discount_type) {
                    alert(discount_type[0])
                }

                if (discount) {
                    alert(discount[0])
                }

                if (from) {
                    alert(from[0])
                }

                if (title) {
                    alert(title[0])
                }

                if (to) {
                    alert(to[0])
                }
            });

    }
    const [formType, setFormType] = useState({
        type: '1'
    })



    // For Image Data 
    const imageChange = (e) => {

        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }

    };

    // This function will be triggered when the "X" button is clicked
    const removeSelectedImage = () => {
        setSelectedImage();
    };



    return (
        <>
            {/* <!-- Topbar --> */}

            {/* <!-- End of Topbar --> */}

            {/* <div id="wrapper"> */}

                {/* <SideNav /> */}

                {/* <!-- Content Wrapper --> */}
                <div id="content-wrapper" className="d-flex flex-column">

                    {/* <!-- Main Content --> */}
                    <div id="content">
            <TopBar />
                        <div className="card-container">
                            <div className='card-header'>
                                <h6 className="ml-3 colorblack bold mt-3 "><NavLink to="/Admin/Promo"><StepBackwardOutlined style={{ color: 'black' }} /></NavLink> Promo Code Management <DoubleRightOutlined /> Add Promo Code</h6>
                            </div>
                        </div>

                        <Card type='inner' style={{ marginLeft: -30 }} title={<h6 className="ml-5 colorblack d-flex  mt-3"><span className='mr-4'>Other Type : </span>
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input type="radio" className="form-check-input" name="type" onChange={handleChange} checked={formType.type === "1"} value="1" />Delivery Boy
                                </label>
                            </div>
                            <div className="form-check ml-4">
                                <label className="form-check-label">
                                    <input type="radio" className="form-check-input" name="type" onChange={handleChange} checked={formType.type === "2"} value="2" />Spend More Earn
                                </label>
                            </div>
                            <div className="form-check ml-4">
                                <label className="form-check-label">
                                    <input type="radio" className="form-check-input" name="type" onChange={handleChange} checked={formType.type === "3"} value="3" />Give Discount
                                </label>
                            </div>
                        </h6>}>

                            {/* For Delivery Boy  */}
                            {
                                deliverBoy && (
                                    <form className="form ml-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
                                    <h5 style={{color:'red',marginLeft:'25rem',marginBottom:'1rem'}}>All Fields are Required: true..</h5>

                                        <div className='row '>
                                            <div className="col-md-6">
                                                <div className="col-md-12 d-flex">
                                                    <label className='col-md-3 form-label'>Discount Type</label>
                                                    <input type="text" className="form-control"  {...register("discount_type", {})} value={'Delivery'} readOnly />
                                                </div>
                                                <div className="col-md-12 d-flex mt-5">
                                                    <label className='col-md-3'>Coupon Code</label>
                                                    <input type="text" className="form-control"  {...register("coupon_code", {required:true})} />
                                                </div>
                                                <div className="col-md-12 d-flex mt-5">
                                                    <label className='col-md-3'>Add Title</label>
                                                    <input type="text" className="form-control"  {...register("title", {required:true})} />
                                                </div>
                                                <div className="col-md-12 d-flex mt-5">
                                                    <label className='col-md-3'>Duration</label>

                                                    <label className='col-md-1'>form</label>
                                                    <input type="date" className="form-control col-md-3 ml-2"  {...register("from", {required:true})} />
                                                    <label className='col-md-1 ml-4'>To</label>

                                                    <input type="date" className="form-control col-md-3"  {...register("to", {required:true})} />
                                                </div>
                                                <div className="col-md-12 d-flex mt-5">
                                                    <label className='col-md-3'>Add Description</label>
                                                    <input type="text" className="form-control"  {...register("description", {required:true})} />
                                                </div>
                                                <div className="col-md-12 d-flex mt-5">
                                                    <label className='col-md-3'>Select Discount</label>
                                                    <select className='form-control'  {...register("discount", {required:true})} >
                                                        <option value='05'>05</option>
                                                        <option value='10'>10</option>
                                                        <option value='15'>15</option>
                                                        <option value='20'>20</option>
                                                        <option value='25'>25</option>
                                                        <option value='30'>30</option>
                                                        <option value='35'>35</option>
                                                        <option value='40'>40</option>
                                                        <option value='45'>45</option>
                                                        <option value='50'>50</option>
                                                        <option value='55'>55</option>
                                                        <option value='60'>60</option>
                                                        <option value='65'>65</option>
                                                        <option value='70'>70</option>
                                                        <option value='75'>75</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="col-md-12 col-lg-12 col-sm-12 mt-4">
                                                    <label className="colorblack bold col-md-3">Upload Image</label>

                                                    <input
                                                        accept="image/*"
                                                        type="file"
                                                        {...register("image", {})}
                                                        onChange={imageChange}
                                                    />
                                                </div>

                                                <div className="col-md-6 col-lg-6 col-sm-12 mt-4">
                                                    {selectedImage && (

                                                        <div className="col-md-12 col-lg-12 " >
                                                            <button onClick={removeSelectedImage} className="btn btn-sm mr-4" style={{ float: 'right', color: 'black', fontWeight: 'bolder' }}>
                                                                X
                                                            </button><br />
                                                            <img
                                                                src={URL.createObjectURL(selectedImage)}
                                                                alt="ProcoCode_Image"
                                                                style={{ maxWidth: '80%', minWidth: '80%', maxHeight: '130px' }}
                                                            />

                                                        </div>
                                                    )}


                                                </div>
                                            </div>

                                            <div className="col-md-12 mt-4">
                                                {
                                                    loader ? <Spin style={{ marginLeft: '15rem' }} /> : <button type='submit' style={{ marginLeft: '15rem' }} className='btn btn-outline-warning '>ADD</button>
                                                }


                                            </div>
                                        </div>
                                    </form>
                                )
                            }



                            {/* For Spend Earn  */}

                            {
                                spendEarn && (
                                    <form className="form ml-4 mt-4" onSubmit={handleSubmit1(onSubmitSpendEarn)}>
                                        <div className="form-row">
                                            <div className="form-group col-md-5 d-flex ml-3">
                                                <label for="inputEmail4" className='col-md-3'>Discount Type</label>
                                                <input type="text" className="form-control" id="inputEmail4" {...SpendMoreEarn("discount_type", {})} value={'Spend More Earn'} readOnly />
                                            </div>
                                            <div className="col-md-1"></div>

                                            <div className="form-group col-md-5 d-flex">
                                                <label for="inputPassword4" className='col-md-3'>Coupon Code</label>
                                                <input type="text" className="form-control" id="inputPassword4" {...SpendMoreEarn("coupon_code", {required:true})} />
                                            </div>
                                            <div className="form-group col-md-5 d-flex ml-3">
                                                <label for="inputEmail4" className='col-md-3'>Add Title</label>
                                                <input type="text" {...SpendMoreEarn("title", {required:true})} className="form-control" id="inputEmail4" />
                                            </div>
                                            <div className="col-md-1"></div>

                                            <div className="form-group col-md-5 d-flex">
                                                <label className='col-md-3'>Duration</label>

                                                <label className='col-md-1'>form</label>
                                                <input type="date" className="form-control col-md-3 ml-2" {...SpendMoreEarn("from", {required:true})} />
                                                <label className='col-md-1 ml-4'>To</label>

                                                <input type="date" {...SpendMoreEarn("to", {required:true})} className="form-control col-md-3" />
                                            </div>
                                            <div className="form-group col-md-5 d-flex ml-3">
                                                <label for="inputEmail4" className='col-md-3'>Country</label>
                                                <select className='form-control' {...SpendMoreEarn("country", {required:true})}  >
                                                    <option>--Select Country--</option>
                                                    {countryData.map((data) => (
                                                        <option value={data.country}>{data.country}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-1"></div>

                                            {/* <div className="form-group col-md-5 d-flex">
                                                <label for="inputEmail4" className='col-md-3'>City</label>
                                                <select className='form-control' {...SpendMoreEarn("city", {})}>
                                                    {
                                                        cityData && (cityData.map((data) => (
                                                            <option value={data.id}>{data.city}</option>
                                                        )))
                                                    }

                                                </select>
                                            </div> */}
                                            {/* <div className="form-group col-md-5 d-flex ml-3">
                                                <label for="inputEmail4" className='col-md-3'>Menu</label>
                                                <Select className='form-control'
                                                    mode="multiple"
                                                    allowClear
                                                    style={{ width: '100%' }}
                                                    placeholder="Please select"
                                                    onChange={handleSpendMenuChange}>
                                                    {menuData.map((data) => (
                                                        <option value={data.name}>{data.name}</option>
                                                    ))}

                                                </Select>
                                            </div>
                                            <div className="col-md-1"></div>

                                            <div className="form-group col-md-5 d-flex">
                                                <label for="inputEmail4" className='col-md-3'>Category</label>
                                                <Select className='form-control'
                                                    mode="multiple"
                                                    allowClear
                                                    style={{ width: '100%' }}
                                                    placeholder="Please select"
                                                    onChange={handleSpendCategoryChange}>
                                                    {categoryData.map((data) => (
                                                        <option value={data.name}>{data.name}</option>
                                                    ))}
                                                </Select>
                                            </div> */}

                                            {/* <div className="form-group col-md-5 d-flex ml-3">
                                                <label for="inputEmail4" className='col-md-3'>Select Dish</label>
                                                <select multiple className='form-control' {...SpendMoreEarn("dish", {})}>
                                                    <option value="dish1">1</option>
                                                    <option value="dish2">2</option>
                                                    <option value="dish3">3</option>
                                                </select>
                                            </div> */}
                                            <div className="form-group col-md-5 d-flex">
                                                <label className='col-md-3 '>SPENDING AMOUNT</label>
                                                <label className='col-md-1'>Min</label>
                                                <input type='number' className='form-control ml-2' {...SpendMoreEarn("min", {})} />
                                                <label className='col-md-1 ml-4'>Max</label>
                                                <input type='number' {...SpendMoreEarn("max", {required:true})} className='form-control ml-2' />
                                            </div>

                                            <div className="form-group col-md-5 d-flex ml-3">
                                                <label for="inputEmail4" className='col-md-3'>Discount</label>
                                                <select className='form-control' {...SpendMoreEarn("discount", {required:true})} >
                                                    <option value='05'>05</option>
                                                    <option value='10'>10</option>
                                                    <option value='15'>15</option>
                                                    <option value='20'>20</option>
                                                    <option value='25'>25</option>
                                                    <option value='30'>30</option>
                                                    <option value='35'>35</option>
                                                    <option value='40'>40</option>
                                                    <option value='45'>45</option>
                                                    <option value='50'>50</option>
                                                    <option value='55'>55</option>
                                                    <option value='60'>60</option>
                                                    <option value='65'>65</option>
                                                    <option value='70'>70</option>
                                                    <option value='75'>75</option>
                                                </select>
                                            </div>
                                            <div className="col-md-1"></div>

                                            <div className="form-group col-md-5 d-flex ">
                                                <label for="inputEmail4" className='col-md-3'>Add Description</label>
                                                <input type="text" {...SpendMoreEarn("description", {required:true})} className="form-control" id="inputEmail4" />
                                            </div>
                                        </div>

                                        {
                                            moreLoader ? <Spin style={{ marginLeft: '30rem' }} /> : <button type="submit" style={{ marginLeft: '30rem' }} className="btn btn-outline-warning">ADD</button>
                                        }

                                    </form>
                                )
                            }



                            {/* For Give discount  */}

                            {
                                giveDiscount && (
                                    <form className="form ml-4 mt-4" onSubmit={handleSubmit2(onSubmitGiveDiscount)}>
                                        <div className="form-row">
                                            <div className="form-group col-md-5 d-flex ml-3">
                                                <label for="inputEmail4" className='col-md-3'>Discount Type</label>
                                                <input type="text" {...GiveDiscount("discount_type", {})} value={'Give Discount'} className="form-control" id="inputEmail4" readOnly />
                                            </div>
                                            <div className="col-md-1"></div>

                                            <div className="form-group col-md-5 d-flex">
                                                <label for="inputPassword4" className='col-md-3'>Coupon Code</label>
                                                <input type="text" className="form-control" id="inputPassword4" {...GiveDiscount("coupon_code", {required:true})} />
                                            </div>
                                            <div className="form-group col-md-5 d-flex ml-3">
                                                <label for="inputEmail4" className='col-md-3'>Add Title</label>
                                                <input type="text" className="form-control" id="inputEmail4" {...GiveDiscount("title", {required:true})} />
                                            </div>
                                            <div className="col-md-1"></div>

                                            <div className="form-group col-md-5 d-flex">
                                                <label className='col-md-3'>Duration</label>

                                                <label className='col-md-1'>form</label>
                                                <input type="date" className="form-control col-md-3 ml-2" {...GiveDiscount("from", {required:true})} />
                                                <label className='col-md-1 ml-4'>To</label>

                                                <input type="date" className="form-control col-md-3"  {...GiveDiscount("to", {required:true})} />
                                            </div>
                                            <div className="form-group col-md-5 d-flex ml-3">
                                                <label for="inputEmail4" className='col-md-3'>Country</label>
                                                <select className='form-control' {...GiveDiscount("country", {required:true})}  >
                                                    <option>--Select Country--</option>
                                                    {countryData.map((data) => (
                                                        <option value={data.country}>{data.country}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-1"></div>

                                            {/* <div className="form-group col-md-5 d-flex">
                                                <label for="inputEmail4" className='col-md-3'>City</label>
                                                <select className='form-control' {...GiveDiscount("city", {})} >
                                                    {cityData1.map((data) => (
                                                        <option value={data.id}>{data.city}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="form-group col-md-5 d-flex ml-3">
                                                <label for="inputEmail4" className='col-md-3'>Menu</label>
                                                <Select className='form-control'
                                                    mode="multiple"
                                                    allowClear
                                                    style={{ width: '100%' }}
                                                    placeholder="Please select"
                                                    onChange={handleGiveMenuChange}>handleGiveMenuChange
                                                    {menuData.map((data) => (
                                                        <option value={data.name}>{data.name}</option>
                                                    ))}
                                                </Select>
                                            </div>
                                            <div className="col-md-1"></div>

                                            <div className="form-group col-md-5 d-flex">
                                                <label for="inputEmail4" className='col-md-3'>Category</label>
                                                <Select className='form-control'
                                                    mode="multiple"
                                                    allowClear
                                                    style={{ width: '100%' }}
                                                    placeholder="Please select"
                                                    onChange={handleGiveCategoryChange}>
                                                    {categoryData.map((data) => (
                                                        <option value={data.name}>{data.name}</option>
                                                    ))}
                                                </Select>
                                            </div>

                                            <div className="form-group col-md-5 d-flex ml-3">
                                                <label for="inputEmail4" className='col-md-3'>Select Dish</label>
                                                <select className='form-control' {...GiveDiscount("dish", {})} >
                                                    <option></option>
                                                </select>
                                            </div> */}
                                            <div className="form-group col-md-5 d-flex">
                                                <label for="inputPassword4" className='col-md-3'>Add Description</label>
                                                <input type="text" className="form-control" id="inputPassword4" {...GiveDiscount("description", {required:true})} />
                                            </div>
                                            
                                            <div className="form-group col-md-5 ml-3 d-flex">
                                                <label for="inputEmail4" className='col-md-3'>Discount</label>
                                                <select className='form-control' {...GiveDiscount("discount", {required:true})} >
                                                    <option value='05'>05</option>
                                                    <option value='10'>10</option>
                                                    <option value='15'>15</option>
                                                    <option value='20'>20</option>
                                                    <option value='25'>25</option>
                                                    <option value='30'>30</option>
                                                    <option value='35'>35</option>
                                                    <option value='40'>40</option>
                                                    <option value='45'>45</option>
                                                    <option value='50'>50</option>
                                                    <option value='55'>55</option>
                                                    <option value='60'>60</option>
                                                    <option value='65'>65</option>
                                                    <option value='70'>70</option>
                                                    <option value='75'>75</option>
                                                </select>
                                            </div>


                                        </div>
                                        {
                                            discountLoader ? <Spin style={{ marginLeft: '30rem' }} /> : <button type="submit" style={{ marginLeft: '30rem' }} className="btn btn-outline-warning">ADD</button>
                                        }


                                    </form>
                                )
                            }
                        </Card>

                    </div>


                    {/* <!-- End of Main Content --> */}
                    <Footer />
                </div>
                {/* <!-- End of Content Wrapper --> */}
            {/* </div> */}
        </>
    )
}

export default PromoCodePage