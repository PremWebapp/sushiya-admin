import React, { useEffect, useState } from 'react';
import $ from 'jquery'
import SimpleMap from '../../GoogleMap/SimpleMap';
import { Table } from 'antd';
import {Token,PathUrl} from '../../../config/Config';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Moment from 'react-moment';



function DriverPage() {

  // Token ,UserId and Url
  const token = Token().token;
  const url = PathUrl().urlData.development;

  const [driverMap, setDriverMap] = useState(true);
  const [driverList, setDriverList] = useState(false);

  const [driverData, setDriverData] = useState([]);

  useEffect(() => {
    loadDriverList()
}, [])
  // For Driver Data Colum

  const driverColumn = [

    {
      title: 'Driver Name',
      dataIndex: 'name',
      key: 'name',
      sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 3,
      },
      render: (text, record) => (
          <span>{(record.first_name && <span> {record.first_name} {record.last_name} </span>)}</span>
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: {
        compare: (a, b) => a.email - b.email,
        multiple: 3,
      }
     
    },
    {
        title: 'City',
        dataIndex: 'city_detail',
        key: 'city',
        sorter: {
            compare: (a, b) => a.city_detail - b.city_detail,
            multiple: 3,
        },
        render: city_detail => `${city_detail.city}`
    },
    {
      title: 'Number',
      dataIndex: 'mobile',
      key: 'city',
      sorter: {
        compare: (a, b) => a.mobile - b.mobile,
        multiple: 3,
      }
    },
    {
      title: 'Join Date',
      dataIndex: 'created_at',
      key: 'join date',
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
      dataIndex: 'approve',
      key: 'status',
      sorter: {
        compare: (a, b) => a.approve - b.approve,
        multiple: 2,
      },
      render: (text, record) => (
        <span>{(record.approve === '0' && <span><button className=" btn " ><i className='fa fa-check' id={record.id} onClick={approveDriver} style={{ color: 'green' }}></i> </button><button className=" btn " ><i className='fa fa-times' id={record.id} onClick={rejectDriver} style={{ color: 'red' }}></i> </button> </span>) || (record.approve === '1' && <span><h6>Current Status <small style={{ marginLeft: '1rem`' }}>Approved</small></h6><button className=" btn " id={record.id} onClick={rejectDriver}><i className='fa fa-times mr-2' style={{ color: 'red' }}></i>Change Status </button></span>) || <span><h6>Current Status<small>Rejected</small></h6><button className=" btn " id={record.id} onClick={approveDriver}><i className='fa fa-check mr-2' style={{ color: 'green' }}></i>Change Status </button></span>}</span>
      )
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'timing',
      render: (text, record) => (
        <span><NavLink to={`/Admin/driverDetail/${record.id}`} className="fa fa-eye btn btn-outline-warning" ></NavLink></span>

      )
    },
  ];

  // For Driver Approve 
  const approveDriver = (e) => {
    axios.post(`${url}/driverApprove`, { id: e.target.id }, { headers: { Authorization: 'Bearer ' + token } })
      .then((response) => {
        loadDriverList()
      })
      .catch((error) => {
        console.error(error);
      });

  }

  // For Driver Reject 
  const rejectDriver = (e) => {
    axios.post(`${url}/driverReject`, { id: e.target.id }, { headers: { Authorization: 'Bearer ' + token } })
      .then((response) => {
        console.log(response)
        loadDriverList()
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // For Driver List 

  const loadDriverList = () =>{
    axios.get(`${url}/AdminDriverList`, { headers: { Authorization: 'Bearer ' + token } })
      .then((response) => {
        console.log(response.data,"driver list")
        setDriverData(response.data)

      })
      .catch((error) => {
        console.error(error);
      });
  }

  // For Open List Component
  const openList = (e) => {
    setDriverList(true)
    setDriverMap(false)

    e.target.classList.add('active');
    $('#driverMap').removeClass('active');
  }

  // For Open Map Component 

  const openMap = (e) => {
    setDriverList(false)
    setDriverMap(true)

    e.target.classList.add('active');
    $('#driverList').removeClass('active');
  }

  return (
    <>
      <div class="row">

        <div class="col-lg-12">

          <div class="card mb-4">

            <div class="card-body">
              <h3 className="ml-5 colorblack bold">Driver Management</h3>
              <div className="mt-4 text-center">
                <div class="btn-group" style={{ minWidth: '50%' }}>
                  <button type="button" class="btn btn-outline-warning active" id="driverMap" onClick={openMap}>Map View</button>
                  <button type="button" class="btn btn-outline-warning" onClick={openList} id="driverList">List View</button>
                </div>

              </div>
            </div>
          </div>


        </div>



      </div>
      <div className="container-fluid">
        <div className="row">
          {
            driverMap && (<SimpleMap />)
          }
          {
            driverList && (
              <div className="col-md-12 col-lg-12 col-sm-12">
                <div className="row mb-4">
                  <div className="col-md-3 col-lg-3 col-sm-12">
                    <div class="input-group mb-3">
                      <span class="input-group-text " id="basic-addon1"><i className="fa fa-search"></i></span>
                      <input type="text" class="form-control" placeholder="Search By City or Country" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                  </div>
                  <div className="col-md-3 col-lg-3 col-sm-12">
                    <select className="form-control">
                      <option>Last 7 Days</option>
                      <option>Last Month</option>
                      <option>Last 6 Months</option>

                    </select>
                  </div>
                  <div className="col-md-3 col-lg-3 col-sm-12">
                    <select className="form-control">
                      <option>Select Country Here</option>

                    </select>
                  </div>
                  <div className="col-md-3 col-lg-3 col-sm-12">
                    <select className="form-control">
                      <option>Select City Here</option>

                    </select>
                  </div>
                </div>
                <Table dataSource={driverData} columns={driverColumn} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['05', '10', '20', '30'] }} />

              </div>


            )
          }


        </div>
      </div>


    </>
  )
}

export default DriverPage;
