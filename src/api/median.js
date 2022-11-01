var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/median-filter?username=hiba&old_img=flowers.jpg&new_img=f3344.jpg&filter_size=5',
  headers: {
    'Content-Type': 'application/json'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
