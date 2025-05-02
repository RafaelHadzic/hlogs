/**
 * @class Log
 * @description This class is used to create a log file and add logs to it. All logs are
 * stored in the root directory of the project in a file called hlogs.log. It's recommended to
 * add this file to .gitignore to avoid uploading it to the repository or rewriting it.
 */
export declare class Log {
    log?: string;
    private root_path;
    private filename;
    constructor();
    /**
     * @method add
     * @description This method is used to add a log to the log file.
     * @param {string} log - The log to be added.
     * @param {string} print - If true, the log will be printed to the console. The default value is true.
     * @returns {string} - A message indicating that the log was successfully registered.
     */
    add(log: any, print?: boolean): string;
    /**
     * @method find
     * @description This method is used to find a log in the log file.
     * @param {string} id - The id of the log to be found.
     * @returns The log found with time, date and message. If the log is
     * not found, it returns a message indicating that the log may not exist.
     */
    find(id: string): string;
}
