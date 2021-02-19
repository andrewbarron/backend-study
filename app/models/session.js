const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
  goal1: {
    type: String
  },
  goal2: {
    type: String
  },
  goal3: {
    type: String
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
