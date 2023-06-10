"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tableDetail = exports.tableDrop = exports.tableList = void 0;
const child_process_1 = require("child_process");
function tableList(databaseName) {
    const listTablesCommand = `sudo -u postgres psql -t -c "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';" ${databaseName}`;
    (0, child_process_1.exec)(listTablesCommand, (error, stdout, stderr) => {
        if (error) {
            console.error('Error occurred:', error.message);
            return;
        }
        if (stderr) {
            console.error('Error output:', stderr);
            return;
        }
        const tables = stdout.split('\n').map((line) => line.trim());
        console.log('Tables:');
        console.log(tables);
    });
}
exports.tableList = tableList;
function tableDrop(table_name) {
    const tableName = 'your_table';
    const dropTableCommand = `sudo -u postgres psql -c "DROP TABLE IF EXISTS ${tableName};"`;
    (0, child_process_1.exec)(dropTableCommand, (error, stdout, stderr) => {
        if (error) {
            console.error('Error occurred:', error.message);
            return;
        }
        if (stderr) {
            console.error('Error output:', stderr);
            return;
        }
        console.log('Table dropped successfully.');
    });
}
exports.tableDrop = tableDrop;
function tableDetail(tableName) {
    const tableDetailCommand = `sudo -u postgres psql -c "\\d+ ${tableName};"`;
    (0, child_process_1.exec)(tableDetailCommand, (error, stdout, stderr) => {
        if (error) {
            console.error('Error occurred:', error.message);
            return;
        }
        if (stderr) {
            console.error('Error output:', stderr);
            return;
        }
        console.log('Table Details:');
        console.log(stdout);
    });
}
exports.tableDetail = tableDetail;
