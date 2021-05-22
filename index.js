// Written by 0xJacoby [2021-05-22]

// deps
const fetch = require("node-fetch");

class HTTPHeartbeat {
    constructor(url, logging = false) {
        this.url = url;
        this.logging = logging;
    }

    /* Sends a GET request to the specified url */
    ping = async () => {
        await fetch(this.url)
            .then((res) => {
                if (this.logging) this.logInfo(`INFO: Pinged status monitor`);
            })
            .catch((err) => {
                this.logInfo(`ERROR: "${err}"`);
            });
    };

    /* Logs information to the console, formatted with the current UTC time */
    logInfo(infoText) {
        let d = new Date();
        let timeStr = `${('0' + d.getUTCHours()).slice(-2)}:${('0' + d.getUTCMinutes()).slice(-2)}`;
        console.log(`[UTC ${timeStr}] ${infoText}`);
    }

    /* Calls the ping method every specified delay (defaulted to 1 min) */
    startInterval(delay = 60000) {
        if (!this.interval) {
            this.ping();
            this.interval = setInterval(this.ping, delay);

            this.logInfo("INFO: The heartbeat function started");
        } else {
            this.logInfo("ERROR: A heartbeat function is already running");
        }
    }

    /* Stops the heartbeat interval */
    stopInterval() {
        clearInterval(this.interval);
        this.interval = null;
    }
}

module.exports = HTTPHeartbeat;
