import mainTemplate from './src/templates/main.html!text'
import Mustache from 'mustache'
import rp from 'request-promise'
import config from '../config.json'

function maketopicarray (quotes,topics) {
    console.log(quotes);
    topics.forEach(function (t){
        t.rows = quotes.filter(function(r){
            return r.topic == t.name;
        })
    })
    return topics;
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
