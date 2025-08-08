const fetchFromAsanaAPI = (api, parameters) => {
  let options = {
    "method" : "get",
    "headers":{"Accept": "application/json",
              "Authorization": "Bearer YOUR_ASANA_ACCESS_TOKEN",
              },

  }
  let response = UrlFetchApp.fetch("https://app.asana.com/api/1.0/"+api+parameters, options);
  response = JSON.parse(response.getContentText());

  return response;
}