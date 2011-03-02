var worker = require('worker').worker
  , jsdom = require('jsdom')

worker.onmessage = function(msg) {
  var actions = []
  msg.actions.forEach(function(action) {
    actions.push(eval('(' + action + ')'))
  })
  jsdom.env(msg.body, [ __dirname + '/jquery.js' ], function(err, window) {
    if (err) return worker.postMessage({ error: err[0] })
    try {
      var result
      actions.forEach(function(action) {
        result = action(window.jQuery)
        if (result == null) result = '' // == null catches null and undefined
        worker.postMessage(result)
      })
    } catch(e) {
      return worker.postMessage({ error: e })
    }
  })
}