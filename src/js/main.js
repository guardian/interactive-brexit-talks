import shares from './share'

let shareFn = shares('Where are we up to in these Brexit talks?', 'https://gu.com/p/6mgzm?CMP=share_btn_tw', '');


function expand(button,topic) {
    var quotes = [].slice.apply(document.querySelectorAll('.gv-row-wrapper'));
    var expandenda = quotes.filter(function(q){
        return q.classList.contains(`gv-topic-${topic}`) && q.classList.contains('gv-hide');
    })
    expandenda.map(function(e){
        e.classList.remove('gv-hide');
        e.classList.add('gv-empty');
        setTimeout( () => {
            e.classList.remove('gv-empty');
            }, 0) ;
    })
    button.classList.add('gv-quick-empty');
}

[].slice.apply(document.querySelectorAll('.interactive-share')).forEach(shareEl => {
    var network = shareEl.getAttribute('data-network');
    shareEl.addEventListener('click', () => shareFn(network));
});

[].slice.apply(document.querySelectorAll('.gv-more-messages')).forEach(button => {
    var topic = button.getAttribute('data-topic');
    button.addEventListener('click', () => expand(button,topic));
});


var el = document.createElement('script');
el.src = '<%= path %>/app.js';
document.body.appendChild(el);
