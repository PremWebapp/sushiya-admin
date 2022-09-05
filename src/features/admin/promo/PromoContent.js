import React from 'react'
import Footer from '../footer/Footer'
import TopBar from '../topbar/TopBar'
import PromoPage from './PromoPage'

export default function PromoContent() {
  return (
    <>
            {/* <!-- Content Wrapper --> */}
            <div id="content-wrapper" className="d-flex flex-column">

                {/* <!-- Main Content --> */}
                <div id="content">

                    {/* <!-- Topbar --> */}
                    <TopBar />
                    {/* <!-- End of Topbar --> */}

                    <PromoPage />
                    {/* <!-- /.container-fluid --> */}

                </div>


                {/* <!-- End of Main Content --> */}
                <Footer />

            </div>
            {/* <!-- End of Content Wrapper --> */}    
    </>
  )
}
