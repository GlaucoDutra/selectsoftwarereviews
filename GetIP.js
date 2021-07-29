/**
 * @brief send the request to the API and return the result in JSON
 * @param url, the url of the request
 * @return the result in JSON
 */
const fetch = require("node-fetch");
const {Connection, Request, TYPES} = require("tedious");

async function requestFromAPI(url){
    var Connection = require('tedious').Connection;
    var config = {
        server: 'selectsoftwarereviews.database.windows.net',  //update me
        authentication: {
            type: 'default',
            options: {
                userName: 'ssr', //update me
                password: 'SelS0ftRev'  //update me
            }
        },
        options: {
            // If you are on Microsoft Azure, you need encryption:
            encrypt: true,
            database: 'SSR'  //update me
        }
    };
    var connection = new Connection(config);
    connection.on('connect', function(err) {
        // If no error, then good to proceed.
        console.log("Connected");
        executeStatement1();
    });
    const result = await fetch(url);
    let data = await result.json();
    console.log(data);
    // extract IP data fields
    var IP = data["ip"];
    console.log ('IP = ' + IP);
    var current_url = data["as"]["domain"];
    console.log ('URL = ' + current_url);
    var ISP = data["isp"];
    console.log ('ISP = ' + ISP);
    var Proxy = data["proxy"]["proxy"].toString();
    console.log ('Proxy = ' + Proxy);
    var IP_City = data["location"]["city"];
    console.log ('City = ' + IP_City);
    var IP_Region = data["location"]["region"];
    console.log ('Region = ' + IP_Region);
    var IP_Country = data["location"]["country"];
    console.log ('Country = ' + IP_Country);
    var IP_LatLong = data["location"]["lat"] + "," + data["location"]["lng"];
    console.log ('Coordinates = ' + IP_LatLong);
    var IP_Postal = data["location"]["postalCode"];
    console.log ('Postal = ' + IP_Postal);
    var IP_Timezone = data["location"]["timezone"];
    console.log ('Timezone = ' + IP_Timezone);

    var config = {
        server: 'selectsoftwarereviews.database.windows.net',  //update me
        authentication: {
            type: 'default',
            options: {
                userName: 'ssr', //update me
                password: 'SelS0ftRev'  //update me
            }
        },
        options: {
            // If you are on Microsoft Azure, you need encryption:
            encrypt: true,
            database: 'SSR'  //update me
        }
    };

    var Request = require('tedious').Request
    var TYPES = require('tedious').TYPES;

    function executeStatement1() {
        request = new Request("INSERT INTO raw_imput (raw_ip, raw_current_url,raw_isp,raw_proxy,raw_ip_city,raw_ip_region,raw_ip_country,raw_ip_latlong,raw_ip_postal,raw_ip_timezone) VALUES (@raw_ip, @raw_current_url,@raw_isp,@raw_proxy,@raw_ip_city,@raw_ip_region,@raw_ip_country,@raw_ip_latlong,@raw_ip_postal,@raw_ip_timezone)", function(err) {
            if (err) {
                console.log(err);}
        });
        request.addParameter('raw_ip', TYPES.NVarChar, IP);
        request.addParameter('raw_current_url', TYPES.NVarChar, current_url);
        request.addParameter('raw_isp', TYPES.NVarChar, ISP);
        request.addParameter('raw_proxy', TYPES.NVarChar, Proxy);
        request.addParameter('raw_ip_city', TYPES.NVarChar, IP_City);
        request.addParameter('raw_ip_region', TYPES.NVarChar, IP_Region);
        request.addParameter('raw_ip_country', TYPES.NVarChar, IP_Country);
        request.addParameter('raw_ip_latlong', TYPES.NVarChar, IP_LatLong);
        request.addParameter('raw_ip_postal', TYPES.NVarChar, IP_Postal);
        request.addParameter('raw_ip_timezone', TYPES.NVarChar, IP_Timezone);
        request.on('row', function(columns) {
            columns.forEach(function(column) {
                if (column.value === null) {
                    console.log('NULL');
                } else {
                    console.log("Product id of inserted item is " + column.value);
                }
            });
        });

        // Close the connection after the final event emitted by the request, after the callback passes
        request.on("requestCompleted", function (rowCount, more) {
            connection.close();
        });
        connection.execSql(request);
    }

    var connection = new Connection(config);
    connection.on('connect', function(err) {
        // If no error, then good to proceed.
        console.log("Connected");
        executeStatement1();
    });

    connection.connect();

    if(data){
        return result;
    }
}

//usage :
const REQUEST = "https://geo.ipify.org/api/v1?apiKey=at_Lopib8LAAsXDwjxnOOLZinmg9N69w"
var ipData = requestFromAPI(REQUEST);





