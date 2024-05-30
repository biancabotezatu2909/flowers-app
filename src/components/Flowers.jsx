import React from 'react';

const Flowers = [
  {
      id: "1",
      name: "Rose",
      color: "Red",
      sunlight: "Full Sun",
      watering: "Regular",
  },
  {
      id: "2",
      name: "Tulip",
      color: "Various",
      sunlight: "Partial Sun",
      watering: "Moderate",
  },
  {
      id: "3",
      name: "Orchid",
      color: "Various",
      sunlight: "Indirect Sunlight",
      watering: "Weekly",
  },
  {
      id: "4",
      name: "Sunflower",
      color: "Yellow",
      sunlight: "Full Sun",
      watering: "Regular",
  },
  {
      id: "5",
      name: "Lily",
      color: "Various",
      sunlight: "Partial Sun",
      watering: "Regular",
  },
  {
      id: "6",
      name: "Daisy",
      color: "White",
      sunlight: "Full Sun",
      watering: "Regular",
  },
  {
      id: "7",
      name: "Lavender",
      color: "Purple",
      sunlight: "Full Sun",
      watering: "Low",
  },
  {
      id: "8",
      name: "Cherry Blossom",
      color: "Pink",
      sunlight: "Partial Sun",
      watering: "Regular",
  },
  {
      id: "9",
      name: "Peony",
      color: "Pink",
      sunlight: "Partial Sun",
      watering: "Regular",
  },
  {
      id: "10",
      name: "Daffodil",
      color: "Yellow",
      sunlight: "Full Sun",
      watering: "Regular",
  }
];

function FlowerList() {
  return (
    <div>
      <h1>Flowers JSON</h1>
      <pre>{JSON.stringify(Flowers, null, 2)}</pre>
    </div>
  );
}

export default FlowerList;
