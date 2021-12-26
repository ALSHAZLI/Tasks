var axios = require('axios');
var config1 = {
    method: 'get',  
    url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=15.5798703%2C32.5681916&radius=10&type=restaurant&keyword=cruise&key=AIzaSyCfM-A7MhbvNM3h99uqRl_E-jouII9SJGA',
    headers: { }
  };

var config =  {
  method: 'get',
  url: 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Dora Bahri lounge, Khartoum&inputtype=textquery&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&key=AIzaSyCfM-A7MhbvNM3h99uqRl_E-jouII9SJGA',
  headers: { }
};
//.candidates[0].formatted_address.split(",")[1]
axios(config)

.then(async function  (response) {
    const task = await JSON.stringify(response.data.candidates[0].formatted_address.split(",")[0]);
    
  console.log(task);
})
.catch(function (error) {
  console.log(error);
});

axios(config1)

.then( async function (response) {
    const task2 = await JSON.stringify(response.data.results[0].name);
    console.log(task2);
  })
  .catch(function (error) {
    console.log(error);
  });
