import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Grid } from '@mui/material';

function Admin_Cart() {

  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await axios.get('http://localhost:3000/get-admin-cart');
    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {data.length > 0 ? (
        <Grid container spacing={4}>
          {data.map((username, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className="shadow-md">
                <CardContent>
                  <Typography variant="h6" component="p" className="text-gray-700">
                    Customer Name
                  </Typography>
                  <Link title={`Username: ${username}`} to={`/admin/cart/${username}`}>
                    <Typography variant="body1" component="p" className="text-yellow-500 underline hover:text-yellow-400">
                      {username}
                    </Typography>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <div className="text-center mt-4 text-gray-500">No users found</div>
      )}
    </div>
  );
}

export default Admin_Cart;
