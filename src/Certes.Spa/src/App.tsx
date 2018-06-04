// tslint:disable:no-console
// tslint:disable:no-debugger
import axios from 'axios';
import * as Msal from 'msal';
import * as React from 'react';
import {
    Collapse,
    Navbar,
    NavbarBrand,
    NavbarToggler,
} from 'reactstrap';

import './App.css';
import logo from './logo.svg';

interface IAppState {
    isOpen: boolean
};

class App extends React.Component<{}, IAppState> {
    private apiScope = 'https://certesapp.onmicrosoft.com/certes-api/user_impersonation';
    private aadAuthority = `https://login.microsoftonline.com/tfp/${process.env.REACT_APP_AAD_TENANT}/b2c_1_susi`;
    private aadPasswordResetAuthority = `https://login.microsoftonline.com/tfp/${process.env.REACT_APP_AAD_TENANT}/b2c_1_pwd`;
    private maslApp = new Msal.UserAgentApplication(
        `${process.env.REACT_APP_AAD_CLIENT_ID}`,
        this.aadAuthority,
        (errorDesc, token, error, tokenType) => {

            console.log('global', errorDesc, token, error, tokenType);

            if (tokenType === 'access_token') {
                axios.defaults.headers.common.Authorization = `Bearer ${token}`;
                console.log('access token', token);
            } else if (error.includes('access_denied') &&
                // The user has forgotten their password.
                errorDesc && errorDesc.startsWith('AADB2C90118:')) {

                setTimeout(async () => {
                    const resetPwdMaslApp = new Msal.UserAgentApplication(
                        `${process.env.REACT_APP_AAD_CLIENT_ID}`,
                        this.aadPasswordResetAuthority,
                        (errorDesc1, token1, error1, tokenType1) => {
                            console.log(errorDesc, token, error, tokenType);
                        },
                        {
                            cacheLocation: 'localStorage',
                            redirectUri: window.location.origin,
                        });

                    await resetPwdMaslApp.loginPopup([this.apiScope]);
                }, 0);
            }
        },
        {
            cacheLocation: 'localStorage',
            redirectUri: window.location.origin,
        });

    constructor(props: {}) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.login = this.login.bind(this);

        this.state = {
            isOpen: false
        };
    }

    public toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    public async componentDidMount() {
        try {
            const token = await this.maslApp.acquireTokenSilent([this.apiScope]);
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            console.log('access token', token);
        } catch (err) {
            console.log(err);
        }
    }

    public async login(evt: React.MouseEvent<HTMLElement>) {
        evt.preventDefault();
        try {
            const token = await this.maslApp.loginPopup([this.apiScope]);
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            console.log('access token', token);
        } catch (err) {
            console.log(err);
        }
    }

    public render() {
        return (
            <div className="app-container">
                <header>
                    <Navbar color="light" light={true} expand="lg">
                        <NavbarBrand href="/">
                            <img src={logo} alt="Certes" width="32" height="32" className="d-inline-block" /> Certes
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar={true}>
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="https://github.com/fszlin/certes">
                                        <i className="fab fa-github" /> GitHub</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="https://github.com/fszlin/certes/issues">
                                        <i className="far fa-bug" /> Issues</a>
                                </li>
                            </ul>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" href="#" onClick={this.login}>
                                        <i className="far fa-user-circle" /> Login</a>
                                </li>
                            </ul>
                        </Collapse>
                    </Navbar>
                </header>
                <main className="container">
                    <div className="jumbotron">
                        <h1 className="display-4">HTTPS? done. free.</h1>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="intro-block">
                                <i className="far fa-shield-check fa-5x" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="intro-block">
                                <i className="far fa-shield-check fa-5x" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="intro-block">
                                <i className="far fa-shield-check fa-5x" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="intro-block">
                                <i className="far fa-shield-check fa-5x" />
                            </div>
                        </div>
                    </div>
                </main>
                <footer className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            &copy; 2018 - Certes Project. All rights reserved
                        </div>
                        <nav aria-describedby="footer-label-legal" className="col-lg-2 offset-lg-6">
                            <h3 id="footer-label-legal">Legal</h3>
                            <ul>
                                <li><a href="#">Privacy Policy</a></li>
                            </ul>
                        </nav>
                    </div>
                </footer>
            </div>
        );
    }
}

export default App;
