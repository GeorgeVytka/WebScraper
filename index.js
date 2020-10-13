
const axios = require('axios');
const cheerio = require('cheerio');
const page_url = 'https://en.wikipedia.org/wiki/List_of_states_and_territories_of_the_United_States';




async function getUSSates(){

    const {data} = await axios.get(page_url);

    

    //data is html and past into cheerio $
    const $ = cheerio.load(data);
   const table =  $('caption:contains("States of the United States of America")').parent();

   const states = [];
    table.find('tbody tr').slice(2).each((i, element) => {
       const $row = $(element);
       const state = {};

       state.name = $row.find('th a').first().text().trim();
      
       const labels = [
        'code', 
        'capital', 
        'largest',
        'reatification', 
        'population', 
        'total_area_miles',
        'total_area_km',
        'land_area_miles',
        'land_area_km' ,
        'water_area_miles',
        'water_area_km',
        'number_of_reps'];


        let offset = 0;
       $row.find('td').each((j, col) => {
           const $col = $(col);
          let value =  $col.text().trim();
          //replace any ,
          const numValue = Number(value.replace(/,/g, ''));

          if(!isNaN(numValue)){
              value = numValue;
          }
           if(j === 1 && $col.attr('colspan') === '2'){
            const label = labels[j];
            state[label] = value;
               offset = 1; 
           }
           const label = labels[j + offset];
           state[label] = value;
          
       });

     
       states.push(state);

       console.log(state);
   });

   
}

getUSSates();