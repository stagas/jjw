var worker = require('worker').worker
  , jsdom = require('jsdom')

worker.onmessage = function(msg) {
  var window = jsdom.jsdom().createWindow()
    , actions = []
  msg.actions.forEach(function(action) {
    actions.push(eval('(' + action + ')'))
  })
  jsdom.jQueryify(window, __dirname + '/jquery.js', function(win, $) {
    $('body').html(msg.body)
    actions.forEach(function(action) {
      worker.postMessage(action($))
    })
  })
}
