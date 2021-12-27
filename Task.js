const express = require ('express');

const app = express();
const request = require("request")


function apiCall (reqOps) {
    return new Promise ( (resolve, reject) => {

        request(reqOps, (err, res, body) => {

            if(!err && res.statusCode == 200){
                resolve( JSON.parse(body) );                
            }

            reject(err);
        });

    });
}


// get city name by lat and long in arabic language

var configCity = {
    method: 'get',
    url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=15.59040388313972,32.54970895180953&language=ar&key=AIzaSyB09k6jqR4ncnhxQ_5DMl1JorQCPoi6IMw',
    headers: { }
  };
  var configNear = {
    method: 'get',  
    url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=15.69040388313972,32.64970895180953&language=ar&radius=50&key=AIzaSyB09k6jqR4ncnhxQ_5DMl1JorQCPoi6IMw',
    headers: { }
  };

  app.get("/", function(req, res){


    let dataCity, dataNear;
  
  apiCall(configCity)

//   apiCall(config1)

  .then( async function (response) {
      // get city name by lat and long in arabic language
      const task2 = await JSON.stringify(response.results[0].address_components[1].short_name);
      dataCity = task2;
      console.log(task2);
      return apiCall(configNear);
    })
    
.then( async function (response) {
    // get NearBy Place  for same lat long in arabic language
    const task3 = await JSON.stringify(response.results[0].name);
    console.log(task3);
    dataNear = task3;
    console.log(dataCity,dataNear);
    res.send(`${dataCity}, ${dataNear}`)
    
  })
  .catch(function (error) {
    console.log(error);
  });
        
      
  })

app.listen((process.env.PORT|| 5000), ()=>{
    console.log('Backend server running on port 5000')
});
