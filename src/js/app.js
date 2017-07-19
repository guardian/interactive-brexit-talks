import twemoji from 'twemoji'
//import req from 'browser-request'
//import xmlparse from 'xml-parser'

/*
req("https://www.theguardian.com/politics/eu-referendum/rss", function(err,response,body)
{
    if (err || window.location.match("")) 
var obj = xmlparse(body);
console.log(obj.root.children[0].children.filter(function(c){return c.name == "item"}))
})
*/

var quotes = Array.from(document.querySelectorAll('.gv-quote'));

//spurious change

// emojiSupported function borrowed from here: https://codepen.io/nicknish/pen/jWzMZG
var emojiSupported = (function() { 
  var node = document.createElement('canvas');
  if (!node.getContext || !node.getContext('2d') ||
      typeof node.getContext('2d').fillText !== 'function')
    return false;
  var ctx = node.getContext('2d');
  ctx.textBaseline = 'top';
  ctx.font = '32px Arial';
  ctx.fillText('\ud83d\ude03', 0, 0);
  return ctx.getImageData(16, 16, 1, 1).data[0] !== 0;
})();

if (!emojiSupported) {
    quotes.map(function(q){
        q.innerHTML = twemoji.parse(q.innerHTML);
        console.log('replacing emoji with pix');
    })
}  else {console.log('emoji supported')}

