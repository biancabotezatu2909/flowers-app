import React, { useState } from 'react';
import { Button, Form, Container, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Import your Login.css file


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    let navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Failed to login');
            }
            const data = await response.json();
            localStorage.setItem('token', data.token);
            navigate('/home'); 
        } catch (error) {
            console.error('Login error:', error);
            setError('Failed to login. Please check your credentials and try again.');
        }
    };

    return (
        <div className="floral-background">
            <Container className="form-container-log-in"> {/* Add the form-container class to center the form */}
                {error && <Alert variant="danger">{error}</Alert>}
                <h2 className="floral-header">Login</h2><br/>
                <Form onSubmit={handleLogin}>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <br/>
                    <Button className="login-button" variant="dark" type="submit">
                    Login
                    </Button>

                </Form>
                <p className="mt-3">
                    Don't have an account? <Link to="/register" className="register-link">Register</Link> 
                </p>

            </Container>
        </div>
    );
}

export default Login;
