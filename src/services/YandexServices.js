import ApiYandex from '@/services/ApiYandex'
let apiKey = 'trnsl.1.1.20180410T094731Z.0698c61561dd9800.c3f8882f3dd2b9a2d1a290dfc0f204de666a8a44'

export default {
  translate (text, lang) {
    return ApiYandex().get('translate', {
      params: {
        lang: lang,
        text: text,
        format: 'plain',
        key: apiKey
      },
      headers: {
        'Accept': '*',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  },
  getLangs () {
    return ApiYandex().get('getLangs', {
      params: {
        ui: 'en',
        key: apiKey
      }
    })
  }
}
