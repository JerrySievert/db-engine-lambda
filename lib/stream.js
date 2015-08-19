var Readable = require('stream').Readable;
var util = require('util');

util.inherits(LambdaStream, Readable);

function LambdaStream (options) {
  // make sure to set to objectMode, this allows for key/value as objects
  options.objectMode = true;

  // inherit from Readable
  Readable.call(this, options);

  // set up the event emitter
  this._emitter = options.emitter;

  var self = this;

  this._emitter.on('message', function (message) {
    var obj;

    if (typeof obj === 'object') {
      if (obj.type === 'end') {
        self.push(null);
      } else {
        self.push(obj);
      }
    } else {
      try {
        obj = JSON.parse(message);
        if (obj.type === 'end') {
          self.push(null);
        } else {
          self.push(obj);
        }
      } catch (err) {
        console.log(err);
      }
    }
  });
}

LambdaStream.prototype._read = function ( ) { };

module.exports = exports = LambdaStream;
