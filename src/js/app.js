import twemoji from 'twemoji'

var quotes = Array.from(document.querySelectorAll('.gv-quote'));

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
