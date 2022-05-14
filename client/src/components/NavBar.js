import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {Nav, Navbar} from "react-bootstrap"
import {Container, Button} from "react-bootstrap";
import {NavLink} from "react-router-dom"
import {LOGIN_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import AdminPanel from "./modals/AdminPanel";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const [adminPanelVisible, setAdminPanelVisible] = useState(false)
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
                        <Button variant={'outline-secondary'} style={{color: 'white', boxShadow: "none", marginLeft: '10px'}}>Выйти</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button variant={'outline-secondary'} style={{color: 'white', boxShadow: "none"}} onClick={() => user.setIsAuth(true)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;