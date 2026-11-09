import mongoose from 'mongoose';

const homeContentSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: 'main_home',
      unique: true,
    },
    hero: {
      badge: {
        type: String,
        default: '— OUR ERP SOLUTIONS —',
      },
      titleDark: {
        type: String,
        default: 'SPESHWAY',
      },
      titleGreen: {
        type: String,
        default: 'ALL IN ONE ERP',
      },
      subtitle: {
        type: String,
        default: 'A collection of industry-ready ERP solutions to manage your business, operations, and customers — all in one place.',
      },
      primaryBtnText: {
        type: String,
        default: 'View All ERPs',
      },
      primaryBtnLink: {
        type: String,
        default: '/projects',
      },
      secondaryBtnText: {
        type: String,
        default: 'Request a Demo',
      },
    },
    stats: {
      stat1Number: {
        type: String,
        default: '524+',
      },
      stat1Label: {
        type: String,
        default: 'Happy Businesses',
      },
      stat2Number: {
        type: String,
        default: '17+',
      },
      stat2Label: {
        type: String,
        default: 'ERP Solutions',
      },
      stat3Number: {
        type: String,
        default: '99.9%',
      },
      stat3Label: {
        type: String,
        default: 'Uptime & Security',
      },
      stat4Number: {
        type: String,
        default: '24/7',
      },
      stat4Label: {
        type: String,
        default: 'Customer Support',
      },
    },
    solutions: {
      title: {
        type: String,
        default: 'Our ERP Solutions',
      },
    },
    navbar: {
      showPricing: {
        type: Boolean,
        default: true,
      },
    },
    branding: {
      logoUrl: {
        type: String,
        default: '/logo.png',
      },
      brandTitle: {
        type: String,
        default: 'SPESHWAY',
      },
      brandSubtitle: {
        type: String,
        default: 'ALL IN ONE ERP',
      },
    },
  },
  {
    timestamps: true,
  }
);

const HomeContent = mongoose.models.HomeContent || mongoose.model('HomeContent', homeContentSchema);

export default HomeContent;
