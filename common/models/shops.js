/* eslint-disable */
'use strict';

module.exports = function(Shops) {
  Shops.search = function(keyword, callback) {
    Shops.find({
      where: {
        name: {
          like: `%${keyword || ''}%`
        }
      }
    }, function(err, instance) {
      return callback(err, instance);
    });
  };

  Shops.remoteMethod(
    'search',
    {
      http: {
        path: '/search',
        verb: 'get',
      },
      accepts: {
        arg: 'keyword',
        type: 'string',
        required: false,
        http: {
          source: 'query'
        }
      },
      returns: {
        arg: 'data',
        type: 'array'
      }
    }
  )
};
