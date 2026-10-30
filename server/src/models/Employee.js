import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide employee name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide employee email'],
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Please provide employee role'],
      trim: true,
      default: 'Software Engineer',
    },
    dept: {
      type: String,
      required: [true, 'Please provide department'],
      trim: true,
      default: 'Engineering',
    },
    status: {
      type: String,
      enum: ['Active', 'On Leave', 'Inactive'],
      default: 'Active',
    },
    avatar: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Virtual or helper to format clean employee object
employeeSchema.methods.toJSON = function () {
  const obj = this.toObject();
  obj.id = obj._id.toString();
  return obj;
};

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
