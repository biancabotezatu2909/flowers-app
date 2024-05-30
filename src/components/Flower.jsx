import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

function Flower({ flower, onDelete, onUpdate }) {
  const photoPath = `/${flower.id}.jpg`; // Generate photo path based on flower ID

  // Define a mapping of flower colors to card background colors
  const colorMap = {
    'Red': '#ffcccc',
    'Yellow': '#fff9cc',
    'Pink': '#ffd9e6',
    'Purple': '#e6ccff',
    'Various': '#ccffcc',
    'White': '#f0f0f0', // Default background color for unknown colors
  };

  // Get the background color for the current flower based on its color
  const backgroundColor = colorMap[flower.color] || colorMap['Various'];

  return (
    <Card variant="outlined" style={{ margin: '10px', maxWidth: '200px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', backgroundColor, fontFamily: 'cursive' }}>
      <CardContent style={{ color: '#333' }}>
        <img src={photoPath} alt={flower.name} style={{ width: '100%', borderRadius: '10px', marginBottom: '10px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)' }} />
        <Typography variant="h5" component="h2" style={{ marginBottom: '5px', fontSize: '18px' }}>
          {flower.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom style={{ fontSize: '14px' }}>
          Color: {flower.color}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom style={{ fontSize: '14px' }}>
          Sunlight: {flower.sunlight}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom style={{ fontSize: '14px' }}>
          Watering: {flower.watering}
        </Typography>
        <div style={{ marginTop: '10px' }}>
          <Button variant="contained" color="primary" onClick={() => onDelete(flower.id)}>Delete</Button>
          <Button variant="contained" color="secondary" style={{ marginLeft: '10px' }} onClick={() => onUpdate(flower)}>Update</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default Flower;
