var vows = require('vows');
var assert = require('assert');
var EventEmitter = require('events').EventEmitter;
var LambdaStream = require('../lib/stream');


var stream;

vows.describe('Stream').addBatch({
  'A stream is created': {
    topic: function ( ) {
      stream = new LambdaStream({ emitter: new EventEmitter() });

      return stream;
    },
    'and a stream is returned': function (topic) {
      assert.equal(typeof topic, 'object');
    }
  },
  'A stream emits data': {
    topic: function ( ) {
      var cb = this.callback;

      stream.on('data', function (data) {
        cb(null, data);
      });

      stream._emitter.emit('message', '{ "foo": "bar" }');
    },
    'the correct data is emitted': function (data) {
      assert.equal(data.foo, "bar");
    }
  },
  'A stream emits end when there is no more data': {
    topic: function ( ) {
      var cb = this.callback;

      stream.on('end', cb);

      stream._emitter.emit('message', '{ "type": "end" }');
    },
    'and everything is a-ok': function ( ) {
      // nothing to see here
    }
  }
}).export(module);
