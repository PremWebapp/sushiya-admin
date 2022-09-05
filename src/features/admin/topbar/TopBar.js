import React from 'react'
import { PathUrl, Token, UserId } from '../../../config/Config'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import profileImg from "../../../img/undraw_profile.jpg"
import { useDispatch,useSelector } from 'react-redux';
import { logout, logoutFun } from '../../../redux/reducers/authReducer';

function TopBar() {

    const dispatch = useDispatch()
    const { userData: { token, user: { id } } } = useSelector(state => state.auth)
    // Token ,UserId and Url
    // const token = Token().token;
    // const user_id = UserId().user_id;
    // const url = PathUrl().urlData.development;

    // const history = useNavigate();

    const logOut = () => {
        const bodydata = { value: false, id: id }
        dispatch(logoutFun({ bodydata, token }))
        dispatch(logout())

        // axios.post(`${url}/logOut`, { value: false, id: user_id }, { headers: { Authorization: 'Bearer ' + token } })
        //     .then((response) => {
        //         localStorage.clear();
        //         history.push("/")
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
    }
    return (
        <>
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                {/* <!-- Sidebar Toggle (Topbar) --> */}
                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                    <i className="fa fa-bars"></i>
                </button>

                {/* <!-- Topbar Search --> */}
                <form
                    className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                    <div className="input-group">
                        <input type="text" className="form-control border-0 small" placeholder="Search for..."
                            aria-label="Search" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                                <i className="fas fa-search fa-sm"></i>
                            </button>
                        </div>
                    </div>
                </form>

                {/* <!-- Topbar Navbar --> */}
                <ul className="navbar-nav ml-auto">

                    {/* <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}
                    <li className="nav-item dropdown no-arrow d-sm-none">
                        <Link to="" className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-search fa-fw"></i>
                        </Link>
                        {/* <!-- Dropdown - Messages --> */}
                        <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                            aria-labelledby="searchDropdown">
                            <form className="form-inline mr-auto w-100 navbar-search">
                                <div className="input-group">
                                    <input type="text" className="form-control bg-light border-0 small"
                                        placeholder="Search for..." aria-label="Search"
                                        aria-describedby="basic-addon2" />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="button">
                                            <i className="fas fa-search fa-sm"></i>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </li>

                    {/* <!-- Nav Item - Alerts --> */}
                    <li className="nav-item dropdown no-arrow mx-1">
                        <Link to="" className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-bell fa-fw"></i>
                            {/* <!-- Counter - Alerts --> */}
                            <span className="badge badge-danger badge-counter">3+</span>
                        </Link>
                        {/* <!-- Dropdown - Alerts --> */}
                        <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                            aria-labelledby="alertsDropdown">
                            <h6 className="dropdown-header">
                                Alerts Center
                            </h6>
                            <Link to="" className="dropdown-item d-flex align-items-center" href="#">
                                <div className="mr-3">
                                    <div className="icon-circle bg-primary">
                                        <i className="fas fa-file-alt text-white"></i>
                                    </div>
                                </div>
                                <div>
                                    <div className="small text-gray-500">December 12, 2019</div>
                                    <span className="font-weight-bold">A new monthly report is ready to download!</span>
                                </div>
                            </Link>
                            <Link to="" className="dropdown-item d-flex align-items-center" href="#">
                                <div className="mr-3">
                                    <div className="icon-circle bg-success">
                                        <i className="fas fa-donate text-white"></i>
                                    </div>
                                </div>
                                <div>
                                    <div className="small text-gray-500">December 7, 2019</div>
                                    $290.29 has been deposited into your account!
                                </div>
                            </Link>
                            <Link to="" className="dropdown-item d-flex align-items-center" href="#">
                                <div className="mr-3">
                                    <div className="icon-circle bg-warning">
                                        <i className="fas fa-exclamation-triangle text-white"></i>
                                    </div>
                                </div>
                                <div>
                                    <div className="small text-gray-500">December 2, 2019</div>
                                    Spending Alert: We've noticed unusually high spending for your account.
                                </div>
                            </Link>
                            <Link to="" className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</Link>
                        </div>
                    </li>

                    {/* <!-- Nav Item - Messages --> */}
                    <li className="nav-item dropdown no-arrow mx-1">
                        <Link to="" className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-envelope fa-fw"></i>
                            {/* <!-- Counter - Messages --> */}
                            <span className="badge badge-danger badge-counter">7</span>
                        </Link>
                        {/* <!-- Dropdown - Messages --> */}
                        <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                            aria-labelledby="messagesDropdown">
                            <h6 className="dropdown-header">
                                Message Center
                            </h6>
                            <Link to="" className="dropdown-item d-flex align-items-center" href="#">
                                <div className="dropdown-list-image mr-3">
                                    <img className="rounded-circle" src="img/undraw_profile_1.svg"
                                        alt="..." />
                                    <div className="status-indicator bg-success"></div>
                                </div>
                                <div className="font-weight-bold">
                                    <div className="text-truncate">Hi there! I am wondering if you can help me with a
                                        problem I've been having.</div>
                                    <div className="small text-gray-500">Emily Fowler · 58m</div>
                                </div>
                            </Link>
                            <Link to="" className="dropdown-item d-flex align-items-center" href="#">
                                <div className="dropdown-list-image mr-3">
                                    <img className="rounded-circle" src="img/undraw_profile_2.svg"
                                        alt="..." />
                                    <div className="status-indicator" ></div>
                                </div>
                                <div>
                                    <div className="text-truncate">I have the photos that you ordered last month, how
                                        would you like them sent to you?</div>
                                    <div className="small text-gray-500">Jae Chun · 1d</div>
                                </div>
                            </Link>
                            <Link to="" className="dropdown-item d-flex align-items-center" href="#">
                                <div className="dropdown-list-image mr-3">
                                    <img className="rounded-circle" src="img/undraw_profile_3.svg"
                                        alt="..." />
                                    <div className="status-indicator bg-warning"></div>
                                </div>
                                <div>
                                    <div className="text-truncate">Last month's report looks great, I am very happy with
                                        the progress so far, keep up the good work!</div>
                                    <div className="small text-gray-500">Morgan Alvarez · 2d</div>
                                </div>
                            </Link>
                            <Link to="" className="dropdown-item d-flex align-items-center" href="#">
                                <div className="dropdown-list-image mr-3">
                                    <img className="rounded-circle" src="https://source.unsplash.com/Mv9hjnEUHR4/60x60"
                                        alt="..." />
                                    <div className="status-indicator bg-success"></div>
                                </div>
                                <div>
                                    <div className="text-truncate">Am I a good boy? The reason I ask is because someone
                                        told me that people say this to all dogs, even if they aren't good...</div>
                                    <div className="small text-gray-500">Chicken the Dog · 2w</div>
                                </div>
                            </Link>
                            <Link to="" className="dropdown-item text-center small text-gray-500" href="#">Read More Messages</Link>
                        </div>
                    </li>

                    <div className="topbar-divider d-none d-sm-block"></div>

                    {/* <!-- Nav Item - User Information --> */}
                    <li className="nav-item dropdown no-arrow">
                        <Link to="" className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">Douglas McGee</span>
                            <img className="img-profile rounded-circle"
                                src={profileImg} />
                        </Link>
                        {/* <!-- Dropdown - User Information --> */}
                        <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                            aria-labelledby="userDropdown">
                            <NavLink className="dropdown-item" to="/Admin/Profile">
                                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                Profile
                            </NavLink>
                            <Link to="" className="dropdown-item" href="#">
                                <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                Settings
                            </Link>
                            <Link to="" className="dropdown-item" href="#">
                                <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                Activity Log
                            </Link>
                            <div className="dropdown-divider"></div>
                            <Link to="" className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" ></i>
                                Logout
                            </Link>
                        </div>
                    </li>

                </ul>

            </nav>

            {/* <!-- Logout Modal--> */}
            <div className="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <button className="btn btn-primary" type="button" data-dismiss="modal" onClick={logOut}>Logout</button>
                            {/* <Link to="" className="btn btn-primary" href="login.html" >Logout */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopBar
