const { Client } = require('pg');

exports.handler = async (event, context) => {
    const { code } = event.queryStringParameters;

    if (!code) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Missing room code' }),
        };
    }

    const client = new Client({
        connectionString: process.env.NETLIFY_DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    });

    try {
        await client.connect();
        const res = await client.query('SELECT room_number, directions FROM rooms WHERE room_code = $1', [code]);
        await client.end();

        if (res.rows.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Room not found' }),
            };
        }

        const room = res.rows[0];

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*' // Allow CORS for local dev
            },
            body: JSON.stringify({
                roomNumber: room.room_number,
                directions: room.directions,
            }),
        };

    } catch (error) {
        console.error('Database error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};
