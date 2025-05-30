const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    sparse: true // This allows null/undefined values while maintaining uniqueness
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  height: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  fitnessGoal: {
    type: String,
  },
  dietaryPreference: {
    type: String,
  },
  medicalIssues: {
    type: String,
  },
}, {
  timestamps: true,
});

// Generate random 8-digit user ID before saving
userSchema.pre('save', async function(next) {
  if (this.isNew) {
    let userId;
    let isUnique = false;
    
    while (!isUnique) {
      // Generate random 8-digit number
      userId = Math.floor(10000000 + Math.random() * 90000000).toString();
      
      // Check if userId already exists
      const existingUser = await this.constructor.findOne({ userId });
      if (!existingUser) {
        isUnique = true;
      }
    }
    
    this.userId = userId;
  }
  
  // Hash password if modified
  if (this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      return next(error);
    }
  }
  
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User; 