const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const bodyParser = require('body-parser');
const Mercury = require("@postlight/mercury-parser");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => res.send('it is working!'));

app.post('/mercury', (req, res) => {
    const url = req.body.url;
    Mercury.parse(url).then(result => res.send(result));
})

app.get('/getdata', (req, res) => {
    async function getData() {
        let articlesArray = []
        await fetch('https://flipboard.com/@raimoseero/feed-nii8kd0sz.rss')
            .then(res => res.text())
            .then(res => {
                const itemsArray = res.match(/<item>(.|\n)*?<\/item>/g);  // Using Regex to get fetched items in array
                itemsArray.forEach(item => {
                    const obj = this.createObj(item);
                    articlesArray.push(obj)
                })
            })

        await res.send(articlesArray)
    }

    createObj = item => {
        let obj = {
            "image": (item.match(/<media:content/g)) ? item.match(/(?<=(url="))(.*?)(?=("))/g)[0] : null,
            "link": item.match(/(?<=(<link>))(.*?)(?=(<\/link>))/g)[0],
            "pubDate": item.match(/(?<=(<pubDate>))(.*?)(?=(<\/pubDate>))/g)[0],
            "title": item.match(/(?<=(<title>))(.*?)(?=(<\/title>))/g)[0],
            "description": item.match(/(?<=(<description>))(.*?)(?=(<\/description>))/g)[0],
        }

        if (item.match(/<author>/g)) obj.author = item.match(/(?<=(<author>))(.*?)(?=(<\/author>))/g)[0]

        return obj;
    }

    getData()
})

app.listen(process.env.PORT || 3001, () => {
    console.log(`listening port ${process.env.PORT || 3001}`);
})