import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/landing/Navbar';
import { CtaBanner } from '../components/landing/CtaBanner';
import { Footer } from '../components/landing/Footer';
import { DemoModal } from '../components/landing/DemoModal';
import { useSocket, isSameProduct } from '../context/SocketContext';
import { getProductFallbackImage } from '../utils/productImages';
import { getProjectCategory } from '../utils/adminProjects';
import {
  Globe,
  Shield,
  Check,
  ExternalLink,
  Layers,
  Sparkles,
  Cpu,
  Server,
  Zap,
  Lock,
  Database,
  Code2,
  Terminal,
  Activity,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const { products } = useSocket();
  const [modalMode, setModalMode] = useState(null);
  const navigate = useNavigate();

  // Scroll to top whenever the product detail page opens or ID changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }, [id]);

  // Robust product lookup with instant fallback if socket/DB is still connecting
  
  const foundProduct = products && products.length > 0 ? products.find((p) => isSameProduct(p, { id, slug: id, name: id })) : null;
  const product = foundProduct || (id === 'savitri-sarees' || id?.includes('savitri') || id?.includes('saree') ? {
    id: 'savitri-sarees',
    slug: 'savitri-sarees',
    name: 'Savitri Sarees',
    category: 'Fashion & Luxury',
    status: 'active',
    description: 'Savitri Sarees is a premium online saree shopping platform offering a beautiful collection of traditional and modern sarees, effortless product browsing, secure payment gateways, and seamless order management.',
    websiteUrl: 'https://saree.speshway.site/',
    adminUrl: '/product/savitri-sarees/dashboard',
    imageUrl: '/images/products/savitri-sarees.jpg',
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO'],
    features: ['Handloom Saree Catalog', 'Silk Mark Certified', 'Loom Weaver Coordination', 'Real-Time Order Tracking', 'Bridal Collections'],
  } : (id === 'sana-stayz' || id?.includes('sana') || id?.includes('stayz')) ? {
    id: 'sana-stayz',
    slug: 'sana-stayz',
    name: 'Sana Stayz',
    category: 'Hospitality & Hotels',
    status: 'active',
    description: 'Sana Stayz is a modern hotel and accommodation booking platform designed to streamline room reservations, front desk check-in/out, housekeeping, and guest management through an intuitive digital portal.',
    websiteUrl: 'https://hotel.speshway.site/',
    adminUrl: '/product/sana-stayz/dashboard',
    imageUrl: '/images/products/sana-stayz.jpg',
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO'],
    features: ['Room Reservations Grid', 'Express Check-In/Out', 'Live Occupancy Telematics', 'Housekeeping Roster', 'Billing & Folio Invoicing'],
  } : (id === 'learnhub' || id?.includes('learn') || id?.includes('lms')) ? {
    id: 'learnhub',
    slug: 'learnhub',
    name: 'LearnHub',
    category: 'Education & LMS',
    status: 'active',
    description: 'LearnHub is a modern online learning management platform designed to help students enroll in industry courses, attend live interactive batches, complete assignments, and receive accredited certificates.',
    websiteUrl: 'https://lms.speshway.site/',
    adminUrl: '/product/learnhub/dashboard',
    imageUrl: '/images/products/learnhub.jpg',
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO'],
    features: ['Course Management & Video Lectures', 'Student Enrollment Pipeline', 'Live Interactive Classrooms', 'Automated Quizzes & Exams', 'Blockchain Certificates'],
  } : (id === 'foodway' || id?.includes('foodway') || id?.includes('foody')) ? {
    id: 'foodway',
    slug: 'foodway',
    name: 'FOODWAY',
    category: 'Food Delivery & Kitchen',
    status: 'active',
    description: 'FoodWay is a modern online food ordering platform that helps customers explore nearby partner kitchens, customize dishes, track live deliveries, and order delicious meals seamlessly.',
    websiteUrl: 'https://foody.speshway.site/',
    adminUrl: '/product/foodway/dashboard',
    imageUrl: '/images/products/foodway.jpg',
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO'],
    features: ['Live Kitchen Display (KDS)', 'Online Food Delivery Workflow', 'Rider Telematics Tracking', 'Multi-Kitchen Settlements', 'Digital POS Invoices'],
  } : (id === 'tours-travels' || id === 'tours-and-travels' || id?.includes('tour') || id?.includes('travel') || id?.includes('bus')) ? {
    id: 'tours-and-travels',
    slug: 'tours-and-travels',
    name: 'TOURS & TRAVELS',
    category: 'Bus & Travel Booking',
    status: 'active',
    description: 'STAR TOURS & TRAVELS is an online bus ticket booking platform designed to make travel easy with quick bus searches, seat selection, secure online ticketing, and real-time travel updates.',
    websiteUrl: 'https://bus.speshway.site/',
    adminUrl: '/product/tours-and-travels/dashboard',
    imageUrl: '/images/products/tours-and-travels.jpg',
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO'],
    features: ['Online Bus Ticketing Engine', 'Seat Selection Matrix', 'Fleet GPS Telematics', 'Interstate Route Rosters', 'Automated Boarding Passes'],
  } : (id === 'speshway-hospitals' || id === 'hospitals' || id?.includes('hospital')) ? {
    id: 'speshway-hospitals',
    slug: 'speshway-hospitals',
    name: 'Speshway Hospitals',
    category: 'Healthcare & Hospitals',
    status: 'active',
    description: 'HMS Enterprise is a comprehensive Hospital Management System designed to streamline hospital operations, including patient management, appointments, EMR, billing, pharmacy, laboratory reports, inventory, and staff management — all through one centralized digital platform.',
    websiteUrl: 'https://speshway.com/hospitals',
    adminUrl: '/product/speshway-hospitals/dashboard',
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'REST API'],
    features: ['Diagnostic Lab Reports', 'Pathology & EMR', 'Appointments & Scheduling', 'Pharmacy & Blood Bank', 'Role-Based Access'],
  } : (id === 'natural-milk-dairy' || id === 'madhur-dairy' || id?.includes('dairy') || id?.includes('milk')) ? {
    id: 'natural-milk-dairy',
    slug: 'natural-milk-dairy',
    name: 'Natural Milk Dairy',
    category: 'Dairy & Agriculture',
    status: 'active',
    description: 'Natural Milk Dairy is an all-in-one Dairy Management System that simplifies product management, customer orders, subscriptions, inventory, daily deliveries, and payments through a centralized admin dashboard.',
    websiteUrl: 'https://speshway.com/natural-milk-dairy',
    adminUrl: '/product/natural-milk-dairy/dashboard',
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'REST API'],
    features: ['Real-Time Orders', 'Role-Based Access', 'Daily Milk Subscriptions', 'Delivery Route Tracking', 'Inventory & Cold Storage', 'Revenue Analytics'],
  } : (id === 'aneera-silks' || id === 'aneera' || id?.includes('aneera') || id?.includes('silk')) ? {
    id: 'aneera-silks',
    slug: 'aneera-silks',
    name: 'Aneera Silks',
    category: 'Fashion & Luxury',
    status: 'active',
    description: 'Aneera Silks is a luxury online saree shopping destination featuring elegant silk, Banarasi, Kanchipuram, and designer collections, with beautiful product galleries, seamless shopping, secure payments, and convenient order management',
    websiteUrl: 'https://aneerasilks.com',
    adminUrl: '/product/aneera-silks/dashboard',
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'Tailwind/CSS'],
    features: ['Luxury Saree Catalog', 'Silk Mark Certification', 'Real-Time Order Tracking', 'Role-Based Access', 'Bridal Customization', 'Secure Payments'],
  } : (id === 'e-commerce' || id === 'ecommerce' || id?.includes('e-com') || id?.includes('nexora')) ? {
    id: 'e-commerce',
    slug: 'e-commerce',
    name: 'E commerce',
    category: 'E-Commerce Retail',
    status: 'active',
    description: 'Speshway Ecom is an all-in-one online shopping platform offering multiple product categories, seamless product browsing, wishlist, cart management, secure payments, and convenient order tracking.',
    websiteUrl: 'https://nexora.speshway.com',
    adminUrl: '/product/e-commerce/dashboard',
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'Tailwind/CSS'],
    features: ['Multi-Category Catalog', 'Real-Time Order Tracking', 'Role-Based Access', 'Cart & Wishlist Engine', 'Payment Gateway Integration', 'Inventory Stock Alerts'],
  } : (id === 'fleet-management' || id === 'fleet' || id?.includes('fleet')) ? {
    id: 'fleet-management',
    slug: 'fleet-management',
    name: 'Fleet Management',
    category: 'Logistics & Fleet',
    status: 'active',
    description: 'A smart Fleet Management System designed to simplify vehicle operations, monitor fleet activities, manage drivers and trips, and improve operational efficiency. Track fleet performance, organize vehicle records, and manage transportation operations through one centralized platform.',
    websiteUrl: 'https://fleet.speshway.com',
    adminUrl: '/product/fleet-management/dashboard',
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'Tailwind/CSS'],
    features: ['Real-Time GPS Telematics', 'Driver & Vehicle Rostering', 'Fuel Dispensation Audits', 'Waybill & Route Tracking', 'Preventive Maintenance Logs', 'Geofence Perimeter Security'],
  } : (id === 'american-fitness-gym' || id === 'american-fitness' || id?.includes('fitness') || id?.includes('gym')) ? {
    id: 'american-fitness-gym',
    slug: 'american-fitness-gym',
    name: 'American Fitness Gym',
    category: 'Fitness & Wellness',
    status: 'active',
    description: 'American Fitness Gym is a modern fitness platform designed to help fitness enthusiasts achieve their health and fitness goals. Explore gym services, workout programs, professional trainers, membership plans, and schedules through a user-friendly website.',
    websiteUrl: 'https://americanfitness.speshway.com',
    adminUrl: '/product/american-fitness-gym/dashboard',
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'Tailwind/CSS'],
    features: ['Biometric Turnstile Check-In', 'PT & Class Scheduling', 'Membership Subscription Tiers', 'Attendance Streak Tracking', 'Supplement Bar POS', 'Revenue Analytics'],
  } : (id === 'flavora-kitchen' || id === 'flavora' || id?.includes('flavora') || id?.includes('kitchen')) ? {
    id: 'flavora-kitchen',
    slug: 'flavora-kitchen',
    name: 'Flavora Kitchen',
    category: 'Restaurant & Dining',
    status: 'active',
    description: 'Flavora Kitchen is an enterprise cloud kitchen and restaurant management system that streamlines live orders, online deliveries, dining table reservations, recipe costings, kitchen display systems (KDS), and inventory through a centralized digital platform.',
    websiteUrl: 'https://flavorakitchen.speshway.com',
    adminUrl: '/product/flavora-kitchen/dashboard',
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'Tailwind/CSS'],
    features: ['Live Kitchen Display (KDS)', 'Table Reservation Engine', 'Thermal KOT Printing', 'Menu & Recipe Costing', 'Digital POS Settlements', 'Customer Loyalty & Reviews'],
  } : (id === 'ride-flow' || id === 'rideflow' || id?.includes('ride-flow') || id?.includes('bike')) ? {
    id: 'ride-flow',
    slug: 'ride-flow',
    name: 'RIDE FLOW',
    category: 'Automotive & Mobility',
    status: 'active',
    description: 'RideFlow is a modern two-wheeler platform designed to help customers explore bikes, compare models, discover attractive offers, and connect with dealers. It provides a convenient and user-friendly experience for finding the right bike.',
    websiteUrl: 'https://bike.speshway.site/',
    adminUrl: '/product/ride-flow/dashboard',
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'JWT Auth', 'Tailwind CSS'],
    features: ['Bike Listings', 'Bike Categories', 'Bike Comparison', 'Offers & Deals', 'Dealer Information', 'Service Support', 'Customer Assistance'],
  } : (id === 'joy-events' || id === 'joy_events' || id === 'joy_event-s' || id === 'joy-event' || id?.includes('joy') || id?.includes('eventoza')) ? {
    id: 'joy-events',
    slug: 'joy-events',
    name: "JOY_EVENT'S",
    category: 'Event Management',
    status: 'active',
    description: 'Joy Events is a modern event management platform designed to simplify event planning, bookings, and vendor coordination. From weddings and birthday parties to corporate events and celebrations, manage event requirements through one centralized platform.',
    websiteUrl: 'https://joyevents.speshway.site',
    adminUrl: '/product/joy-events/dashboard',
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'Tailwind/CSS'],
    features: ['Event Bookings & Scheduling', 'Multi-Category Packages', 'Vendor & Caterer Coordination', 'Real-Time Revenue Analytics', 'Automated Invoices & Payments', 'Role-Based Staff Access'],
  } : (id === 'speshway-hrms' || id === 'hrms' || id?.includes('hrms')) ? {
    id: 'speshway-hrms',
    slug: 'speshway-hrms',
    name: 'Speshway-HRMS',
    category: 'Human Resources',
    status: 'active',
    description: 'Speshway HRMS is an all-in-one Human Resource Management System designed to simplify workforce management and automate daily HR operations. Manage employees, attendance, leave requests, payroll, recruitment, and performance through a centralized platform.',
    websiteUrl: 'https://hrms.speshway.com',
    adminUrl: '/product/speshway-hrms/dashboard',
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'Tailwind/CSS'],
    features: ['Biometric Shift Punch Logs', 'Leave & Attendance Engine', 'Automated Payroll & Tax Slips', 'Applicant Tracking (ATS)', 'Employee Self-Service (ESS)', 'Performance Appraisals'],
  } : (id === 'saloon' || id === 'salon' || id?.includes('salon') || id?.includes('saloon') || id?.includes('spy-salon')) ? {
    id: 'saloon',
    slug: 'saloon',
    name: 'Saloon',
    category: 'Beauty & Wellness',
    status: 'active',
    description: 'SPY Salon is a premium beauty and wellness studio offering professional hair styling, beauty treatments, skincare, grooming, and personalized salon services with convenient online appointment booking.',
    websiteUrl: 'https://spysalon.speshway.com',
    adminUrl: '/product/saloon/dashboard',
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'Tailwind/CSS'],
    features: ['Real-Time Appointments', 'Stylist & Chair Rostering', 'Service & Package Catalog', 'Loyalty & Membership Passes', 'POS & Split Billing', 'Inventory & Salon Consumables'],
  } : id === 'vexa-style-hub' ? {
    id: 'vexa-style-hub',
    slug: 'vexa-style-hub',
    name: 'Vexa Style Hub',
    category: 'Fashion & Apparel',
    status: 'Active Product',
    description: 'VEXA Style Hub is a modern clothing e-commerce platform that offers a seamless online shopping experience with stylish collections, easy product browsing, secure payments, and convenient order tracking.',
    websiteUrl: 'https://vexastylehub.com',
    adminUrl: '/product/vexa-style-hub/dashboard',
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'Tailwind/CSS'],
    features: ['Real-Time Orders', 'Role-Based Access', 'Apparel Inventory', 'Sales Tracking', 'Manufacturing Batches'],
  } : null);

  const handleOpenWebsite = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    try {
      const url = product?.websiteUrl || `https://speshway.com/${product?.slug || id || ''}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error('Error opening website:', err);
    }
  };

  const handleOpenAdminDashboard = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    try {
      const targetSlug = (product?.slug || id || '').toLowerCase();
      let url = '/product/' + targetSlug + '/dashboard';

      if (targetSlug.includes('savitri') || targetSlug.includes('saree')) url = '/product/savitri-sarees/dashboard';
      else if (targetSlug.includes('sana') || targetSlug.includes('stayz')) url = '/product/sana-stayz/dashboard';
      else if (targetSlug.includes('learn') || targetSlug.includes('lms')) url = '/product/learnhub/dashboard';
      else if (targetSlug.includes('food')) url = '/product/foodway/dashboard';
      else if (targetSlug.includes('tour') || targetSlug.includes('travel') || targetSlug.includes('bus')) url = '/product/tours-and-travels/dashboard';
      else if (targetSlug.includes('hospital')) url = '/product/speshway-hospitals/dashboard';
      else if (targetSlug.includes('dairy') || targetSlug.includes('milk')) url = '/product/natural-milk-dairy/dashboard';
      else if (targetSlug.includes('aneera') || targetSlug.includes('silk')) url = '/product/aneera-silks/dashboard';
      else if (targetSlug.includes('e-com') || targetSlug.includes('ecommerce') || targetSlug.includes('nexora')) url = '/product/e-commerce/dashboard';
      else if (targetSlug.includes('fleet')) url = '/product/fleet-management/dashboard';
      else if (targetSlug.includes('fitness') || targetSlug.includes('gym')) url = '/product/american-fitness-gym/dashboard';
      else if (targetSlug.includes('flavora') || targetSlug.includes('kitchen')) url = '/product/flavora-kitchen/dashboard';
      else if (targetSlug.includes('hrms')) url = '/product/speshway-hrms/dashboard';
      else if (targetSlug.includes('ride') || targetSlug.includes('bike') || targetSlug.includes('flow')) url = '/product/ride-flow/dashboard';
      else if (targetSlug.includes('joy') || targetSlug.includes('event')) url = '/product/joy-events/dashboard';
      else if (targetSlug.includes('salon') || targetSlug.includes('saloon')) url = '/product/saloon/dashboard';
      else if (targetSlug.includes('vexa') || targetSlug.includes('style-hub')) url = '/product/vexa-style-hub/dashboard';
      else if (product?.adminUrl && product.adminUrl.startsWith('/') && product.adminUrl !== '/admin/products') url = product.adminUrl;

      navigate(url);
    } catch (err) {
      console.error('Error opening admin dashboard:', err);
    }
  };

  if (!product) {
    return (
      <div className="landing-wrapper">
        <Navbar
          onOpenGetStarted={() => setModalMode('get-started')}
          onOpenDemo={() => setModalMode('demo')}
        />
        <main className="page-main-container" style={{ textAlign: 'center', padding: '100px 20px', flex: '1 0 auto' }}>
          <h2>Product Not Found</h2>
          <p style={{ marginTop: '10px', color: '#64748b' }}>
            The requested ERP application could not be found in the catalog.
          </p>
          <Link to="/products" className="btn-hero-primary" style={{ display: 'inline-block', marginTop: '20px' }}>
            &larr; Back to Products Catalog
          </Link>
        </main>
        <Footer
          onOpenGetStarted={() => setModalMode('get-started')}
          onOpenDemo={() => setModalMode('demo')}
        />
      </div>
    );
  }

  const technologies = product.technologies && product.technologies.length > 0
    ? product.technologies
    : ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'JWT Auth', 'REST API'];

  return (
    <div className="landing-wrapper">
      <Navbar
        onOpenGetStarted={() => setModalMode('get-started')}
        onOpenDemo={() => setModalMode('demo')}
      />

      <main className="product-page-detail-wrapper">
        {/* Full-width Product Hero Banner Section */}
        <section className="product-detail-hero-section">
          <div className="detail-hero-container">
            <div className="detail-hero-left">
              <button
                type="button"
                onClick={() => {
                  if (window.history.length > 1) {
                    navigate(-1);
                  } else {
                    navigate('/products');
                  }
                }}
                className="btn-back-link"
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>

              <div className="modal-badge-row">
                <span className="product-category-tag">{getProjectCategory(product)}</span>
              </div>
              <h1 className="product-detail-h1">{product.name}</h1>
              <p className="product-detail-sub">{product.description}</p>

              {/* ACTION BUTTONS REQUIRED BY USER */}
              <div className="detail-actions-row">
                <button onClick={handleOpenWebsite} className="btn-product-action btn-view-website">
                  <Globe size={18} />
                  <span>View Website</span>
                  <ExternalLink size={14} />
                </button>

                <button
                  onClick={handleOpenAdminDashboard}
                  className="btn-product-action btn-view-admin"
                  title="View ERP"
                >
                  <Shield size={18} />
                  <span>View ERP</span>
                </button>
              </div>
            </div>

            <div className="detail-hero-right">
              <div className="product-hero-card-preview">
                <div className="preview-icon-giant">
                  {(() => {
                    const rawImg = product.imageUrl && typeof product.imageUrl === 'string' ? product.imageUrl.trim() : '';
                    const heroImg = rawImg || getProductFallbackImage(product.slug || product.id || product.name) || '';
                    return heroImg ? (
                      <img
                        src={heroImg}
                        alt={product.name}
                        className="product-hero-custom-img"
                        onError={(e) => {
                          const fallback = getProductFallbackImage(product.slug || product.id);
                          if (fallback && e.target.src !== fallback) {
                            e.target.src = fallback;
                          } else {
                            e.target.style.display = 'none';
                          }
                        }}
                      />
                    ) : (
                      <Layers size={64} className="text-icon-green" />
                    );
                  })()}
                </div>
                <h3 className="preview-card-prod-name">{product.name}</h3>
                <p className="preview-card-prod-sub">Real-Time Synchronized &bull; Role-Based Access</p>
                <div className="preview-stats-bar">
                  <div>
                    <span className="p-num">99.9%</span>
                    <span className="p-lbl">Uptime SLA</span>
                  </div>
                  <div>
                    <span className="p-num">256-bit</span>
                    <span className="p-lbl">AES Encryption</span>
                  </div>
                  <div>
                    <span className="p-num">&lt;50ms</span>
                    <span className="p-lbl">API Latency</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Body Sections */}
        <div className="detail-body-container">

          {/* SECTION: TECHNOLOGIES USED (CRITICAL USER REQUIREMENT) */}
          <section className="tech-stack-deep-section">
            <div className="tech-stack-card">
              <div className="tech-stack-header">
                <div className="tech-header-left">
                  <div className="tech-icon-circ">
                    <Cpu size={24} className="text-icon-green" />
                  </div>
                  <div>
                    <h2 className="tech-card-title">Technologies &amp; Architecture Stack</h2>
                    <p className="tech-card-sub">
                      Modern, high-performance technology stack powering this ERP module
                    </p>
                  </div>
                </div>
                <span className="tech-badge-count">{technologies.length} Technologies</span>
              </div>

              <div className="tech-chips-grid">
                {technologies.map((tech, idx) => (
                  <div key={idx} className="tech-stack-badge-item">
                    <Code2 size={16} className="text-icon-green" />
                    <span className="tech-name-bold">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Detailed Features & Architecture */}
          <section className="detail-deep-dive">
            {/* Description & Overview */}
            <div className="dive-block">
              <div className="dive-title-row">
                <Terminal size={22} className="text-icon-green" />
                <h2>Project Overview &amp; Description</h2>
              </div>
              <p className="dive-desc-para">{product.longDescription || product.description}</p>
            </div>

            {/* Features Checklist */}
            <div className="dive-block">
              <div className="dive-title-row">
                <Zap size={22} className="text-icon-purple" />
                <h2>Key Capabilities &amp; Features ({product.features?.length || 0})</h2>
              </div>
              <div className="features-grid-deep">
                {product.features?.map((feat, idx) => (
                  <div key={idx} className="feat-box-deep">
                    <span className="feat-check-circ">
                      <Check size={14} strokeWidth={3} />
                    </span>
                    <div className="feat-text-wrap">
                      <strong className="feat-title">{feat}</strong>
                      <span className="feat-subtext">Enterprise workflow with real-time audit logging</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <CtaBanner onOpenGetStarted={() => navigate('/get-started')} />
      </main>

      <Footer
        onOpenGetStarted={() => navigate('/get-started')}
        onOpenDemo={() => setModalMode('demo')}
      />

      {modalMode && (
        <DemoModal mode={modalMode} onClose={() => setModalMode(null)} />
      )}
    </div>
  );
};
