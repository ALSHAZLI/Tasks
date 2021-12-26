const express = require ('express');

const app = express();
var axios = require('axios');

app.get('/', (req, res) => {

// get city name by lat and long in arabic language

var config1 = {
    method: 'get',
    url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=15.59040388313972,32.54970895180953&language=ar&key=AIzaSyCfM-A7MhbvNM3h99uqRl_E-jouII9SJGA',
    headers: { }
  };

  axios(config1)

  .then( async function (response) {
      const task2 = await JSON.stringify(response.data.results[0].address_components[1].short_name);
      console.log(task2);
      res.send(`City Name From Lat And Long ${task2}`);
    })
    .catch(function (error) {
      console.log(error);
    }); 
  })

  app.get('/task', (req, res) => {

    // get city name by lat and long in arabic language
    
    var config = {
        method: 'get',  
        url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=15.59040388313972,32.54970895180953&language=ar&radius=1500&type=store,cafe&keyword=cruise&key=AIzaSyCfM-A7MhbvNM3h99uqRl_E-jouII9SJGA',
        headers: { }
      };
    
      axios(config)
    
   
.then( async function (response) {
    const task3 = await JSON.stringify(response.data.results[0].name);
    console.log(task3);
    res.send(`the nearby place of the same lat and long in get city name ${task3}`);
  })
  .catch(function (error) {
    console.log(error);
  });
        }); 
      


app.listen((process.env.PORT|| 5000), ()=>{
    console.log('Backend server running on port 5000')
});
