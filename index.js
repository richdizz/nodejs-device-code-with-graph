"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adal = require("adal-node");
const graph = require("@microsoft/microsoft-graph-client");
let authContext = new adal.AuthenticationContext("https://login.microsoftonline.com/common", false);
authContext.acquireUserCode("https://graph.microsoft.com", "962425ce-0fcb-4102-94cf-dc601d3f20b5", "en-us", (error, userInfo) => {
    console.log(userInfo.message);
    let token = authContext.acquireTokenWithDeviceCode("https://graph.microsoft.com", "962425ce-0fcb-4102-94cf-dc601d3f20b5", userInfo, (e, token) => {
        let client = graph.Client.init({
            authProvider: (done) => {
                done(null, token.accessToken);
            }
        });
        client.api("/me").get((err, res) => {
            console.log(res);
        });
    });
});
//# sourceMappingURL=index.js.map