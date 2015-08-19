var tmp = require('tmp');
var fs = require('fs');
var cp = require('child-process');
var path = require('path');

function runLambdaStream (stream, code, callback) {
  var tmpobj = tmp.dirSync();
  fs.writeFileSync(tmpobj.name + path.sep + 'index.js', code, 'utf-8');

  var child = cp.fork('./harnessStream', [ tmpobj.name ]);

  child.on('message', function (m) {
    callback(null, m.result);
  });

  stream.on('data', function (data) {
    child.send(JSON.stringify(data));
  });

  stream.on('end', function ( ) {
    child.send(JSON.stringify({ end: true }));
  });
}

exports.runLambdaStream = runLambdaStream;
