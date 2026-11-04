import mongoose from 'mongoose';

const pricingPlanSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
      trim: true,
    },
    period: {
      type: String,
      default: '',
    },
    desc: {
      type: String,
      default: '',
    },
    features: {
      type: [String],
      default: [],
    },
    popular: {
      type: Boolean,
      default: false,
    },
    btnText: {
      type: String,
      default: 'Get Started',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const PricingPlan = mongoose.models.PricingPlan || mongoose.model('PricingPlan', pricingPlanSchema);

export default PricingPlan;

