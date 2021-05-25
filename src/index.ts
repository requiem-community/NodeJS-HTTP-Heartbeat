// Written by 0xJacoby [2021-05-22]

// deps
import fetch from "node-fetch";

// constants
const defaultDelay = 60000; // 1 minute

class HTTPHeartbeat {
    private _interval: any;
    private _logging: boolean;
    private _url: string;

    constructor(url: string, logging: boolean = false) {
        this._url = url;
        this._logging = logging;
    }

    /* public props */
    get url(): string {
        return this._url;
    }

    get interval(): boolean {
        return (this._interval) ? true : false;
    }

    /* Sends a GET request to the specified url */
    ping = async (logging = false) => {
        await fetch(this._url)
            .then(() => {
                if (logging || this._logging) this.logInfo("Pinged the status monitor");
            })
            .catch((err: any) => {
                this.logInfo(`ERROR: "${err}"`);
            });
    };

    /* Logs information to the console, formatted with the current UTC time */
    private logInfo(infoText: string) {
        let d = new Date();
        let timeStr = `${("0" + d.getUTCHours()).slice(-2)}:${("0" + d.getUTCMinutes()).slice(-2)}`;
        console.log(`[UTC ${timeStr}]: ${infoText}`);
    }

    /* Calls the ping method every specified delay (defaulted to 1 min) */
    startInterval(delay = defaultDelay) {
        if (!this._interval) {
            this.ping();
            this.logInfo("The heartbeat function started");

            this._interval = setInterval(this.ping, delay, this._logging);
        } else {
            this.logInfo("ERROR: A heartbeat function is already running");
        }
    }

    /* Stops the heartbeat interval */
    stopInterval() {
        clearInterval(this._interval);
        this._interval = null;
    }
}

export = HTTPHeartbeat;