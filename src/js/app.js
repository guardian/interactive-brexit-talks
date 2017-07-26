import req from 'browser-request'
import config from '../../config.json'

function maketopicarray(quotes, topics) {

    topics.forEach(function (t) {
        t.rows = quotes.filter(function (r) {
            return r.topic == t.name;
        })
    })
    return topics;
}

function updateRecentMessages(lastvisit) {
    var today = new Date();
    var lastvisitdate = new Date(lastvisit);

    // update message counters
    var counters = [].slice.apply(document.querySelectorAll('.gv-counter'));
    req(config.docDataJson, function (err, response, body) {
        body = JSON.parse(body);
        body.sheets.quotes.map(function (q) {
            var quotedate = new Date(q.datetime);
            if (quotedate.getFullYear() >= lastvisitdate.getFullYear() && quotedate.getMonth() >= lastvisitdate.getMonth() && quotedate.getDate() >= lastvisitdate.getDate()) {
                q.new = true;
            }
        })

        var topics = maketopicarray(body.sheets.quotes, body.sheets.topics);
        topics.forEach(function (t) {
            t.new = t.rows.filter(function (r) { return r.new == true }).length;
            var thistopiccounter = counters.find(function (c) {
                return c.classList.contains(`gv-topic-${t.name}`);
            })
            console.log(thistopiccounter);
            if (t.new == 0) {
                thistopiccounter.classList.add('gv-hide')
            } else {
                thistopiccounter.classList.remove('gv-hide');
                thistopiccounter.innerHTML = t.new;
            }

            //figure out how many messages are new
        })
    })


    // update lastvisit (but only if the number of days is greater than one)
    if (today.toDateString() == lastvisitdate.toDateString()) {
        console.log('last visit today; doing nothing')
    } else {
        localStorage.setItem('gv-last-visit', today)

    }
}


if (typeof (Storage) !== "undefined") {
    var lastvisit = localStorage.getItem('gv-last-visit');
    if (lastvisit) {
        //    updateRecentMessages('Thu 6 Jul 2017');
        updateRecentMessages(lastvisit);
    } else {
        console.log('setting last visit')
        localStorage.setItem('gv-last-visit', new Date())
    };
} else {
    console.log('no web storage');
    // Sorry! No Web Storage support..
}
