import shares from './share'

let shareFn = shares('Where are we up to in these Brexit talks?', 'https://gu.com/p/6mgzm?CMP=share_btn_tw', '');

[].slice.apply(document.querySelectorAll('.interactive-share')).forEach(shareEl => {
    var network = shareEl.getAttribute('data-network');
    shareEl.addEventListener('click', () => shareFn(network));
});

var el = document.createElement('script');
el.src = '<%= path %>/app.js';
document.body.appendChild(el);
