import User from '../models/User'
import Message from '../models/Message'
import request from 'request'
import axios from 'axios'

import mongoose from "mongoose"
import moment from 'moment'

module.exports.create = (req, res) => {
  let data = req.body
  let message = new Message()
  User.findOne({_id:data.to}).then((user, err) => {
    if (err) return res.sendStatus(503)
    let max = Number(global.maxMessages)
    Message.find({from: data.from}).sort('-1').limit(max).then((messages, err) => {
      if (err) return res.sendStatus(503)
      let lastmax = moment()
      if (messages[0]) {
        lastmax = messages[0].createdAt
      }

      let difference = moment.duration(moment(lastmax).fromNow());
      let diffHours = difference.asHours();

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
        return res.sendStatus(429)
      }
    })
  })
}

module.exports.createSocket = (data, cb) => {
  let message = new Message()
  User.findOne({_id:data.to.user}).then((user, err) => {
    if (err) return cb(user, err)
    if (!user) return cb(user, err)

    message.to = user._id
    message.from = data.from
    message.contents = data.contents
    message.lang = data.lang
    message.open = false

    message.save((err, message) => {
      if (err) cb(message, err)
      Message.findOne({_id:message._id}).populate('to').populate('from').then((message, err) => {
        return cb(message, err)
      });
    });
  })
}

module.exports.getAll = (req, res) => {
  Message.find({}).populate('to').populate('from').then((messages, err) => {
      if (err) res.sendStatus(500)
      if (!messages) res.sendStatus(404)
      return res.json(messages)
    })
}

module.exports.getSent = (req, res) => {
  let id = req.params.user
  Message.find({from:id}).populate('to').populate('from').then((messages, err) => {
      if (err) res.sendStatus(500)
      if (!messages) res.sendStatus(404)
      return res.json(messages)
    })
}

module.exports.getReceived = (req, res) => {
  let id = req.params.user
  Message.find({to:id}).populate('to').populate('from').then((messages, err) => {
      if (err) res.sendStatus(500)
      if (!messages) res.sendStatus(404)
      return res.json(messages)
    })
}

module.exports.getPerLanguage = (req, res) => {
  let lang = req.params.lang
  Message.find({lang:lang}).populate('to').populate('from').then((messages, err) => {
      if (err) res.sendStatus(500)
      if (!messages) res.sendStatus(404)
      return res.json(messages)
    })
}

module.exports.translate = (req, res) => {
  let id = req.params.id
  let lang = req.params.lang

  let apiKey = 'trnsl.1.1.20180410T094731Z.0698c61561dd9800.c3f8882f3dd2b9a2d1a290dfc0f204de666a8a44'

  Message.findOne({_id:id}).then((message, err) => {
    if(err) return res.sendStatus(503)
    if (!message) res.sendStatus(404)

    let url = 'https://translate.yandex.net/api/v1.5/tr.json/'

    axios.get(url + 'translate', {
      params: {
        lang: lang,
        text: message.contents,
        format: 'plain',
        key: apiKey
      }
    }).then((response) => {
      return res.json(response.data)
    })
  })
}

module.exports.update = (req, res) => {
  let data = req.body
  let id = data._id
  delete data._id

  data.from = mongoose.Types.ObjectId(data.from)
  data.to = mongoose.Types.ObjectId(data.to)

  Message.findOneAndUpdate({_id: id}, data, {new: true}, (err, message) => {
    if (err) return res.sendStatus(503)
    if (!message) res.sendStatus(404)
    Message.findOne({_id:message._id}).populate('to').populate('from').then((message, err) => {
        if (err) res.sendStatus(500)
        if (!message) res.sendStatus(404)
        return res.json(message)
      })
  })
}

module.exports.delete = (req, res) => {
  let id = req.params.id
  Message.findOne({_id: id}).then((message, err) => {
    if (err) res.sendStatus(500)
    if (!message) res.sendStatus(404)
    message.remove((err) => {
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
      if (!messages) res.sendStatus(404)
      return res.json(messages)
    })
}
