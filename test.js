var util = require('util')
  , jjw = require('./jjw')

// you can pass an object -- will return an object with the results matching these keys
var scrapers = {
  scripts: function($) {
    var arr = [], src
    $('script').each(function() {
      src = $(this).attr('src')
      if (src) arr.push(src)
    })
    return arr
  }
, thumbs: function($) {
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

jjw('http://www.flickr.com/search/?q=homer+simpson', scrapers, function(err, res) {
  if (err) throw err
  console.log(res)
})

// pass an array of functions -- returns an array of results
jjw('http://www.flickr.com/search/?q=homer+simpson'

, [ function($) {
      var arr = [], src
      $('script').each(function() {
        src = $(this).attr('src')
        if (src) arr.push(src)
      })
      return arr
    }
  , function($) {
      var arr = []
      $('.pc_img').each(function() {
        arr.push($(this).attr('src'))
      })
      return arr
    }
  , function($) {
      return $('.Results').text()
    }
  ]
  
, function(err, res) {
  if (err) throw err
  console.log(res)
})

// or pass many functions as arguments -- returns an array of results
jjw('http://www.flickr.com/search/?q=homer+simpson'

, function($) {
    var arr = [], src
    $('script').each(function() {
      src = $(this).attr('src')
      if (src) arr.push(src)
    })
    return arr
  }
, function($) {
    var arr = []
    $('.pc_img').each(function() {
      arr.push($(this).attr('src'))
    })
    return arr
  }
, function($) {
    return $('.Results').text()

  }

, function(err, res) {
    if (err) throw err
    console.log(res)
})

// give it a body string -- one function will return just the result
jjw('<div class="so">cool</div>', function($) { return $('.so').text() }, function(err, res) {
  if (err) throw err
  console.log(res)
})
