
import * as React from 'react';
import { Link, Route } from "react-router-dom";

import Dashboard from './Dashboard';
import NewCert from './NewCert';

export default class CertMgnt extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
    }

    public render() {
        return (
            <div className="row mgnt-content">
                <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                    <div className="sidebar-sticky">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <Link to="/cert/" className="nav-link active">Dashboard</Link>
                            </li>
                        </ul>

                        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                            <span>Certificates</span>
                            <Link to="/cert/new" className="d-flex align-items-center text-muted">
                                <i className="far fa-plus-octagon" />
                            </Link>
                        </h6>
                        <ul className="nav flex-column mb-2">
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    www.example.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                    <Route exact={true} path="/cert/" component={Dashboard} />
                    <Route path="/cert/new" component={NewCert} />
                </div>
            </div>
        );
    }
}
