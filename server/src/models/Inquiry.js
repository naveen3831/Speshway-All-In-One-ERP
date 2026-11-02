import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Contact name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Work email is required'],
      trim: true,
      lowercase: true,
    },
    company: {
      type: String,
      default: 'Enterprise Client',
      trim: true,
    },
    phone: {
      type: String,
      default: '',
      trim: true,
    },
    module: {
      type: String,
      default: 'All-In-One Complete Suite',
    },
    teamSize: {
      type: String,
      default: '1-10',
    },
    message: {
      type: String,
      default: '',
    },
    source: {
      type: String,
      default: 'get-started', // 'get-started' | 'demo' | 'contact'
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'qualified', 'closed'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

// Virtual id field
inquirySchema.virtual('id').get(function () {
  return this._id.toHexString();
});

inquirySchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

export const Inquiry = mongoose.model('Inquiry', inquirySchema);
export default Inquiry;
