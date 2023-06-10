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
exports.getDatabaseNames = exports.dbDropAll = exports.dbList = exports.dbIsExist = exports.dbGrantToUser = exports.dbDdrop = exports.dbCreation = void 0;
const child_process_1 = require("child_process");
const pg_1 = require("pg");
function dbCreation(dbname) {
    const dbCreationCommand = `sudo -u postgres createdb ${dbname}`;
    (0, child_process_1.exec)(dbCreationCommand, (error, stdout, stderr) => {
        if (error) {
            console.error('Error occurred:', error.message);
            return;
        }
        if (stderr) {
            console.error('Error output:', stderr);
            return;
        }
    });
}
exports.dbCreation = dbCreation;
function dbDdrop(databaseName) {
    const dropDatabaseCommand = `sudo -u postgres psql -c 'DROP DATABASE IF EXISTS "${databaseName}";'`;
    (0, child_process_1.exec)(dropDatabaseCommand, (error, stdout, stderr) => {
        if (error) {
            console.error('Error occurred:', error.message);
            return;
        }
        if (stderr) {
            console.error('Error output:', stderr);
            return;
        }
        console.log('Database dropped successfully.');
    });
}
exports.dbDdrop = dbDdrop;
function dbGrantToUser(dbname, username) {
    const grantCommand = `sudo -u postgres psql -c 'GRANT ALL PRIVILEGES ON DATABASE "${dbname}" TO "${username}";'`;
    (0, child_process_1.exec)(grantCommand, (error, stdout, stderr) => {
        if (error) {
            console.error('Error occurred:', error.message);
            return;
        }
        if (stderr) {
            console.error('Error output:', stderr);
            return;
        }
        console.log('Database created and privileges granted successfully.');
    });
}
exports.dbGrantToUser = dbGrantToUser;
function dbIsExist(dbname) {
    const checkDbExistenceCommand = `sudo -u postgres psql -tAc "SELECT 1 FROM pg_database WHERE datname=\'${dbname}\';"`;
    (0, child_process_1.exec)(checkDbExistenceCommand, (error, stdout, stderr) => {
        console.log(checkDbExistenceCommand);
        console.log(stdout);
        if (error) {
            console.error('Error occurred:', error.message);
            return undefined;
        }
        if (stderr) {
            console.error('Error output:', stderr);
            return undefined;
        }
        const dbExists = stdout.trim() === '1';
        if (dbExists) {
            console.log('The database exists.');
            return true;
        }
        else {
            console.log('The database does not exist.');
            return false;
        }
    });
}
exports.dbIsExist = dbIsExist;
function dbList() {
    const listDatabasesCommand = 'sudo -u postgres psql -t -c "\\l"';
    (0, child_process_1.exec)(listDatabasesCommand, (error, stdout, stderr) => {
        if (error) {
            console.error('Error occurred:', error.message);
            return;
        }
        if (stderr) {
            console.error('Error output:', stderr);
            return;
        }
        const databases = stdout.split('\n').map((line) => line.trim());
        console.log('Databases:');
        console.log(databases);
    });
}
exports.dbList = dbList;
function dbDropAll() {
    const dropAllDatabasesCommand = 'sudo -u postgres psql --single-transaction -c "SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname != \'postgres\' AND pg_stat_activity.datname != \'template1\'; DROP DATABASE IF EXISTS template1; CREATE DATABASE template1 TEMPLATE template0;"';
    (0, child_process_1.exec)(dropAllDatabasesCommand, (error, stdout, stderr) => {
        if (error) {
            console.error('Error occurred:', error.message);
            return;
        }
        if (stderr) {
            console.error('Error output:', stderr);
            return;
        }
        console.log('All databases dropped successfully.');
    });
}
exports.dbDropAll = dbDropAll;
function getDatabaseNames() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new pg_1.Client();
        try {
            yield client.connect();
            const result = yield client.query('SELECT datname FROM pg_database WHERE datistemplate = false;');
            return result.rows.map((row) => row.datname);
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
exports.getDatabaseNames = getDatabaseNames;
