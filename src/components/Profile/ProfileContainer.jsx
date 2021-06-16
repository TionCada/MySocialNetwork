import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getMyProfileInfoThunkCreator,
    getStatusThunkCreator, saveProfile,
    updateStatusThunkCreator
} from "../../redux/profile-reducer";
import {withRouter} from "react-router";
import {compose} from "redux";

class ProfileContainer extends React.Component {

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push("/login");
            }
        }
        this.props.getMyProfileInfoThunkCreator(userId)
        this.props.getStatusThunkCreator(userId)
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.match.params.userId != prevProps.match.params.userId)
        this.refreshProfile();
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatusThunkCreator}
            updateProfilePicture={this.props.updateProfilePictureThunkCreator}
            isOwner={!this.props.match.params.userId}/>
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuthorized: state.auth.isAuthorized,
})

export default compose(
    withRouter,
    connect(mapStateToProps, {saveProfile, getMyProfileInfoThunkCreator, getStatusThunkCreator, updateStatusThunkCreator})
)(ProfileContainer);