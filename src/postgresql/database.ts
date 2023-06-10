
import { exec } from 'child_process';
import { Client } from 'pg';


export function dbCreation(dbname: string) {
  const dbCreationCommand = `sudo -u postgres createdb ${dbname}`;
  exec(dbCreationCommand, (error, stdout, stderr) => {

    if (error) {
      console.error('Error occurred:', error.message);
      return;
    }
    if (stderr) {
      console.error('Error output:', stderr);
      return;
    }
  })
}

export function dbDdrop(databaseName: string) {
  const dropDatabaseCommand = `sudo -u postgres psql -c 'DROP DATABASE IF EXISTS "${databaseName}";'`;

  exec(dropDatabaseCommand, (error, stdout, stderr) => {
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

export function dbGrantToUser(dbname: string, username: string) {
  const grantCommand = `sudo -u postgres psql -c 'GRANT ALL PRIVILEGES ON DATABASE "${dbname}" TO "${username}";'`;
  exec(grantCommand, (error, stdout, stderr) => {
    if (error) {
      console.error('Error occurred:', error.message);
      return;
    }
    if (stderr) {
      console.error('Error output:', stderr);
      return;
    }
    console.log('Database created and privileges granted successfully.');
  }
  );
}


export function dbIsExist(dbname: string): boolean | void {
  const checkDbExistenceCommand = `sudo -u postgres psql -tAc "SELECT 1 FROM pg_database WHERE datname=\'${dbname}\';"`;
  exec(checkDbExistenceCommand, (error, stdout, stderr) => {
    console.log(checkDbExistenceCommand)
    console.log(stdout)
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
      return true
    } else {
      console.log('The database does not exist.');
      return false
    }
  });

}


export function dbList() {
  const listDatabasesCommand = 'sudo -u postgres psql -t -c "\\l"';
  exec(listDatabasesCommand, (error, stdout, stderr) => {
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

export async function dbNameArray(connectionString: string): Promise<any[]> {
  const client = new Client({
    connectionString: connectionString
  });

  try {
    await client.connect();

    const result = await client.query('SELECT datname FROM pg_database WHERE datistemplate = false;');

    return result.rows.filter((row) => !['postgres', 'workermainnet'].includes(row.datname)).map((row) => row.datname);
  } catch (error) {
    console.error('Error occurred:', error);
    return [];
  } finally {
    await client.end();
  }

}

export async function dbDropAll(connectionString: string) {
  await dbNameArray(connectionString).then(datas => {
    datas.forEach(a => {
      dbDdrop(a)
    })
    console.log(datas)
  })

}

export async function getDatabaseNames(): Promise<string[]> {
  const client = new Client();

  try {
    await client.connect();

    const result = await client.query('SELECT datname FROM pg_database WHERE datistemplate = false;');

    return result.rows.map((row) => row.datname);
  } catch (error) {
    console.error('Error occurred:', error);
    return [];
  } finally {
    await client.end();
  }
}

