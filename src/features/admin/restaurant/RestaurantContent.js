import React from 'react'
import Footer from '../footer/Footer'
import TopBar from '../topbar/TopBar'
import RestaurantPage from './RestaurantPage'

function RestaurantContent() {
    return (
        <>
            {/* <!-- Content Wrapper --> */}
            <div id="content-wrapper" className="d-flex flex-column">

                {/* <!-- Main Content --> */}
                <div id="content">

                    {/* <!-- Topbar --> */}
                    <TopBar />
                    {/* <!-- End of Topbar --> */}

                    <RestaurantPage />
                    {/* <!-- /.container-fluid --> */}

                </div>


                {/* <!-- End of Main Content --> */}
                <Footer />

            </div>
            {/* <!-- End of Content Wrapper --> */}
        </>
    )
}

export default RestaurantContent
