import axios from 'axios'
import mustache from 'mustache'
import templateHTML from "./src/templates/embed.html!text"
import fs from 'fs'
import mkdirp from 'mkdirp'

function getcss () {
    if (fs.existsSync('./.build/embed.css')) {
        var css = fs.readFileSync('./.build/embed.css','utf8');
        return css;
    } else {
        console.log('waiting')
        setTimeout(getcss,5000)
    }
}

export async function renderEmbeds(chat,embeds) {
    console.log('doing embeds')
    await mkdirp.sync('./.build/embed');
    var embedcss = await getcss; 

    for (var embedi in embeds) {
        var embed = embeds[embedi];
        embed.chats = chat.filter(function(c){
        })
        fs.writeFileSync(`./.build/embed/${(egembed.url).replace(" ","-")}.html`,mustache.render(templateHTML,{embedcss,embed}),{flag: 'w'});
    }
    return '';

}