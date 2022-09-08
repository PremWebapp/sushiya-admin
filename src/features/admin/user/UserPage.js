import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import UserMap from './UserMap';
import { Token, PathUrl } from '../../../config/Config'
import Moment from 'react-moment';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { Table, Switch,message } from 'antd'


function UserPage() {

    // Token and Url
    const token = Token().token;
    const url = PathUrl().urlData?.production;

    const [restaurantMap, setRestaurantMap] = useState(true);
    const [restaurantList, setRestaurantList] = useState(false);
    const [userData, setUserData] = useState(false);

    useEffect(() => {
        loadUserList()
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // For Resto List 
    const loadUserList = () => {

        axios.get(`${url}/AdminUserList`, { headers: { Authorization: 'Bearer ' + token } })
            .then((response) => {

                setUserData(response.data)
                console.log(response.data, "user list");
            })
            .catch((error) => {
                console.error(error);
            });
    }


    // For User Data Column

    const usercolumn = [
        {
            title: 'User Id',
            dataIndex: 'id',
            key: 'id',
            sorter: {
                compare: (a, b) => a?.id - b?.id,
                multiple: 3,
            }
        },
        {
            title: 'User Name',
            dataIndex: 'name',
            key: 'name',
            sorter: {
                compare: (a, b) => a?.name - b?.name,
                multiple: 3,
            },
            render: (text, record) => (
                <span>{(record?.name && <span> {record?.name} </span>)}</span>
            )
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: {
                compare: (a, b) => a?.email - b?.email,
                multiple: 3,
            }

        },
        {
            title: 'City',
            dataIndex: 'city_detail',
            key: 'city',
            sorter: {
                compare: (a, b) => a?.city_detail - b?.city_detail,
                multiple: 3,
            },
            render: city_detail => `${city_detail && city_detail?.city}`
        },
        {
            title: 'Number',
            dataIndex: 'mobile',
            key: 'city',
            sorter: {
                compare: (a, b) => a?.mobile - b?.mobile,
                multiple: 3,
            }
        },
        {
            title: 'Join Date',
            dataIndex: 'created_at',
            key: 'join date',
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
            title: 'Current Status',
            dataIndex: 'approve',
            key: 'status',
            sorter: {
                compare: (a, b) => a?.approve - b?.approve,
                multiple: 2,
            },
            render: (text, record) => (
                <span>{(record?.approve == '1' ? <span><h6>UnBlocked</h6> </span> : <span><h6>Blocked</h6></span>)}</span>
            )
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'timing',
            render: (text, record) => (
                <span>
                     <span>{(record?.approve == '0' ? 'Pending' : (record?.approve == '1' ? <Switch defaultChecked onClick={((event) => SwitchReject(event, record?.id))} /> : <Switch onClick={((event) => SwitchApprove(event, record?.id))} />))}</span>
                     <NavLink to={`/Admin/driverDetail/${record?.id}`} className="fa fa-eye btn btn-outline-warning ml-3" ></NavLink>
                </span>


            )
        },
    ];

    // For Restaurant Approve 
    const SwitchApprove = (event, id) => {
        ChangeUserStatus(event, id)
    }

    // For User Reject 
    const SwitchReject = (event, id) => {
        ChangeUserStatus(event, id)
    }


    const ChangeUserStatus = (value1, id1) => {
        axios.post(`${url}/UpdateRestaurantStatus`, { value: value1, id: id1 }, { headers: { Authorization: 'Bearer ' + token } })
            .then((response) => {
                loadUserList()
                message.success(`Status of ${response?.data?.name} has been Changed..!`)
            })
            .catch((response) => {
                console.log(response?.error)
            });
    }


    // For Open List Component
    const openList = (e) => {
        setRestaurantMap(false);
        setRestaurantList(true);
        e.target.classList.add('active');
        $('#restMap').removeClass('active');
    }

    // For Open Map Component 

    const openMap = (e) => {
        setRestaurantMap(true);
        setRestaurantList(false);

        e.target.classList.add('active');
        $('#restList').removeClass('active');
    }
    return (
        <>
            <div class="row">

                <div class="col-lg-12">

                    <div class="card mb-4">

                        <div class="card-body">
                            <h3 className="ml-5 colorblack bold">User Management</h3>
                            <div className="mt-4 text-center">
                                <div class="btn-group" style={{ minWidth: '50%' }}>
                                    <button type="button" class="btn btn-outline-warning active" id="restMap" onClick={openMap}>Map View</button>
                                    <button type="button" class="btn btn-outline-warning" onClick={openList} id="restList">List View</button>

                                </div>
                            </div>
                        </div>
                    </div>


                </div>



            </div>
            <div className="container-fluid">
                <div className="row">
                    {
                        restaurantMap && (<div className="col-md-12 col-lg-12 col-sm-12">
                            {/* <img src={MapView} style={{width:'100%'}}></img> */}
                            <UserMap />


                        </div>)
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

                            </div>

                            <Table dataSource={[]} columns={usercolumn} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['05', '10', '20', '30'] }} />
                        </div>)
                    }
                </div>
            </div>
        </>
    )
}

export default UserPage
