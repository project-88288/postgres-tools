"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbNameArray = exports.connectionString = exports.createConnectionFromConnectionString = void 0;
const pg_1 = require("pg");
function createConnectionFromConnectionString(connectionString) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new pg_1.Client({
            connectionString: connectionString
        });
        try {
            yield client.connect();
            console.log('Connection established successfully.');
            return client;
        }
        catch (error) {
            console.error('Error occurred:', error);
            throw error;
        }
    });
}
exports.createConnectionFromConnectionString = createConnectionFromConnectionString;
// Usage example
exports.connectionString = 'postgres://dev:dev@localhost:5432/workermainnet';
function dbNameArray() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new pg_1.Client({
            connectionString: exports.connectionString
        });
        try {
            yield client.connect();
            const result = yield client.query('SELECT datname FROM pg_database WHERE datistemplate = false;');
            return result.rows.filter((row) => !['postgres', 'workermainnet'].includes(row.datname)).map((row) => row.datname);
        }
        catch (error) {
            console.error('Error occurred:', error);
            return [];
        }
        finally {
            yield client.end();
        }
    });
}
exports.dbNameArray = dbNameArray;
