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

// Admin Portal Pages
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminOverview } from './pages/admin/AdminOverview';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminProductForm } from './pages/admin/AdminProductForm';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminInquiries } from './pages/admin/AdminInquiries';
import { AdminSettings } from './pages/admin/AdminSettings';

// Travel Agency Industry ERP Dashboard
import { TravelAgencyDashboard } from './pages/travel/TravelAgencyDashboard';

// Hospital Management Industry ERP Dashboard
import { HospitalDashboard } from './pages/hospital/HospitalDashboard';

// Internal Dashboard & Auth
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <BrowserRouter>
          <Routes>
            {/* 1. SEPARATE PUBLIC WEBSITE PAGES */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/speshway-hospitals/dashboard" element={<HospitalDashboard />} />
            <Route path="/product/hospitals/dashboard" element={<HospitalDashboard />} />
            <Route path="/product/tours-and-travels/dashboard" element={<TravelAgencyDashboard />} />
            <Route path="/product/:id/dashboard" element={<HospitalDashboard />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/why-us" element={<WhyUsPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* 2. AUTHENTICATION */}
            <Route path="/login" element={<Login />} />

            {/* 3. ADMIN DASHBOARD */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminOverview />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="products/new" element={<AdminProductForm />} />
              <Route path="products/edit/:id" element={<AdminProductForm />} />
              <Route path="urls" element={<AdminProducts />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="inquiries" element={<AdminInquiries />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* 4. DEDICATED INDUSTRY ERP DASHBOARDS */}
            <Route path="/travel-erp/dashboard" element={<TravelAgencyDashboard />} />
            <Route path="/travel-agency-erp" element={<TravelAgencyDashboard />} />
            <Route path="/dashboard/tours-and-travels" element={<TravelAgencyDashboard />} />

            <Route path="/hospital-erp/dashboard" element={<Navigate to="/product/speshway-hospitals/dashboard" replace />} />
            <Route path="/hospital-erp" element={<Navigate to="/product/speshway-hospitals/dashboard" replace />} />
            <Route path="/dashboard/hospitals" element={<Navigate to="/product/speshway-hospitals/dashboard" replace />} />
            <Route path="/hospital-management-erp" element={<Navigate to="/product/speshway-hospitals/dashboard" replace />} />
            <Route path="/hospitals-admin" element={<Navigate to="/product/speshway-hospitals/dashboard" replace />} />

            {/* 5. INTERNAL ERP DASHBOARD */}
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
        </BrowserRouter>
      </SocketProvider>
    </AuthProvider>
  );
}
