import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {Nav, Navbar} from "react-bootstrap"
import {Container, Button} from "react-bootstrap";
import {NavLink, useHistory} from "react-router-dom"
import {LOGIN_ROUTE, PERSONALCABINET_ROUTE, PUBLICATIONLIST_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import AdminPanel from "./modals/AdminPanel";
import {userLogOut} from "../http/userAPI";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const [adminPanelVisible, setAdminPanelVisible] = useState(false)
    const history = useHistory()

    const logOut = async () => {
        let data;
        data = await userLogOut()
        user.setUser({})
        user.setIsAuth(false)
        window.location.reload()
        history.push(LOGIN_ROUTE)
    }

    return (
        <Navbar variant="dark" style={{backgroundColor: '#212529'}}>
            <Container>
                <NavLink style={{color: 'white', textDecoration: 'none'}} to={LOGIN_ROUTE}>Личный кабинет. Публикации</NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto">
                        <Button
                            variant={'outline-secondary'}
                            style={{color: 'white', boxShadow: "none"}}
                            onClick={() => setAdminPanelVisible(true)}
                        >Админ панель</Button>
                        <AdminPanel show={adminPanelVisible} onHide={() => setAdminPanelVisible(false)}/>
                        <Button
                            variant={'outline-secondary'}
                            style={{color: 'white', boxShadow: "none", marginLeft: '10px'}}
                            onClick={logOut}
                        >
                            Выйти</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button
                            variant={'outline-secondary'}
                            style={{color: 'white', boxShadow: "none"}}
                            onClick={() => history.push(LOGIN_ROUTE)}
                        > 
                            Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;