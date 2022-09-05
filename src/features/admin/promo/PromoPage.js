import React from 'react'
import { Tabs, Table, Tag, Space, Button } from 'antd'
import { Link, NavLink } from 'react-router-dom';

function PromoPage() {
    const { TabPane } = Tabs;

    const PromoColumns = [

        {
            title: 'Id',
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
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Validity',
            dataIndex: 'validity',
            key: 'validity',
        },
        {
            title: 'Start Date',
            dataIndex: 'start_date',
            key: 'Start Date',
        },
        {
            title: 'Expire',
            dataIndex: 'expire',
            key: 'expire',
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
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Status',
            key: 'approve',
            dataIndex: 'approve',
            render: approve => (
                <>
                    {approve.map(tag => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Link to="">Invite {record.name}</Link>
                    <Link to="">Delete</Link>
                </Space>
            ),
        },
    ];

    const PromotionColumns = [

        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Menu',
            dataIndex: 'menu',
            key: 'menu',
            render: text => <Link to="">{text}</Link>,
        },
        
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Dish',
            dataIndex: 'dish',
            key: 'dish',
        },
        {
            title: 'Start Date',
            dataIndex: 'start_date',
            key: 'start_date',
        },
        {
            title: 'Expiry',
            dataIndex: 'expiry',
            key: 'expiry',
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
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Link to="">Invite {record.name}</Link>
                    <Link to="">Delete</Link>
                </Space>
            ),
        },
    ];

    return (
        <>
            <div className="card-container">
                <h4 className="ml-5 colorblack bold mt-3">Promo Code Management</h4>
                <Tabs type="card" centered >
                    <TabPane tab="Promo Code" key="1" >

                        <div className="container-fluid mt-3">
                            <div className='row mb-4'>
                                <div className='col-md-12'>
                                    <Button style={{ float: 'right' }}> <NavLink to="/Admin/Promo/Code">Add</NavLink> </Button>
                                </div>
                            </div>
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
                                    <Table dataSource="" columns={PromoColumns} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['05', '10', '20', '30'] }} />

                                </div>

                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="Promotion" key="2">
                        <div className="container-fluid mt-3">
                            <div className='row mb-4'>
                                <div className='col-md-12'>
                                    <Button style={{ float: 'right' }}> <NavLink to="/Admin/Promo/Promotion">Add</NavLink> </Button>

                                </div>
                            </div>
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
                                    <Table dataSource="" columns={PromotionColumns} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['05', '10', '20', '30'] }} />

                                </div>

                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        </>
    )
}

export default PromoPage