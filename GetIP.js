//<script src="https://unpkg.com/axios/dist/axios.min.js"></script>

const axios = require('axios');

    const start = async function(){
    const res = axios.get('https://httpbin.org/get', { params: { answer: 42 } });

    res.constructor.name; // 'Object', means `res` is a POJO

    // `res.data` contains the parsed response body
    res.data; // { args: { answer: 42 }, ... }
    res.data instanceof Object;

    const data = await axios.get("https://geo.ipify.org/api/v1?apiKey=at_Lopib8LAAsXDwjxnOOLZinmg9N69w").then(res => res.data);
    var old = JSON.stringify(data).replace(/false/g, '"false"');
    var newdata = JSON.parse(old);
    //console.log(newdata)


    axios.post('https://prod-115.westus.logic.azure.com:443/workflows/abd1bb4029d74050948e5766f0db1c82/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ZOqbYw08A9q45QP9F1ASZmull9bIWaiqmnchWYa77qA', newdata)
    .then(res => {
        //console.log(`statusCode: ${res.status}`)
        //console.log(res)
    })
    .catch(error => {
        //console.error(error)
    })
    }

start()
