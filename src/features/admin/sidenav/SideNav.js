// import { NavLink } from 'react-router-dom';
// import SushiyaLogo from "../../../img/sushiya_logo.png";


// function SideNav() {
//     return (
//         <div >
//             {/* <!-- Sidebar --> */}
//             <ul className="navbar-nav bg-gradient-primary sidebar sidebarStyle sidebar-dark accordion" id="accordionSidebar" >

//                 {/* <!-- Sidebar - Brand --> */}
//                 <div className="logo text-center mb-3">
//                     <NavLink to="/Admin" className="navbar-brand text-center">
//                         <img
//                             src={SushiyaLogo}
//                             alt=""
//                             width="100"
//                             height="84"
//                             className="d-inline-block align-text-top"
//                         />
//                     </NavLink>
//                 </div>

//                 {/* <!-- Divider --> */}
//                 <hr className="sidebar-divider my-0" />


//                 {/* <!-- Nav Item - Dashboard --> */}
//                 {/* <li className="nav-item active">
//                     <NavLink className="nav-link" to="/Admin">
//                         <i className="fas fa-fw fa-tachometer-alt"></i>
//                         <span className='text-dark'>Dashboard</span></NavLink>
//                 </li> */}
//                 {/* <!-- Divider --> */}
//                 <hr className="sidebar-divider" />

//                 {/* <!-- Heading --> */}
//                 {/* <div className="sidebar-heading">
//                     Interface
//                 </div> */}

//                 {/* <!-- Nav Item - Pages Collapse Menu --> */}
//                 <li className="nav-item">
//                     <NavLink className="nav-link" to="/Admin">
//                         <i className="fa fa-tachometer px-1"></i>
//                         <span>Dashboard</span></NavLink>
//                 </li>

//                 <li className="nav-item">
//                     <NavLink className="nav-link" to="/Admin/countryCity">
//                         <i className="fas fa-fw fa-globe-americas"></i>
//                         <span>Country & City Management</span></NavLink>
//                 </li>
//                 <li className="nav-item">
//                     <NavLink className="nav-link" to="/Admin/User">
//                         <i className="fas fa-fw fa-users"></i>
//                         <span>User Management</span></NavLink>
//                 </li>
//                 <li className="nav-item">
//                     <NavLink className="nav-link" to="/Admin/Restaurant">
//                         <i className="fas fa-fw fa-chart-area"></i>
//                         <span>Restaurant Management</span></NavLink>
//                 </li>
//                 <li className="nav-item">
//                     <NavLink className="nav-link" to="/Admin/Driver">
//                         <i className="fas fa-fw fa-motorcycle"></i>
//                         <span>Delivery Boy Management</span></NavLink>
//                 </li>

//                 <li className="nav-item">
//                     <NavLink className="nav-link" to="/Admin/Category">
//                         <i className="fas fa-fw fa-arrows-alt"></i>
//                         <span>Category Management</span></NavLink>
//                 </li>
//                 <li className="nav-item">
//                     <NavLink className="nav-link" to="/Admin/Order">
//                         <i className="fas fa-fw fa-shopping-cart"></i>
//                         <span>Orders Management</span></NavLink>
//                 </li>
//                 <li className="nav-item">
//                     <NavLink className="nav-link" to="/Admin/Payment">
//                         <i className="fas fa-fw fa-money-bill-alt"></i>
//                         <span>Payment Management</span></NavLink>
//                 </li>
//                 <li className="nav-item">
//                     <NavLink className="nav-link" to="charts.html">
//                         <i className="fas fa-fw fa-money-bill-alt"></i>
//                         <span>Commission Management</span></NavLink>
//                 </li>
//                 <li className="nav-item">
//                     <NavLink className="nav-link" to="/Admin/Promo">
//                         <i className="fas fa-fw fa-percent"></i>
//                         <span>Promo Code Management</span></NavLink>
//                 </li>
//                 <li className="nav-item">
//                     <NavLink className="nav-link" to="/Admin/Dish">
//                         <i className="fas fa-fw fa-utensils"></i>
//                         <span>Dish Management</span></NavLink>
//                 </li>
//                 <li className="nav-item">
//                     <NavLink className="nav-link" to="charts.html">
//                         <i className="fas fa-fw fa-star-half-alt"></i>
//                         <span>Rating & Review Management</span></NavLink>
//                 </li>
//                 <li className="nav-item">
//                     <NavLink className="nav-link" to="charts.html">
//                         <i className="fas fa-fw fa-file-code"></i>
//                         <span>Report Management</span></NavLink>
//                 </li>
//                 <li className="nav-item">
//                     <NavLink className="nav-link" to="charts.html">
//                         <i className="fas fa-fw fa-subway"></i>
//                         <span>Fares Management</span></NavLink>
//                 </li>
//                 <li className="nav-item">
//                     <NavLink className="nav-link" to="charts.html">
//                         <i className="fas fa-fw fa-credit-card"></i>
//                         <span>Support Management</span></NavLink>
//                 </li>
//                 <li className="nav-item">
//                     <NavLink className="nav-link" to="charts.html">
//                         <i className="fas fa-fw fa-bell"></i>
//                         <span>Notifications Management</span></NavLink>
//                 </li>
//                 <li className="nav-item">
//                     <NavLink className="nav-link" to="charts.html">
//                         <i className="fas fa-fw fa-credit-card"></i>
//                         <span>Subscription Management</span></NavLink>
//                 </li>
//                 <li className="nav-item">
//                     <NavLink className="nav-link" to="charts.html">
//                         <i className="fas fa-fw fa-unlock"></i>
//                         <span>Sub Admin</span></NavLink>
//                 </li>
//                 <li className="nav-item">
//                     <NavLink className="nav-link" to="charts.html">
//                         <i className="fas fa-fw fa-cogs"></i>
//                         <span>Setting</span></NavLink>
//                 </li>




