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
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminOverview } from './pages/admin/AdminOverview';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminProductForm } from './pages/admin/AdminProductForm';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminInquiries } from './pages/admin/AdminInquiries';
import { AdminSettings } from './pages/admin/AdminSettings';
import { AdminPricing } from './pages/admin/AdminPricing';
import { AdminHomeSettings } from './pages/admin/AdminHomeSettings';

// Dedicated Industry ERP Dashboards
import { TravelAgencyDashboard } from './pages/travel/TravelAgencyDashboard';
import BusTravelDashboard from './pages/travel/BusTravelDashboard';
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
import { JoyEventsDashboard } from './pages/events/JoyEventsDashboard';
import { HrmsDashboard } from './pages/hrms/HrmsDashboard';
import { FleetDashboard } from './pages/fleet/FleetDashboard';
import { GymDashboard } from './pages/gym/GymDashboard';
import { FlavoraKitchenDashboard } from './pages/restaurant/FlavoraKitchenDashboard';
import { RideFlowDashboard } from './pages/bikes/RideFlowDashboard';
import SavitriSareesDashboard from './pages/savitri/SavitriSareesDashboard';
import SanaStayzDashboard from './pages/hotel/SanaStayzDashboard';
import LearnhubDashboard from './pages/lms/LearnhubDashboard';
import FoodwayDashboard from './pages/foodway/FoodwayDashboard';

// Internal Dashboard & Auth
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { ScrollToTop } from './components/common/ScrollToTop';
import { SessionTimeoutModal } from './components/common/SessionTimeoutModal';


import { useParams } from 'react-router-dom';

