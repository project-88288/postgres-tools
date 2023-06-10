import { Client } from 'pg';

export async function createConnectionFromConnectionString(connectionString: string): Promise<Client> {
  const client = new Client({
    connectionString: connectionString
  });

  try {
    await client.connect();
    console.log('Connection established successfully.');
    return client;
  } catch (error) {
    console.error('Error occurred:', error);
    throw error;
  }
}



// Usage example
export const connectionString = 'postgres://dev:dev@localhost:5432/workermainnet';








  