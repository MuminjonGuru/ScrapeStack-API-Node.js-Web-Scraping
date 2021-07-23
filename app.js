const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const params = {
  access_key: '92d1e7e73a2785e60ed6951820d7f190',
  url: 'https://www.muminjon.com/projects-grid-cards.html'
}

axios.get('http://api.scrapestack.com/scrape', {params})
  .then(response => {
    let data = {};
    const websiteContent = response.data;
    const $ = cheerio.load(websiteContent);  // load the fetched data to cheerio

    // iterate card-class and get prjName from h6 heading element
    $('.card-body h6').each(function(i) {
        console.log('__ __________________ __');
        console.log($(this).text());
        data[i + "-Project Name"] = $(this).text();
        i += 1;
    });

    // now fetch project summary from paragraph element
    $('.card-body p').each(function(i) {
        console.log('__ __________________ __');
        console.log($(this).text());
        data[i + "-Project Summary"] = $(this).text();
        i += 1;
    });

    // write the data to result.json
    fs.writeFile('result.json', JSON.stringify(data), function(error) {
        if(error) throw error;
        console.log('Result File Created Successfully!');
    })
  }).catch(error => {
    console.log(error);
  });