//                 {/* 
//                 <li className="nav-item">
//                     <NavLink className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseTwo"
//                         aria-expanded="true" aria-controls="collapseTwo">
//                         <i className="fas fa-fw fa-cog"></i>
//                         <span>Components</span>
//                     </NavLink>
//                     <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
//                         <div className="bg-white py-2 collapse-inner rounded">
//                             <h6 className="collapse-header">Custom Components:</h6>
//                             <NavLink className="collapse-item" to="buttons.html">Buttons</NavLink>
//                             <NavLink className="collapse-item" to="cards.html">Cards</NavLink>
//                         </div>
//                     </div>
//                 </li> */}


//                 {/* <!-- Divider --> */}
//                 {/* <hr className="sidebar-divider" /> */}

//                 {/* <!-- Heading --> */}
//                 {/* <div className="sidebar-heading">
//                     Addons
//                 </div> */}

//                 {/* <!-- Nav Item - Pages Collapse Menu --> */}
//                 {/* <li className="nav-item">
//                     <NavLink className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapsePages"
//                         aria-expanded="true" aria-controls="collapsePages">
//                         <i className="fas fa-fw fa-folder"></i>
//                         <span>Pages</span>
//                     </NavLink>
//                     <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
//                         <div className="bg-white py-2 collapse-inner rounded">
//                             <h6 className="collapse-header">Login Screens:</h6>
//                             <NavLink className="collapse-item" to="login.html">Login</NavLink>
//                             <NavLink className="collapse-item" to="register.html">Register</NavLink>
//                             <NavLink className="collapse-item" to="forgot-password.html">Forgot Password</NavLink>
//                             <div className="collapse-divider"></div>
//                             <h6 className="collapse-header">Other Pages:</h6>
//                             <NavLink className="collapse-item" to="404.html">404 Page</NavLink>
//                             <NavLink className="collapse-item" to="blank.html">Blank Page</NavLink>
//                         </div>
//                     </div>
//                 </li> */}


//                 {/* <!-- Divider --> */}
//                 <hr className="sidebar-divider d-none d-md-block" />

//                 {/* <!-- Sidebar Toggler (Sidebar) --> */}
//                 {/* <div className="text-center d-none d-md-inline">
//                     <button className="rounded-circle border-0" id="sidebarToggle"></button>
//                 </div> */}



//             </ul>
//             {/* <!-- End of Sidebar --> */}
//         </div>
//     )
// }

// export default SideNav


import React from "react";
import { NavLink } from "react-router-dom";
import { Layout, Menu } from "antd";
import SushiyaLogo from "../../../img/sushiya_logo.png";
import styles from "./Sidebar.module.css";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { AiOutlineMenuUnfold, AiOutlineStock, AiFillApi, AiFillFormatPainter, AiFillFire,AiOutlineStar,AiFillSnippets ,AiOutlineSplitCells,AiOutlinePartition,AiOutlineSetting } from "react-icons/ai";
import { MdLocalOffer } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { BsSpeedometer, BsPersonCircle ,BsCashCoin} from "react-icons/bs";
import { GrUserSettings } from "react-icons/gr";
import { GiReceiveMoney } from "react-icons/gi";
import { RiAdminFill } from "react-icons/ri";

