var posix = require('posix');
var LambdaStream = require('./stream');

var directory = process.argv.pop();

posix.chroot(directory);

var lambda = require('./index');
var stream = new LambdaStream({ emitter: process });

if (lambda.streamHandler && typeof lambda.streamHandler === 'function') {
  lambda.streamHandler(stream, function (err, ret) {
    process.send(JSON.stringify({ error: false, result: ret }));
  });
} else {
  process.send(JSON.stringify({ error: true, result: 'unable to find streamHandler()' }));
}
