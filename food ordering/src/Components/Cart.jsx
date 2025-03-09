import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";

function Cart() {
  const [data, setData] = useState([]);
  const [render, setRender] = useState(false);
  const [page, setPage] = useState(false);
  const [rsp, setRsp] = useState(false);
  const navigate = useNavigate();

  const [orderData, setOrderData] = useState({
    full_name: "",
    mobile: "",
    address: "",
    username: localStorage.getItem("username"),
    email: localStorage.getItem("email"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };

  async function getData() {
    const res = await axios.get("http://localhost:3000/get-cart", {
      params: { username: localStorage.getItem("username") },
    });
    setData(res.data);
  }

  async function handleDelete(id) {
    const res = await axios.delete("http://localhost:3000/remove-cart/" + id);
    if (res.data === "deleted") {
      setRender((prev) => !prev);
    }
  }

  const handleOrder = async (e) => {
    e.preventDefault();
    setRsp(true);
    const res = await axios.post("http://localhost:3000/confirm-all-order", orderData);
    if (res.data === "ordered") {
      alert("Order confirmed!");
      setRsp(false);
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  };

  useEffect(() => {
    getData();
  }, [render, page]);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Your Cart
      </Typography>

      {data.length === 0 ? (
        <Card sx={{ textAlign: "center", p: 4 }}>
          <Typography variant="h6" color="textSecondary">
            Your cart is empty. Start shopping now!
          </Typography>
          <Button
            component={Link}
            to="/main_home"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Go to Shop
          </Button>
        </Card>
      ) : (
        <Paper elevation={3} sx={{ p: 3 }}>
          {!page ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Item Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((ele) => (
                    <TableRow key={ele._id}>
                      <TableCell>
                        <CardMedia
                          component="img"
                          sx={{ width: 80, height: 80, borderRadius: 2 }}
                          image={`http://localhost:3000/Food_Images/${ele.file}`}
                          alt={ele.name}
                        />
                      </TableCell>
                      <TableCell>{ele.name}</TableCell>
                      <TableCell>{ele.price} Rs.</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDelete(ele._id)}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button
                variant="contained"
                color="success"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => setPage(true)}
              >
                Order All
              </Button>
            </TableContainer>
          ) : (
            <Card sx={{ p: 3, maxWidth: 500, mx: "auto" }}>
              <Typography variant="h6" gutterBottom>
                Confirm Your Order
              </Typography>
              <form onSubmit={handleOrder}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="full_name"
                  variant="outlined"
                  margin="normal"
                  required
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Mobile Number"
                  name="mobile"
                  variant="outlined"
                  margin="normal"
                  required
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Home Address"
                  name="address"
                  variant="outlined"
                  margin="normal"
                  required
                  onChange={handleChange}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  disabled={rsp}
                >
                  {rsp ? <CircularProgress size={24} /> : "Confirm Order"}
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  sx={{ mt: 2 }}
                  onClick={() => setPage(false)}
                >
                  Back to Cart
                </Button>
              </form>
            </Card>
          )}
        </Paper>
      )}
    </Container>
  );
}

export default Cart;