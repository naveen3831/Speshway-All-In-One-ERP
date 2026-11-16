import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { ScrollToTop } from './components/common/ScrollToTop';
import { SessionTimeoutModal } from './components/common/SessionTimeoutModal';

// Public Website - Eagerly loaded for instant landing page paint
import { LandingPage } from './pages/LandingPage';

// Lazy Loaded Secondary Public Pages
const ProductsPage = lazy(() => import('./pages/ProductsPage').then(m => ({ default: m.ProductsPage })));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage').then(m => ({ default: m.ProductDetailPage })));
const FeaturesPage = lazy(() => import('./pages/FeaturesPage').then(m => ({ default: m.FeaturesPage })));
const WhyUsPage = lazy(() => import('./pages/WhyUsPage').then(m => ({ default: m.WhyUsPage })));
const PricingPage = lazy(() => import('./pages/PricingPage').then(m => ({ default: m.PricingPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const FaqPage = lazy(() => import('./pages/FaqPage').then(m => ({ default: m.FaqPage })));
const GetStartedPage = lazy(() => import('./pages/GetStartedPage').then(m => ({ default: m.GetStartedPage })));

// Admin Portal - Lazy Loaded
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin').then(m => ({ default: m.AdminLogin })));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout').then(m => ({ default: m.AdminLayout })));
const AdminOverview = lazy(() => import('./pages/admin/AdminOverview').then(m => ({ default: m.AdminOverview })));
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts').then(m => ({ default: m.AdminProducts })));
const AdminProductForm = lazy(() => import('./pages/admin/AdminProductForm').then(m => ({ default: m.AdminProductForm })));
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers').then(m => ({ default: m.AdminUsers })));
const AdminInquiries = lazy(() => import('./pages/admin/AdminInquiries').then(m => ({ default: m.AdminInquiries })));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings').then(m => ({ default: m.AdminSettings })));
const AdminPricing = lazy(() => import('./pages/admin/AdminPricing').then(m => ({ default: m.AdminPricing })));
const AdminHomeSettings = lazy(() => import('./pages/admin/AdminHomeSettings').then(m => ({ default: m.AdminHomeSettings })));

// Dedicated Industry ERP Dashboards - Lazy Loaded
const TravelAgencyDashboard = lazy(() => import('./pages/travel/TravelAgencyDashboard').then(m => ({ default: m.TravelAgencyDashboard })));
const BusTravelDashboard = lazy(() => import('./pages/travel/BusTravelDashboard'));
const HospitalDashboard = lazy(() => import('./pages/hospital/HospitalDashboard').then(m => ({ default: m.HospitalDashboard })));
const VexaDashboard = lazy(() => import('./pages/vexa/VexaDashboard').then(m => ({ default: m.VexaDashboard })));
const DairyDashboard = lazy(() => import('./pages/dairy/DairyDashboard').then(m => ({ default: m.DairyDashboard })));
const AneeraDashboard = lazy(() => import('./pages/aneera/AneeraDashboard').then(m => ({ default: m.AneeraDashboard })));
const NexoraDashboard = lazy(() => import('./pages/ecommerce/NexoraDashboard').then(m => ({ default: m.NexoraDashboard })));
const SalonDashboard = lazy(() => import('./pages/salon/SalonDashboard').then(m => ({ default: m.SalonDashboard })));
const ServiceCenterDashboard = lazy(() => import('./pages/service/ServiceCenterDashboard').then(m => ({ default: m.ServiceCenterDashboard })));
const RealEstateDashboard = lazy(() => import('./pages/realestate/RealEstateDashboard').then(m => ({ default: m.RealEstateDashboard })));
const SchoolDashboard = lazy(() => import('./pages/school/SchoolDashboard').then(m => ({ default: m.SchoolDashboard })));
const HotelDashboard = lazy(() => import('./pages/hotel/HotelDashboard').then(m => ({ default: m.HotelDashboard })));
const JoyEventsDashboard = lazy(() => import('./pages/events/JoyEventsDashboard').then(m => ({ default: m.JoyEventsDashboard })));
const HrmsDashboard = lazy(() => import('./pages/hrms/HrmsDashboard').then(m => ({ default: m.HrmsDashboard })));
const FleetDashboard = lazy(() => import('./pages/fleet/FleetDashboard').then(m => ({ default: m.FleetDashboard })));
const GymDashboard = lazy(() => import('./pages/gym/GymDashboard').then(m => ({ default: m.GymDashboard })));
const FlavoraKitchenDashboard = lazy(() => import('./pages/restaurant/FlavoraKitchenDashboard').then(m => ({ default: m.FlavoraKitchenDashboard })));
const RideFlowDashboard = lazy(() => import('./pages/bikes/RideFlowDashboard').then(m => ({ default: m.RideFlowDashboard })));
const SavitriSareesDashboard = lazy(() => import('./pages/savitri/SavitriSareesDashboard'));
const SanaStayzDashboard = lazy(() => import('./pages/hotel/SanaStayzDashboard'));
const LearnhubDashboard = lazy(() => import('./pages/lms/LearnhubDashboard'));
const FoodwayDashboard = lazy(() => import('./pages/foodway/FoodwayDashboard'));

// Internal Dashboard & Auth - Lazy Loaded
const DashboardLayout = lazy(() => import('./components/layout/DashboardLayout').then(m => ({ default: m.DashboardLayout })));
const Dashboard = lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })));
const Login = lazy(() => import('./pages/Login').then(m => ({ default: m.Login })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));

// Sleek fallback loader for lazy loaded pages
const PageLoader = () => (
  <div
    style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '14px',
      color: '#00875a',
    }}
  >
    <div
      style={{
        width: '36px',
        height: '36px',
        border: '3px solid #ecfdf5',
        borderTop: '3px solid #00875a',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }}
    />
    <span style={{ fontSize: '0.84rem', color: '#64748b', fontWeight: 600 }}>Loading...</span>
  </div>
);

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
              <Suspense fallback={<PageLoader />}>
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
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route element={<AdminLayout />}>
              <Route path="/admin/overview" element={<AdminOverview />} />
              <Route path="/admin/dashboard" element={<AdminOverview />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/projects" element={<AdminProducts />} />
              <Route path="/admin/projects/new" element={<AdminProductForm />} />
              <Route path="/admin/projects/edit/:id" element={<AdminProductForm />} />
              <Route path="/admin/products/new" element={<AdminProductForm />} />
              <Route path="/admin/products/edit/:id" element={<AdminProductForm />} />
              <Route path="/admin/urls" element={<AdminProducts />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/inquiries" element={<AdminInquiries />} />
              <Route path="/admin/pricing" element={<AdminPricing />} />
              <Route path="/admin/home" element={<AdminHomeSettings />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
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
          </Suspense>
          </ErrorBoundary>
        </BrowserRouter>
      </SocketProvider>
    </AuthProvider>
    </ErrorBoundary>
  );
}
