# NodeJS-HTTP-Heartbeat
A small NodeJS library that helps you send get requests to the status monitor for Requiem.

### Table of contents:
* [Getting Started](#getting-started)
    * [Installation](#installation)
* [Example Usage](#example-usage)
    * [Example with discord.js](#example-of-usage-with-discord.js)
* [Documentation](#documentation)
    * [ping()](#.ping(-[logging]-))
    * [startInterval()](#.startInterval(-[delay]-))
    * [stopInterval()](#.stopInterval())
    * [url](#.url)
    * [interval](#.interval)


## Getting Started

### Installation:
```bash
npm install https://github.com/requiem-community/NodeJS-HTTP-Heartbeat
```

Dependencies:
* node-fetch (^2.6.1)

## Example Usage
#### Example of usage with discord.js:
```javascript
const HTTPHeartbeat = require("requiem-http-heartbeat");

const heartbeat = new HTTPHeartbeat("https://www.custom-url.com/api/heartbeat");

// EXAMPLE 1

client.on("ready", async() => {
    heartbeat.startHeartbeat();
});

// EXAMPLE 2 (with custom clock function)

client.on("ready", async() => {
    setInterval(clock, 60000);
});

const clock = async() => {
    heartbeat.ping();
}
```

## Documentation

### .ping( \[logging] )
Type: `function`

Arguments:
* ```logging``` **boolean** (Defaults to false)

Manually pings to specified URL. If ```logging``` is true it will be logged to the console.

### .startInterval( \[delay] )
Type: `function`

Arguments:
* ```delay``` **number** (Declared in milliseconds and defaults to 1 minute)

Starts an async background function that pings the specified URL every specified delay.

### .stopInterval()
Type: `function`

Stops the current interval function if one has been started.

### .url
Type: `string`

Returns the specified url that the functions pings.

### .interval
Type: `boolean`

Returns true if there currently is an interval function running. Otherwise it returns false.

