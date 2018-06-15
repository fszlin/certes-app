import axios from 'axios';
import * as Msal from 'msal';

const apiScope = 'https://certesapp.onmicrosoft.com/certes-api/user_impersonation';
const aadLoginAuthority = `https://login.microsoftonline.com/tfp/${process.env.REACT_APP_AAD_TENANT}/b2c_1_susi`;
const aadPasswordResetAuthority = `https://login.microsoftonline.com/tfp/${process.env.REACT_APP_AAD_TENANT}/b2c_1_pwd`;

const pwdMaslApp = new Msal.UserAgentApplication(
    `${process.env.REACT_APP_AAD_CLIENT_ID}`,
    aadPasswordResetAuthority,
    (errorDesc1, token1, error1, tokenType1) => undefined,
    {
        cacheLocation: 'localStorage',
        redirectUri: window.location.origin,
    });

const maslApp = new Msal.UserAgentApplication(
    `${process.env.REACT_APP_AAD_CLIENT_ID}`,
    aadLoginAuthority,
    (errorDesc, token, error, tokenType) => undefined,
    {
        cacheLocation: 'localStorage',
        redirectUri: window.location.origin,
    });

export async function acquireTokenSilent() {
    try {
        const token = await maslApp.acquireTokenSilent([apiScope]);
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        return true;
    } catch {
        return false;
    }
};

export async function resetPasswordPopup() {
    const token = await pwdMaslApp.loginPopup([apiScope]);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    return true;
}

export async function loginPopup() {
    try {
        const token = await maslApp.loginPopup([apiScope]);
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        return true;
    } catch (err) {
        if (typeof err === 'string') {
            if (err.includes('AADB2C90118')) {
                return await resetPasswordPopup();
            }
        }

        return false;
    }
}
