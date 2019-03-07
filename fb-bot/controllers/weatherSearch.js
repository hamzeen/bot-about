const WEATHER_API_KEY = 'ed619813495f5cc9de15798c530d2358';
const GETTY_IMAGES_API_KEY = 'bgmp9xhx2gjwkfxwkfvxv4tw';

const request = require('request');

module.exports = (req, res) => {
    if (req.body.result.action === 'weather') {
      console.log('weather');
      let city = req.body.result.parameters['geo-city'];
      let restUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID='+WEATHER_API_KEY+'&q='+city;

    request.get(restUrl, (err, response, body) => {
      if (!err && response.statusCode == 200) {
        let json = JSON.parse(body);
        let msg = json.weather[0].description + ' and the temperature is ' + json.main.temp + ' ℉';
        return res.json({
          speech: msg,
          displayText: msg,
          source: 'weather'});
      } else {
        return res.status(400).json({
          status: {
            code: 400,
            errorType: 'I failed to look up the city name.'}});
      }});
    }

    if (req.body.result.action === 'image') {
      console.log('image: ' + req.body.result.parameters['image_name']);
      const imageName = req.body.result.parameters['image_name'];
        const apiUrl = 'https://api.gettyimages.com/v3/search/images?fields=id,title,thumb,referral_destinations&sort_order=best&phrase=' + imageName;

        request({
            uri: apiUrl,
            methos: 'GET',
            headers: {'Api-Key': GETTY_IMAGES_API_KEY}
        }, (err, response, body) => {
            const imageUri = JSON.parse(body).images[0].display_sizes[0].uri;

            return res.json({
                speech: imageUri,
                displayText: imageUri,
                source: 'image_name'
            });
        });
     }
}
