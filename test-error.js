var jjw = require('./jjw')

// error handling

jjw('<base href="http://www.google.com"><div class=".so">not cool</div>', function($) { return $('.so').text() }, function(err, res) {
  if (err) console.log('ERROR:', err)
  else console.log(res)
})

jjw('<div class=".so">not cool</div>', function($) { throw new Error('Some kind of error') }, function(err, res) {
  if (err) console.log('ERROR:', err)
  else console.log(res)
})
