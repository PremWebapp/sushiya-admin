import axios from 'axios';
import React, { useState, useEffect } from 'react'
import $ from 'jquery'
import { useForm } from 'react-hook-form';
import DemoImage from '../../../img/demoImage.png'
import { Token, PathUrl } from '../../../config/Config';
import { message, Button } from 'antd';
import { Table} from 'antd'




function CategoryPage() {

    // Token 
    const token = Token().token;
    // const url = PathUrl().urlData.development;
    const url = 'http://52.91.235.134/api'

    // For Menu Auto Generate Id 
    const menuAutoGenerated = Math.floor(Math.random() * 99999999) + 10000000;

    // For Category Auto Generate Id 
    const categoryAutoGenerated = Math.floor(Math.random() * 99999999) + 10000000;

    const [menu, setMenu] = useState(true);

    const [menuDataList, setMenuDataList] = useState('');


    const [category, setCategory] = useState(false);

    const [categoryDataList, setCategoryDataList] = useState('');

    useEffect(() => {
        MenuList()
        CategoryList()
        $("#country").css("background-color", "#fc6011");
        $("#country").css("color", "white");
    }, [])

    // For Category Form Data 
    let [categoryData, setCategoryData] = useState({
        generated_id: categoryAutoGenerated,
        name: '',
    });


    const CategoryhandleChange = e => {

        let name = e.target.name;
        let value = e.target.value;
        categoryData[name] = value;

        setCategoryData(categoryData);

    };

    // For Update Category Form Data 
    let [updateCategoryData, setUpdateCategoryData] = useState({
        UpdateGenerated_id: "",
        UpdateName: '',
    });

    const UpdateCategoryhandleChange = e => {

        let name = e.target.name;
        let value = e.target.value;
        updateCategoryData[name] = value;

        setUpdateCategoryData(categoryData);

    };


// For Menu Image 
    const [selectedImage, setSelectedImage] = useState();
// For Category Image 
    const [selectedImageCategory, setSelectedImageCategory] = useState();

    // For Menu 
    const MenuList = () => {
        axios.get(`${url}/menu`, { headers: { Authorization: 'Bearer ' + token } })
            .then((response) => {

                setMenuDataList(response.data)
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const MenuColumn = [
        {
            title: 'Generate Id',
            dataIndex: 'generated_id',
            key: 'id',
            sorter: {
                compare: (a, b) => a.generated_id - b.generated_id,
                multiple: 3,
            }
        },
        {
            title: 'User Name',
            dataIndex: 'name',
            key: 'name',
            sorter: {
                compare: (a, b) => a.name - b.name,
                multiple: 3,
            }
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'name',
            sorter: {
                compare: (a, b) => a.name - b.name,
                multiple: 3,
            },
            render: (text, record) => (
                <span>{(record.image ? <span> <img alt='Menu_image' src={record.image} style={{ width: "100px" }} /> </span> : <span> <img alt='demo_image' src={DemoImage} style={{ width: "100px" }} /> </span>)}</span>
            )
        },
        {
            title: 'Action',
            dataIndex: 'image',
            key: 'name',
            sorter: {
                compare: (a, b) => a.name - b.name,
                multiple: 3,
            },
            render: (text, record) => (
                <span><i className="fa fa-eye" style={{ color: 'blue' }} id={record.id} onClick={MenuView}></i><i className="fa fa-edit ml-3" style={{ color: 'black' }} id={record.id} onClick={MenuEdit}></i><i className="fa fa-trash ml-3" style={{ color: 'red' }} id={record.id} onClick={MenuDelete}></i></span>
            )
        },
    ]
    const MenuView = (e) => {
        alert(e.target.id)
    }

    const MenuEdit = (e) => {
        alert(e.target.id)

    }

    const MenuDelete = (e) => {
        axios.post(`${url}/MenuDelete`, { id: e.target.id }, { headers: { Authorization: 'Bearer ' + token } })
            .then((response) => {
                setMenuDataList(response.data)
                message.success('Menu Deleted Successfully..!!');
            })
            .catch((error) => {
                console.error(error);
            });


    }


    // For Category 

    const CategoryList = () => {
        axios.get(`${url}/category`, { headers: { Authorization: 'Bearer ' + token } })
            .then((response) => {

                setCategoryDataList(response.data)
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const CategoryColumn = [
        {
            title: 'Generated Id',
            dataIndex: 'generated_id',
            key: 'id',
            sorter: {
                compare: (a, b) => a.generated_id - b.generated_id,
                multiple: 3,
            }
        },
        {
            title: 'User Name',
            dataIndex: 'name',
            key: 'name',
            sorter: {
                compare: (a, b) => a.name - b.name,
                multiple: 3,
            }
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'name',
            sorter: {
                compare: (a, b) => a.name - b.name,
                multiple: 3,
            },
            render: (text, record) => (
                <span>{(record.image ? <span> <img alt="Category_Image" src={record.image} style={{ width: "100px" }} /> </span> : <span> <img alt="demo_image" src={DemoImage} style={{ width: "100px" }} /> </span>)}</span>
            )
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'action',
            sorter: {
                compare: (a, b) => a.name - b.name,
                multiple: 3,
            },
            render: (text, record) => (
                <span><i className="fa fa-eye" style={{ color: 'blue' }} id={record.id} onClick={CategoryView}></i><i className="fa fa-edit ml-3" style={{ color: 'black' }} id={record.id} onClick={CategoryEdit}></i><i className="fa fa-trash ml-3" style={{ color: 'red' }} id={record.id} onClick={CategoryDelete}></i></span>
            )
        },
    ]
    const CategoryView = (e) => {
        alert(e.target.id )
    }
    const [updateGeneratedId, setUpdateGeneratedId] = useState("");
    const CategoryEdit = (e) => {

        $('#categoryModalBtn').trigger('click');
        axios.post(`${url}/Edit`, { id: e.target.id }, { headers: { Authorization: 'Bearer ' + token } })
            .then((response) => {

                setUpdateGeneratedId(response.data.generated_id);
                $("#updatedCategoryName").val(response.data.name);

                // setCategoryDataList(response.data)
            })
            .catch((error) => {
                console.error(error);
            });

    }

    const CategoryDelete = (e) => {
        axios.post(`${url}/CatDelete`, { id: e.target.id }, { headers: { Authorization: 'Bearer ' + token } })
            .then((response) => {
                setCategoryDataList(response.data)
                message.success('Category Deleted Successfully..!!');
            })
            .catch((error) => {
                console.error(error);
            });

    }

    // For Open Country and City Modal

    const openCategory = (e) => {

        setMenu(false);
        setCategory(true);
        e.target.classList.add('active');
      

        $("#country").css("background-color", "#fff");
        $("#country").css("color", "#858796");
        $("#city").css("background-color", "#fc6011",);
        $("#city").css("color", "#fff");
        $('#country').removeClass('active');
    }

    const openMenu = (e) => {

        setMenu(true);
        setCategory(false);
        e.target.classList.add('active');
        $("#city").css("background-color", "#fff");
        $("#city").css("color", "#858796");
        $("#country").css("background-color", "#fc6011");
        $("#country").css("color", "#fff");
        $('#city').removeClass('active');
    }

    // For Save Menu Data 
    const { register, handleSubmit } = useForm();

    const {
        register: register1,
        handleSubmit: handleSubmit1,
      } = useForm();



    const onSubmit = data => {
        let dd = new FormData();
        dd.append('image', selectedImage);
        dd.append('generated_id', data.generated_id);
        dd.append('name', data.name);


        // Send a POST request

        axios.post(`${url}/menu`, dd, { headers: { Authorization: 'Bearer ' + token } })
            .then((response) => {
                setMenuDataList(response.data);
                $('#menuBtnClose').trigger('click');
                $('#menuModal form :input').val("");
                message.success('Menu Created Successfully..!!');
            })
            .catch((error) => {
                console.error(error);
            });

    };


    // For Save Category Form Data 
    let onSubmit1 = data => {
        let dd = new FormData();
        dd.append('image', selectedImageCategory);
        dd.append('generated_id', data.generated_id);
        dd.append('name', data.name);

        axios.post(`${url}/category`, dd, { headers: { Authorization: 'Bearer ' + token } })
            .then((response) => {
                setCategoryDataList(response.data)
                $('#CategoryBtnClose').trigger('click');
                $('#CategoryModal form :input').val("");
                message.success('Category Created Successfully..!!');
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // For Save Updated Category Form Data 
    let saveupdatedcategoryData = (e) => {
        e.preventDefault();
        updateCategoryData['UpdateGenerated_id'] = $("#CatGeneratedId").val();

        setUpdateCategoryData(updateCategoryData);
        console.log(updateCategoryData, "updated data")

        axios.post(`${url}/UpdateCategory`, categoryData, { headers: { Authorization: 'Bearer ' + token } })
            .then((response) => {
                setCategoryDataList(response.data)
                $('#UpdateCategoryBtnClose').trigger('click');
                $('#exampleModal form :input').val("");
                message.success('Category Updated Successfully..!!');
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // For Menu 
    // This function will be triggered when the file field change
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };

    // This function will be triggered when the "X" button is clicked
    const removeSelectedImage = () => {
        setSelectedImage();
    };

    // For Category 
    // This function will be triggered when the file field change
    const imageChangeCategory = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImageCategory(e.target.files[0]);
        }
    };

    // This function will be triggered when the "X" button is clicked
    const removeSelectedImageCategory = () => {
        setSelectedImageCategory();
    };


    return (
        <>
            <div class="row">

                <div class="col-lg-12">

                    <div class="card mb-4">

                        <div class="card-body">
                            <h4 className="ml-5 colorblack bold">Category Management</h4>
                            <div className="mt-4 text-center">
                                <div class="btn-group" style={{ minWidth: '50%' }}>
                                    <button type="button" class="btn border rounded-0 active" id="country" onClick={openMenu}>Menu Type</button>
                                    <button type="button" class="btn border rounded-0" onClick={openCategory} id="city">Category</button>

                                </div>
                                &nbsp;&nbsp;
                                {
                                    menu && (<Button type='primary' size="medium"  style={{ minWidth: '10%', float: 'right' }} data-toggle="modal" data-target="#menuModal">Add</Button>)

                                    // menu && (<button type="button" class="btn btn-outline-dark" style={{ minWidth: '20%', float: 'right' }} data-toggle="modal" data-target="#menuModal">Add</button>)
                                }
                                {
                                    category && (<Button type='primary' size="medium"  style={{ minWidth: '10%', float: 'right' }} data-toggle="modal" data-target="#CategoryModal">Add</Button>)
                                    // category && (<button type="button" class="btn btn-outline-dark" style={{ minWidth: '20%', float: 'right' }} data-toggle="modal" data-target="#CategoryModal">Add</button>)
                                }

                            </div>
                        </div>
                    </div>


                </div>


            </div>

            {
                menu && (<div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 col-lg-12 col-sm-12">
                            <div className="row mb-4">
                                <div className="col-md-6 col-lg-6 col-sm-12">
                                    <div class="input-group mb-3">
                                        <span class="input-group-text " id="basic-addon1"><i className="fa fa-search"></i></span>
                                        <input type="text" class="form-control" placeholder="Search By City or Country" aria-label="Username" aria-describedby="basic-addon1" />
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-6 col-sm-12">
                                    <select className="form-control">
                                        <option>Last 7 Days</option>
                                        <option>Last Month</option>
                                        <option>Last 6 Months</option>

                                    </select>
                                </div>
                            </div>
                            <Table dataSource={menuDataList} columns={MenuColumn} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['05', '10', '20', '30'] }} />
                        </div>
                    </div>
                </div>)
            }

            {
                category && (<div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 col-lg-12 col-sm-12">
                            <div className="row mb-4">
                                <div className="col-md-6 col-lg-6 col-sm-12">
                                    <div class="input-group mb-3">
                                        <span class="input-group-text " id="basic-addon1"><i className="fa fa-search"></i></span>
                                        <input type="text" class="form-control" placeholder="Search By City or Country" aria-label="Username" aria-describedby="basic-addon1" />
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-6 col-sm-12">
                                    <select className="form-control">
                                        <option>Last 7 Days</option>
                                        <option>Last Month</option>
                                        <option>Last 6 Months</option>

                                    </select>
                                </div>
                            </div>
                            <Table dataSource={categoryDataList} columns={CategoryColumn} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['05', '10', '20', '30'] }} />
                        </div>
                    </div>
                </div>)
            }

            {/* Menu Modal */}
            <div class="modal fade" id="menuModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title ml-auto colorblack bold" id="exampleModalLongTitle" >Add Menu</h5>
                            <button type="button" id="menuBtnClose" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div class="modal-body">
                                <div className="row">
                                    <div className="col-md-6 col-lg-6 col-sm-12">
                                        <label className="colorblack bold">Auto Generated ID</label>
                                        <input className='form-control' {...register("generated_id", {})} readOnly="true" value={menuAutoGenerated} />
                                        {/* <input type="text" className="from-control" /> */}
                                    </div>
                                    <div className="col-md-6 col-lg-6 col-sm-12">
                                        <label className="colorblack bold">Menu Type Name</label>
                                        <input className='form-control' {...register("name", { required: true, maxLength: 20 })} />

                                        {/* <input type="text" className="from-control" /> */}
                                    </div>
                                    <div className="col-md-6 col-lg-6 col-sm-12 mt-4">
                                        <label className="colorblack bold">Upload Image</label>

                                        <input
                                            accept="image/*"
                                            type="file"
                                            name="image"
                                            onChange={imageChange}
                                            className='form-control'
                                        />
                                    </div>
                                    <div className="col-md-6 col-lg-6 col-sm-12 mt-4">
                                        {selectedImage && (

                                            <div className="col-md-12 col-lg-12 " >
                                                <button onClick={removeSelectedImage} className="btn btn-sm mr-4" style={{ float: 'right', color: 'black', fontWeight: 'bolder' }}>
                                                    X
                                                </button><br />
                                                <img
                                                    src={URL.createObjectURL(selectedImage)}
                                                    alt="Selected"
                                                    style={{ maxWidth: '80%', minWidth: '80%', maxHeight: '130px' }}
                                                />

                                            </div>
                                        )}


                                    </div>

                                </div>
                            </div>

                            <div class="modal-footer">
                                {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> */}
                                <button type="submit" class="btn btn-primary">Add Menu</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Category MOdal  */}
            <div class="modal fade" id="CategoryModal" tabindex="-1" role="dialog" aria-labelledby="CategoryModalTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title ml-auto colorblack bold" id="exampleModalLongTitle" >Add Category</h5>
                            <button type="button" id="CategoryBtnClose" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit1(onSubmit1)}>
                            <div class="modal-body">
                                <div className="row">

                                    <div className="col-md-6 col-lg-6 col-sm-12">
                                        <label className="colorblack bold">Auto Generated ID</label>
                                        <input className="form-control" type="text"  {...register1("generated_id", {})} readOnly="true"  value={categoryAutoGenerated} />
                                    </div>
                                    <div className="col-md-6 col-lg-6 col-sm-12">
                                        <label className="colorblack bold">Category Type Name</label>
                                        <input className="form-control" type="text" {...register1("name", {})} onChange={CategoryhandleChange} />
                                    </div>

                                    <div className="col-md-6 col-lg-6 col-sm-12 mt-4">
                                        <label className="colorblack bold">Upload Image</label>

                                        <input
                                            accept="image/*"
                                            type="file"
                                            name="image"
                                            onChange={imageChangeCategory}
                                            className='form-control'
                                        />
                                    </div>

                                    <div className="col-md-6 col-lg-6 col-sm-12 mt-4">
                                        {selectedImageCategory && (

                                            <div className="col-md-12 col-lg-12 " >
                                                <button onClick={removeSelectedImageCategory} className="btn btn-sm mr-4" style={{ float: 'right', color: 'black', fontWeight: 'bolder' }}>
                                                    X
                                                </button><br />
                                                <img
                                                    src={URL.createObjectURL(selectedImageCategory)}
                                                    alt="selected_image"
                                                    style={{ maxWidth: '80%', minWidth: '80%', maxHeight: '130px' }}
                                                />

                                            </div>
                                        )}


                                    </div>

                                </div>
                            </div>

                            <div class="modal-footer">
                                {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> */}
                                <button type="submit" class="btn btn-primary">Add Category</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


            {/* For Category Edit Model  */}
            <button type="button" class="btn btn-primary" data-toggle="modal" id="categoryModalBtn" style={{ display: 'none' }} data-target="#exampleModal">

            </button>

            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit Category</h5>
                            <button type="button" class="close" id='UpdateCategoryBtnClose' data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={saveupdatedcategoryData}>

                            <div class="modal-body">
                                <div className="row">
                                    <div className="col-md-12 col-lg-12 col-sm-12">
                                        <label className="colorblack bold">Auto Generated ID</label>
                                        <input className="form-control" type="text" readOnly="true" id="CatGeneratedId" name="UpdateGenerated_id" value={updateGeneratedId} />
                                    </div>
                                    <div className="col-md-12 col-lg-12 col-sm-12">
                                        <label className="colorblack bold">Category Type Name</label>
                                        <input className="form-control" type="text" id="updatedCategoryName" name="UpdateName" onChange={UpdateCategoryhandleChange} />
                                    </div>


                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary">Update changes</button>
                            </div>


                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoryPage
