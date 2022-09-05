import React, { useEffect, useState } from 'react';
import $ from 'jquery'
import axios from 'axios';
import Moment from 'react-moment';
import { useParams,NavLink } from 'react-router-dom';
import {Token, PathUrl} from '../../../../config/Config'

function DriverDetailContent(props) {
        // Token ,UserId and Url
        const token = Token().token;
        const url = PathUrl().urlData.development;
        const { id } = useParams()
    
        useEffect(() => {
            restroDetail()
        }, [])
    
        const [details, setDetails] = useState(true)
        const [stats, setStats] = useState(false)
        const [vehicleDetail, setVehicleDetail] = useState(false)
        const [bankDetail, setBankdetail] = useState(false)
    
        // For Restaurant Detail 
        const [driverDetailData, setDriverDetailData] = useState([])
    
        const restroDetail = async () => {
            await axios.post(`${url}/driverDetail`, { id: id }, { headers: { Authorization: 'Bearer ' + token } })
                .then((response) => {
                    console.log(response.data,"driver data")
                    setDriverDetailData(response.data)
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    
        // For Details Content 
    
        const detailsStatus = (e) => {
            setDetails(true);
            setStats(false);
            setVehicleDetail(false);
            setBankdetail(false);
    
            e.target.classList.add('active');
            $('#stats').removeClass('active');
            $('#vehicleDetail').removeClass('active');
            $('#bankdetail').removeClass('active');
    
        }
    
        // For Stats Content 
    
        const statsStatus = (e) => {
    
            setDetails(false);
            setStats(true);
            setVehicleDetail(false);
            setBankdetail(false);
    
            e.target.classList.add('active');
            $('#details').removeClass('active');
            $('#vehicleDetail').removeClass('active');
            $('#bankdetail').removeClass('active');
    
        }
    
        // for Banches Content 
    
        const vehicleDetailStatus = (e) => {
            setDetails(false);
            setStats(false);
            setVehicleDetail(true);
            setBankdetail(false);
    
            e.target.classList.add('active');
            $('#details').removeClass('active');
            $('#stats').removeClass('active');
            $('#bankdetail').removeClass('active');
        }
    
        // For Bank Detail Content 
    
        const bankStatus = (e) => {
            setDetails(false);
            setStats(false);
            setVehicleDetail(false);
            setBankdetail(true);
    
            e.target.classList.add('active');
            $('#details').removeClass('active');
            $('#stats').removeClass('active');
            $('#vehicleDetail').removeClass('active');
        }
  return (
      <>
        <div class="card">
                <div class="card-header">
                    <NavLink to="/Admin/Driver" className="fa fa-angle-left colorblack bold text-decoration-none"  > &nbsp;&nbsp;DRIVER DETAIL VIEW</NavLink>

                </div>
                <div class="card-body">
                    <div className="mt-4 text-center">
                        <div class="btn-group" style={{ minWidth: '50%' }}>
                            <button type="button" class="btn btn-outline-warning active" id="details" onClick={detailsStatus}>DETAILS</button>
                            <button type="button" class="btn btn-outline-warning" id="stats" onClick={statsStatus}>STATS</button>
                            <button type="button" class="btn btn-outline-warning" id="vehicleDetail" onClick={vehicleDetailStatus}>vehicle Detail</button>
                            <button type="button" class="btn btn-outline-warning" id="bankdetail" onClick={bankStatus}>BANK DETAIL</button>
                        </div>

                    </div>
                    {
                        details && (
                            <div>
                                <h5 className='mt-5 bold' style={{ textAlign: 'center' }}>BASIC DETAILS</h5>
                                <div className='row mt-5'>
                                    <div className='col-md-6 '>
                                        <div className='col-md-12 d-flex'>
                                            <div className='col-md-4 '>
                                                <label>Delivery ID</label>
                                            </div>
                                            <div className='col-md-8'>
                                                <input className='form-control' type="text" readOnly value={driverDetailData.id} />
                                            </div>
                                        </div>

                                        <div className='col-md-12 d-flex mt-4'>
                                            <div className='col-md-4 '>
                                                <label>DOJ</label>
                                            </div>
                                            <div className='col-md-8'>
                                                <Moment className='form-control' readOnly format="YYYY/MM/DD">{driverDetailData.created_at}</Moment>
                                            </div>
                                        </div>

                                        <div className='col-md-12 d-flex mt-4'>
                                            <div className='col-md-4 '>
                                                <label>Name</label>
                                            </div>
                                            <div className='col-md-8'>
                                                <input className='form-control' type="text" readOnly value={driverDetailData.first_name +" "+ driverDetailData.last_name} />
                                            </div>
                                        </div>

                                        <div className='col-md-12 d-flex mt-4'>
                                            <div className='col-md-4 '>
                                                <label>Mobile</label>
                                            </div>
                                            <div className='col-md-8'>
                                                <input className='form-control' type="text" readOnly value={driverDetailData.mobile} />
                                            </div>
                                        </div>

                                        <div className='col-md-12 d-flex mt-4'>
                                            <div className='col-md-4 '>
                                                <label>Email</label>
                                            </div>
                                            <div className='col-md-8'>
                                                <input className='form-control' type="text" readOnly value={driverDetailData.email} />
                                            </div>
                                        </div>

                                        <div className='col-md-12 d-flex mt-4'>
                                            <div className='col-md-4 '>
                                                <label>City</label>
                                            </div>
                                            <div className='col-md-8'>
                                                <input className='form-control' type="text" readOnly value={driverDetailData.city_detail && driverDetailData.city_detail.city || driverDetailData.city_detail } />
                                            </div>
                                        </div>

                                        <div className='col-md-12 d-flex mt-4'>
                                            <div className='col-md-4 '>
                                                <label>Address</label>
                                            </div>
                                            <div className='col-md-8'>
                                                <textarea className='form-control' type="text" readOnly value={driverDetailData.add_type} />
                                            </div>
                                        </div>

                                    </div>
                                    <div className='col-md-6'></div>
                                </div>
                            </div>
                        )
                    }

                    {
                        stats && (
                            <div>
                                <div className='row mt-5'>
                                    <div className='col-md-2'>
                                        <select className='form-control'>
                                            <option>All</option>
                                            <option>Live</option>
                                            <option>Schedule</option>

                                        </select>
                                    </div>
                                    <div className='col-md-3'>

                                    </div>
                                    <div className='col-md-7'>
                                        <h5>STATS</h5>
                                    </div>
                                </div>
                                <h5 className="mt-5 bold" >FLOATING CASH :<input style={{backgroundColor:"green",color:"white",marginLeft:"5rem"}} readOnly="true" value="$80/100" /></h5>

                                <div className='row' style={{ backgroundColor: "rgb(189 189 189 / 35%)", border: "2px solid black" }}>
                                <div className='col-md-3 mt-3 '>
                                        <label>TOTAL TASK ACCEPTED</label>
                                    </div>
                                    <div className='col-md-2 mt-3'>
                                        <input className='form-control' type="text" readOnly value={driverDetailData.id} />
                                    </div>
                                    <div className='col-md-1 mt-3'></div>
                                    <div className='col-md-3 mt-3 '>
                                        <label>LAST TASK RECEIVED</label>
                                    </div>
                                    <div className='col-md-2 mt-3'>
                                        <input className='form-control' type="text" readOnly value={driverDetailData.id} />
                                    </div>
                                    <div className='col-md-1 mt-3'></div>


                                    <div className='col-md-3 mt-3 '>
                                        <label>TOTAL TASK COMPLETED</label>
                                    </div>
                                    <div className='col-md-2 mt-3'>
                                        <input className='form-control' type="text" readOnly value={driverDetailData.id} />
                                    </div>
                                    <div className='col-md-1 mt-3'></div>


                                    <div className='col-md-3 mt-3 '>
                                        <label>TOTAL CANCELLATION</label>
                                    </div>
                                    <div className='col-md-2 mt-3'>
                                        <input className='form-control' type="text" readOnly value={driverDetailData.id} />
                                    </div>
                                    <div className='col-md-1 mt-3'></div>


                                    <div className='col-md-3 mt-3 '>
                                        <label>AVG. TIME ON DUTY</label>
                                    </div>
                                    <div className='col-md-2 mt-3'>
                                        <input className='form-control' type="text" readOnly value={driverDetailData.id} />
                                    </div>
                                    <div className='col-md-1 mt-3'></div>

                                    <div className='col-md-3 mt-3 '>
                                        <label>TOTAL TASK COMPLETED WEEKLY</label>
                                    </div>
                                    <div className='col-md-2 mt-3'>
                                        <input className='form-control' type="text" readOnly value={driverDetailData.id} />
                                    </div>
                                    <div className='col-md-1 mt-3'></div>

                                    <div className='col-md-3 mt-3 '>
                                        <label>TOTAL TASK COMPLETED MONTHLY</label>
                                    </div>
                                    <div className='col-md-2 mt-3'>
                                        <input className='form-control' type="text" readOnly value={driverDetailData.id} />
                                    </div>
                                    <div className='col-md-1 mt-3 mb-5'></div>



                                </div>
                            </div>

                        )
                    }

                    {
                        vehicleDetail && (
                            <div>
                                <h5 className='mt-5' style={{ textAlign: 'center' }}>VEHICLE DETAIL</h5>
                                
                                <div className='row' style={{ border: '2px solid black' }}>
                                    <div className='col-md-6 mt-3 mb-3' >
                                        <div className='col-md-6 mt-4'>
                                            <h5>REGISTRATION NUMBER</h5>
                                        </div>
                                        <div className='col-md-6 mt-2'>
                                            <input readOnly="true" className='form-control' value={driverDetailData.vehicle_detail && driverDetailData.vehicle_detail.vehicle_registration_number} />
                                        </div>

                                        <div className='col-md-6 mt-4'>
                                            <h5>VEHICLE MODEL</h5>
                                        </div>
                                        <div className='col-md-6 mt-2'>
                                            <input readOnly="true" className='form-control' value={driverDetailData.vehicle_detail && driverDetailData.vehicle_detail.vehicle_model} />
                                        </div>

                                        <div className='col-md-6 mt-4'>
                                            <h5>VEHICLE MAKE</h5>
                                        </div>
                                        <div className='col-md-6 mt-2'>
                                            <input readOnly="true" className='form-control' value={driverDetailData.vehicle_detail && driverDetailData.vehicle_detail.vehicle_make} />
                                        </div>

                                        <div className='col-md-6 mt-4'>
                                            <h5>VEHICLE COLOR</h5>
                                        </div>
                                        <div className='col-md-6 mt-2 mb-4'>
                                            <input readOnly="true" className='form-control' value={driverDetailData.vehicle_detail && driverDetailData.vehicle_detail.vehicle_color} />
                                        </div>

                                    </div>
                                </div>

                               
                            </div>
                        )
                    }

                    {
                        bankDetail && (
                            <div>
                                <h5 className='mt-5' style={{ textAlign: 'center' }}>BANK DETAILS</h5>
                                <div className='row mt-5'>
                                    <div className='col-md-2'></div>
                                    <div className='col-md-8 '>
                                        <div className='col-md-12 d-flex'>
                                            <div className='col-md-4 '>
                                                <label>Account Holder Name</label>
                                            </div>
                                            <div className='col-md-8'>
                                                <input className='form-control' type="text" readOnly value={driverDetailData.account_detail && driverDetailData.account_detail.acc_holder} />
                                            </div>
                                        </div>

                                        <div className='col-md-12 d-flex mt-4'>
                                            <div className='col-md-4 '>
                                                <label>Account Number</label>
                                            </div>
                                            <div className='col-md-8'>
                                                <input className='form-control' type="text" readOnly value={driverDetailData.account_detail && driverDetailData.account_detail.acc_number} />

                                            </div>
                                        </div>

                                        <div className='col-md-12 d-flex mt-4'>
                                            <div className='col-md-4 '>
                                                <label>Bank IBAN Code</label>
                                            </div>
                                            <div className='col-md-8'>
                                                <input className='form-control' type="text" readOnly value={driverDetailData.account_detail && driverDetailData.account_detail.iban_code} />
                                            </div>
                                        </div>

                                        <div className='col-md-12 d-flex mt-4'>
                                            <div className='col-md-4 '>
                                                <label>Bank Name</label>
                                            </div>
                                            <div className='col-md-8'>
                                                <input className='form-control' type="text" readOnly value={driverDetailData.account_detail && driverDetailData.account_detail.branch_name} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                </div>
            </div>
      </>
  );
}

export default DriverDetailContent;
