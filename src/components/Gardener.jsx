import React, { Fragment, useState, useEffect } from 'react';
import { Button, Table, Pagination, FormSelect } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function GardenersList() {
    const [gardeners, setGardeners] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [error, setError] = useState(null);

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    };

    useEffect(() => {
        fetch('http://localhost:3000/gardener/all') 
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch gardeners");
                }
                return response.json();
            })
            .then(data => setGardeners(data))
            .catch(error => {
                console.error("Error fetching gardeners:", error);
                setError("Failed to fetch gardeners. The server may be down.");
            });
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this gardener?')) {
            fetch(`http://localhost:3000/gardener/${id}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                console.log('Delete successful', data);
                setGardeners(prevGardeners => prevGardeners.filter(gardener => gardener.id !== id));
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    };

    const indexOfLastItem = activePage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = gardeners.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <Fragment>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <div style={{ margin: '5rem' }}>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems && currentItems.length > 0 ? (
                            currentItems.map((gardener) => (
                                <tr key={gardener.id}>
                                    <td>{gardener.name}</td>
                                    <td>{gardener.age}</td>
                                    <td>{gardener.experience}</td>
                                    <td>
                                        <Link to={`/gardener/edit`} >
                                            <Button variant="dark">Edit</Button>
                                        </Link>
                                        &nbsp;
                                        <Button variant="dark" onClick={() => handleDelete(gardener.id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <Pagination>
                    {Array.from({ length: Math.ceil(gardeners.length / itemsPerPage) }, (_, i) => (
                        <Pagination.Item key={i} active={i + 1 === activePage} onClick={() => handlePageChange(i + 1)}>
                            {i + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
                <FormSelect value={itemsPerPage} onChange={(e) => setItemsPerPage(e.target.value)}>
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="7">7</option>
                    <option value="10">10</option>
                </FormSelect>
                <Link className="d-grid gap-2" to="/gardener/create">
                    <Button variant="dark" size="lg">Add Gardener</Button>
                </Link>
                <br/>
                <Link className="d-grid gap-2" to="/home">
                    <Button variant="dark" size="medium" >Return to Home</Button>
                </Link>
            </div>
        </Fragment>
    );
}

export default GardenersList;
