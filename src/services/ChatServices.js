import Api from '@/services/Api'

export default {
  signup (params) {
    return Api().post('signup', params)
  },
  login (params) {
    return Api().post('login', params);
  },
  user () {
    return Api().get('user');
  },
  logout () {
    return Api().post('logout');
  },
  getMessages (option, param) {
    return Api().get(`messages/${option}/${param}`);
  },
  updateMessage (params) {
    return Api().post(`message/update`, params);
  },
  removeMessage (id) {
    return Api().get(`message/delete/${id}`);
  },
  getMessagesPerLanguage (lang) {
    return Api().get(`messages/perlanguage/${lang}`);
  },
  getAllMessages () {
    return Api().get(`messages`);
  },
  addMessage (params) {
    return Api().post('message', params);
  },
  getHistorial (user, to) {
    return Api().get('historial/' + user+'/'+ to);
  }
}
