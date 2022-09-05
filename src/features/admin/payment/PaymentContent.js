import React from 'react'
import Footer from '../footer/Footer'
import TopBar from '../topbar/TopBar'
import PaymentPage from './PaymentPage'

function PaymentContent() {
  return (
    <>
    
                {/* <!-- Content Wrapper --> */}
            <div id="content-wrapper" className="d-flex flex-column">

                {/* <!-- Main Content --> */}
                <div id="content">

                    {/* <!-- Topbar --> */}
                    <TopBar />
                    {/* <!-- End of Topbar --> */}

                    <PaymentPage />
                    {/* <!-- /.container-fluid --> */}

                </div>


                {/* <!-- End of Main Content --> */}
                <Footer />

            </div>
            {/* <!-- End of Content Wrapper --> */}
    </>
  )
}

export default PaymentContent