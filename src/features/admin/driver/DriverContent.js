import React from 'react';
import DriverPage from './DriverPage';
import Footer from '../footer/Footer'
import Topbar from '../topbar/TopBar'

function DriverContent() {
  return (
    <>
      {/* <!-- Content Wrapper --> */}
      <div id="content-wrapper" className="d-flex flex-column">

        {/* <!-- Main Content --> */}
        <div id="content">

          {/* <!-- Topbar --> */}
          <Topbar />
          {/* <!-- End of Topbar --> */}

          <DriverPage />
          {/* <!-- /.container-fluid --> */}

        </div>


        {/* <!-- End of Main Content --> */}
        <Footer />

      </div>
      {/* <!-- End of Content Wrapper --> */}
    </>
  )
}

export default DriverContent;
