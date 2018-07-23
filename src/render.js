import mainTemplate from './src/templates/main.html!text'
import Mustache from 'mustache'
import rp from 'request-promise'
//import fetch from 'fetch'
import config from '../config.json'
import twemoji from 'twemoji'
//import fs from 'fs'
import xmlparse from 'xml-parser'
import {renderEmbeds} from './../src/renderembeds'

function maketopicarray (quotes,topics) {

    quotes.map(function(q){
        q.quote = twemoji.parse(q.quote);
    })  
    topics.forEach(function (t){
        t.rows = quotes.filter(function(r){
            return r.topic == t.name;
        })
        if (t.rows.length > 7) {
        t.rows.map(function(r){
            if (t.rows.indexOf(r) < (t.rows.length - 7)) {
                r.hideAtFirst = true;
                t.expanded = true;
            }
        })
        }
    })
    return topics;
}

async function getRelated() {
    var relateddata = await rp({
        uri: "http://content.guardianapis.com/politics/eu-referendum?api-key=m78parvnv6mansxscg6yg9s8&show-fields=trailText,thumbnail",
        json: true
    });
    var results = relateddata.response.results;
    results.map(function(r)
    {
        r.date = new Date(r.webPublicationDate);    
        r.datestring = r.date.toLocaleDateString('en-gb',{day: 'numeric', month: 'long', year: 'numeric'});
        r.datestring = r.datestring.replace(",","");
    })
    return results.splice(0,4);

}

export async function render() {

    let related = await getRelated();  
     var data = await rp({
         uri: config.docDataJson,
         json: true
     });
     var quotes = data.sheets.quotes;
     var topics = data.sheets.topics;
     var furniture = data.sheets.furniture;
     var embeds = data.sheets.embeds;
     var chat = maketopicarray(quotes,topics);
     //var xchat = twemoji.parse(chat);
     //console.log(xchat);
     var renderdata = {furniture,chat,related};
     await renderEmbeds(chat,embeds);

     //console.log(renderdata);
     var html = Mustache.render(mainTemplate, renderdata);
     var ehtml = twemoji.parse(html);
  //   console.log(ehtml);
     return html;
 }
