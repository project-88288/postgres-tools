import { exec } from 'child_process';

export function tableList(databaseName:string){
    const listTablesCommand = `sudo -u postgres psql -t -c "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';" ${databaseName}`;

    exec(listTablesCommand, (error, stdout, stderr) => {
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

export function tableDrop(table_name:string) {
  
const tableName = 'your_table';
const dropTableCommand = `sudo -u postgres psql -c "DROP TABLE IF EXISTS ${tableName};"`;

exec(dropTableCommand, (error, stdout, stderr) => {
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

export function tableDetail(tableName:string) {
const tableDetailCommand = `sudo -u postgres psql -c "\\d+ ${tableName};"`;

exec(tableDetailCommand, (error, stdout, stderr) => {
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