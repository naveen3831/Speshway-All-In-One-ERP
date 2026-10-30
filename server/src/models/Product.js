import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter product name'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      default: 'Business Operations',
    },
    description: {
      type: String,
      required: [true, 'Please enter product description'],
    },
    longDescription: {
      type: String,
      default: '',
    },
    features: {
      type: [String],
      default: [],
    },
    technologies: {
      type: [String],
      default: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO'],
    },
    websiteUrl: {
      type: String,
      default: '',
    },
    adminUrl: {
      type: String,
      default: '',
    },
    iconName: {
      type: String,
      default: 'Layers',
    },
    imageUrl: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'green',
    },
    status: {
      type: String,
      enum: ['active', 'beta', 'coming_soon'],
      default: 'active',
    },
    popularity: {
      type: Number,
      default: 95,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id ? ret._id.toString() : ret.slug;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id ? ret._id.toString() : ret.slug;
        return ret;
      },
    },
  }
);

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
