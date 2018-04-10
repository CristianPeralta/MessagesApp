var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var messageController = require('../controllers/messageController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/login', userController.login);
router.post('/logout', userController.logout);

router.get('/user', userController.getUser);

router.get('/messages/sent/:user', messageController.getSent);
router.get('/messages/received/:user', messageController.getReceived);
router.get('/messages/perlanguage/:lang', messageController.getPerLanguage);

router.get('/messages', messageController.getAll);

router.post('/message', messageController.create);
router.post('/message/update', messageController.update);
router.get('/message/delete/:id', messageController.delete);
router.get('/historial/:from/:to', messageController.getHistorial);

module.exports = router;
