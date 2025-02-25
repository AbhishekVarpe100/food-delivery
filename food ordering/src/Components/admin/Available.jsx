import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Button, Grid, Container } from '@mui/material';

function Available() {
  const [data, setData] = useState([]);
  const [delete_, setDelete] = useState(false);
  const [page, setPage] = useState(3);

  async function getData() {
    const res = await axios("http://localhost:3000/get-data");
    setData(res.data);
  }
  
  const handleDelete = async (id) => {
    const res = await axios.delete(`http://localhost:3000/delete-item/${id}`);
    if (res.data === 'deleted') {
      setDelete((prev) => !prev);
    }
  };

  const handleNext = async () => {
    const updatedPage = page + 3;
    setPage(updatedPage);
    const res = await axios.post('http://localhost:3000/next-page', { page: updatedPage });
    if (res) {
      setData(res.data);
    }
  };

  const handlePrevious = async () => {
    const updatedPage = page - 3;
    setPage(updatedPage);
    const res = await axios.post('http://localhost:3000/prev-page', { page: updatedPage });
    if (res) {
      setData(res.data);
    }
  };

  useEffect(() => {
    getData();
  }, [delete_]);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      {/* Heading */}
      <Container>
        <div className="text-center mb-10">
          <Typography variant="h4" component="h1" className="font-bold text-gray-700">
            Available Food Items
          </Typography>
          <Typography variant="body1" className="text-gray-600 mt-2">
            Total items available: <strong>{data.length}</strong>
          </Typography>

          {/* Pagination Buttons */}
          <div className="flex justify-center space-x-4 mt-6">
            <Button 
              variant="contained" 
              color="secondary"
              disabled={page - 3 <= 0}
              onClick={handlePrevious}
            >
              Previous
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              disabled={data.length < 3}
              onClick={handleNext}
            >
              Next
            </Button>
          </div>
        </div>

        {/* Food Items Grid */}
        <Grid container spacing={4}>
          {data.length > 0 ? (
            data.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item._id}>
                <Card 
                  sx={{
                    borderRadius: 3, 
                    boxShadow: 3, 
                    transition: "transform 0.3s", 
                    "&:hover": { transform: "scale(1.05)" }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={`http://localhost:3000/Food_Images/${item.file}`}
                    alt={item.name}
                  />
                  <CardContent>
                    <Typography variant="h6" className="font-semibold text-gray-800">
                      {item.name}
                    </Typography>
                    <Typography variant="body1" className="text-gray-600">
                      <strong>Price:</strong> {item.price} Rs.
                    </Typography>
                    <Typography variant="body2" className="text-gray-500">
                      <strong>Quantity Available:</strong> {item.quantity}
                    </Typography>

                    {/* Action Buttons */}
                    <div className="mt-4 flex flex-col space-y-2">
                      <Button 
                        variant="contained" 
                        color="error"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </Button>
                      <Link to={`/admin/update-price/${item._id}`} style={{ textDecoration: "none" }}>
                        <Button variant="contained" color="info">
                          Update Price
                        </Button>
                      </Link>
                      <Link to={`/admin/update-quantity/${item._id}`} style={{ textDecoration: "none" }}>
                        <Button variant="contained" color="success">
                          Update Quantity
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography className="text-center text-gray-500 w-full" variant="h6">
              No food items found.
            </Typography>
          )}
        </Grid>
      </Container>
    </div>
  );
}

export default Available;
