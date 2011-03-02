var Worker = require('worker').Worker

module.exports = function() {
  var args = Array.prototype.slice.call(arguments)
    , body = args.shift()
    , cb = args.pop()
    , actions
    , keys
    
  var w = new Worker(__dirname + '/worker.js')

  if (Array.isArray(args[0])) actions = args[0].map(function(item) { return item.toString() })
  else {
    if (typeof args[0] === 'object') {
      actions = []
      keys = Object.keys(args[0])
      keys.forEach(function(key) {
        actions.push(args[0][key].toString())
      })
    } else actions = args.map(function(item) { return item.toString() })
  }
  
  var results = []
    , counter = actions.length

  w.onmessage = function(msg) {
    results.push(msg)
    if (!--counter) {
      w.terminate()
      if (keys) {
        var ret = {}
        for (var i = 0, len = keys.length; i < len; i++) {
          ret[keys[i]] = results[i]
        }
        results = ret
      } else if (results.length === 1) results = results[0]
      cb(null, results)
    }
  }

  w.onerror = function(err) {
    w.terminate()
    cb(err)
  }

  w.postMessage({ 
    body: body
  , actions: actions
  })
}
