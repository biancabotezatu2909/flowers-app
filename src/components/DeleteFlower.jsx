import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function DeleteFlower() {
    let navigate = useNavigate();

    const handleDelete = () => {
        // Implement delete logic here
        // For example, send a delete request to your backend API
        fetch('http://localhost:3000/flowers/:id', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            navigate("/");
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <div>
            <Button variant="danger" onClick={handleDelete}>Delete Flower</Button>
        </div>
    );
}

export default DeleteFlower;
