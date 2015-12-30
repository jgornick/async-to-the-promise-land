'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = every;

var _tryFn = require('./tryFn');

var _tryFn2 = _interopRequireDefault(_tryFn);

var _promiseBreak = require('./promiseBreak');

var _promiseBreak2 = _interopRequireDefault(_promiseBreak);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function every(collection, predicate) {
    return Promise.all(collection.map(function (item, index, collection) {
        return (0, _tryFn2.default)(predicate, item, index, collection).then(function (result) {
            if (result === false) {
                return Promise.reject(new _promiseBreak2.default(false));
            }
            return result;
        });
    })).then(function () {
        return true;
    }).catch(function (error) {
        if (error instanceof _promiseBreak2.default) {
            return Promise.resolve(error.value);
        }
        throw error;
    });
};