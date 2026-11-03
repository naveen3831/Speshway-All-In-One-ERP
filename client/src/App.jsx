import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';

// Public Website Pages
import { LandingPage } from './pages/LandingPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { WhyUsPage } from './pages/WhyUsPage';
import { PricingPage } from './pages/PricingPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { GetStartedPage } from './pages/GetStartedPage';

// Admin Portal Pages
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminOverview } from './pages/admin/AdminOverview';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminProductForm } from './pages/admin/AdminProductForm';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminInquiries } from './pages/admin/AdminInquiries';
import { AdminSettings } from './pages/admin/AdminSettings';

// Dedicated Industry ERP Dashboards
import { TravelAgencyDashboard } from './pages/travel/TravelAgencyDashboard';
import { HospitalDashboard } from './pages/hospital/HospitalDashboard';
import { VexaDashboard } from './pages/vexa/VexaDashboard';
import { DairyDashboard } from './pages/dairy/DairyDashboard';
import { AneeraDashboard } from './pages/aneera/AneeraDashboard';
import { NexoraDashboard } from './pages/ecommerce/NexoraDashboard';
import { SalonDashboard } from './pages/salon/SalonDashboard';
import { ServiceCenterDashboard } from './pages/service/ServiceCenterDashboard';
import { RealEstateDashboard } from './pages/realestate/RealEstateDashboard';
import { SchoolDashboard } from './pages/school/SchoolDashboard';
import { HotelDashboard } from './pages/hotel/HotelDashboard';

