const { Client } = require('pg');

exports.handler = async (event, context) => {
    const client = new Client({
        connectionString: process.env.NETLIFY_DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    });

    try {
        await client.connect();

        // Create table
        await client.query(`
      CREATE TABLE IF NOT EXISTS rooms (
        id SERIAL PRIMARY KEY,
        room_code VARCHAR(50) UNIQUE NOT NULL,
        room_number VARCHAR(50) NOT NULL,
        directions TEXT
      );
    `);

        // Insert or Update data
        await client.query(`
      INSERT INTO rooms (room_code, room_number, directions)
      VALUES ('R1038', '1038', 'Take the north elevators to floor 10, room at the end of the hall on the right.')
      ON CONFLICT (room_code) DO UPDATE 
      SET room_number = EXCLUDED.room_number, directions = EXCLUDED.directions;
    `);

        await client.end();

        return {
            statusCode: 200,
            body: 'Database setup successful! Table "rooms" created and data inserted.',
        };

    } catch (error) {
        console.error('Database error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
