import Footer from '../footer/Footer'
import TopBar from '../topbar/TopBar'
import PageContent from './PageContent'

function MainContent() {
    return (
        <>
            {/* <!-- Content Wrapper --> */}
            <div id="content-wrapper" className="d-flex flex-column">

                {/* <!-- Main Content --> */}
                <div id="content">

                    {/* <!-- Topbar --> */}
                    <TopBar />
                    {/* <!-- End of Topbar --> */}

                    <PageContent />
                    {/* <!-- /.container-fluid --> */}

                </div>


                {/* <!-- End of Main Content --> */}
                <Footer />

            </div>
            {/* <!-- End of Content Wrapper --> */}
        </>
    )
}

export default MainContent
