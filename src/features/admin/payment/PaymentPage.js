import React from 'react'
import { Tabs, Table, Tag, Space, Button } from 'antd'
import { Link} from 'react-router-dom';


function PaymentPage() {
    const { TabPane } = Tabs;

    const UserColumns = [

        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'User  Name',
            dataIndex: 'name',
            key: 'id',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Contact No.',
            dataIndex: 'mobile',
            key: 'mobile',
        },
        {
            title: 'Join Date',
            dataIndex: 'created_at',
            key: 'created_at',
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
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

    const RestaurantColumns = [

        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Restaurant Name',
            dataIndex: 'name',
            key: 'id',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Contact No.',
            dataIndex: 'mobile',
            key: 'mobile',
        },
        {
            title: 'Join Date',
            dataIndex: 'created_at',
            key: 'created_at',
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
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

    const DeliveryColumns = [

        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Delivery Name',
            dataIndex: 'name',
            key: 'id',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Contact No.',
            dataIndex: 'mobile',
            key: 'mobile',
        },
        {
            title: 'Join Date',
            dataIndex: 'created_at',
            key: 'created_at',
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
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
                <h4 className="ml-5 colorblack bold mt-3">Payment Management</h4>
                <Tabs type="card" centered >
                    <TabPane tab="Users" key="1" >

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
                                    <Table dataSource="" columns={UserColumns} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['05', '10', '20', '30'] }} />

                                </div>

                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="Restaurant" key="2">
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
                                    <Table dataSource="" columns={RestaurantColumns} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['05', '10', '20', '30'] }} />

                                </div>

                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="Delivery" key="3">
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
                                    <Table dataSource="" columns={DeliveryColumns} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['05', '10', '20', '30'] }} />

                                </div>

                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        </>
  )
}

export default PaymentPage