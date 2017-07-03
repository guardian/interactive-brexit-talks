import mainTemplate from './src/templates/main.html!text'
import Mustache from 'mustache'
import rp from 'request-promise'
import config from '../config.json'

function maketopicarray (quotes,topics) {
    var topicnames = [];
    quotes.forEach(function(r){
        if (!topicnames.some(function(tn) {
            return tn == r.topic;
        })) {
        topicnames.push(r.topic);
        }
    });
    console.log(topicnames);
    var xtopics = [];
    topicnames.forEach(function (tn){
        xtopics.push({name: tn, rows: []})
    })
    xtopics.forEach(function (t){
        t.rows = quotes.filter(function(r){ return r.topic == t.name})
    })
    return xtopics;
}


export async function render() {
     var data = await rp({
         uri: config.docData,
         json: true
     });
     var quotes = data.sheets.quotes;
     var topics = data.sheets.topics;
     var renderdata = maketopicarray(quotes,topics);
     var html = Mustache.render(mainTemplate, renderdata);
     return html;
 }
