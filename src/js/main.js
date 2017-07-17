import shares from './share'

let shareFn = shares('Where are we up to in these Brexit talks', 'https://gu.com/p/6jmx8', '');

[].slice.apply(document.querySelectorAll('.interactive-share')).forEach(shareEl => {
    var network = shareEl.getAttribute('data-network');
    shareEl.addEventListener('click', () => shareFn(network));
});


var el = document.createElement('script');
el.src = '<%= path %>/app.js';
document.body.appendChild(el);