import { Link } from "react-router-dom";
const { Sider } = Layout;

function SideNav() {

  return (
    <>
      <Sider
      className="sidebar-sidenav"
        theme="light"
      >
        <div className="logo text-center mb-5">
          <Link to="/admin" className="navbar-brand text-center">
            <img
              src={SushiyaLogo}
              alt=""
              className="d-inline-block align-text-top sidenav-img"
            />
          </Link>
        </div>

        <Menu mode="inline">
          <Menu.Item
            className={styles.paddingLeft}
            key="1"
            icon={<BsSpeedometer size={20} />}
          >
            <Link to="/admin"> Dashboard </Link>
          </Menu.Item>
          <Menu.Item
            className={styles.paddingLeft}
            key="2"
            icon={<AiOutlineMenuUnfold size={20} />}
          >
            <Link to="/admin/countryCity"> Country & City Management </Link>
          </Menu.Item>
          <Menu.Item
            className={styles.paddingLeft}
            key="3"
            icon={<MdLocalOffer size={20} />}
          >
            <Link to="/admin/user"> User Management </Link>
          </Menu.Item>
          <Menu.Item
            className={styles.paddingLeft}
            key="4"
            icon={<GrUserSettings size={20} />}
          >
            <NavLink to="/admin/restaurant">Restaurant Management</NavLink>
          </Menu.Item>
          <Menu.Item
            className={styles.paddingLeft}
            key="5"
            icon={<IoIosPeople size={20} />}
          >
            <NavLink to="/admin/driver"> Delivery Boy Management </NavLink>
          </Menu.Item>
          <Menu.Item
            className={styles.paddingLeft}
            key="6"
            icon={<GiReceiveMoney size={20} />}
          >
            <NavLink to="/admin/category">Category Management</NavLink>
          </Menu.Item>
          <Menu.Item
            className={styles.paddingLeft}
            key="7"
            icon={<AiOutlineStock size={20} />}
          >
            <NavLink to="/admin/order"> Order Management </NavLink>
          </Menu.Item>
          <Menu.Item
            className={styles.paddingLeft}
            key="8"
            icon={<BsCashCoin size={20} />}
          >
            <NavLink to="/admin/payment">Payment Management  </NavLink>
          </Menu.Item>
          <Menu.Item
            className={styles.paddingLeft}
            key="9"
            icon={<AiFillApi size={20} />}
          >
            <NavLink to="/admin/subadmin"> Commission Management</NavLink>
          </Menu.Item>
          <Menu.Item
            className={styles.paddingLeft}
            key="10"
            icon={<AiFillFormatPainter size={20} />}
          >
            <NavLink to="/admin/promo">Promo Code Management</NavLink>
          </Menu.Item>
          <Menu.Item
            className={styles.paddingLeft}
            key="11"
            icon={<AiFillFire size={20} />}
          >
            <NavLink to="/admin/dish">Dish Management</NavLink>
          </Menu.Item>
          <Menu.Item
            className={styles.paddingLeft}
            key="12"
            icon={<AiOutlineStar size={20} />}
          >
            <NavLink to="/admin/bankdetail">Rating & Review</NavLink>
          </Menu.Item>
          <Menu.Item
            className={styles.paddingLeft}
            key="13"
            icon={<AiFillSnippets size={20} />}
          >
            <NavLink to="/admin/bankdetail">Report Management</NavLink>
          </Menu.Item>
          <Menu.Item
            className={styles.paddingLeft}
            key="14"
            icon={<AiOutlineSplitCells size={20} />}
          >
            <NavLink to="/admin/bankdetail">Fares Management</NavLink>
          </Menu.Item>
          <Menu.Item
            className={styles.paddingLeft}
            key="15"
            icon={<AiOutlinePartition size={20} />}
          >
            <NavLink to="/admin/bankdetail">Subscription Management</NavLink>
          </Menu.Item>
          <Menu.Item
            className={styles.paddingLeft}
            key="16"
            icon={<BsPersonCircle size={20} />}
          >
            <NavLink to="/admin/subadmin">Sub Admin</NavLink>
          </Menu.Item>
          <Menu.Item
            className={styles.paddingLeft}
            key="17"
            icon={<AiOutlineSetting size={20} />}
          >
            <NavLink to="/admin/bankdetail">Setting</NavLink>
          </Menu.Item>
    
        </Menu>
      </Sider>
    </>
  );
}

export default SideNav;
