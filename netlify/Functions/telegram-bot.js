const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    // Sadece POST isteklerine izin ver
    if (event.httpMethod !== 'POST') {
        return { 
            statusCode: 405, 
            body: JSON.stringify({ error: 'Method Not Allowed' }) 
        };
    }

    try {
        const data = JSON.parse(event.body);
        const TELEGRAM_BOT_TOKEN = '7518606924:AAFsWuJ1uPFWjvFTbOshn1R0uRHnsinxIyI';
        
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.description || 'Telegram API error');
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};