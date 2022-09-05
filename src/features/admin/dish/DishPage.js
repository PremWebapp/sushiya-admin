import React, { useEffect, useState } from 'react'
import { Tabs, Table, Tag, Space, Switch, message } from 'antd'
import { Link } from 'react-router-dom';
import { Token } from '../../../config/Config'
import axios from 'axios';


function DishPage() {
  const token = Token().token;

  const [dishData, setDishData] = useState([])
  const [comboDishData, setComboDishData] = useState([])
  const [ingredientData, setIngredientData] = useState([])

  const { TabPane } = Tabs;
  useEffect(() => {
    DishData()
    ComboData()
    IngredientData()
  }, [])

  // For Dish Data 
  const DishData = () => {
    axios.get(`http://52.91.235.134/api/Dish`, { headers: { Authorization: 'Bearer ' + token } })
      .then((response) => {
        console.log(response.data, "dish Data")
        setDishData(response.data);
      })
      .catch((response) => {
        console.log(response.error)
      });
  }

  // For Combo Dish Data 
  const ComboData = () => {
    axios.get(`http://52.91.235.134/api/ComboDish`, { headers: { Authorization: 'Bearer ' + token } })
      .then((response) => {
        console.log(response.data, "Combo Data")
        setComboDishData(response.data);
      })
      .catch((response) => {
        console.log(response.error)
      });
  }
  // For Ingredient Data 
  const IngredientData = () => {
    axios.get(`http://52.91.235.134/api/Ingredient`, { headers: { Authorization: 'Bearer ' + token } })
      .then((response) => {
        console.log(response.data, "Ingredient Data")
        setIngredientData(response.data);
      })
      .catch((response) => {
        console.log(response.error)
      });
  }
  const DishColumns = [

    {
      title: 'Dish Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Dish Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <span>{(record.name)}</span>,
    },
    {
      title: 'Restro Name',
      dataIndex: 'res_id',
      key: 'resId',
      render: (text, record) => <span>{(record.restaurant ? record.restaurant.name : 'No Record')}</span>,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (text, record) => <span>{(record.category ? record.category.name : 'No Record')}</span>,
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
      render: (text, record) => (
        <span>{record?.image ? <img src={record?.image[0]?.url} style={{ width: '80px' }} /> : 'No Record'}</span>
      ),
    },
    {
      title: 'Status',
      key: 'approve',
      dataIndex: 'approve',
      render: (text, record) => <span>{(record.approve === '0' ? <span><i className='fa fa-check' id={record.id} onClick={ApproveDish} style={{ color: 'red', marginRight: '1rem', cursor: 'pointer' }}></i> <i className='fa fa-times' style={{ cursor: 'pointer' }} id={record.id} onClick={RejectDish} ></i></span> : (record.approve === '1' ? <span>Approved</span> : <span>Rejected</span>))}</span>
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => <span>{(record.approve === '0' ? 'Pending' : (record.approve === '1' ? <Switch defaultChecked onClick={((event) => SwitchRejectDish(event, record.id))} /> : <Switch onClick={((event) => SwitchApproveDish(event, record.id))} />))}</span>,

    },
  ];

  // Approve Dish 

  const ApproveDish = (event) => {
    ChangeDishStatus(true, event.target.id)
  }

  const SwitchApproveDish = (event, id) => {
    ChangeDishStatus(event, id)
  }
  // Reject Dish 

  const RejectDish = (event) => {
    ChangeDishStatus(true, event.target.id)
  }

  const SwitchRejectDish = (event, id) => {
    ChangeDishStatus(event, id)
  }

  const ChangeDishStatus = (value1, id1) => {
    axios.post(`http://52.91.235.134/api/UpdateStatus`, { value: value1, id: id1 }, { headers: { Authorization: 'Bearer ' + token } })
      .then((response) => {
        setDishData()
        message.success(`Status of ${response.data.name} has been Changed..!`)
      })
      .catch((response) => {
        console.log(response.error)
      });
  }


  const ComboColumns = [

    {
      title: 'Combo Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name Of Combo',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'No of Dish Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <span>{record.items ? record.items.map((n) => <span className='mr-1'><p>{n.item.name}</p></span>) : 'No Record'}</span>
      ),
    },
    {
      title: 'Restaurant Id',
      dataIndex: 'res_id',
      key: 'resId',
      render: (text, record) => (
        <span>{record.restaurant ? record.restaurant.name : 'No Record'}</span>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (text, record) => (
        <span>{record.category ? record.category.name : 'No Record'}</span>
      ),
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
      render: (text, record) => (
        <span>{record?.image ? <img src={record?.image[0]?.url} style={{ width: '80px' }} /> : 'No Record'}</span>
      ),
    },
    {
      title: 'Status',
      key: 'approve',
      dataIndex: 'approve',
      render: (text, record) => <span>{(record.approve === '0' ? <span><i className='fa fa-check' id={record.id} onClick={ApproveComboDish} style={{ color: 'red', marginRight: '1rem', cursor: 'pointer' }}></i> <i className='fa fa-times' style={{ cursor: 'pointer' }} id={record.id} onClick={RejectComboDish} ></i></span> : (record.approve === '1' ? <span>Approved</span> : <span>Rejected</span>))}</span>
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => <span>{(record.approve === '0' ? 'Pending' : (record.approve === '1' ? <Switch defaultChecked onClick={((event) => SwitchRejectComboDish(event, record.id))} /> : <Switch onClick={((event) => SwitchApproveComboDish(event, record.id))} />))}</span>,

    },
  ];

  // Approve Combo Dish 

  const ApproveComboDish = (event) => {
    ChangeComboDishStatus(true, event.target.id)
  }

  const SwitchApproveComboDish = (event, id) => {
    ChangeComboDishStatus(event, id)
  }
  // Reject Combo Dish 

  const RejectComboDish = (event) => {
    ChangeComboDishStatus(true, event.target.id)
  }

  const SwitchRejectComboDish = (event, id) => {
    ChangeComboDishStatus(event, id)
  }

  const ChangeComboDishStatus = (value1, id1) => {

    axios.post(`http://52.91.235.134/api/UpdateComboStatus`, { value: value1, id: id1 }, { headers: { Authorization: 'Bearer ' + token } })
      .then((response) => {
        ComboData()
        message.success(`Status of ${response.data.name} has been Changed..!`)
      })
      .catch((response) => {
        console.log(response.error)
      });
  }

  const IngredientColumns = [
    {
      title: 'Ingredient Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Restaurant Id',
      dataIndex: 'res_id',
      key: 'res_id',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Level Warning',
      dataIndex: 'low_level_warning',
      key: 'low_level_warning',
    },
    {
      title: 'Purchase measure',
      dataIndex: 'purchase_measure',
      key: 'purchase_measure',
    },
    {
      title: 'Value(Purchase measure)',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'Price',
      dataIndex: 'cost_per_unit',
      key: 'price',
    },
    {
      title: 'Status',
      key: 'approve',
      dataIndex: 'approve',
      render: (text, record) => <span>{(record.approve === '0' ? <span><i className='fa fa-check' id={record.id} onClick={ApproveIngredient} style={{ color: 'red', marginRight: '1rem', cursor: 'pointer' }}></i> <i className='fa fa-times' style={{ cursor: 'pointer' }} id={record.id} onClick={RejectIngredient} ></i></span> : (record.approve === '1' ? <span>Approved</span> : <span>Rejected</span>))}</span>
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => <span>{(record.approve === '0' ? 'Pending' : (record.approve === '1' ? <Switch defaultChecked onClick={((event) => SwitchRejectIngredient(event, record.id))} /> : <Switch onClick={((event) => SwitchApproveIngredient(event, record.id))} />))}</span>,

    },
  ];



  // Approve Ingredient 

  const ApproveIngredient = (event) => {
    ChangeIngredientStatus(true, event.target.id)
  }

  const SwitchApproveIngredient = (event, id) => {
    ChangeIngredientStatus(event, id)
  }
  // Reject Ingredient 

  const RejectIngredient = (event) => {
    ChangeIngredientStatus(true, event.target.id)
  }

  const SwitchRejectIngredient = (event, id) => {
    ChangeIngredientStatus(event, id)
  }

  const ChangeIngredientStatus = (value1, id1) => {

    axios.post(`http://52.91.235.134/api/UpdateIngredientStatus`, { value: value1, id: id1 }, { headers: { Authorization: 'Bearer ' + token } })
      .then((response) => {
        IngredientData()
        message.success(`Status of ${response.data.name} has been Changed..!`)
      })
      .catch((response) => {
        console.log(response.error)
      });
  }

  return (
    <>
      <div className="card-container">
        <h3 className="ml-5 colorblack bold mt-3">Dish Management</h3>
        <Tabs type="card" centered >
          <TabPane tab="Dish" key="1" >
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
                  <Table dataSource={dishData} columns={DishColumns} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['05', '10', '20', '30'] }} />

                </div>

              </div>
            </div>
          </TabPane>
          <TabPane tab="Combo" key="2">
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
                  <Table dataSource={comboDishData} columns={ComboColumns} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['05', '10', '20', '30'] }} />

                </div>

              </div>
            </div>
          </TabPane>
          <TabPane tab="Ingredients" key="3">
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
                  <Table dataSource={ingredientData} columns={IngredientColumns} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['05', '10', '20', '30'] }} />

                </div>

              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </>
  )
}

export default DishPage