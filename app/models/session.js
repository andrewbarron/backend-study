const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
  goals: {
    type: String,
    required: true
  },
  review: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Session', sessionSchema)
