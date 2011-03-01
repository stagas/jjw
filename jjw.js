var Worker = require('worker').Worker

module.exports = function() {
  var args = Array.prototype.slice.call(arguments)
    , body = args.shift()
    , cb = args.pop()
    , actions
    
  var w = new Worker(__dirname + '/worker.js')
  
  if (args.length === 1) {
    if (Array.isArray(args[0])) actions = args[0]
    else actions = [ args[0] ]
  } else actions = args

  var results = []
    , counter = actions.length

  w.onmessage = function(msg) {
    results.push(msg)
    if (!--counter) {
      w.terminate()
      if (results.length === 1) results = results[0]
      cb(null, results)
    }
  }

  w.onerror = function(err) {
    w.terminate()
    cb(err)
  }
  
  w.postMessage({ body: body, actions: actions.map(function(item) { return item.toString() }) })
}
