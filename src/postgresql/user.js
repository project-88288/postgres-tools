"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userIsExist = exports.createUserPasswd = void 0;
const child_process_1 = require("child_process");
function createUserPasswd(username, passwd) {
    const createUserCommand = `sudo -u postgres psql -c "CREATE USER ${username} WITH PASSWORD \'${passwd}\';"`;
    (0, child_process_1.exec)(createUserCommand, (error, stdout, stderr) => {
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
exports.createUserPasswd = createUserPasswd;
function userIsExist(username) {
    const checkUserCommand = `sudo -u postgres psql -t -c "SELECT 1 FROM pg_user WHERE usename = \'${username}\';"`;
    console.log(checkUserCommand);
    (0, child_process_1.exec)(checkUserCommand, (error, stdout, stderr) => {
        if (error) {
            console.error('Error occurred:', error.message);
            return;
        }
        if (stderr) {
            console.error('Error output:', stderr);
            return;
        }
        const userExists = stdout.trim() === '1';
        if (userExists) {
            console.log('User exists.');
        }
        else {
            console.log('User does not exist.');
        }
    });
}
exports.userIsExist = userIsExist;
