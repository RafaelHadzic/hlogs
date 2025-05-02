"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const moment_1 = __importDefault(require("moment"));
const bson_objectid_1 = __importDefault(require("bson-objectid"));
/**
 * @class Log
 * @description This class is used to create a log file and add logs to it. All logs are
 * stored in the root directory of the project in a file called hlogs.log. It's recommended to
 * add this file to .gitignore to avoid uploading it to the repository or rewriting it.
 */
class Log {
    constructor() {
        this.root_path = "";
        this.filename = "hlogs.log";
        function setProjectRoot(diretorioAtual = __dirname) {
            let dir = diretorioAtual;
            while (!fs.existsSync(path.join(dir, 'package.json'))) {
                const dirAnterior = dir;
                dir = path.resolve(dir, '..');
                // Para evitar loop infinito se chegar no root
                if (dir === dirAnterior) {
                    throw new Error('Não foi possível encontrar a raiz do projeto (package.json não encontrado).');
                }
            }
            return dir;
        }
        this.root_path = setProjectRoot();
        if (!fs.existsSync(`${this.root_path}/${this.filename}`)) {
            fs.writeFileSync(`${this.root_path}/${this.filename}`, `[${(0, moment_1.default)().format('DD/MM/YYYY HH:mm:ss')}] - ${(0, bson_objectid_1.default)()} - Log file created\n`);
        }
    }
    /**
     * @method add
     * @description This method is used to add a log to the log file.
     * @param {string} log - The log to be added.
     * @param {string} print - If true, the log will be printed to the console. The default value is true.
     * @returns {string} - A message indicating that the log was successfully registered.
     */
    add(log, print = true) {
        if (typeof log !== 'string') {
            log = JSON.stringify(log);
        }
        let new_log = `[${(0, moment_1.default)().format('DD/MM/YYYY HH:mm:ss')}] - ${(0, bson_objectid_1.default)()} - ${String(log)}\n`;
        let log_data = fs.readFileSync(`${this.root_path}/${this.filename}`, 'utf8');
        let write_data = fs.writeFileSync(`${this.root_path}/${this.filename}`, log_data + new_log);
        if (print) {
            console.log(new_log);
        }
        return "Log successfully registered";
    }
    /**
     * @method find
     * @description This method is used to find a log in the log file.
     * @param {string} id - The id of the log to be found.
     * @returns The log found with time, date and message. If the log is
     * not found, it returns a message indicating that the log may not exist.
     */
    find(id) {
        let log_data = fs.readFileSync(`${this.root_path}/${this.filename}`, 'utf8');
        let log_lines = log_data.split('\n');
        let log_found = log_lines.find(line => line.includes(id));
        if (log_found) {
            return log_found;
        }
        else {
            return "Log not found or may not exist";
        }
    }
}
exports.Log = Log;
