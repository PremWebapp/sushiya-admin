import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Token, PathUrl } from '../../../config/Config'
import Loader from "react-js-loader";
import { Table, Switch, message, Select, Button } from 'antd'
import { useSelector, useDispatch } from "react-redux";

import SimpleMap from '../../GoogleMap/SimpleMap';
import Moment from 'react-moment';
import LocationSearchInput from '../../locationSearch/LocationSearchInput';
import { addRestaurant, fetchBranch, fetchRestaurant } from '../../../redux/reducers/restorentReducer';
import { toast } from 'react-toastify';
import { AudioOutlined } from '@ant-design/icons';
import { cityFetchData } from '../../../redux/reducers/country&cityReducer';
import UserMap from '../user/UserMap';

const RestaurantPage = () => {
    const dispatch = useDispatch()
    const { userData: { token, user } } = useSelector(state => state.auth)
    const { restoList, branchList, restroLoading } = useSelector(state => state.restaurant)
    const { countryListForFilter, cityListForFilter, } = useSelector(state => state.countryAcity)
    // Token ,UserId and Url
    // const token = Token().token;
    // const url = PathUrl().urlData?.development;
    const url = PathUrl().urlData?.production;

    const [loader, setloader] = useState(true)
    const [restaurantMap, setRestaurantMap] = useState(true);
    const [restaurant, setRestaurant] = useState(false);
    const [branch, setBranch] = useState(false);

    const [addList, setAddList] = useState(false);
    const [restaurantData, setRestaurantData] = useState([]);
    const [branchData, setBranchData] = useState([]);

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

    useEffect(() => {
        // loadRestroList()
        // loadBranch()
        $("#restMap").css("background-color", "#fc6011")
        $("#restMap").css("color", "white")

        dispatch(fetchRestaurant({type:'All', token }))
        dispatch(fetchBranch({type:'All', token }))
    }, [])


    // For Resto List 
    const loadRestroList = () => {

        axios.get(`${url}/restaurant`, { headers: { Authorization: 'Bearer ' + token } })
            .then((response) => {

                setRestaurantData(response.data)
                console.log(response.data, "restaurant list");
                setloader(false)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // For Restaurant Data Colum

    const restroColumn = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            sorter: {
                compare: (a, b) => a?.id - b?.id,
                multiple: 3,
            },
        },
        {
            title: 'Restro Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'city_detail',
            key: 'city',
            // render: city_detail => `${city_detail?.city}`
        },
        {
            title: 'Number',
            dataIndex: 'created_at',
            key: 'added_on',
            sorter: {
                compare: (a, b) => a?.created_at - b?.created_at,
                multiple: 3,
            },
        
        },
        {
            title: 'Join Date',
            dataIndex: 'email',
            key: 'email',
            sorter: {
                compare: (a, b) => a?.created_at - b?.created_at,
                multiple: 3,
            },
            render: (text, record) => (
                <span>{(record?.created_at && <Moment format="YYYY/MM/DD">
                    {record?.created_at}
                </Moment>)}</span>
            )
        },
        {
            title: 'Country',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            sorter: {
                compare: (a, b) => a?.status - b?.status,
                multiple: 2,
            },
            render: (text, record) => <span>{record?.approve == '0' ? <span><i className='fa fa-check' id={record?.id} onClick={approve} style={{ color: 'red', marginRight: '1rem', cursor: 'pointer' }}></i> <i className='fa fa-times' style={{ cursor: 'pointer' }} id={record?.id} onClick={reject} ></i></span> : (record?.approve == '1' ? 'Approved' : 'rejected')}</span>
        },

        {
            title: 'Action',
            dataIndex: 'id',
            key: 'timing',
            render: (text, record) => <span>{(record?.approve == '0' ? 'Pending' : (record?.approve == '1' ? <Switch defaultChecked onClick={((event) => SwitchReject(event, record?.id))} /> : <Switch onClick={((event) => SwitchApprove(event, record?.id))} />))}</span>,

        },
    ];

    const branchColumn = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            sorter: {
                compare: (a, b) => a?.id - b?.id,
                multiple: 3,
            },
        },
        {
            title: 'Branch Name',
            dataIndex: 'name',
            key: 'name',
            sorter: {
                compare: (a, b) => a?.name - b?.name,
                multiple: 3,
            },
        },
        {
            title: 'Email',
            dataIndex: 'city_detail',
            key: 'city',
            sorter: {
                compare: (a, b) => a?.city_detail - b?.city_detail,
                multiple: 3,
            },
            render: city_detail => `${city_detail?.city}`
        },
        {
            title: 'Number',
            dataIndex: 'created_at',
            key: 'added_on',
            sorter: {
                compare: (a, b) => a?.created_at - b?.created_at,
                multiple: 3,
            },
            render: (text, record) => (
                <span>{(record?.created_at && <Moment format="YYYY/MM/DD">
                    {record?.created_at}
                </Moment>)}</span>
            )
        },
        {
            title: 'Join Date',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Country',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            sorter: {
                compare: (a, b) => a?.status - b?.status,
                multiple: 2,
            },
            render: (text, record) => <span>{record?.approve == '0' ? <span><i className='fa fa-check' id={record?.id} onClick={approve} style={{ color: 'red', marginRight: '1rem', cursor: 'pointer' }}></i> <i className='fa fa-times' style={{ cursor: 'pointer' }} id={record?.id} onClick={reject} ></i></span> : (record?.approve == '1' ? 'Approved' : 'rejected')}</span>
        },

        {
            title: 'Action',
            dataIndex: 'id',
            key: 'timing',
            render: (text, record) => <span>{(record?.approve == '0' ? 'Pending' : (record?.approve == '1' ? <Switch defaultChecked onClick={((event) => SwitchReject(event, record?.id))} /> : <Switch onClick={((event) => SwitchApprove(event, record?.id))} />))}</span>,

        },
    ];
    // For Restaurant Approve 
    const approve = (e) => {
        ChangeRestaurantStatus(true, e.target.id)
    }

    const SwitchApprove = (event, id) => {
        ChangeRestaurantStatus(event, id)
    }


    // For Restaurant Reject 
    const reject = (e) => {
        ChangeRestaurantStatus(false, e.target.id)
    }


    const SwitchReject = (event, id) => {
        ChangeRestaurantStatus(event, id)
    }

    // For Update Restaurant Status 

    const ChangeRestaurantStatus = (value1, id1) => {
        axios.post(`${url}/UpdateRestaurantStatus`, { value: value1, id: id1 }, { headers: { Authorization: 'Bearer ' + token } })
            .then((response) => {
                loadRestroList()
                message.success(`Status of ${response.data?.name} has been Changed..!`)
            })
            .catch((response) => {
                console.log(response.error)
            });
    }




    // For Branch Approve 
    const approveBranch = (e) => {
        ChangeBranchStatus(false, e.target.id)
    }

    const SwitchBranchApprove = (event, id) => {
        ChangeBranchStatus(event, id)
    }
    // For Branch Reject 
    const rejectBranch = (e) => {
        ChangeBranchStatus(false, e.target.id)
    }

    const SwitchBranchReject = (event, id) => {
        ChangeBranchStatus(event, id)
    }

    //   For Update Branch Status 

    const ChangeBranchStatus = (value1, id1) => {
        alert(id1)
        axios.post(`${url}/BranchStatus`, { value: value1, id: id1 }, { headers: { Authorization: 'Bearer ' + token } })
            .then((response) => {
                loadBranch()
                message.success(`Status of ${response.data?.name} has been Changed..!`)
            })
            .catch((response) => {
                console.log(response.error)
            });
    }

    // For Branch List 
    const loadBranch = () => {

        axios.get(`${url}/AdminBranch`, { headers: { Authorization: 'Bearer ' + token } })
            .then((response) => {
                console.log(response.data, "branch data");
                setBranchData(response.data)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const dataType = (event, v) => {
        console.log('event', event)
        if (event === 'Restaurant') {
            setRestaurant(true);
            setBranch(false);
        }
        if (event === 'Branch') {
            setRestaurant(false);
            setBranch(true);
        }
    }

    // For Open List Component
    const openList = (e) => {
        setRestaurantMap(false);
        setRestaurant(true);
        setBranch(false);
        setAddList(true);
        e.target.classList.add('active');

        $("#restMap").css("background-color", "#fff");
        $("#restMap").css("color", "#858796");
        $("#restList").css("background-color", "#fc6011",);
        $("#restList").css("color", "#fff");
        $('#restMap').removeClass('active');
    }

    // For Open Map Component 
    const openMap = (e) => {
        setRestaurantMap(true);
        setRestaurant(false);
        setBranch(false);
        e.target.classList.add('active');

        $("#restList").css("background-color", "#fff");
        $("#restList").css("color", "#858796");
        $("#restMap").css("background-color", "#fc6011",);
        $("#restMap").css("color", "#fff");
        $('#restList').removeClass('active');
    }

    // For Save Restaurant Form Data 
    const { register, handleSubmit } = useForm();

    const onSubmit = data => {

        let dd = new FormData();

        dd.append('name', data?.name);
        dd.append('email', data?.email);
        dd.append('mobile', data?.mobile);
        dd.append('password', data?.password);

        dispatch(addRestaurant({ data, token }))

        setTimeout(() => {
            dispatch(fetchRestaurant({ token }))
        }, 2000)
        // Send a POST request
        // axios.post(`${url}/restaurant`, dd, { headers: { Authorization: 'Bearer ' + token } })
        //     .then((response) => {

        //         $('#form-btn').trigger('click');
        //         $('#CountryModal form :input').val("");
        //         message.success('Restaurant Created Successfully..!!');
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
    };

    const typeList = [
        {
            value: 'Restaurant',
        },
        {
            value: 'Branch',
        },
    ]
    const restroTypeList = [
        {
            value: 'All',
        },
        {
            value: 'New',
        },
        {
            value: 'Pending',
        },
        {
            value: 'Approved',
        },
    ]

    const handleTypeChange=(e,v)=>{
      dispatch(fetchRestaurant({type:e, token }))
      dispatch(fetchBranch({type:e, token }))
        console.log(e,v)
    }
    
    return (
        <>
            <div class="row">

                <div class="col-lg-12">

                    <div class="card">

                        <div class="card-body">
                            <h4 className="ml-5 colorblack bold">Restaurant Management</h4>
                            <div className="mt-4 text-center">
                                <div class="btn-group" style={{ minWidth: '50%' }}>
                                    <button type="button" class="btn active border rounded-0" id="restMap" onClick={openMap}>Map View</button>
                                    <button type="button" class="btn border rounded-0" onClick={openList} id="restList">List View</button>

                                </div>
                                {/* <div className="col-md-12 col-lg-12 col-sm-12" style={{ float: 'right' }}> */}
                                &nbsp;&nbsp;
                                {
                                    // addList && (<button type="button" class="btn btn-outline-dark" style={{ minWidth: '20%', float: 'right' }} data-toggle="modal" data-target="#CountryModal">Add</button>)
                                    !restaurantMap && (<Button  type='primary' size="medium" style={{ minWidth: '10%', float: 'right' }} data-toggle="modal" data-target="#CountryModal">Add</Button>)
                                }
                                {/* </div> */}

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                <div className="row">
                    {
                        // restaurantMap && (<SimpleMap />)
                        restaurantMap && (<UserMap />)
                    }

                    {/* {
                        restaurant && ( */}
                        <div className="col-md-12 col-lg-12 col-sm-12">
                         {!restaurantMap &&<div className="row  row-cols-auto py-4 bg-white border rounded my-4">
                                <div className="col">
                                    <div class="input-group mb-3">
                                        {/* <span class="input-group-text " id="basic-addon1"><i className="fa fa-search"></i></span> */}
                                        <Select
                                            mode="multiple"
                                            allowClear
                                            placeholder="Search By Name"
                                            showArrow
                                            style={{
                                                width: '100%',
                                            }}
                                            options={options}
                                        />
                                        {/* <input type="text" class="form-control" placeholder="Search By City or Country" aria-label="Username" aria-describedby="basic-addon1" /> */}
                                    </div>
                                </div>
                                <div className="col">
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
                                <div className="col">
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
                                <div className="col">
                                    <Select
                                        mode="single"
                                        allowClear
                                        placeholder="Search By City"
                                        showArrow
                                        style={{
                                            width: '100%',
                                        }}
                                        options={cityListForFilter}
                                    />
                                </div>
                                <div className="col">
                                    <Select
                                        mode="single"
                                        // placeholder="Search By City"
                                        defaultValue={['Restaurant']}
                                        style={{
                                            width: '100%',
                                        }}
                                        options={typeList}
                                        onChange={dataType}
                                    />
                                    {/* </select> */}
                                </div>
                                <div className="col">
                                    <Select
                                        mode="single"
                                        defaultValue={['All']}
                                        style={{
                                            width: '100%',
                                        }}
                                        options={restroTypeList}
                                        onChange={handleTypeChange}
                                    />
                                    {/* </select> */}
                                </div>
                                <div className="col">
                                    <div class="input-group mb-2 ">
                                        <Button type="danger " className=' px-4 ' onClick={() => window.location.reload()}>Clear</Button>
                                        <Button type="primary" className="mx-2">Submit</Button>
                                    </div>
                                </div>
                            </div>}

                            {/* 
                            {
                                loader && (
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <div className={"item ml-5"}>
                                                <Loader type="hourglass" bgColor={"blue"} color={'blue'} size={100} />
                                            </div>
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>

                                    </tr>

                                )
                            } */}
                               {restaurant && (
                                    <Table loading={restroLoading} dataSource={restoList} columns={restroColumn} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['05', '10', '20', '30'] }} />
                                )}

                        </div>
                        {/* ) */}
                    {/* } */}

                    {
                        branch && (
                            <div className="col-md-12 col-lg-12 col-sm-12">

                                {/* <div className="row row-cols-1 row-cols-sm-6 row-cols-md-6 row-cols-lg-6  py-4 bg-white border rounded my-4">
                                    <div className="col">
                                        <div class="input-group mb-3">
                                            <span class="input-group-text " id="basic-addon1"><i className="fa fa-search"></i></span>
                                            <Select
                                                mode="multiple"
                                                allowClear
                                                placeholder="Search By Name"
                                                showArrow
                                                style={{
                                                    width: '80%',
                                                }}
                                                options={options}
                                            />
                                        </div>
                                    </div>
                                    <div className="col">
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
                                    <div className="col">
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
                                    <div className="col">
                                        <Select
                                            mode="single"
                                            allowClear
                                            placeholder="Search By City"
                                            showArrow
                                            style={{
                                                width: '100%',
                                            }}
                                            options={cityListForFilter}
                                        />
                                    </div>
                                    <div className="col">

                                        <Select
                                            mode="single"
                                            defaultValue={['Restaurant']}
                                            style={{
                                                width: '100%',
                                            }}
                                            options={typeList}
                                            onChange={dataType}
                                        />
                                    </div>

                                    <div className="col">
                                        <div class="input-group mb-2 ">
                                            <Button type="danger " className=' px-4 ' onClick={() => window.location.reload()}>Clear</Button>
                                            <Button type="primary" className="mx-2">Submit</Button>
                                        </div>
                                    </div>
                                </div> */}

                                <Table dataSource={branchList} columns={branchColumn} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['05', '10', '20', '30'] }} />
                            </div>
                        )

                    }
                </div>
            </div>
            {/* Restaurant Modal */}
            <div class="modal fade" id="CountryModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title ml-auto colorblack bold" id="exampleModalLongTitle" >Add Restaurant</h5>
                            <button type="button" id="form-btn" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div class="modal-body">
                                <div className="row">
                                    <div className="col-md-12 col-lg-12 col-sm-12 d-flex">
                                        <div className="col-md-4 col-lg-4 col-sm-12">
                                            <label className="colorblack bold">Restaurant Name</label>
                                        </div>
                                        <div className="col-md-8 col-lg-8 col-sm-12 mb-3">
                                            <input {...register("name", { required: true, maxLength: 50 })} className="form-control" />

                                        </div>
                                    </div>

                                    <div className="col-md-12 col-lg-12 col-sm-12 d-flex mb-3">
                                        <div className="col-md-4 col-lg-4 col-sm-12">
                                            <label className="colorblack bold">Email</label>

                                        </div>
                                        <div className="col-md-8 col-lg-8 col-sm-12">
                                            <input {...register("email", { required: true, maxLength: 50 })} className="form-control" />

                                        </div>
                                    </div>

                                    <div className="col-md-12 col-lg-12 col-sm-12 d-flex mb-3">
                                        <div className="col-md-4 col-lg-4 col-sm-12">
                                            <label className="colorblack bold">Mobile Number</label>
                                        </div>
                                        <div className="col-md-8 col-lg-8 col-sm-12">
                                            <input type="number"  {...register("mobile", { required: true, maxLength: 10, })} className="form-control" />
                                            <small>(Max-Length 10 Character)</small>
                                        </div>
                                    </div>

                                    <div className="col-md-12 col-lg-12 col-sm-12 d-flex mb-3">
                                        <div className="col-md-4 col-lg-4 col-sm-12">
                                            <label className="colorblack bold">Password</label>
                                        </div>
                                        <div className="col-md-8 col-lg-8 col-sm-12">
                                            <input {...register("password", { required: true, maxLength: 20 })} className="form-control" />

                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer" style={{ justifyContent: "center" }}>
                                {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> */}
                                <button type="submit" class="btn btn-primary">Add Restaurant</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default RestaurantPage
