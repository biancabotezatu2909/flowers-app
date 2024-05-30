import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AddFlower() {
    const [flowerName, setFlowerName] = useState('');
    const [flowerColor, setFlowerColor] = useState('');
    const [sunlight, setSunlight] = useState('');
    const [watering, setWatering] = useState('');

    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const flowerData = {
            name: flowerName,
            color: flowerColor,
            sunlight: sunlight,
            watering: watering
        };
    
        fetch('http://localhost:3000/flowers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(flowerData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            navigate("/flowers");
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <div>
            <Form onSubmit={handleSubmit} className="d-grid gap-2" style={{ margin: "15rem" }}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Control
                        type="text"
                        placeholder="Enter Flower Name"
                        value={flowerName}
                        onChange={(e) => setFlowerName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formColor">
                    <Form.Control
                        type="text"
                        placeholder="Enter Flower Color"
                        value={flowerColor}
                        onChange={(e) => setFlowerColor(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formSunlight">
                    <Form.Control
                        type="text"
                        placeholder="Enter Sunlight Requirement"
                        value={sunlight}
                        onChange={(e) => setSunlight(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formWatering">
                    <Form.Control
                        type="text"
                        placeholder="Enter Watering Frequency"
                        value={watering}
                        onChange={(e) => setWatering(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="secondary" onClick={(e) => handleSubmit(e)} type="submit">Submit</Button>         
            </Form>
        </div>
    );
}

export default AddFlower;
