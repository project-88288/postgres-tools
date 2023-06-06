import pgPromise from 'pg-promise';

const pgp = pgPromise();

// Replace 'your_connection_string' with your actual connection string
const connectionString = 'postgres://dev:dev@localhost:5432/workermainnet';

const db = pgp(connectionString);

async function runQuery() {
    try {
      const result = await db.query('SELECT * FROM block');
      console.log(result);
      // Handle the query result
    } catch (error) {
      console.error('Error executing query:', error);
    } finally {
      pgp.end(); // Close the database connection
    }
  }
  


  async function insertvalue() {
    try {
      const result = await db.query('INSERT INTO "block"("height", "latestheight") VALUES (0, 0) RETURNING "id"');
      console.log(result);
      // Handle the query result
    } catch (error) {
      console.error('Error executing query:', error);
    } finally {
      pgp.end(); // Close the database connection
    }
  }
  
 // insertvalue();

  async function update() {
    try {
      const result = await db.query('UPDATE block  SET height = 0, latestheight = 0 WHERE id = 6;');
      console.log(result);
      // Handle the query result
    } catch (error) {
      console.error('Error executing query:', error);
    } finally {
      pgp.end(); // Close the database connection
    }
  }
  update();

  async function deleteit() {
    try {
      const result = await db.query('DELETE FROM block WHERE id = 7;');
      console.log(result);
      // Handle the query result
    } catch (error) {
      console.error('Error executing query:', error);
    } finally {
      pgp.end(); // Close the database connection
    }
  }
  
  //deleteit();

  runQuery();

  async function describtable() {
    try {
      const result = await db.query('SELECT column_name, data_type, is_nullable, column_default FROM information_schema.columns WHERE table_name = "block";');
      console.log(result);
      // Handle the query result
    } catch (error) {
      console.error('Error executing query:', error);
    } finally {
      pgp.end(); // Close the database connection
    }
  }
  
  //describtable();

  /*
ts-node index.ts
  async function runParameterizedQuery() {
    try {
      const userId = 1;
      const result = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
      console.log(result);
      // Handle the query result
    } catch (error) {
      console.error('Error executing query:', error);
    } finally {
      pgp.end(); // Close the database connection
    }
  }
  
  //runParameterizedQuery();

  */
  