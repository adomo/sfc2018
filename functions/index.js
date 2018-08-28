import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as request from 'request-promise';

admin.initializeApp(functions.config.firebase);

const topic = 'mass';

export let manageTopics = functions.database
    .ref('topics/{topic}/user/{user}')
    .onWrite(async event => {
        let action = event.data.exists() ? 'batchAdd' : 'batchRemove';

        let tokenSnapshot = await admin.database()
            .ref('pushIds/${event.params.user}')
            .once('value');

        if(!tokenSnapshot.exists()) {
            console.log('User has no tokens!')
            return null;
        }

        let pushTokens = Object.keys(tokenSnapshot.val());
        console.log('Adding ${pushtokens.length()} tokens to ${topic}');

        let oauthToken = await functions.config().firebase.credential.getAccesstoken();

        await request({
            url : 'https://iid.googleapis.com/iid/vs/${action}',
            method : 'POST',
            json : true,
            headers : {
                Authorization : 'Bearer ${oauthToken.access_token}',
                access_token_auth : true,
            },
            body : {
                to : 'topics/${topic}',
                registration_tokens : pushTokens
            }
        })
    });
