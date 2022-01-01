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
    url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=18.110826080251847,-15.952946587972686&language=ar&key=AIzaSyCtlLNJuEdOotatX1PBGiG7OoooEQ92RXU',
    headers: { }
  };
  var configNear = {
    method: 'get',  
    url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=18.110826080251847,-15.952946587972686&language=ar&radius=500&key=AIzaSyCtlLNJuEdOotatX1PBGiG7OoooEQ92RXU',
    headers: { }
  };

  app.get("/", function(req, res){


    let dataCity, dataNear, dataReigon, dataCountry;
  
  apiCall(configCity)
    .then( async function (response) {
        // get city name by lat and long in arabic language 
       
        for (var i=0; i<response.results[0].address_components.length; i++)
            {
               
                if(response.results[i].address_components[0].types[0] == "neighborhood"){
                        const   region = response.results[i].address_components[0].long_name;
                        console.log(region);
                        dataReigon = region;
                    }else if(dataReigon == undefined){
                        if(response.results[i].address_components[1].types[2] == "sublocality_level_1"){
                            const   region = response.results[i].address_components[1].long_name;
                            console.log(region);
                            dataReigon = region;
                        }
                    }
            }

        
        return apiCall(configNear);
    })
    .then( async function (response) {
        // get NearBy Place  for same lat long in arabic language
    
        for (let i = 0; i <= 10; ++i) {
            
            const task4 = await JSON.stringify(response.results[i].name);
            
            console.log(task4);
       
            dataNear = task4;
        }

   
    
        console.log(dataNear);
        console.log(dataReigon);
      // if you want the response as JSON
//         res.json(`${dataReigon},${dataNear}`);
       res.send(`${dataReigon},${dataNear}`);
        
    
    })
    .catch(function (error) {
        console.log(error);
    });
        
      
})

app.listen((process.env.PORT|| 5000), ()=>{
    console.log('Backend server running on port 5000')
});
