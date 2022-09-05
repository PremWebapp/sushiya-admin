import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Footer from '../../footer/Footer'
import SideNav from '../../sidenav/SideNav'
import TopBar from '../../topbar/TopBar'
import { DoubleRightOutlined, StepBackwardOutlined } from '@ant-design/icons';
import { Card, Select, message } from 'antd';
import axios from 'axios';
import { Token, PathUrl } from '../../../../config/Config';
import { useForm } from 'react-hook-form';


function PromotionPage() {
    const token = Token().token;
    const url = PathUrl().urlData.development;

    useEffect(() => {
        MenuList()
        CategoryList()

        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, [])

    const [menuData, setMenuData] = useState([])
    const [categoryData, setCategoryData] = useState([])

    const [selectedImage, setSelectedImage] = useState();

    const [selectedDiscountImage, setSelectedDiscountImage] = useState();


    const { register: SpendMoreEarn, handleSubmit: handleSubmit1, } = useForm({ mode: "onBlur", });



    const { register: GiveDiscount, handleSubmit: handleSubmit2, reset } = useForm({ mode: "onBlur", });
    const [giveDiscount, setGiveDiscount] = useState(false)

    const [spendEarn, setSpendEarn] = useState(true)

    const [formType, setFormType] = useState({
        type: '1'
    })


    // For Menu List 
    const MenuList = e => {
        axios.get(`${url}/menu`, { headers: { Authorization: 'Bearer ' + token } })
            .then((response) => {
                setMenuData(response.data)
            })
            .catch((response) => {

                console.error(response.error);

            });
    }

    // For Category List 
    const CategoryList = e => {
        axios.get(`${url}/category`, { headers: { Authorization: 'Bearer ' + token } })
            .then((response) => {
                setCategoryData(response.data)
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
            setGiveDiscount(false)
            setSpendEarn(true)
        } else if (value === '2') {
            setGiveDiscount(true)
            setSpendEarn(false)
        }

        setFormType({
            ...formType,
            [name]: value
        })
    };


    // For Spend More Earn Form Data 
    const [spendMenuSelect, setSpendMenuSelect] = useState([])
    const [spendCategorySelect, setSpendCategorySelect] = useState([])

    function handleSpendMenuChange(value) {
        setSpendMenuSelect(value)
    }
    console.log("this is menu", spendMenuSelect)

    function handleSpendCategoryChange(value) {
        setSpendCategorySelect(value)
    }

    const onSubmitSpendEarn = data => {

        if (data.from > data.to) {
            alert("Duration 'To' date cant't be less then or equal to 'From' date please pickup correct date..")
        } else {

            const dd = new FormData();

            dd.append('image', selectedImage);
            dd.append('menu', spendMenuSelect);
            dd.append('category', spendCategorySelect);
            dd.append('dish', '');
            dd.append('title', data.title);
            dd.append('spending_min', data.min);
            dd.append('spending_max', data.max);
            dd.append('from', data.from);
            dd.append('to', data.to);
            dd.append('discount', data.discount);

            axios.post(`http://52.91.235.134/api/SpendMorePromotion`, dd, { headers: { Authorization: 'Bearer ' + token } })
                .then((response) => {
                    reset()
                    setSelectedDiscountImage("")
                    message.success("Spend More Earn Promotion Created..!!")
                    console.log(response, "this is from Promotion Controller")
                })
                .catch((error) => {
                    console.error(error);
                });

        }
    }

    // For Give Discount Form Data 
    const [giveMenuSelect, setGiveMenuSelect] = useState([])
    const [giveCategorySelect, setGiveCategorySelect] = useState([])

    function handleGiveMenuChange(value) {
        setGiveMenuSelect(value)
    }

    function handleGiveCategoryChange(value) {
        setGiveCategorySelect(value)
    }
    const onSubmitGiveDiscount = data => {

        if (data.from > data.to) {
            alert("Duration 'To' date cant't be less then or equal to 'From' date please pickup correct date..")
        } else {

            const dd = new FormData();

            dd.append('image', selectedDiscountImage);
            dd.append('menu', giveMenuSelect);
            dd.append('category', giveCategorySelect);
            dd.append('dish', '');
            dd.append('title', data.title);
            dd.append('from', data.from);
            dd.append('to', data.to);
            dd.append('discount', data.discount);

            message.loading({ content: 'Loading...', key: 2 });
            axios.post(`http://52.91.235.134/api/Promotion`, dd, { headers: { Authorization: 'Bearer ' + token } })
                .then((response) => {
                    reset()
                    setSelectedDiscountImage("")
                    message.success('Discount Loaded..!');

                })
                .catch((response) => {
                    setTimeout(() => {
                        message.error({ content: response.error, key: 3, duration: 2 });
                    }, 1000);
                });


        }
    }


    // For Soend More Earn Image Data 
    const imageChange = (e) => {

        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }

    };

    // This function will be triggered when the "X" button is clicked
    const removeSelectedImage = () => {
        setSelectedImage("");
    };

    // For Give Image Data 
    const imageDiscountChange = (e) => {

        if (e.target.files && e.target.files.length > 0) {
            setSelectedDiscountImage(e.target.files[0]);
        }

    };

    // This function will be triggered when the "X" button is clicked
    const removeDiscountSelectedImage = () => {
        setSelectedDiscountImage();
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
                            <h6 className="ml-3 colorblack bold mt-3 "><NavLink to="/Admin/Promo"><StepBackwardOutlined style={{ color: 'black' }} /></NavLink> Promo Code Management <DoubleRightOutlined /> Add Promotion</h6>
                        </div>
                    </div>
                    <Card type="inner" style={{ marginLeft: -30 }} title={<h6 className="ml-5 colorblack d-flex  mt-3"><span className='mr-4'>Other Type : </span>
                        <div className="form-check">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="type" onChange={handleChange} checked={formType.type === "1"} value="1" />Spend More Earn
                            </label>
                        </div>
                        <div className="form-check ml-2">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="type" onChange={handleChange} checked={formType.type === "2"} value="2" /> Give Discount
                            </label>
                        </div>
                    </h6>} >
                        {/* For Spend Earn  */}

                        {
                            spendEarn && (
                                <form className="form ml-4 mt-4" onSubmit={handleSubmit1(onSubmitSpendEarn)}>
                                    <div className="form-row">
                                        <div className="form-group col-md-5 d-flex ml-3">
                                            <label for="inputEmail4" className='col-md-3'>Add Title</label>
                                            <input type="text" {...SpendMoreEarn("title", {})} className="form-control" id="inputEmail4" />
                                        </div>
                                        <div className="col-md-1"></div>

                                        <div className="form-group col-md-5 d-flex">
                                            <label className='col-md-3'>Duration</label>

                                            <label className='col-md-1'>form</label>
                                            <input type="date" className="form-control col-md-3 ml-2" {...SpendMoreEarn("from", {})} />
                                            <label className='col-md-1 ml-4'>To</label>

                                            <input type="date" {...SpendMoreEarn("to", {})} className="form-control col-md-3" />
                                        </div>
                                        <div className="form-group col-md-5 d-flex ml-3">
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
                                                    <option value={data.id}>{data.name}</option>
                                                ))}
                                            </Select>
                                        </div>

                                        <div className="form-group col-md-5 d-flex ml-3">
                                            <label for="inputEmail4" className='col-md-3'>Select Dish</label>
                                            <select className='form-control' {...SpendMoreEarn("dish", {})}>
                                                <option></option>
                                            </select>
                                        </div>
                                        <div className="col-md-1"></div>
                                        <div className="form-group col-md-5 d-flex">
                                            <label className='col-md-3 '>SPENDING AMOUNT</label>
                                            <label className='col-md-1'>Min</label>
                                            <input type='number' className='form-control ml-2' {...SpendMoreEarn("min", {})} />
                                            <label className='col-md-1 ml-4'>Max</label>
                                            <input type='number' {...SpendMoreEarn("max", {})} className='form-control ml-2' />
                                        </div>

                                        <div className="form-group col-md-5 d-flex ml-3">
                                            <label for="inputEmail4" className='col-md-3'>Discount</label>
                                            <select className='form-control' {...SpendMoreEarn("discount", {})} >
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
                                        <div className="col-md-5">
                                            <div className="col-md-12 col-lg-12 col-sm-12 mt-32">
                                                <label className="colorblack bold col-md-3">Upload Image</label>

                                                <input
                                                    accept="image/*"
                                                    type="file"
                                                    {...SpendMoreEarn("image", {})}
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
                                    </div>


                                    <button type="submit" style={{ marginLeft: '30rem' }} className="btn btn-outline-warning">ADD</button>
                                </form>
                            )
                        }


                        {/* For Give discount  */}

                        {
                            giveDiscount && (
                                <form className="form ml-4 mt-4" onSubmit={handleSubmit2(onSubmitGiveDiscount)}>
                                    <div className="form-row">

                                        <div className="form-group col-md-5 d-flex ml-3">
                                            <label for="inputEmail4" className='col-md-3'>Add Title</label>
                                            <input type="text" className="form-control" id="inputEmail4" {...GiveDiscount("title", {})} />
                                        </div>
                                        <div className="col-md-1"></div>

                                        <div className="form-group col-md-5 d-flex">
                                            <label className='col-md-3'>Duration</label>

                                            <label className='col-md-1'>form</label>
                                            <input type="date" className="form-control col-md-3 ml-2" {...GiveDiscount("from", {})} />
                                            <label className='col-md-1 ml-4'>To</label>

                                            <input type="date" className="form-control col-md-3"  {...GiveDiscount("to", {})} />
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
                                        </div>
                                        <div className="col-md-1"></div>
                                        <div className="form-group col-md-5 d-flex">
                                            <label for="inputEmail4" className='col-md-3'>Discount</label>
                                            <select className='form-control' {...GiveDiscount("discount", {})} >
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


                                        <div className="col-md-6 ">
                                            <div className="col-md-12 col-lg-12 col-sm-12 d-flex">
                                                <label className="colorblack bold col-md-2 ">Upload Image</label>

                                                <input
                                                    accept="image/*"
                                                    type="file"
                                                    {...SpendMoreEarn("image", {})}
                                                    onChange={imageDiscountChange}
                                                    className="form-control ml-4 col-md-8"
                                                />
                                            </div>

                                            <div className="col-md-6 col-lg-6 col-sm-12 mt-4 ml-5">
                                                {selectedDiscountImage && (

                                                    <div className="col-md-12 col-lg-12 " >
                                                        <button onClick={removeDiscountSelectedImage} className="btn btn-sm mr-4" style={{ float: 'right', color: 'black', fontWeight: 'bolder' }}>
                                                            X
                                                        </button><br />
                                                        <img
                                                            src={URL.createObjectURL(selectedDiscountImage)}
                                                            alt="ProcoCode_Image"
                                                            style={{ maxWidth: '80%', minWidth: '80%', maxHeight: '130px' }}
                                                        />

                                                    </div>
                                                )}


                                            </div>
                                        </div>
                                    </div>


                                    <button type="submit" style={{ marginLeft: '30rem' }} className="btn btn-outline-warning">ADD</button>
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

export default PromotionPage