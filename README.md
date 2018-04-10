# MessageApp Documentation

* [Error handling](#error-handling)
* [Headers](#headers)
* [Request & Response Examples](#request--response-examples)

## Error handling

* 200 - OK
* 400 - Bad Request
* 404 - Not Found
* 429 - Too Many Request
* 500 - Internal Server Error

## Headers

  {
      'Content-Type': 'application/json'
  }

## Request & Response Examples

### GET /messages

Example: http://localhost:5000/api/v1/messages

Response body:
  {
      "createdAt": "2018-04-10T13:05:29.805Z",
      "_id": "5accb69940e7593154fb2d88",                                        __
      "to": {
          "createdAt": "2018-04-10T13:05:14.157Z",
          "_id": "5accb68a40e7593154fb2d87",                                    __
          "name": "Maria",
          "__v": 0                                                              ___      
      },
      "from": {
          "createdAt": "2018-04-10T13:04:56.811Z",
          "_id": "5accb67840e7593154fb2d86",                                    __
          "name": "Juan",
          "__v": 0                                                              ___      
      },
      "contents": "Hello Maria",
      "lang": "en",
      "open": "false",
      "__v": 0                                                                  ___
  }
  __



### POST /messages

Example: Create – POST  http://localhost:5000/api/v1/messages

Request body:

      {
          to: '5basjh7237by8dsb8ds',
          from: 'sdbsjdhbu287g8bsdfbjh',
          contents: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt',
          lang: 'en'
      }



### PUT /messages

Example: Update – PUT  http://localhost:5000/api/v1/messages

Request body:

      {
          _id: '5basjh7237by8sdfsddsb8ds',                                                    __
          to: '5basjh7237by8dsb8ds',
          from: 'sdbsjdhbu287g8bsdfbjh',
          contents: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt',
          lang: 'en'
      }



### DELETE /messages/:id

Example: http://localhost:5000/api/v1/messages/:id



### GET /messages/sent/:user

Example: http://localhost:5000/api/v1/messages/sent/:user

Response body:

  [
    {
        "createdAt": "2018-04-10T13:05:29.805Z",
        "_id": "5accb69940e7593154fb2d88",                                      __
        "to": {
            "createdAt": "2018-04-10T13:05:14.157Z",
            "_id": "5accb68a40e7593154fb2d87",                                  __
            "name": "Maria",
            "__v": 0                                                            ___
        },
        "from": {
            "createdAt": "2018-04-10T13:04:56.811Z",
            "_id": "5accb67840e7593154fb2d86",                                  __
            "name": "Juan",
            "__v": 0                                                            ___
        },
        "contents": "Hello Maria",
        "lang": "en",
        "open": "false",
        "__v": 0                                                                ____
    },
    {
      ...
    }
  ]
  __



### GET /messages/received/:user

Example: http://localhost:5000/api/v1/messages/received/:user

Response body:

    [
      {
          "createdAt": "2018-04-10T13:05:29.805Z",
          "_id": "5accb69940e7593154fb2d88",                                    __
          "to": {
              "createdAt": "2018-04-10T13:05:14.157Z",
              "_id": "5accb68a40e7593154fb2d87",                                __
              "name": "Maria",
              "__v": 0                                                          ___
          },
          "from": {
              "createdAt": "2018-04-10T13:04:56.811Z",
              "_id": "5accb67840e7593154fb2d86",                                __
              "name": "Juan",
              "__v": 0                                                          ___
          },
          "contents": "Hello Maria",
          "lang": "en",
          "open": "false",
          "__v": 0                                                              ___
      },
      {
        ...
      }
    ]
    __



### GET /messages/perlanguage/:lang

Example: http://localhost:5000/api/v1/messages/perlanguage/:lang

Response body:

  [
    {
        "createdAt": "2018-04-10T13:05:29.805Z",
        "_id": "5accb69940e7593154fb2d88",                                      __
        "to": {
            "createdAt": "2018-04-10T13:05:14.157Z",
            "_id": "5accb68a40e7593154fb2d87",                                  __
            "name": "Maria",
            "__v": 0                                                            ___
        },
        "from": {
            "createdAt": "2018-04-10T13:04:56.811Z",
            "_id": "5accb67840e7593154fb2d86",                                  __
            "name": "Juan",
            "__v": 0                                                            ___
        },
        "contents": "Hello Maria",                            
        "lang": "en",
        "open": "false",
        "__v": 0                                                                ___
    },
    {
      ...
    }
  ]
__



### GET /messages/historial/:from/:to

Example: http://localhost:5000/api/v1/messages/historial/:from/:to

Response body:

  [
    {
        "createdAt": "2018-04-10T13:05:29.805Z",
        "_id": "5accb69940e7593154fb2d88",                                      __
        "to": {
            "createdAt": "2018-04-10T13:05:14.157Z",
            "_id": "5accb68a40e7593154fb2d87",                                  __
            "name": "Maria",
            "__v": 0                                                            ___
        },
        "from": {
            "createdAt": "2018-04-10T13:04:56.811Z",
            "_id": "5accb67840e7593154fb2d86",                                  __
            "name": "Juan",
            "__v": 0                                                            ___
        },
        "contents": "Hello Maria",
        "lang": "en",
        "open": "false",
        "__v": 0                                                                ___
    },
    {
      ...
    }
  ]
  __


### GET /messages/:id/translate/:lang

Example: http://localhost:5000/api/v1/messages/:id/translate/:lang

Response body:

    {
        "createdAt": "2018-04-10T13:05:29.805Z",
        "_id": "5accb69940e7593154fb2d88",                                      __
        "to": {
            "createdAt": "2018-04-10T13:05:14.157Z",
            "_id": "5accb68a40e7593154fb2d87",                                  __
            "name": "Maria",
            "__v": 0                                                            ___
        },
        "from": {
            "createdAt": "2018-04-10T13:04:56.811Z",
            "_id": "5accb67840e7593154fb2d86",                                  __
            "name": "Juan",
            "__v": 0                                                            ___
        },
        "contents": "Hello Maria",
        "lang": "en",
        "open": "false",
        "__v": 0                                                                ___
    }
  __


## Commands

  * npm install
  * npm run watch
  * npm start
