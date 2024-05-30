import React, { useState } from 'react';
import { Button, Form, Container, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css'; // Import your Login.css file


function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    let navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Failed to register');
            }
            const data = await response.json();
            localStorage.setItem('token', data.token);
            navigate('/home'); 
        } catch (error) {
            console.error('Registration error:', error);
            setError('Failed to register. Please try again.');
        }
    };

    return (
        <div className="floral-background">
            <Container className="form-container-register"> {/* Add the form-container class to center the form */}
                {error && <Alert variant="danger">{error}</Alert>}
                <h2 className="floral-header">Register</h2><br/>
                <Form onSubmit={handleRegister}>
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
                    <Form.Group controlId="formConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>
                    <br/>
                    <Button className="register-button" variant="dark" type="submit">
                    Register
                    </Button>

                </Form>
                <p className="mt-3">
                    Already have an account? <Link to="/" className="log-in-link">Login</Link> 
                </p>

            </Container>
        </div>
    );
}

export default Register;
