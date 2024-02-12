const axios = require('axios');
require('dotenv').config();

const LEMON_SQUEEZY_ENDPOINT = 'https://api.lemonsqueezy.com/v1/';



const lemonSqueeztApiInstance = axios.create({
    baseURL: LEMON_SQUEEZY_ENDPOINT,
    headers: {
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
    Authorization: `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
    },
});

module.exports = {LEMON_SQUEEZY_ENDPOINT, lemonSqueeztApiInstance}