/* eslint-disable */

'use strict'

const async = require('async');
const server = require('../server/server');
const p = require('../package.json');
const lbTables = [
  'shops'
];

const mysqlDS = server.dataSources.mydb;
mysqlDS.setMaxListeners(0);

function autoUpdateMysql(callback) {
  mysqlDS.autoupdate(lbTables, function(err) {
    if (err) {
      return callback(err)
    }
    console.log(`Auto update all tables [${lbTables}] from ${mysqlDS.adapter.name}`);
    return callback()
  })
}

const afterAutoupdates = [{
  file: './00-backend-authorized-users.js',
  version: null
}];

server.on('booted', function() {
  autoUpdateMysql(function(err) {
    if (err) {
      throw err
    }
    //   async.eachSeries(afterAutoupdates, (item, next) => {
    //     if (p.version !== item.version && item.version !== null) {
    //       return next()
    //     }
    //     require(item.file)(server, next)
    //   }, (err) => {
    //     if (err) {
    //       throw err
    //     }
    console.log('Auto update successfully!');
    process.exit(0)
    //   })
  })
});
