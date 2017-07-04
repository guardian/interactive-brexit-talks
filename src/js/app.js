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
        console.log('b',b,'t',t);
        b.insideTop = b.classList.contains("gv-team-UK") ? `${b.offsetLeft} ${b.offsetTop}` : `${(b.offsetLeft + b.offsetWidth)} ${b.offsetTop}` 
        t.insideTop = t.classList.contains("gv-team-UK") ? `${t.offsetLeft} ${t.offsetTop}` : `${(t.offsetLeft + t.offsetWidth)} ${t.offsetTop}` 
        b.insideBottom = b.classList.contains("gv-team-UK") ? `${b.offsetLeft} ${(b.offsetTop + b.offsetHeight)}` : `${(b.offsetLeft + b.offsetWidth)} ${(b.offsetTop + b.offsetHeight)}` 
        t.insideBottom = t.classList.contains("gv-team-UK") ? `${t.offsetLeft} ${(t.offsetTop + t.offsetHeight)}` : `${(t.offsetLeft + t.offsetWidth)} ${(t.offsetTop + t.offsetHeight)}` 
        
        arrow.setAttribute("d", `M ${b.insideTop} L ${t.insideBottom}`);
        //console.log(b);
         //       console.log(arrow);
        svg.appendChild(arrow);
        svg.setAttribute("top", 0);
        outside.appendChild(svg);

    } else { console.log(b) }
})