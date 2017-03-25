'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (file, passphrase, header) {
  let blobKey;
  let metadata;

  return {
    write(data) {
      return _asyncToGenerator(function* () {
        if (metadata) {
          yield secoFile.write(file, data, { metadata, blobKey, overwrite: true, header });
        } else {
          const res = yield secoFile.write(file, data, { passphrase, overwrite: true, header });
          blobKey = res.blobKey;
          metadata = res.metadata;
        }
      })();
    },
    read() {
      return _asyncToGenerator(function* () {
        const res = yield secoFile.read(file, passphrase);
        blobKey = res.blobKey;
        metadata = res.metadata;
        return res.data;
      })();
    }
  };
};

var _secoFile = require('seco-file');

var secoFile = _interopRequireWildcard(_secoFile);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Not using ES6 class here to keep the passphrase private