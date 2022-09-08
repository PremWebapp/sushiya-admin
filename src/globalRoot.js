import React from 'react';

import './App.css';
import './vendor/fontawesome-free/css/all.css';
import './css/sb-admin-2.css';
import { Route, Routes } from 'react-router-dom';
import DashboardAdmin from './features/admin/DashboardAdmin';
import CountryCityManagement from './features/admin/countryCity/CountryCityManagement';
import UserManagement from './features/admin/user/UserManagement';
import RestaurantManagement from './features/admin/restaurant/RestaurantManagement'
import CategoryManagement from './features/admin/category/CategoryManagement';
import RestroDetailManagement from './features/admin/restaurant/pages/RestroDetailManagement';
import UserMap from './features/admin/user/UserMap';
import DriverManagement from './features/admin/driver/DriverManagement';
import ProfileManagement from './features/admin/profile/ProfileManagement';
import DriverDetailManagement from './features/admin/driver/pages/DriverDetailManagement';
import DishManagement from './features/admin/dish/DishManagement';
import PromoManagement from './features/admin/promo/PromoManagement';
import PromoCodePage from './features/admin/promo/pages/PromoCodePage';
import PromotionPage from './features/admin/promo/pages/PromotionPage';
import OrderManagement from './features/admin/order/OrderManagement';
import PaymentManagement from './features/admin/payment/PaymentManagement';
import SideNav from './features/admin/sidenav/SideNav';

function GlobalRoot() {
    return (
        <div id="wrapper">
            <SideNav />
            <Routes>
                <Route exact path="/" element={<DashboardAdmin />} />
                <Route exact path="/countryCity" element={<CountryCityManagement />} />
                <Route exact path="/restroDetail/:id" element={<RestroDetailManagement />} />
                <Route exact path="/driverDetail/:id" element={<DriverDetailManagement />} />
                <Route exact path="/profile" element={<ProfileManagement />} />
                <Route exact path="/promo/code" element={<PromoCodePage />} />
                <Route exact path="/promo/promotion" element={<PromotionPage />} />
                <Route exact path="/category" element={<CategoryManagement />} />
                <Route exact path="/user" element={<UserManagement />} />
                <Route exact path="/restaurant" element={<RestaurantManagement />} />
                <Route exact path="/userMap" element={<UserMap />} />
                <Route exact path="/driver" element={<DriverManagement />} />
                <Route exact path="/dish" element={<DishManagement />} />
                <Route exact path="/promo" element={<PromoManagement />} />
                <Route exact path="/order" element={<OrderManagement />} />
                <Route exact path="/payment" element={<PaymentManagement />} />
            </Routes>
        </div >
    );
}

export default GlobalRoot;
