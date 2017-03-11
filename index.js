'use strict';

const osmosis = require('osmosis');
const fs = require('fs');  
var savedData = [];  
osmosis  
   .get('http://apps.shopify.com/categories/sales')
   .find('.resourcescontent ul.app-card-grid')
   .follow('li a[href]')
   .find('.resourcescontent')
   .set({
       'appname': '.app-header__details h1',
       'email': '#AppInfo table tbody tr:nth-child(2) td > a'
    })
   .log(console.log)   // enable logging to see what is does.
   .data(function(data) {
      console.log(data);
      savedData.push(data);
   })

   .done(function() {
      fs.writeFile('data.json', JSON.stringify( savedData, null, 4), function(err) {
        if(err) console.error(err);
        else console.log('Data Saved to data.json file');
      })
   });