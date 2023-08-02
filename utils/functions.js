let moment = require('moment-timezone');
const fetch = require("node-fetch");
const crypto = require("crypto");
const https = require("https");

function getTimeStamp(timezone, formatS) {
    // Check if the timezone parameter is valid, if not set it to 'Europe/Istanbul'
    if (!moment.tz.zone(timezone)) {
        timezone = 'Europe/Istanbul';
    }

    // Get the current date and time in the specified timezone, and format it to ISO format
    // const datetime = moment().tz(timezone).format('YYYY-MM-DDTHH:mm:ssZ');
    const datetime = moment().tz(timezone).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

    // Return the formatted datetime
    return new Date(datetime);
}

// fetchSecure functions
async function fetchSecure(url, parse = true) {
    const httpsAgent = new https.Agent({
        // for self signed you could also add
        // rejectUnauthorized: false,
        // allow legacy server
        secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
    });
    const response = await fetch(
        url,
        {
            agent: httpsAgent,
        }
    );
    const body = await response.text();
    if (!parse) {
        return body;
    } else {
        return JSON.parse(body);
    }
}

// User login info structure
async function triedLoginInfoStruct(req) {
    const list = [];
    list.push({
      "getTimeStamp()": getTimeStamp(),
      "req.headers['x-forwarded-for']": req.headers["x-forwarded-for"],
      "req.socket.remoteAddress": req.socket.remoteAddress,
      "req.ips": req.ips,
      "req.ip": req.ip,
      "req.useragent": req.headers["user-agent"],
    });
    return list;
}

module.exports = { getTimeStamp, fetchSecure, triedLoginInfoStruct };
