const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const dns = require('dns');

const urls = {};

router.post('/', (req, res) => {
    const { url } = req.body;
    console.log(url)

    const parsedUrl = new URL(url)
    dns.lookup(parsedUrl.hostname, (err, success) => {
        if (err) {
            return res.json({ error: 'invalid url' });
        }
        const id = shortid.generate()
        urls[id] = url;
        res.json({ original_url: url, short_url: id })
    });
});

router.get('/:short_url', (req, res) => {
    const short_url = req.params.short_url;

    const url = urls[short_url];
    if (url) {
        res.redirect(url);
    }
    else {
        res.status(404);
    }
});
module.exports = router;