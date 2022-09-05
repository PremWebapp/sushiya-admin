import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { Token, PathUrl } from '../../../../config/Config'
import $ from 'jquery'
import Moment from 'react-moment';


function RestroDetailContent(props) {
    // Token ,UserId and Url
    const token = Token().token;
    const url = PathUrl().urlData.development;
    const { id } = useParams()

    useEffect(() => {
        restroDetail()
    }, [])

    const [details, setDetails] = useState(true)
    const [stats, setStats] = useState(false)
    const [branches, setBranches] = useState(false)
    const [bankDetail, setBankdetail] = useState(false)

    // For Restaurant Detail 
    const [restroDetailData, setRestroDetailData] = useState([])

    const restroDetail = async () => {
        await axios.post(`${url}/restroDetail`, { id: id }, { headers: { Authorization: 'Bearer ' + token } })
            .then((response) => {
                console.log(response.data.data, "after Api Hit")
                setRestroDetailData(response.data.data)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // For Details Content 

    const detailsStatus = (e) => {
        setDetails(true);
        setStats(false);
        setBranches(false);
        setBankdetail(false);

        e.target.classList.add('active');
        $('#stats').removeClass('active');
        $('#branches').removeClass('active');
        $('#bankdetail').removeClass('active');

    }

    // For Stats Content 

    const statsStatus = (e) => {

        setDetails(false);
        setStats(true);
        setBranches(false);
        setBankdetail(false);

        e.target.classList.add('active');
        $('#details').removeClass('active');
        $('#branches').removeClass('active');
        $('#bankdetail').removeClass('active');

    }

    // for Banches Content 

    const branchesStatus = (e) => {
        setDetails(false);
        setStats(false);
        setBranches(true);
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
        setBranches(false);
        setBankdetail(true);

        e.target.classList.add('active');
        $('#details').removeClass('active');
        $('#stats').removeClass('active');
        $('#branches').removeClass('active');
    }



    return (
        <>
            <div class="card">
                <div class="card-header">
                    <NavLink to="/Admin/Restaurant" className="fa fa-angle-left colorblack bold text-decoration-none"  > &nbsp;&nbsp;Restaurant Management View</NavLink>

                </div>
                <div class="card-body">
                    <div className="mt-4 text-center">
                        <div class="btn-group" style={{ minWidth: '50%' }}>
                            <button type="button" class="btn btn-outline-warning active" id="details" onClick={detailsStatus}>DETAILS</button>
                            <button type="button" class="btn btn-outline-warning" id="stats" onClick={statsStatus}>STATS</button>
                            <button type="button" class="btn btn-outline-warning" id="branches" onClick={branchesStatus}>BRANCHES</button>
                            <button type="button" class="btn btn-outline-warning" id="bankdetail" onClick={bankStatus}>BANK DETAIL</button>
                        </div>

                    </div>
                    {
                        details && (
                            <div>
                                <h5 className='mt-5' style={{ textAlign: 'center' }}>BASIC DETAILS</h5>
                                <div className='row mt-5'>
                                    <div className='col-md-6 '>
                                        <div className='col-md-12 d-flex'>
                                            <div className='col-md-4 '>
                                                <label>Service Provider ID</label>
                                            </div>
                                            <div className='col-md-8'>
                                                <input className='form-control' type="text" readOnly value={restroDetailData.id} />
                                            </div>
                                        </div>

                                        <div className='col-md-12 d-flex mt-4'>
                                            <div className='col-md-4 '>
                                                <label>DOJ</label>
                                            </div>
                                            <div className='col-md-8'>
                                                <Moment className='form-control' readOnly format="YYYY/MM/DD">{restroDetailData.created_at}</Moment>
                                            </div>
                                        </div>

                                        <div className='col-md-12 d-flex mt-4'>
                                            <div className='col-md-4 '>
                                                <label>Name</label>
                                            </div>
                                            <div className='col-md-8'>
                                                <input className='form-control' type="text" readOnly value={restroDetailData.name} />
                                            </div>
                                        </div>

                                        <div className='col-md-12 d-flex mt-4'>
                                            <div className='col-md-4 '>
                                                <label>Mobile</label>
                                            </div>
                                            <div className='col-md-8'>
                                                <input className='form-control' type="text" readOnly value={restroDetailData.mobile} />
                                            </div>
                                        </div>

                                        <div className='col-md-12 d-flex mt-4'>
                                            <div className='col-md-4 '>
                                                <label>Email</label>
                                            </div>
                                            <div className='col-md-8'>
                                                <input className='form-control' type="text" readOnly value={restroDetailData.email} />
                                            </div>
                                        </div>

                                        <div className='col-md-12 d-flex mt-4'>
                                            <div className='col-md-4 '>
                                                <label>City</label>
                                            </div>
                                            <div className='col-md-8'>
                                                <input className='form-control' type="text" readOnly value={restroDetailData.city} />
                                            </div>
                                        </div>

                                        <div className='col-md-12 d-flex mt-4'>
                                            <div className='col-md-4 '>
                                                <label>Address</label>
                                            </div>
                                            <div className='col-md-8'>
                                                <textarea className='form-control' type="text" readOnly value={restroDetailData.add_type} />
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
                                <div className='row mt-5' style={{ backgroundColor: "rgb(189 189 189 / 35%)", border: "2px solid black" }}>
                                    <div className='col-md-6 mt-4'>
                                        <h5>ONGOING ORDER :</h5>
                                    </div>
                                    <div className='col-md-6 mt-4'>
                                        <h5>RETURN REQUEST :</h5>
                                    </div>
                                    <div className='col-md-3 mt-3 '>
                                        <label>TOTAL ORDER RECEIVED</label>
                                    </div>
                                    <div className='col-md-2 mt-3'>
                                        <input className='form-control' type="text" readOnly value={restroDetailData.id} />
                                    </div>
                                    <div className='col-md-1 mt-3'></div>


                                    <div className='col-md-3 mt-3 '>
                                        <label>LAST ORDER PLACED</label>
                                    </div>
                                    <div className='col-md-2 mt-3'>
                                        <input className='form-control' type="text" readOnly value={restroDetailData.id} />
                                    </div>
                                    <div className='col-md-1 mt-3'></div>


                                    <div className='col-md-3 mt-3 '>
                                        <label>TOTAL ORDER COMPLETED</label>
                                    </div>
                                    <div className='col-md-2 mt-3'>
                                        <input className='form-control' type="text" readOnly value={restroDetailData.id} />
                                    </div>
                                    <div className='col-md-1 mt-3'></div>

                                    <div className='col-md-3 mt-3 '>
                                        <label>TOTAL CANCELLATION</label>
                                    </div>
                                    <div className='col-md-2 mt-3'>
                                        <input className='form-control' type="text" readOnly value={restroDetailData.id} />
                                    </div>
                                    <div className='col-md-1 mt-3'></div>

                                    <div className='col-md-3 mt-3 '>
                                        <label>TOTAL ORDER RECEIVED WEEKLY</label>
                                    </div>
                                    <div className='col-md-2 mt-3'>
                                        <input className='form-control' type="text" readOnly value={restroDetailData.id} />
                                    </div>
                                    <div className='col-md-1 mt-3'></div>

                                    <div className='col-md-3 mt-3 '>
                                    </div>
                                    <div className='col-md-2 mt-3'>
                                    </div>
                                    <div className='col-md-1 mt-3'></div>


                                    <div className='col-md-3 mt-3 '>
                                        <label>TOTAL ORDER RECEIVED MONTHLY</label>
                                    </div>
                                    <div className='col-md-2 mt-3 mb-3'>
                                        <input className='form-control' type="text" readOnly value={restroDetailData.id} />
                                    </div>
                                    <div className='col-md-1 mt-3'></div>


                                </div>
                            </div>

                        )
                    }

                    {
                        branches && (
                            <div>
                                <h5 className='mt-5' style={{ textAlign: 'center' }}>BRANCHES</h5>
                                <div className='row mt-5'>
                                    <h5>BRANCH NAME</h5>

                                </div>
                                <div className='row' style={{ backgroundColor: 'rgb(189 189 189 / 35%)', border: '2px solid black' }}>
                                    <div className='col-md-12 mt-3 mb-3' >
                                        <h6>BRANCH ID : </h6>
                                        <h6>BRANCH LOCATION : </h6>
                                        <h6>BRANCH TIMINGS : </h6>

                                    </div>
                                </div>

                                <div className='row mt-5'>
                                    <h5>BRANCH NAME</h5>

                                </div>
                                <div className='row' style={{ backgroundColor: 'rgb(189 189 189 / 35%)', border: '2px solid black' }}>
                                    <div className='col-md-12 mt-3 mb-3' >
                                        <h6>BRANCH ID : </h6>
                                        <h6>BRANCH LOCATION : </h6>
                                        <h6>BRANCH TIMINGS : </h6>

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
                                                <input className='form-control' type="text" readOnly value="" />
                                            </div>
                                        </div>

                                        <div className='col-md-12 d-flex mt-4'>
                                            <div className='col-md-4 '>
                                                <label>Account Number</label>
                                            </div>
                                            <div className='col-md-8'>
                                                <input className='form-control' type="text" readOnly value="" />

                                            </div>
                                        </div>

                                        <div className='col-md-12 d-flex mt-4'>
                                            <div className='col-md-4 '>
                                                <label>Bank IFSC Code</label>
                                            </div>
                                            <div className='col-md-8'>
                                                <input className='form-control' type="text" readOnly value="" />
                                            </div>
                                        </div>

                                        <div className='col-md-12 d-flex mt-4'>
                                            <div className='col-md-4 '>
                                                <label>Bank Name</label>
                                            </div>
                                            <div className='col-md-8'>
                                                <input className='form-control' type="text" readOnly value="" />
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
    )
}

export default RestroDetailContent
