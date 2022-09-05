import React from 'react'
import { Tabs, Table, Tag, Space, Button } from 'antd'
import { Link} from 'react-router-dom';

function OrderPage() {
    const { TabPane } = Tabs;

    const OngoingColumns = [

        {
            title: 'Order Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'User Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <Link to="">{text}</Link>,
        },
        {
            title: 'Date & Time',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Restro Name',
            dataIndex: 'restro_name',
            key: 'restro_name',
        },
        {
            title: 'Driver Name',
            dataIndex: 'driver_name',
            key: 'driver_name',
        },
        {
            title: 'Item',
            dataIndex: 'item',
            key: 'item',
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="large">
                    <i class="fa fa-motorcycle" aria-hidden="true"></i>

                </Space>
            ),
        },
    ];

    const CompletedColumns = [

        {
            title: 'Order Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'User Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <Link to="">{text}</Link>,
        },
        {
            title: 'Date & Time',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Restro Name',
            dataIndex: 'restro_name',
            key: 'restro_name',
        },
        {
            title: 'Driver Name',
            dataIndex: 'driver_name',
            key: 'driver_name',
        },
        {
            title: 'Item',
            dataIndex: 'item',
            key: 'item',
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="large">
                    <i class="fa fa-motorcycle" aria-hidden="true"></i>

                </Space>
            ),
        },
    ];

    const CancelledColumns = [

        {
            title: 'Order Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'User Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <Link to="">{text}</Link>,
        },
        {
            title: 'Date & Time',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Restro Name',
            dataIndex: 'restro_name',
            key: 'restro_name',
        },
        {
            title: 'Driver Name',
            dataIndex: 'driver_name',
            key: 'driver_name',
        },
        {
            title: 'Item',
            dataIndex: 'item',
            key: 'item',
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="large">
                    <i class="fa fa-motorcycle" aria-hidden="true"></i>

                </Space>
            ),
        },
    ];
    return (
        <>
            <div className="card-container">
                <h4 className="ml-5 colorblack bold mt-3">Orders Management</h4>
                <Tabs type="card" centered >
                    <TabPane tab="Ongoing" key="1" >

                        <div className="container-fluid mt-3">
                           
                            <div className="row">
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
                                        {/* <div className="col-md-3 col-lg-3 col-sm-12">
                                            <select className="form-control">
                                                <option>Select Country Here</option>

                                            </select>
                                        </div>
                                        <div className="col-md-3 col-lg-3 col-sm-12">
                                            <select className="form-control">
                                                <option>Select City Here</option>

                                            </select>
                                        </div> */}
                                    </div>
                                    <Table dataSource="" columns={OngoingColumns} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['05', '10', '20', '30'] }} />

                                </div>

                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="Completed" key="2">
                        <div className="container-fluid mt-3">
                          
                            <div className="row">
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
                                        {/* <div className="col-md-3 col-lg-3 col-sm-12">
                                            <select className="form-control">
                                                <option>Select Country Here</option>

                                            </select>
                                        </div>
                                        <div className="col-md-3 col-lg-3 col-sm-12">
                                            <select className="form-control">
                                                <option>Select City Here</option>

                                            </select>
                                        </div> */}
                                    </div>
                                    <Table dataSource="" columns={CompletedColumns} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['05', '10', '20', '30'] }} />

                                </div>

                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="Cancelled" key="3">
                        <div className="container-fluid mt-3">
                          
                            <div className="row">
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
                                        {/* <div className="col-md-3 col-lg-3 col-sm-12">
                                            <select className="form-control">
                                                <option>Select Country Here</option>

                                            </select>
                                        </div>
                                        <div className="col-md-3 col-lg-3 col-sm-12">
                                            <select className="form-control">
                                                <option>Select City Here</option>

                                            </select>
                                        </div> */}
                                    </div>
                                    <Table dataSource="" columns={CancelledColumns} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['05', '10', '20', '30'] }} />

                                </div>

                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        </>
    )
}

export default OrderPage