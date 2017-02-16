var connectionFactory = require('./connection-factory');
var mssql = require('mssql');

var vacation = require('./data-repository/vacation');

module.exports = function (config) {
    return {
        vacation: vacation
    }
}
