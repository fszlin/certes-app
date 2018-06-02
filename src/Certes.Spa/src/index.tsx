import axios, { AxiosResponse } from 'axios';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { IClientConfig } from './ClientConfig';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const apiRoot = process.env.REACT_APP_API_ROOT || 'http://localhost:7071';

(async () => {
    const config: AxiosResponse<IClientConfig> = await axios.get(`${apiRoot}/api/config?v=${process.env.REACT_APP_VERSION}`);

    ReactDOM.render(
        <App config={config.data} />,
        document.getElementById('root') as HTMLElement
    );
})();

registerServiceWorker();
