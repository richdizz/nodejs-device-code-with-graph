import * as adal from 'adal-node';
import * as graph from '@microsoft/microsoft-graph-client';
import * as gtypes from '@microsoft/microsoft-graph-types';

let authContext = new adal.AuthenticationContext("https://login.microsoftonline.com/common", false);
authContext.acquireUserCode("https://graph.microsoft.com", "962425ce-0fcb-4102-94cf-dc601d3f20b5", "en-us", 
    (error:Error, userInfo:adal.UserCodeInfo) => {
        console.log(userInfo.message);
        authContext.acquireTokenWithDeviceCode("https://graph.microsoft.com", 
            "962425ce-0fcb-4102-94cf-dc601d3f20b5", 
            userInfo, 
            (e:Error, token:adal.TokenResponse) => {
            let client = graph.Client.init({
                authProvider: (done) => {
                    done(null, token.accessToken);
                }
            });
            
            client.api("/me").get((err, res:gtypes.User) => {
                console.log(res);
            });
        });
    });