// Internal Dashboard & Auth
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import { ErrorBoundary } from './components/common/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <SocketProvider>
          <BrowserRouter>
            <ErrorBoundary>
              <Routes>
            {/* 1. SEPARATE PUBLIC WEBSITE PAGES */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/projects" element={<ProductsPage />} />

            {/* DEDICATED INDUSTRY ERP DASHBOARDS (Both /dashboard/:slug and /product/:slug/dashboard) */}
            <Route path="/product/speshway-hospitals/dashboard" element={<HospitalDashboard />} />
            <Route path="/product/hospitals/dashboard" element={<HospitalDashboard />} />
            <Route path="/dashboard/speshway-hospitals" element={<HospitalDashboard />} />
            <Route path="/dashboard/hospitals" element={<HospitalDashboard />} />
            <Route path="/hospital-erp/dashboard" element={<HospitalDashboard />} />
            <Route path="/hospital-erp" element={<HospitalDashboard />} />
            <Route path="/hospital-management-erp" element={<HospitalDashboard />} />
            <Route path="/hospitals-admin" element={<HospitalDashboard />} />

            <Route path="/product/tours-and-travels/dashboard" element={<TravelAgencyDashboard />} />
            <Route path="/dashboard/tours-and-travels" element={<TravelAgencyDashboard />} />
            <Route path="/travel-erp/dashboard" element={<TravelAgencyDashboard />} />
            <Route path="/travel-agency-erp" element={<TravelAgencyDashboard />} />

            <Route path="/product/vexa-style-hub/dashboard" element={<VexaDashboard />} />
            <Route path="/dashboard/vexa-style-hub" element={<VexaDashboard />} />
            <Route path="/vexa-style-hub/dashboard" element={<VexaDashboard />} />

            <Route path="/product/natural-milk-dairy/dashboard" element={<DairyDashboard />} />
            <Route path="/product/madhur-dairy/dashboard" element={<DairyDashboard />} />
            <Route path="/dashboard/natural-milk-dairy" element={<DairyDashboard />} />
            <Route path="/dashboard/madhur-dairy" element={<DairyDashboard />} />
            <Route path="/dairy-erp/dashboard" element={<DairyDashboard />} />
            <Route path="/dairy-erp" element={<DairyDashboard />} />
            <Route path="/dairy-management-erp" element={<DairyDashboard />} />

            <Route path="/product/aneera-silks/dashboard" element={<AneeraDashboard />} />
            <Route path="/product/aneera/dashboard" element={<AneeraDashboard />} />
            <Route path="/dashboard/aneera-silks" element={<AneeraDashboard />} />
            <Route path="/dashboard/aneera" element={<AneeraDashboard />} />
            <Route path="/aneera-silks/dashboard" element={<AneeraDashboard />} />
            <Route path="/aneera-dashboard" element={<AneeraDashboard />} />

            <Route path="/product/e-commerce/dashboard" element={<NexoraDashboard />} />
            <Route path="/product/ecommerce/dashboard" element={<NexoraDashboard />} />
            <Route path="/product/nexora/dashboard" element={<NexoraDashboard />} />
            <Route path="/product/nexora-store/dashboard" element={<NexoraDashboard />} />
            <Route path="/dashboard/e-commerce" element={<NexoraDashboard />} />
            <Route path="/dashboard/ecommerce" element={<NexoraDashboard />} />
            <Route path="/dashboard/nexora" element={<NexoraDashboard />} />
            <Route path="/ecommerce-erp/dashboard" element={<NexoraDashboard />} />
            <Route path="/ecommerce-dashboard" element={<NexoraDashboard />} />
            <Route path="/nexora-dashboard" element={<NexoraDashboard />} />

            <Route path="/product/saloon/dashboard" element={<SalonDashboard />} />
            <Route path="/product/salon/dashboard" element={<SalonDashboard />} />
            <Route path="/product/spy-salon/dashboard" element={<SalonDashboard />} />
            <Route path="/product/spysalon/dashboard" element={<SalonDashboard />} />
            <Route path="/dashboard/saloon" element={<SalonDashboard />} />
            <Route path="/dashboard/salon" element={<SalonDashboard />} />
            <Route path="/dashboard/spy-salon" element={<SalonDashboard />} />
            <Route path="/saloon-erp/dashboard" element={<SalonDashboard />} />
            <Route path="/salon-erp/dashboard" element={<SalonDashboard />} />
            <Route path="/salon-dashboard" element={<SalonDashboard />} />
            <Route path="/saloon-dashboard" element={<SalonDashboard />} />

            {/* Service Center, Real Estate, School & Hotel In-Site ERP Dashboards */}
            <Route path="/dashboard/service-center" element={<ServiceCenterDashboard />} />
            <Route path="/product/service-center/dashboard" element={<ServiceCenterDashboard />} />
            <Route path="/service-center-erp" element={<ServiceCenterDashboard />} />

            <Route path="/dashboard/real-estate" element={<RealEstateDashboard />} />
            <Route path="/product/real-estate/dashboard" element={<RealEstateDashboard />} />
            <Route path="/real-estate-erp" element={<RealEstateDashboard />} />

            <Route path="/dashboard/school-erp" element={<SchoolDashboard />} />
            <Route path="/product/school-erp/dashboard" element={<SchoolDashboard />} />
            <Route path="/school-erp" element={<SchoolDashboard />} />

            <Route path="/dashboard/hotel-erp" element={<HotelDashboard />} />
            <Route path="/product/hotel-erp/dashboard" element={<HotelDashboard />} />
            <Route path="/hotel-erp" element={<HotelDashboard />} />

            <Route path="/product/:id/dashboard" element={<Navigate to="/dashboard" replace />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/why-us" element={<WhyUsPage />} />
            <Route path="/about" element={<WhyUsPage />} />
            <Route path="/about-us" element={<WhyUsPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/contact-us" element={<ContactPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/get-started" element={<GetStartedPage />} />

            {/* 2. AUTHENTICATION */}
            <Route path="/login" element={<Login />} />

            {/* 3. ADMIN DASHBOARD */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminOverview />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="projects" element={<AdminProducts />} />
              <Route path="projects/new" element={<AdminProductForm />} />
              <Route path="projects/edit/:id" element={<AdminProductForm />} />
              <Route path="products/new" element={<AdminProductForm />} />
              <Route path="products/edit/:id" element={<AdminProductForm />} />
              <Route path="urls" element={<AdminProducts />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="inquiries" element={<AdminInquiries />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* 4. INTERNAL ERP DASHBOARD */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="inventory" element={<Dashboard />} />
              <Route path="sales" element={<Dashboard />} />
              <Route path="purchases" element={<Dashboard />} />
              <Route path="hr" element={<Dashboard />} />
              <Route path="finance" element={<Dashboard />} />
              <Route path="settings" element={<Dashboard />} />
            </Route>

            {/* 5. 404 CATCH-ALL */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </ErrorBoundary>
        </BrowserRouter>
      </SocketProvider>
    </AuthProvider>
    </ErrorBoundary>
  );
}
