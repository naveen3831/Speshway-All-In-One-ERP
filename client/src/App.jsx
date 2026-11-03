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
import { FleetDashboard } from './pages/fleet/FleetDashboard';
import { GymDashboard } from './pages/gym/GymDashboard';
import { FlavoraKitchenDashboard } from './pages/restaurant/FlavoraKitchenDashboard';
import { HrmsDashboard } from './pages/hrms/HrmsDashboard';
import { JoyEventsDashboard } from './pages/events/JoyEventsDashboard';
import { RideFlowDashboard } from './pages/bikes/RideFlowDashboard';

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

            <Route path="/product/fleet-management/dashboard" element={<FleetDashboard />} />
            <Route path="/product/fleet/dashboard" element={<FleetDashboard />} />
            <Route path="/dashboard/fleet-management" element={<FleetDashboard />} />
            <Route path="/dashboard/fleet" element={<FleetDashboard />} />
            <Route path="/fleet-erp/dashboard" element={<FleetDashboard />} />
            <Route path="/fleet-dashboard" element={<FleetDashboard />} />

            <Route path="/product/american-fitness-gym/dashboard" element={<GymDashboard />} />
            <Route path="/product/american-fitness/dashboard" element={<GymDashboard />} />
            <Route path="/product/gym/dashboard" element={<GymDashboard />} />
            <Route path="/dashboard/american-fitness-gym" element={<GymDashboard />} />
            <Route path="/dashboard/american-fitness" element={<GymDashboard />} />
            <Route path="/dashboard/gym" element={<GymDashboard />} />
            <Route path="/gym-erp/dashboard" element={<GymDashboard />} />
            <Route path="/gym-dashboard" element={<GymDashboard />} />

            <Route path="/product/flavora-kitchen/dashboard" element={<FlavoraKitchenDashboard />} />
            <Route path="/product/flavora/dashboard" element={<FlavoraKitchenDashboard />} />
            <Route path="/dashboard/flavora-kitchen" element={<FlavoraKitchenDashboard />} />
            <Route path="/dashboard/flavora" element={<FlavoraKitchenDashboard />} />
            <Route path="/restaurant-erp/dashboard" element={<FlavoraKitchenDashboard />} />
            <Route path="/flavora-dashboard" element={<FlavoraKitchenDashboard />} />

            <Route path="/product/speshway-hrms/dashboard" element={<HrmsDashboard />} />
            <Route path="/product/speshway-hrms/dashboad" element={<HrmsDashboard />} />
            <Route path="/product/hrms/dashboard" element={<HrmsDashboard />} />
            <Route path="/dashboard/speshway-hrms" element={<HrmsDashboard />} />
            <Route path="/dashboard/hrms" element={<HrmsDashboard />} />
            <Route path="/hrms-erp/dashboard" element={<HrmsDashboard />} />
            <Route path="/hrms-dashboard" element={<HrmsDashboard />} />

            <Route path="/product/joy-events/dashboard" element={<JoyEventsDashboard />} />
            <Route path="/product/joy-events/dashboad" element={<JoyEventsDashboard />} />
            <Route path="/product/joy_events/dashboard" element={<JoyEventsDashboard />} />
            <Route path="/product/joy_event-s/dashboard" element={<JoyEventsDashboard />} />
            <Route path="/product/joy_event-s/dashboad" element={<JoyEventsDashboard />} />
            <Route path="/product/joy-event/dashboard" element={<JoyEventsDashboard />} />
            <Route path="/product/eventoza/dashboard" element={<JoyEventsDashboard />} />
            <Route path="/product/eventoza/dashboad" element={<JoyEventsDashboard />} />
            <Route path="/dashboard/joy-events" element={<JoyEventsDashboard />} />
            <Route path="/dashboard/joy_events" element={<JoyEventsDashboard />} />
            <Route path="/dashboard/joy_event-s" element={<JoyEventsDashboard />} />
            <Route path="/dashboard/eventoza" element={<JoyEventsDashboard />} />
            <Route path="/joy-events/dashboard" element={<JoyEventsDashboard />} />
            <Route path="/events-erp/dashboard" element={<JoyEventsDashboard />} />
            <Route path="/joy-events-dashboard" element={<JoyEventsDashboard />} />

            <Route path="/product/ride-flow/dashboard" element={<RideFlowDashboard />} />
            <Route path="/product/ride-flow/dashboad" element={<RideFlowDashboard />} />
            <Route path="/product/rideflow/dashboard" element={<RideFlowDashboard />} />
            <Route path="/product/rideflow/dashboad" element={<RideFlowDashboard />} />
            <Route path="/dashboard/ride-flow" element={<RideFlowDashboard />} />
            <Route path="/dashboard/rideflow" element={<RideFlowDashboard />} />
            <Route path="/ride-flow/dashboard" element={<RideFlowDashboard />} />
            <Route path="/ride-flow-dashboard" element={<RideFlowDashboard />} />
            <Route path="/bikes-erp/dashboard" element={<RideFlowDashboard />} />

            <Route path="/product/:id/dashboard" element={<Navigate to="/dashboard" replace />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/why-us" element={<WhyUsPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/get-started" element={<GetStartedPage />} />

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
