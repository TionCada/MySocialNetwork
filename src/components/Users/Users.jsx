import React from "react";
import s from "./Users.module.css"
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";
import Preloader from "../Common/Preloader/Preloader";

let Users = ({currentPage, totalUsersCount, pageSize, users, onPageChanged, ...props}) => {

    return <div>
        <div className={s.paginator}>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                       totalItemsCount={totalUsersCount} pageSize={pageSize}/>
        </div>
        {props.isLoading ? <Preloader/> :
            <div className={s.usersList}>
                {users.map(u => <User user={u} followingInProgress={props.followingInProgress}
                                      key={u.id} unfollowThunkCreator={props.unfollowThunkCreator}
                                      followThunkCreator={props.followThunkCreator}
                />)}
            </div>
        }

    </div>
}

export default Users;