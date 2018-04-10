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

router.get('/api/v1/user', userController.getUser);

router.get('/api/v1/messages', messageController.getAll);
router.post('/api/v1/messages', messageController.create);
router.put('/api/v1/messages', messageController.update);

router.get('/api/v1/messages/delete/:id', messageController.delete);
router.get('/api/v1/messages/sent/:user', messageController.getSent);
router.get('/api/v1/messages/received/:user', messageController.getReceived);
router.get('/api/v1/messages/perlanguage/:lang', messageController.getPerLanguage);
router.get('/api/v1/messages/:id/translate/:lang', messageController.translate);
router.get('/api/v1/messages/historial/:from/:to', messageController.getHistorial);

module.exports = router;
