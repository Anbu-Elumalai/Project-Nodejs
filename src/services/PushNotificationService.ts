// firebaseAuth.js
const { JWT } = require('google-auth-library');
const axios = require('axios');
const path = require('path');
const fs = require('fs');

// Path to your Firebase service account key
const serviceAccount = path.join(__dirname, 'path_to_your_service_account_key.json');

// FCM endpoint for sending push notifications
const FCM_ENDPOINT = 'https://fcm.googleapis.com/v1/projects/YOUR_PROJECT_ID/messages:send';  // Replace with your Firebase project ID

// Initialize JWT authentication
const client = new JWT({
    keyFile: serviceAccount,  // Path to your service account file
    scopes: ['https://www.googleapis.com/auth/firebase.messaging'],  // Scope for FCM
});

export async function sendPushNotification(tokens: string, titles: string, bodys: string) {
    try {
        // Authenticate using JWT
        const accessToken = await client.authorize();
        console.log('Access Token:', accessToken);

        // Build the message payload for Firebase Cloud Messaging
        const message = {
            message: {
                token: tokens,  // FCM device token
                notification: {
                    title: titles,
                    body: bodys,
                },
                data: {
                    key1: 'value1',  // Optional custom data
                    key2: 'value2',
                },
            },
        };

        // Send the push notification to the FCM endpoint
        const response = await axios.post(FCM_ENDPOINT, message, {
            headers: {
                Authorization: `Bearer ${accessToken.access_token}`,
                'Content-Type': 'application/json',
            },
        });

        console.log('Notification sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending notification:', error);
    }
}
