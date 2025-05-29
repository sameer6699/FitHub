const mongoose = require('mongoose');

const userSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  loginTime: {
    type: Date,
    required: true,
    default: Date.now
  },
  logoutTime: {
    type: Date,
    default: null
  },
  deviceInfo: {
    type: String,
    default: 'Unknown'
  },
  ipAddress: {
    type: String,
    default: 'Unknown'
  },
  sessionDuration: {
    type: Number, // Duration in minutes
    default: null
  }
}, {
  timestamps: true
});

const UserSession = mongoose.model('UserSession', userSessionSchema);

module.exports = UserSession; 