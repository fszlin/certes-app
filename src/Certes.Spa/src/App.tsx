// tslint:disable:no-console
// tslint:disable:no-debugger
import * as React from 'react';
import {
    Collapse,
    Navbar,
    NavbarBrand,
    NavbarToggler,
} from 'reactstrap';

import './App.css';
import * as Authz from './Authz';
import logo from './logo.svg';

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
                                        (<a className="nav-link" href="#">
                                            <i className="far fa-lock-alt" /> My Certificates</a>) :
                                        (<a className="nav-link" href="#" onClick={this.login}>
                                            <i className="far fa-user-circle" /> Login</a>)
                                    }
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
                            &copy; 2018 - <a href="https://github.com/fszlin/certes">Certes</a> Project.
                            All rights reserved
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
