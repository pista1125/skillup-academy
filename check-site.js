import fs from 'fs';
fetch('https://diakzona.hu/')
    .then(r => r.text())
    .then(t => {
        const scripts = t.match(/<script.*?src=[\"'](.*?)[\"'].*?>/g);
        console.log("Script tags on live site:");
        console.log(scripts);
    })
    .catch(console.error);
