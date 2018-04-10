import mongoose from "mongoose"
import User from '../models/User'

module.exports.login = (req, res) => {
  let data = req.body
  User.findOne({name:data.name}).then((user, err) => {
    if (!user) {
      let user = new User()
      user.name = data.name
      user.save((err,user) => {
        if (err) return res.sendStatus(503)
        req.session.user = user
        return res.json(user)
      })
    } else {
      req.session.user = user
      return res.json(user)
    }
  })
}

module.exports.getUser = (req,res) => {
    let user = req.session.user
    if (!user) return res.sendStatus(404)
    return res.json(user)
}

module.exports.logout = (req,res) => {
    req.session.destroy((err) => {
      if(err) return res.sendStatus(503)
      return res.sendStatus(200)
    })
}
