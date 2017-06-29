import mainTemplate from './src/templates/main.html!text'
import Mustache from 'mustache'
import rp from 'request-promise'
import config from '../config.json'



function maketopicarray (data) {
    var topicnames = [];
    data.forEach(function(r){
        if (!topicnames.some(function(tn) {
            return tn == r.topic;
        })) {
        topicnames.push(r.topic);
        }
    });
    console.log(topicnames);
    var topics = [];
    topicnames.forEach(function (tn){
        topics.push({name: tn, rows: []})
    })
    topics.forEach(function (t){
        t.rows = data.filter(function(r){ return r.topic == t.name})
    })
    return topics;
}


export async function render() {
     var data = await rp({
         uri: config.docData,
         json: true
     });

     var sheets = data.sheets.Sheet1;
     console.log(sheets);
     data = maketopicarray(sheets);
     var html = Mustache.render(mainTemplate, data);
     return html;
 }
