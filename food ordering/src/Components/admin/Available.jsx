import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { 
  Card, CardContent, CardMedia, Typography, Button, 
  Grid, Container, Box, Chip, IconButton, 
  Pagination, Paper, Divider, CircularProgress
} from '@mui/material';
import { 
  DeleteOutline, EditOutlined, AddShoppingCart, 
  NavigateBefore, NavigateNext, Inventory2Outlined 
} from '@mui/icons-material';

function Available() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [delete_, setDelete] = useState(false);
  const [page, setPage] = useState(3);
  const [totalItems, setTotalItems] = useState(0);

  async function getData() {  
    setLoading(true);
    try {
      const res = await axios("http://localhost:3000/get-data");
      setData(res.data.data);
      setTotalItems(res.data.total)
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }
  
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/delete-item/${id}`);
      if (res.data === 'deleted') {
        setDelete((prev) => !prev);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleNext = async () => {
    const updatedPage = page + 3;
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/next-page', { page: updatedPage });
      if (res) {
        setData(res.data);
        setPage(updatedPage);
      }
    } catch (error) {
      console.error("Error loading next page:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = async () => {
    const updatedPage = page - 3;
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/prev-page', { page: updatedPage });
      if (res) {
        setData(res.data);
        setPage(updatedPage);
      }
    } catch (error) {
      console.error("Error loading previous page:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [delete_]);

  // Calculate number of pages
  const pageCount = Math.ceil(totalItems / 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Paper 
        elevation={0}
        className="bg-gradient-to-r from-blue-800 to-indigo-900 py-8 px-4 mb-6 rounded-none"
      >
        <Container maxWidth="lg">
          <Typography variant="h4" component="h1" className="font-bold text-white text-center">
            Food Inventory Management
          </Typography>
          <Box className="flex justify-center mt-2">
            <Chip 
              icon={<Inventory2Outlined className="text-blue-200" />} 
              label={`${totalItems} Items Available`}
              className="bg-blue-700 text-white"
            />
          </Box>
        </Container>
      </Paper>

      <Container maxWidth="lg" className="pb-16">
        {/* Pagination Controls */}
        <Box className="flex justify-between items-center mb-8 px-4">
          <Button 
            variant="outlined" 
            color="primary"
            disabled={page - 3 <= 0}
            onClick={handlePrevious}
            startIcon={<NavigateBefore />}
            className="hover:bg-blue-50"
          >
            Previous
          </Button>
          
          <Typography variant="body1" className="text-gray-600 font-medium">
            Page {Math.ceil(page / 3)} of {pageCount || 1}
          </Typography>
          
          <Button 
            variant="outlined" 
            color="primary"
            disabled={data.length < 3}
            onClick={handleNext}
            endIcon={<NavigateNext />}
            className="hover:bg-blue-50"
          >
            Next
          </Button>
        </Box>

        {/* Loading State */}
        {loading && (
          <Box className="flex justify-center my-16">
            <CircularProgress color="primary" />
          </Box>
        )}

        {/* No Items State */}
        {!loading && data.length === 0 && (
          <Paper elevation={1} className="py-16 px-4 text-center">
            <Typography variant="h6" className="text-gray-500">
              No food items available in inventory.
            </Typography>
          </Paper>
        )}

        {/* Food Items Grid */}
        {!loading && data.length > 0 && (
          <Grid container spacing={4}>
            {data.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item._id}>
                <Card 
                  elevation={2}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <Box className="relative">
                    <CardMedia
                      component="img"
                      height="200"
                      image={`http://localhost:3000/Food_Images/${item.file}`}
                      alt={item.name}
                      className="h-48 object-cover"
                    />
                    <Chip
                      label={`${item.quantity} Available`}
                      size="small"
                      color={item.quantity > 10 ? "success" : item.quantity > 5 ? "warning" : "error"}
                      className="absolute top-2 right-2"
                    />
                  </Box>
                  
                  <CardContent>
                    <Typography variant="h6" className="font-bold text-gray-800 mb-1">
                      {item.name}
                    </Typography>
                    
                    <Typography variant="h5" className="text-yellow-600 font-semibold mb-3">
                      ₹{item.price}
                    </Typography>
                    
                    <Divider className="my-3" />
                    
                    <Box className="flex justify-between gap-2 mt-4">
                      <IconButton 
                        color="error" 
                        onClick={() => handleDelete(item._id)}
                        className="hover:bg-red-50"
                      >
                        <DeleteOutline />
                      </IconButton>
                      
                      <Link to={`/admin/update-price/${item._id}`} className="flex-1">
                        <Button 
                          variant="outlined" 
                          color="warning"
                          fullWidth
                          startIcon={<EditOutlined />}
                          size="small"
                        >
                          Price
                        </Button>
                      </Link>
                      
                      <Link to={`/admin/update-quantity/${item._id}`} className="flex-1">
                        <Button 
                          variant="contained" 
                          color="warning"
                          fullWidth
                          startIcon={<AddShoppingCart />}
                          size="small"
                        >
                          Quantity
                        </Button>
                      </Link>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
}

export default Available;