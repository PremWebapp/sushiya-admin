import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Token, PathUrl } from '../../../config/Config'
import Loader from "react-js-loader";
import { Table, Switch, message } from 'antd'

import SimpleMap from '../../GoogleMap/SimpleMap';
import Moment from 'react-moment';
import LocationSearchInput from '../../locationSearch/LocationSearchInput';

const RestaurantPage = (props) => {

    // Token ,UserId and Url
    const token = Token().token;
    // const url = PathUrl().urlData.development;
    const url = PathUrl().urlData.production;


    const [loader, setloader] = useState(true)
    const [restaurantMap, setRestaurantMap] = useState(true);
    const [restaurantList, setRestaurantList] = useState(false);
    const [branchList, setBranchList] = useState(false);

    const [addList, setAddList] = useState(false);
    const [restaurantData, setRestaurantData] = useState([]);
    const [branchData, setBranchData] = useState([]);


    useEffect(() => {
        loadRestroList()
        loadBranchList()
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
                compare: (a, b) => a.id - b.id,
                multiple: 3,
            },
        },
        {
            title: 'Restro Name',
            dataIndex: 'name',
            key: 'name',
            sorter: {
                compare: (a, b) => a.name - b.name,
                multiple: 3,
            },
        },
        {
            title: 'City',
            dataIndex: 'city_detail',
            key: 'city',
            sorter: {
                compare: (a, b) => a?.city_detail - b?.city_detail,
                multiple: 3,
            },
            render: city_detail => `${city_detail?.city}`
        },
        {
            title: 'Added On',
            dataIndex: 'created_at',
            key: 'added_on',
            sorter: {
                compare: (a, b) => a.created_at - b.created_at,
                multiple: 3,
            },
            render: (text, record) => (
                <span>{(record.created_at && <Moment format="YYYY/MM/DD">
                    {record.created_at}
                </Moment>)}</span>
            )
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            sorter: {
                compare: (a, b) => a.status - b.status,
                multiple: 2,
            },
            render: (text, record) => <span>{record.approve == '0' ? <span><i className='fa fa-check' id={record.id} onClick={approve} style={{ color: 'red', marginRight: '1rem', cursor: 'pointer' }}></i> <i className='fa fa-times' style={{ cursor: 'pointer' }} id={record.id} onClick={reject} ></i></span> : (record.approve == '1' ? 'Approved' : 'rejected')}</span>
        },

        {
            title: 'Action',
            dataIndex: 'id',
            key: 'timing',
            render: (text, record) => <span>{(record.approve == '0' ? 'Pending' : (record.approve == '1' ? <Switch defaultChecked onClick={((event) => SwitchReject(event, record.id))} /> : <Switch onClick={((event) => SwitchApprove(event, record.id))} />))}</span>,

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
                message.success(`Status of ${response.data.name} has been Changed..!`)
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
                loadBranchList()
                message.success(`Status of ${response.data.name} has been Changed..!`)
            })
            .catch((response) => {
                console.log(response.error)
            });
    }


    // For Branch List 
    const loadBranchList = () => {

        axios.get(`${url}/AdminBranchList`, { headers: { Authorization: 'Bearer ' + token } })
            .then((response) => {
                console.log(response.data,"branch data");
                setBranchData(response.data)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const DataType = (e) => {

        if (e.target.value === 'restaurant') {
            setRestaurantList(true);
            setBranchList(false);
        }
        if (e.target.value === 'branch') {
            setRestaurantList(false);
            setBranchList(true);
        }
    }

    // For Branch Data Colum

    const branchColumn = [
        {
            title: 'Id',
            dataIndex: 'branch_id',
            key: 'branch_id',
            sorter: {
                compare: (a, b) => a.branch_id - b.branch_id,
                multiple: 3,
            },
        },
        {
            title: 'Branch Name',
            dataIndex: 'branch_name',
            key: 'branch_name',
            sorter: {
                compare: (a, b) => a.branch_name - b.branch_name,
                multiple: 3,
            },
        },
        {
            title: 'Restaurant Name',
            dataIndex: 'restaurant_detail',
            key: 'Restaurant',
            sorter: {
                compare: (a, b) => a.restaurant_detail - b.restaurant_detail,
                multiple: 3,
            },
            render: restaurant_detail => `${restaurant_detail.name}`
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
            sorter: {
                compare: (a, b) => a.country - b.country,
                multiple: 3,
            },
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
            sorter: {
                compare: (a, b) => a.city - b.city,
                multiple: 3,
            },
        },
        {
            title: 'Timing',
            dataIndex: 'start_time  end_time',
            key: 'timing',
            render: (text, record) => (
                <span>{(record.start_time && <span> {record.start_time}am To {record.end_time}pm </span>)}</span>
            )

        },
        {
            title: 'Added On',
            dataIndex: 'created_at',
            key: 'added_on',
            sorter: {
                compare: (a, b) => a.created_at - b.created_at,
                multiple: 3,
            },
            render: (text, record) => (
                <span>{(record.created_at && <Moment format="YYYY/MM/DD">
                    {record.created_at}
                </Moment>)}</span>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            sorter: {
                compare: (a, b) => a.status - b.status,
                multiple: 2,
            },
            render: (text, record) => <span>{record.approve == '0' ? <span><i className='fa fa-check' id={record.id} onClick={approveBranch} style={{ color: 'red', marginRight: '1rem', cursor: 'pointer' }}></i> <i className='fa fa-times' style={{ cursor: 'pointer' }} id={record.id} onClick={rejectBranch} ></i></span> : (record.approve == '1' ? 'Approved' : 'rejected')}</span>
        },

        {
            title: 'Action',
            dataIndex: 'id',
            key: 'timing',
            render: (text, record) => <span>{(record.approve == '0' ? 'Pending' : (record.approve == '1' ? <Switch defaultChecked onClick={((event) => SwitchBranchReject(event, record.id))} /> : <Switch onClick={((event) => SwitchBranchApprove(event, record.id))} />))}</span>,

        },
    ];


    // For Open List Component
    const openList = (e) => {
        setRestaurantMap(false);
        setRestaurantList(true);
        setBranchList(false);
        setAddList(true);
        e.target.classList.add('active');
        $('#restMap').removeClass('active');
    }

    // For Open Map Component 

    const openMap = (e) => {
        setRestaurantMap(true);
        setRestaurantList(false);
        setBranchList(false);
        e.target.classList.add('active');
        $('#restList').removeClass('active');
    }

    // For Save Restaurant Form Data 
    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
        let dd = new FormData();

        dd.append('name', data.name);
        dd.append('email', data.email);
        dd.append('mobile', data.mobile);
        dd.append('password', data.password);

        // Send a POST request

        axios.post(`${url}/restaurant`, dd, { headers: { Authorization: 'Bearer ' + token } })
            .then((response) => {

                $('#form-btn').trigger('click');
                $('#CountryModal form :input').val("");
                message.success('Restaurant Created Successfully..!!');
            })
            .catch((error) => {
                console.error(error);
            });

    };
    return (
        <>
            <div class="row">

                <div class="col-lg-12">

                    <div class="card mb-4">

                        <div class="card-body">
                            <h3 className="ml-5 colorblack bold">Restaurant Management</h3>
                            <div className="mt-4 text-center">
                                <div class="btn-group" style={{ minWidth: '50%' }}>
                                    <button type="button" class="btn btn-outline-warning active" id="restMap" onClick={openMap}>Map View</button>
                                    <button type="button" class="btn btn-outline-warning" onClick={openList} id="restList">List View</button>

                                </div>
                                <div className="col-md-12 col-lg-12 col-sm-12" style={{ float: 'right' }}>
                                    &nbsp;&nbsp;
                                    {
                                        addList && (<button type="button" class="btn btn-outline-dark" style={{ minWidth: '20%', float: 'right' }} data-toggle="modal" data-target="#CountryModal">Add</button>)
                                    }
                                </div>

                            </div>
                        </div>
                    </div>


                </div>



            </div>
            <div className="container-fluid">
                <div className="row">
                    {
                        restaurantMap && (<SimpleMap />)
                    }

                    {
                        restaurantList && (<div className="col-md-12 col-lg-12 col-sm-12">
                            <div className="row mb-4">
                                <div className="col-md-4 col-lg-4 col-sm-12">
                                    <div class="input-group mb-3">
                                        <span class="input-group-text " id="basic-addon1"><i className="fa fa-search"></i></span>
                                        <input type="text" class="form-control" placeholder="Search By City or Country" aria-label="Username" aria-describedby="basic-addon1" />
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-4 col-sm-12">
                                    <select className="form-control">
                                        <option>Last 7 Days</option>
                                        <option>Last Month</option>
                                        <option>Last 6 Months</option>

                                    </select>
                                </div>
                                <div className="col-md-4 col-lg-4 col-sm-12">
                                    <select className="form-control" onChange={DataType}>
                                        <option value="restaurant" selected>Restaurant</option>
                                        <option value="branch">Branch</option>

                                    </select>
                                </div>

                                <div className="col-md-8 col-lg-8 col-sm-12">
                                    <LocationSearchInput />
                                </div>
                            </div>


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
                            }
                            {
                                restaurantData && (
                                    <Table dataSource={restaurantData} columns={restroColumn} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['05', '10', '20', '30'] }} />
                                )
                            }

                        </div>)
                    }

                    {
                        branchList && (
                            <div className="col-md-12 col-lg-12 col-sm-12">
                                <div className="row mb-4">
                                    <div className="col-md-4 col-lg-4 col-sm-12">
                                        <div class="input-group mb-3">
                                            <span class="input-group-text " id="basic-addon1"><i className="fa fa-search"></i></span>
                                            <input type="text" class="form-control" placeholder="Search By City or Country" aria-label="Username" aria-describedby="basic-addon1" />
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-lg-4 col-sm-12">
                                        <select className="form-control">
                                            <option>Last 7 Days</option>
                                            <option>Last Month</option>
                                            <option>Last 6 Months</option>

                                        </select>
                                    </div>
                                    <div className="col-md-4 col-lg-4 col-sm-12">
                                        <select className="form-control" onChange={DataType}>
                                            <option value="restaurant" >Restaurant</option>
                                            <option value="branch" selected>Branch</option>

                                        </select>
                                    </div>
                                </div>

                                <Table dataSource={branchData} columns={branchColumn} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['05', '10', '20', '30'] }} />
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
                                            <input {...register("mobile", { required: true, maxLength: 10 })} className="form-control" />
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
