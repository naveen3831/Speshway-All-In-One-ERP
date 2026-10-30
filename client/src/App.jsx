import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import { AdminUrls } from './pages/admin/AdminUrls';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminInquiries } from './pages/admin/AdminInquiries';
import { AdminSettings } from './pages/admin/AdminSettings';

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
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/why-us" element={<WhyUsPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* 2. AUTHENTICATION */}
            <Route path="/login" element={<Login />} />

            {/* 3. ADMIN DASHBOARD (With Sidebar Pages & URL Management) */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminOverview />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="urls" element={<AdminUrls />} />
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
        </BrowserRouter>
      </SocketProvider>
    </AuthProvider>
  );
}
