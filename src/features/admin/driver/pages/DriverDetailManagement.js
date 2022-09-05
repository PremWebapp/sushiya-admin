import React from 'react';
import Footer from '../../footer/Footer';
import SideNav from '../../sidenav/SideNav';
import TopBar from '../../topbar/TopBar';
import DriverDetailContent from './DriverDetailContent';

function DriverDetailManagement() {
    return (
        <>
            {/* <!-- Topbar --> */}
            {/* <!-- End of Topbar --> */}
            {/* <div id="wrapper"> */}
            {/* <SideNav /> */}

            {/* <!-- Content Wrapper --> */}
            <div id="content-wrapper" className="d-flex flex-column">

                {/* <!-- Main Content --> */}
                <div id="content">
                    <TopBar />

                    {/* <!-- /.container-fluid(Content) --> */}
                    <DriverDetailContent />


                </div>


                {/* <!-- End of Main Content --> */}
                <Footer />

            </div>
            {/* <!-- End of Content Wrapper --> */}
            {/* </div> */}
        </>
    );
}

export default DriverDetailManagement;
