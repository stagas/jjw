var jjw = require('./jjw')

// error handling

jjw('<base href="http://www.google.com"><div class=".so">not cool</div>', function($) { return $('.so').text() }, function(err, res) {
  if (err) throw err
  console.log(res)
})
