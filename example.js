var util = require('util')
  , request = require('request')
  , jjw = require('./jjw')

var scrape = {
  thumbs: function($) {
    var arr = []
    $('.pc_img').each(function() {
      arr.push($(this).attr('src'))
    })
    return arr
  }
, results: function($) {
    return $('.Results').text()
  }  
}

request({ uri: 'http://www.flickr.com/search/?q=homer+simpson' }, function(err, res, body) {
  jjw(body, scrape.thumbs, scrape.results, function(err, res) {
    res.forEach(function(r) {
      console.log(r)
    })
  })
  util.print('no block\n')
})
util.print('look ma, ')
