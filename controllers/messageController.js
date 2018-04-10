var User = require('../models/User');
var Message = require('../models/Message');
var mongoose = require("mongoose");
const formidable = require("formidable");
const fs = require("fs-extra");
const path = require("path");
const randomstring = require("randomstring");
import moment from 'moment'

module.exports.create = (req, res) => {
  let data = req.body
  console.log(data);
  let message = new Message()
  User.findOne({_id:data.to}).then((user, err) => {
    if (err) return res.sendStatus(503)
    let max = Number(global.maxMessages)
    Message.find({from: data.from}).sort('-1').limit(max).then((messages, err) => {
      if (err) return res.sendStatus(503)
      console.log(messages);
      let lastmax = moment()
      if (messages[0]) {
        lastmax = messages[0].createdAt
      }

      let difference = moment.duration(moment(lastmax).fromNow());
      let diffHours = difference.asHours();
      console.log(diffHours);

      if (!((messages.length == max) && (diffHours < 1))) {
        if (user) {
          message.to = user._id
          message.from = data.from
          message.contents = data.contents
          message.lang = data.lang
          message.open = false

          message.save((err, message) => {
            if (err) return res.sendStatus(503)
            return res.json(message)
          })
        }
      } else {
        return res.sendStatus(429);
      }
    })
  })
}

module.exports.createSocket = function (data, cb) {
  let message = new Message();
  User.findOne({_id:data.to.user}).then( (user, err)=>{
    if (err) {
      return cb(user, err);
    }
    if (!user) {
      return cb(user, err);
    }
    message.to = user._id
    message.from = data.from
    message.contents = data.contents
    message.lang = data.lang
    message.open = false
    message.save(function (err, message) {
      if (err) cb(message, err);
      Message.findOne({_id:message._id}).populate('to').populate('from').then((message, err) => {
        return cb(message, err);
      });
    });
  })
}

module.exports.getAll = (req, res) => {
  Message.find({}).populate('to').populate('from').then((messages, err) => {
      if (err) res.sendStatus(500)
      return res.json(messages)
    })
}

module.exports.getSent = (req, res) => {
  let id = req.params.user
  console.log('messages sent')
  console.log(id);
  Message.find({from:id}).populate('to').populate('from').then((messages, err) => {
      if (err) res.sendStatus(500)
      console.log(messages);
      console.log('asdasdasd');
      return res.json(messages)
    })
}

module.exports.getReceived = (req, res) => {
  let id = req.params.user
  console.log('messages received')
  Message.find({to:id}).populate('to').populate('from').then((messages, err) => {
      if (err) res.sendStatus(500)
      return res.json(messages)
    })
}

module.exports.getPerLanguage = (req, res) => {
  let lang = req.params.lang
  Message.find({lang:lang}).populate('to').populate('from').then((messages, err) => {
      if (err) res.sendStatus(500)
      return res.json(messages)
    })
}

module.exports.update = (req, res) => {
  let data = req.body
  let id = data._id
  delete data._id

  data.from = mongoose.Types.ObjectId(data.from)
  data.to = mongoose.Types.ObjectId(data.to)

  Message.findOneAndUpdate({_id: id}, data, {new: true}, (err, message) => {
    if (err){
      console.log(err);
      return res.sendStatus(503)
    }
    Message.findOne({_id:message._id}).populate('to').populate('from').then((message, err) => {
        if (err) res.sendStatus(500)
        return res.json(message)
      })
  })
}

module.exports.delete = (req, res) => {
  let id = req.params.id
  Message.findOne({_id: id}).then((message, err) => {
    if (err) res.sendStatus(500)
    message.remove.then((err) => {
      if (err) res.sendStatus(500)
      return res.sendStatus(200)
    })
  })
}

module.exports.deleteAll = (req, res) => {
  Message.remove({}, (err, message) => {
    if (err) return res.sendStatus(503)
    return res.sendStatus(200)
  })
}

module.exports.getHistorial = (req,res)  => {
  let from = req.params.from
  let to = req.params.to

  Message.find({$or:[{from:from, to:to},{from:to, to:from}]}).populate('to').populate('from').then((messages, err) => {
      if (err) res.sendStatus(500)
      return res.json(messages)
    })
}

function getUserFrom(messages) {
  return new Promise ((resolve) => {
    let result = []
    messages.map((el) => {
      User.findOne({_id:el.from}).then ((user, err) => {
        if (err) console.log(err);
        console.log(el);
        console.log(user);
        result.push({
          message: el,
          user: user
        })
      })
    })
    console.log(result);
    resolve(result)
  })
}


module.exports.getReceveid = function (req,res) {
  let me = req.params.me

  Message.find({to:me}).then((messages, err) => {
      if (err) res.sendStatus(500)
      return res.json(messages)
    })
}

module.exports.delete = function (req,res) {

  Message.remove({}, function(err) {
      if (!err) {
        console.log(err);
      }
      console.log(
        'deleted'
      );
      res.json('deleted')
  });
}
