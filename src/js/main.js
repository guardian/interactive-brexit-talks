import shares from './share'

let shareFn = shares('Where are we up to in these Brexit talks?', 'https://gu.com/p/6mgzm?CMP=share_btn_tw', '');


var isScrolling;
window.addEventListener('scroll', function ( event ) {
    window.clearTimeout( isScrolling );
    isScrolling = setTimeout(function() {
        var h2s = [].slice.apply(document.querySelectorAll('h2'))
        h2s.forEach(function(h){
            var position = h.getBoundingClientRect();
            var sectionnumber = h2s.indexOf(h) + 1;
            if (position.top > 0 && position.top < window.innerHeight && window.ga){
                window.ga('create', 'UA-78705427-1', 'auto');
                window.ga('set', 'dimension3', 'theguardian.com' );
                window.ga("send", "event", "interactives", "sectiondepth", `section ${sectionnumber} of ${h2s.length}`);
            }
        })

    }, 66);

}, false);


function expand(button,topic) {
               if (window.ga) {
        window.ga('create', 'UA-78705427-1', 'auto');
        window.ga('set', 'dimension3', 'theguardian.com' );
        window.ga("send", "event", "interactives", "expand", `expand topic ${topic}`);
        }

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
