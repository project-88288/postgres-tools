
import { exec } from 'child_process';

export function createUserPasswd(username: string, passwd: string) {
  const createUserCommand = `sudo -u postgres psql -c "CREATE USER ${username} WITH PASSWORD \'${passwd}\';"`;
  exec(createUserCommand, (error, stdout, stderr) => {
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


export function userIsExist(username: string) {
  const checkUserCommand = `sudo -u postgres psql -t -c "SELECT 1 FROM pg_user WHERE usename = \'${username}\';"`;
  console.log(checkUserCommand)
  exec(checkUserCommand, (error, stdout, stderr) => {
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
    } else {
      console.log('User does not exist.');
    }
  });

}

