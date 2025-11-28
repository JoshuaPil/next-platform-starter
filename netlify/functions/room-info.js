const { Client } = require('pg');

exports.handler = async (event, context) => {
    const { code } = event.queryStringParameters;

    if (!code) {
        return {
            statusCode: 400,
            body: 'Missing room code',
        };
    }

    const client = new Client({
        connectionString: process.env.NETLIFY_DATABASE_URL,
        ssl: { rejectUnauthorized: false }, // Required for some hosted Postgres
    });

    try {
        await client.connect();
        const res = await client.query('SELECT * FROM rooms WHERE room_code = $1', [code]);
        await client.end();

        if (res.rows.length === 0) {
            return {
                statusCode: 404,
                body: 'Room not found',
            };
        }

        const room = res.rows[0];

        const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Room Info - The Cromwell</title>
        <style>
          body {
            font-family: sans-serif;
            background-color: #f9f9f9;
            color: #333;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            padding: 20px;
            text-align: center;
          }
          .card {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            max-width: 400px;
            width: 100%;
          }
          h1 { color: #7A0050; margin-bottom: 0.5rem; }
          .room-number { font-size: 3rem; font-weight: bold; margin: 1rem 0; }
          .directions { color: #666; line-height: 1.5; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>The Cromwell</h1>
          <p>Your Room Number</p>
          <div class="room-number">${room.room_number}</div>
          <p class="directions">${room.directions}</p>
        </div>
      </body>
      </html>
    `;

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'text/html' },
            body: html,
        };

    } catch (error) {
        console.error('Database error:', error);
        return {
            statusCode: 500,
            body: 'Internal Server Error',
        };
    }
};
