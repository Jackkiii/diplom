import React, {useContext, useState} from 'react';
import {Container, Form, Button, Card} from "react-bootstrap";
import {NavLink, useLocation, useHistory} from "react-router-dom";
import {LOGIN_ROUTE, PERSONALCABINET_ROUTE, PUBLICATIONLIST_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";


const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [full_name, setFullName] = useState('')
    const [tel, setTel] = useState('')

    const click = async () => {
        console.log('322')
        try {
            let data;
            if (isLogin){
                data = await login(email, password)
            } else {
                data = await registration(email, password, full_name, tel)
            }
            user.setUser(user)
            user.setIsAuth(true)
            console.log(data.role)
            if (data.role === 'ADMIN'){
                history.push(PUBLICATIONLIST_ROUTE)
            } else {
                history.push(PERSONALCABINET_ROUTE)
            }
        } catch (e) {
            alert(e.response.data.message)
        }

    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                {isLogin ?
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите пароль..."
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    </Form>
                    :
                    <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control className="mt-3" 
                    placeholder="Введите пароль..." 
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    />
                    <Form.Control className="mt-3" 
                    placeholder="Введите полное имя..." 
                    value={full_name} 
                    onChange={e => setFullName(e.target.value)} 
                    />
                    <Form.Control className="mt-3" 
                    placeholder="Введите номер телефона..." 
                    value={tel} 
                    onChange={e => setTel(e.target.value)} 
                    />
                    </Form>
                }
                    
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        {isLogin ?
                            <div style={{width: 'auto'}}>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войти</NavLink>
                            </div>
                        }
                        <Button
                            variant="outline-primary"
                            onClick={click}
                        >
                            {isLogin ? 'Войти' : 'Зарегистрироваться'}
                        </Button>
                    </div>
            </Card>
        </Container>
    );
});

export default Auth;