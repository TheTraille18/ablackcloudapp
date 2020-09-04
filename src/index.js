import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import aws_config from './aws-exports';
import { Auth } from 'aws-amplify';
import { ApolloProvider } from 'react-apollo'
import { Rehydrated } from 'aws-appsync-react' 


const client = new AWSAppSyncClient({
        url: aws_config.aws_appsync_graphqlEndpoint,
        region: aws_config.aws_appsync_region,
        auth: {
                type: AUTH_TYPE.API_KEY,
                jwtToken: async () => (await Auth.currentSession()).getAcceessToken().getJwtToken(),
        }
})

ReactDOM.render(
        <ApolloProvider client={client}>
                <Rehydrated >
                        <App/>
                </Rehydrated>
        </ApolloProvider>
        
, document.getElementById('root'));
