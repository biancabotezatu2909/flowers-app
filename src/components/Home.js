import React, { useEffect, useState } from 'react';
import Flower from './Flower'; // Import Flower component
import { Grid, Button, Pagination, Box } from '@mui/material'; // Import Grid, Button, Pagination, and Box components from Material-UI
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

function Home() {
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4); // Initial items per page

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/home')
      .then(response => response.json())
      .then(data => {
        setFlowers(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching flowers:', error));
  }, []);

  const handleDelete = (flowerId) => {
    // Filter out the flower with the given ID
    const updatedFlowers = flowers.filter(flower => flower.id !== flowerId);
    // Update the state with the filtered flowers
    setFlowers(updatedFlowers);
  };

  const handleUpdate = (updatedFlower) => {
    // Make a PUT request to update the flower in the database
    fetch(`http://localhost:3000/home${updatedFlower.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFlower),
    })
    .then(response => response.json())
    .then(data => {
      // Update the state with the updated flower data
      const updatedFlowers = flowers.map(flower =>
        flower.id === updatedFlower.id ? data : flower
      );
      setFlowers(updatedFlowers);
    })
    .catch(error => console.error('Error updating flower:', error));
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(flowers.length / itemsPerPage);

  // Change page
  const handleChangePage = (event, page) => {
    setCurrentPage(page);
  };

  // Calculate the index of the first and last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFlowers = flowers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>Flowers</h1>
          <Grid container spacing={2}>
            {currentFlowers.map((flower, i) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                <Flower
                  key={flower.id}
                  flower={flower}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                />
              </Grid>
            ))}
          </Grid>
          {/* Pagination controls */}
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChangePage}
            color="primary"
            size="large"
            siblingCount={1} // Number of pagination buttons to show before and after the current page
            boundaryCount={1} // Number of ellipsis buttons to show at the beginning and end
            showFirstButton
            showLastButton
            style={{ marginTop: '20px' }}
          />
          {/* Items per page selection */}
          <Box mt={2}>
            <span style={{ marginRight: '10px' }}>Items per page:</span>
            <Button variant={itemsPerPage === 4 ? 'contained' : 'outlined'} onClick={() => setItemsPerPage(4)}>4</Button>
            <Button variant={itemsPerPage === 8 ? 'contained' : 'outlined'} onClick={() => setItemsPerPage(8)}>8</Button>
            <Button variant={itemsPerPage === 12 ? 'contained' : 'outlined'} onClick={() => setItemsPerPage(12)}>12</Button>
          </Box>
          <br /> {/* Add a line break here */}
          <button
        onClick={() => navigate("/add-flower")}
        style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#4CAF50", /* Green background */
            color: "white", /* White text */
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", /* Add a shadow effect */
            transition: "0.3s" /* Add transition on hover */
        }}
        >
        Add Flower
        </button>
        <br /> {/* Add a line break here */}
        <br /> {/* Add a line break here */}
        <button
        onClick={() => navigate("/gardeners")}
        style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#008CBA", /* Blue background */
            color: "white", /* White text */
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", /* Add a shadow effect */
            transition: "0.3s" /* Add transition on hover */
        }}
        >
        Go to Gardeners
        </button>

                </div>
            )}
            </div>
        );
        }

export default Home;
