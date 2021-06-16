import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

export const withAuthRedirect = (Component) => {

    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuthorized) return <Redirect to={"/login"}/>

            return <Component {...this.props}/>
        }
    }

    let mapStateToProps = (state) => ({
        isAuthorized: state.auth.isAuthorized
    })

    let connectedAuthRedirectComponent = connect(mapStateToProps)(RedirectComponent);

    return connectedAuthRedirectComponent
}