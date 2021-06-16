import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import logo from '../../assets/images/logo.png';

const Header = (props) => {
    return (<header className={s.header}>
            <img className={s.img} src={logo}/>
            <div className={s.loginBlock}>
                {props.isAuthorized ?
                    <div className={s.login}>{props.login}
                    <NavLink to={'/login'}>
                        <button className={s.logOut} onClick={props.LogoutThunkCreator}>Log Out</button>
                    </NavLink>
                    </div>
                    : <NavLink to={'/login'}>
                        <button>Login</button>
                    </NavLink>}
            </div>
        </header>
    );
}

export default Header;