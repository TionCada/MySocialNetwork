import React from 'react';
import {connect} from "react-redux";
import {
    followThunkCreator,
    unfollowThunkCreator,
    getUsersOnLoadThunkCreator,
    getUsersOnReloadThunkCreator
} from "../../redux/users-reducer";
import Users from "./Users";
import {compose} from "redux";
import {
    getCurrentPageSelector, getFollowingInProgressSelector, getIsLoadingSelector,
    getPageSizeSelector,
    getTotalUsersCountSelector,
    getUsersSelector
} from "../../redux/users-selectors";

class UsersContainer extends React.Component {

    componentDidMount() {
        let {currentPage, pageSize} = this.props;
        this.props.getUsersOnLoadThunkCreator(currentPage, pageSize);
    }

    onPageChanged = (pageNumber) => {
        let {pageSize} = this.props;
       this.props.getUsersOnReloadThunkCreator(pageNumber, pageSize)
    }

    render() {
        return (
            <div>
                <Users totalUsersCount={this.props.totalUsersCount} pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage} onPageChanged={this.onPageChanged}
                       users={this.props.users} follow={this.props.follow} unfollow={this.props.unfollow}
                       followingInProgress={this.props.followingInProgress}
                       controlTheButton={this.props.controlTheButton}
                       followThunkCreator={this.props.followThunkCreator}
                       unfollowThunkCreator={this.props.unfollowThunkCreator}
                       isLoading={this.props.isLoading}
                />
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsersSelector(state),
        pageSize: getPageSizeSelector(state),
        totalUsersCount: getTotalUsersCountSelector(state),
        currentPage: getCurrentPageSelector(state),
        isLoading: getIsLoadingSelector(state),
        followingInProgress: getFollowingInProgressSelector(state)
    }
}

export default compose(
    connect(mapStateToProps, {followThunkCreator, unfollowThunkCreator,
            getUsersOnLoadThunkCreator, getUsersOnReloadThunkCreator})
)(UsersContainer);