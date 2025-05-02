import * as fs from 'fs';
import * as path from 'path';
import moment from 'moment';
import ObjectID from 'bson-objectid';

/**
 * @class Log
 * @description This class is used to create a log file and add logs to it. All logs are 
 * stored in the root directory of the project in a file called hlogs.log. It's recommended to
 * add this file to .gitignore to avoid uploading it to the repository or rewriting it.
 */
export class Log {
    private log?: string
    private root_path: string = ""
    private filename: string = "hlogs.log"

    /**
     * @constructor
     * @description This constructor is used to create a log file and add logs to it. All logs are 
     * stored in the root directory of the project in a file called hlogs.log. It's recommended to
     * add this file to .gitignore to avoid uploading it to the repository or rewriting it.
     */
    constructor() {
        this.root_path = process.cwd();
        console.log(`Log file created in ${this.root_path}/${this.filename}`);
        if (!fs.existsSync(`${this.root_path}/${this.filename}`)) {
            fs.writeFileSync(`${this.root_path}/${this.filename}`, `[${moment().format('DD/MM/YYYY HH:mm:ss')}] - ${ObjectID()} - Log file created\n`);
        }
    }

    /**
     * @method add
     * @description This method is used to add a log to the log file.
     * @param {string} log - The log to be added.
     * @param {string} print - If true, the log will be printed to the console. The default value is true.
     * @returns A message indicating that the log was successfully registered.
     */
    add(log: any, print: boolean = true): string {
        if (typeof log !== 'string') {
            log = JSON.stringify(log);
        }
        let new_log = `[${moment().format('DD/MM/YYYY HH:mm:ss')}] - ${ObjectID()} - ${String(log)}\n`
        let log_data = fs.readFileSync(`${this.root_path}/${this.filename}`, 'utf8')
        let write_data = fs.writeFileSync(`${this.root_path}/${this.filename}`, log_data + new_log)
        if (print) {
            console.log(new_log)
        }
        return "Log successfully registered"
    }

    /**
     * @method find
     * @description This method is used to find a log in the log file.
     * @param {string} id - The id of the log to be found.
     * @returns The log found with time, date and message. If the log is
     * not found, it returns a message indicating that the log may not exist.
     */
    find(id: string): string {
        let log_data = fs.readFileSync(`${this.root_path}/${this.filename}`, 'utf8')
        let log_lines = log_data.split('\n')
        let log_found = log_lines.find(line => line.includes(id))
        if (log_found) {
            return log_found
        } else {
            return "Log not found or may not exist"
        }
    }
}