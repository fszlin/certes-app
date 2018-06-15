// tslint:disable:no-console
// tslint:disable:no-debugger
import * as React from 'react';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarBrand,
    NavbarToggler,
} from 'reactstrap';

import './App.css';
import * as Authz from './Authz';
import logo from './logo.svg';

import Home from './Home';
import PrivacyPolicy from './PrivacyPolicy';
import CertMgnt from './protected/CertMgnt';

interface IAppState {
    isAuthenticated: boolean,
    isOpen: boolean,
};

class App extends React.Component<{}, IAppState> {
    constructor(props: {}) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.login = this.login.bind(this);

        this.state = {
            isAuthenticated: false,
            isOpen: false,
        };
    }

    public toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    public async componentDidMount() {
        this.setState({
            isAuthenticated: await Authz.acquireTokenSilent(),
        });
    }

    public async login(evt: React.MouseEvent<HTMLElement>) {
        evt.preventDefault();
        this.setState({
            isAuthenticated: await Authz.loginPopup(),
        });
    }

    public render() {
        return (
            <Router>
                <div className="app-container">
                    <header>
                        <Navbar color="light" light={true} expand="lg">
                            <NavbarBrand tag={Link} to="/">
                                <img src={logo} alt="Certes" width="32" height="32" className="d-inline-block" /> Certes
                        </NavbarBrand>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar={true}>
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                        <a className="nav-link" href="https://github.com/fszlin/certes-app">
                                            <i className="fab fa-github" /> GitHub</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="https://github.com/fszlin/certes-app/issues">
                                            <i className="far fa-bug" /> Issues</a>
                                    </li>
                                </ul>
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        {this.state.isAuthenticated ?
                                            (<Link to="./cert" className="nav-link" >
                                                <i className="far fa-lock-alt" /> My Certificates</Link>) :
                                            (<a className="nav-link" href="#" onClick={this.login}>
                                                <i className="far fa-user-circle" /> Login</a>)
                                        }
                                    </li>
                                </ul>
                            </Collapse>
                        </Navbar>
                    </header>
                    <main className="container">
                        <Route exact={true} path="/" component={Home} />
                        <Route path="/privacy-policy" component={PrivacyPolicy} />
                        <Route path="/cert" component={CertMgnt} />
                    </main>
                    <footer className="container">
                        <div className="row">
                            <div className="col-lg-4">
                                &copy; 2018 - <a href="https://github.com/fszlin/certes">Certes</a> Project.
                                All rights reserved
                        </div>
                            <nav aria-describedby="footer-label-legal" className="col-lg-2 offset-lg-6">
                                <h3 id="footer-label-legal">Legal</h3>
                                <ul>
                                    <li>
                                        <Link to="/privacy-policy">Privacy Policy</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </footer>
                </div>
            </Router>
        );
    }
}

export default App;
