
import * as React from 'react';

export default class Home extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
    }

    public render() {
        return (
            <>
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
            </>
        );
    }
}
