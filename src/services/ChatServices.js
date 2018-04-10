import Api from '@/services/Api'

export default {
  signup (params) {
    return Api().post('signup', params)
  },
  login (params) {
    return Api().post('login', params);
  },
  user () {
    return Api().get('api/v1/user');
  },
  logout () {
    return Api().post('api/v1/logout');
  },
  getMessages (option, param) {
    return Api().get(`api/v1/messages/${option}/${param}`);
  },
  updateMessage (params) {
    return Api().put(`api/v1/messages`, params);
  },
  removeMessage (id) {
    return Api().delete(`api/v1/messages/${id}`);
  },
  getMessagesPerLanguage (lang) {
    return Api().get(`api/v1/messages/perlanguage/${lang}`);
  },
  getAllMessages () {
    return Api().get(`api/v1/messages`);
  },
  addMessage (params) {
    return Api().post('api/v1/messages', params);
  },
  getHistorial (user, to) {
    return Api().get('api/v1/messages/historial/' + user+'/'+ to);
  }
}
