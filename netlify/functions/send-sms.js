exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { to, roomCode } = JSON.parse(event.body);

        if (!to || !roomCode) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Missing phone number or room code' }),
            };
        }

        // In a real app, we would use Twilio SDK here.
        // For POC, we simulate success and maybe log to DB if needed.
        console.log(`Sending SMS to ${to} for room ${roomCode}`);

        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 500));

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ message: 'SMS sent successfully' }),
        };

    } catch (error) {
        console.error('SMS error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};
