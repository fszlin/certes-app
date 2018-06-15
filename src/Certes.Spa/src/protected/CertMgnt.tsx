
import * as React from 'react';
import { Route } from "react-router-dom";

import Dashboard from './Dashboard';

export default class CertMgnt extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
    }

    public render() {
        return (
            <>
                <p>TODO: Protected</p>
                <Route exact={true} path="/cert/" component={Dashboard} />
            </>
        );
    }
}
