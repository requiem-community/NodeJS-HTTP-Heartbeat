// Written by 0xJacoby [2021-05-22]

// deps
const fetch = require("node-fetch");

// constants
const defaultDelay = 60000; // 1 minute

class HTTPHeartbeat {
    #interval;
    #logging;
    #url;

    constructor(url, logging = false) {
        this.#url = url;
        this.#logging = logging;
    }

    /* public props */
    get url() {
        return this.#url;
    }

    get interval() {
        return (this.#interval) ? true : false;
    }

    /* Sends a GET request to the specified url */
    ping = async (logging = false) => {
        await fetch(this.url)
            .then(() => {
                if (logging) this.logInfo("Pinged status monitor");
            })
            .catch((err) => {
                this.logInfo(`ERROR: "${err}"`);
            });
    };

    /* Logs information to the console, formatted with the current UTC time */
    logInfo(infoText) {
        let d = new Date();
        let timeStr = `${("0" + d.getUTCHours()).slice(-2)}:${("0" + d.getUTCMinutes()).slice(-2)}`;
        console.log(`[UTC ${timeStr}]: ${infoText}`);
    }

    /* Calls the ping method every specified delay (defaulted to 1 min) */
    startInterval(delay = defaultDelay) {
        if (!this.#interval) {
            this.ping();
            this.logInfo("The heartbeat function started");

            this.#interval = setInterval(this.ping, delay, this.#logging);
        } else {
            this.logInfo("ERROR: A heartbeat function is already running");
        }
    }

    /* Stops the heartbeat interval */
    stopInterval() {
        clearInterval(this.#interval);
        this.#interval = null;
    }
}

module.exports = HTTPHeartbeat;
