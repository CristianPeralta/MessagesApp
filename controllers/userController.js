var mongoose = require("mongoose");
var User = require('../models/User');


module.exports.login = (req, res) => {
  let data = req.body
  User.findOne({name:data.name}).then((user, err) => {
    if (!user) {
      let user = new User()
      user.name = data.name
      user.save(function (err,user) {
        if (err) {
          console.log(err)
          return res.sendStatus(503)
        }
        console.log('New User');
        req.session.user = user
        return res.json(user)
      })
    } else {
      console.log('Old User');
      req.session.user = user
      return res.json(user)
    }
  })
}

module.exports.getUser = function (req,res) {
    let user = req.session.user;
    if (!user) {
      return res.json({});
    } else {
      return res.json(user)
    }
}

module.exports.logout= function (req,res) {
    req.session.destroy(function(err) {
      // cannot access session here
      if(err){
        console.log(err);
        return res.sendStatus(503)
      }
      return res.sendStatus(200);
    })
}
