var boxes = Array.from(document.querySelectorAll('.gv-quote-wrapper'));
var outside = document.querySelector('.gv-quotes');

console.log('gaziantep')

boxes.forEach(function (b) {
    if (b.dataset.prompt != undefined) {
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        var arrow = document.createElementNS("http://www.w3.org/2000/svg", "path");
        arrow.setAttribute("fill", "#000");
        arrow.setAttribute("stroke", "#000");  
        arrow.setAttribute("stroke-width", "10");  
        var t = boxes.find(function(bb){return bb.dataset.id == b.dataset.prompt});
        arrow.setAttribute("d", `M ${b.offsetLeft} ${b.offsetTop} L ${t.offsetLeft} ${t.offsetTop}`);
        console.log(arrow);
        svg.appendChild(arrow);
        svg.setAttribute("top", 0);
        outside.appendChild(svg);

    } else { console.log(b) }
})