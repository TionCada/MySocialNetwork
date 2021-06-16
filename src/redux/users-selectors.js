export const getUsersSelector = (state) => {
    return state.usersPage.users;
}

export const getPageSizeSelector = (state) => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCountSelector = (state) => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPageSelector = (state) => {
    return state.usersPage.currentPage;
}

export const getIsLoadingSelector = (state) => {
    return state.usersPage.isLoading;
}

export const getFollowingInProgressSelector = (state) => {
    return state.usersPage.followingInProgress;
}
