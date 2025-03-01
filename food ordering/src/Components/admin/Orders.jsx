import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';

function Orders() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const res = await axios.get('http://localhost:3000/get-orders-data');
      setData(res.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <TableContainer component={Paper} sx={{ mt: 4, p: 2 }}>
      <Typography variant="h6" component="div" sx={{ mb: 2, fontWeight: 'bold' }}>
        Orders List
      </Typography>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
          <CircularProgress />
        </div>
      ) : (
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Order ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Customer Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Mobile Number</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Address</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Item Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Total Price</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.length > 0 ? (
              data.map((ele) => (
                <TableRow key={ele._id} hover>
                  <TableCell>{ele._id}</TableCell>
                  <TableCell>{ele.cust_name}</TableCell>
                  <TableCell>{ele.mobile}</TableCell>
                  <TableCell>{ele.addr}</TableCell>
                  <TableCell>{ele.item_name}</TableCell>
                  <TableCell>{ele.quantity}</TableCell>
                  <TableCell>{ele.price} Rs.</TableCell>
                  <TableCell>
                    <Button
                      component={Link}
                      to={`/admin/orders/update-status/${ele._id}`}
                      variant="contained"
                      color="warning"
                      size="small"
                    >
                      Update Status
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No orders yet 
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}

export default Orders;
