// Session Routes
const express = require('express')
const passport = require('passport')
const Session = require('../models/session')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// Create Route
router.post('/sessions', requireToken, (req, res, next) => {
  // console.log(req.bodysession.startTime)
  req.body.session.owner = req.user.id

  Session.create(req.body.session)
    .then(session => {
      res.status(201).json({ session: session })
    })
    .catch(next)
})

// Index Route
router.get('/sessions', requireToken, (req, res, next) => {
  Session.find({ owner: req.user.id })
    .then((sessions) => {
      return sessions.map(session => session.toObject())
    })
    .then(sessions => {
      res.status(200).json({ sessions: sessions })
    })
    .catch(next)
})

// Show Route
router.get('/sessions/:id', requireToken, (req, res, next) => {
  Session.findById(req.params.id)
    .then(handle404)
    .then(session => res.status(200).json({ session: session }))
    .catch()
})

// Update Route
router.patch('/sessions/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.session.owner

  Session.findById(req.params.id)
    .then(handle404)
    .then(session => {
      requireOwnership(req, session)
      return session.updateOne(req.body.session)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// Delete Route
router.delete('/sessions/:id', requireToken, (req, res, next) => {
  Session.findById(req.params.id)
    .then(handle404)
    .then(session => {
      requireOwnership(req, session)
      session.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
