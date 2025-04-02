import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button, 
  Typography, 
  Container, 
  Box, 
  CircularProgress, 
  Chip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PaidIcon from '@mui/icons-material/Paid';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

function Orders_cust() {
  const [data, setData] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:3000/get-orders', {
        params: { username: localStorage.getItem('username') },
      });
      setData(res.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/delete-order/${id}`);
      if (res.data === 'deleted') {
        setSuccess((prev) => !prev);
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  useEffect(() => {
    getData();
  }, [success]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          align="center" 
          gutterBottom 
          sx={{ 
            mb: 4, 
            fontFamily: 'serif', 
            color: 'primary.main',
            fontWeight: 'medium'
          }}
        >
          My Orders
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper} elevation={2}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'primary.main' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Item Name</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Quantity</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Total Price</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Action</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Payment</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.length > 0 ? (
                  data.map((item, index) => (
                    <TableRow 
                      key={index}
                      sx={{ 
                        '&:nth-of-type(odd)': { backgroundColor: 'rgba(0, 0, 0, 0.03)' },
                        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.07)' },
                        transition: 'background-color 0.2s'
                      }}
                    >
                      <TableCell sx={{ fontWeight: 'medium' }}>{item.item_name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.price} Rs.</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <Button 
                            variant="contained" 
                            color="error" 
                            size="small"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleDelete(item._id)}
                          >
                            Delete
                          </Button>
                          
                          <Button
                            component={Link}
                            to={`/main_home/orders/status/${item._id}`}
                            variant="outlined" 
                            color="primary"
                            size="small"
                            startIcon={<InfoIcon />}
                          >
                            Item Status
                          </Button>
                          
                          {item.delivered && (
                            <Chip
                              icon={<CheckCircleIcon />}
                              label="Item Delivered Successfully"
                              color="success"
                              size="small"
                              sx={{ mt: 1 }}
                            />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={item.payment === 'paid' ? <PaidIcon /> : <LocalShippingIcon />}
                          label={item.payment === 'paid' ? 'Paid' : 'Cash on Delivery'}
                          color={item.payment === 'paid' ? 'info' : 'default'}
                          variant="outlined"
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 4, fontStyle: 'italic', color: 'text.secondary' }}>
                      You have not ordered anything yet...!
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Container>
  );
}

export default Orders_cust;