const DynamicProductDashboard = () => {
  const { id } = useParams();
  const slug = (id || '').toLowerCase();

  if (slug.includes('savitri') || slug.includes('saree')) return <SavitriSareesDashboard />;
  if (slug.includes('sana') || slug.includes('stayz')) return <SanaStayzDashboard />;
  if (slug.includes('learn') || slug.includes('lms')) return <LearnhubDashboard />;
  if (slug.includes('food') || slug.includes('kitchen-cloud')) return <FoodwayDashboard />;
  if (slug.includes('ride') || slug.includes('bike') || slug.includes('flow')) return <RideFlowDashboard />;
  if (slug.includes('fleet')) return <FleetDashboard />;
  if (slug.includes('gym') || slug.includes('fitness')) return <GymDashboard />;
  if (slug.includes('flavora') || slug.includes('restaurant')) return <FlavoraKitchenDashboard />;
  if (slug.includes('hrms')) return <HrmsDashboard />;
  if (slug.includes('joy') || slug.includes('event')) return <JoyEventsDashboard />;
  if (slug.includes('aneera') || slug.includes('silk')) return <AneeraDashboard />;
  if (slug.includes('salon') || slug.includes('saloon')) return <SalonDashboard />;
  if (slug.includes('dairy') || slug.includes('milk')) return <DairyDashboard />;
  if (slug.includes('hospital')) return <HospitalDashboard />;
  if (slug.includes('tour') || slug.includes('travel') || slug.includes('bus')) return <BusTravelDashboard />;
  if (slug.includes('vexa') || slug.includes('apparel')) return <VexaDashboard />;
  if (slug.includes('e-com') || slug.includes('ecommerce') || slug.includes('nexora')) return <NexoraDashboard />;
  if (slug.includes('service')) return <ServiceCenterDashboard />;
  if (slug.includes('real-estate') || slug.includes('property')) return <RealEstateDashboard />;
  if (slug.includes('school')) return <SchoolDashboard />;
  if (slug.includes('hotel')) return <HotelDashboard />;

  return <Navigate to="/dashboard" replace />;
};

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <SessionTimeoutModal />
        <SocketProvider>
          <BrowserRouter>
            <ScrollToTop />
            <ErrorBoundary>
              <Routes>
            {/* 1. SEPARATE PUBLIC WEBSITE PAGES */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/projects" element={<ProductsPage />} />

                        {/* DEDICATED INDUSTRY ERP DASHBOARDS */}
            {/* 1. Savitri Sarees */}
            <Route path="/product/savitri-sarees/dashboard" element={<SavitriSareesDashboard />} />
            <Route path="/product/savitri/dashboard" element={<SavitriSareesDashboard />} />
            <Route path="/dashboard/savitri-sarees" element={<SavitriSareesDashboard />} />

            {/* 2. Sana Stayz */}
            <Route path="/product/sana-stayz/dashboard" element={<SanaStayzDashboard />} />
            <Route path="/product/sanastayz/dashboard" element={<SanaStayzDashboard />} />
            <Route path="/dashboard/sana-stayz" element={<SanaStayzDashboard />} />

            {/* 3. LearnHub */}
            <Route path="/product/learnhub/dashboard" element={<LearnhubDashboard />} />
            <Route path="/product/lms/dashboard" element={<LearnhubDashboard />} />
            <Route path="/dashboard/learnhub" element={<LearnhubDashboard />} />

            {/* 4. FoodWay */}
            <Route path="/product/foodway/dashboard" element={<FoodwayDashboard />} />
            <Route path="/product/foody/dashboard" element={<FoodwayDashboard />} />
            <Route path="/dashboard/foodway" element={<FoodwayDashboard />} />

            {/* 5. Tours & Travels (Bus Agency) */}
            <Route path="/product/tours-and-travels/dashboard" element={<BusTravelDashboard />} />
            <Route path="/product/tours-travels/dashboard" element={<BusTravelDashboard />} />
            <Route path="/dashboard/tours-and-travels" element={<BusTravelDashboard />} />
            <Route path="/dashboard/tours-travels" element={<BusTravelDashboard />} />
            <Route path="/travel-erp/dashboard" element={<BusTravelDashboard />} />
            <Route path="/travel-agency-erp" element={<TravelAgencyDashboard />} />

            {/* 6. RideFlow */}
            <Route path="/product/ride-flow/dashboard" element={<RideFlowDashboard />} />
            <Route path="/product/rideflow/dashboard" element={<RideFlowDashboard />} />
            <Route path="/dashboard/ride-flow" element={<RideFlowDashboard />} />

            {/* 7. Fleet Management */}
            <Route path="/product/fleet-management/dashboard" element={<FleetDashboard />} />
            <Route path="/product/fleet/dashboard" element={<FleetDashboard />} />
            <Route path="/dashboard/fleet-management" element={<FleetDashboard />} />

            {/* 8. American Fitness Gym */}
            <Route path="/product/american-fitness-gym/dashboard" element={<GymDashboard />} />
            <Route path="/product/american-fitness/dashboard" element={<GymDashboard />} />
            <Route path="/dashboard/american-fitness-gym" element={<GymDashboard />} />

            {/* 9. Flavora Kitchen */}
            <Route path="/product/flavora-kitchen/dashboard" element={<FlavoraKitchenDashboard />} />
            <Route path="/product/flavora/dashboard" element={<FlavoraKitchenDashboard />} />
            <Route path="/dashboard/flavora-kitchen" element={<FlavoraKitchenDashboard />} />

            {/* 10. Speshway HRMS */}
            <Route path="/product/speshway-hrms/dashboard" element={<HrmsDashboard />} />
            <Route path="/product/hrms/dashboard" element={<HrmsDashboard />} />
            <Route path="/dashboard/speshway-hrms" element={<HrmsDashboard />} />

            {/* 11. Joy Events */}
            <Route path="/product/joy-events/dashboard" element={<JoyEventsDashboard />} />
            <Route path="/product/joy-event-s/dashboard" element={<JoyEventsDashboard />} />
            <Route path="/product/joy_events/dashboard" element={<JoyEventsDashboard />} />
            <Route path="/dashboard/joy-events" element={<JoyEventsDashboard />} />

            {/* 12. Speshway Hospitals */}
            <Route path="/product/speshway-hospitals/dashboard" element={<HospitalDashboard />} />
            <Route path="/product/hospitals/dashboard" element={<HospitalDashboard />} />
            <Route path="/dashboard/speshway-hospitals" element={<HospitalDashboard />} />
            <Route path="/dashboard/hospitals" element={<HospitalDashboard />} />
            <Route path="/hospital-erp/dashboard" element={<HospitalDashboard />} />

            {/* 13. Vexa Style Hub */}
            <Route path="/product/vexa-style-hub/dashboard" element={<VexaDashboard />} />
            <Route path="/dashboard/vexa-style-hub" element={<VexaDashboard />} />
            <Route path="/vexa-style-hub/dashboard" element={<VexaDashboard />} />

            {/* 14. Natural Milk Dairy */}
            <Route path="/product/natural-milk-dairy/dashboard" element={<DairyDashboard />} />
            <Route path="/product/madhur-dairy/dashboard" element={<DairyDashboard />} />
            <Route path="/dashboard/natural-milk-dairy" element={<DairyDashboard />} />

            {/* 15. Aneera Silks */}
            <Route path="/product/aneera-silks/dashboard" element={<AneeraDashboard />} />
            <Route path="/product/aneera/dashboard" element={<AneeraDashboard />} />
            <Route path="/dashboard/aneera-silks" element={<AneeraDashboard />} />

            {/* 16. E-Commerce / Nexora Store */}
            <Route path="/product/e-commerce/dashboard" element={<NexoraDashboard />} />
            <Route path="/product/ecommerce/dashboard" element={<NexoraDashboard />} />
            <Route path="/product/nexora/dashboard" element={<NexoraDashboard />} />
            <Route path="/dashboard/e-commerce" element={<NexoraDashboard />} />

            {/* 17. SPY Salon */}
            <Route path="/product/saloon/dashboard" element={<SalonDashboard />} />
            <Route path="/product/salon/dashboard" element={<SalonDashboard />} />
            <Route path="/product/spy-salon/dashboard" element={<SalonDashboard />} />
            <Route path="/dashboard/saloon" element={<SalonDashboard />} />

            {/* 18. Service Center, Real Estate, School & Hotel */}
            <Route path="/product/service-center/dashboard" element={<ServiceCenterDashboard />} />
            <Route path="/dashboard/service-center" element={<ServiceCenterDashboard />} />

            <Route path="/product/real-estate/dashboard" element={<RealEstateDashboard />} />
            <Route path="/dashboard/real-estate" element={<RealEstateDashboard />} />

            <Route path="/product/school-erp/dashboard" element={<SchoolDashboard />} />
            <Route path="/dashboard/school-erp" element={<SchoolDashboard />} />

            <Route path="/product/hotel-erp/dashboard" element={<HotelDashboard />} />
            <Route path="/dashboard/hotel-erp" element={<HotelDashboard />} />

            {/* Catch-all dynamic product dashboard router */}
            <Route path="/product/:id/dashboard" element={<DynamicProductDashboard />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/project/:id" element={<ProductDetailPage />} />
            <Route path="/projects/:id" element={<ProductDetailPage />} />
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

            {/* 3. ADMIN AUTHENTICATION & DASHBOARD */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/overview" replace />} />
              <Route path="overview" element={<AdminOverview />} />
              <Route path="dashboard" element={<AdminOverview />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="projects" element={<AdminProducts />} />
              <Route path="projects/new" element={<AdminProductForm />} />
              <Route path="projects/edit/:id" element={<AdminProductForm />} />
              <Route path="products/new" element={<AdminProductForm />} />
              <Route path="products/edit/:id" element={<AdminProductForm />} />
              <Route path="urls" element={<AdminProducts />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="inquiries" element={<AdminInquiries />} />
              <Route path="pricing" element={<AdminPricing />} />
              <Route path="home" element={<AdminHomeSettings />} />
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
