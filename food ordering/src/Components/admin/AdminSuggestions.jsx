import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Card, CardContent, Typography } from "@mui/material";

function AdminSuggestions() {
  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await axios.get("http://localhost:3000/get-all-suggestions");
    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <Typography variant="h4" component="h2" className="mb-6 text-gray-800">
          Customer Suggestions
        </Typography>

        {data.length > 0 ? (
          <div className="space-y-4">
            {data.map((item) => (
              <Card key={item._id} className="shadow-md rounded-lg">
                <CardContent className="p-5">
                  <Typography variant="h6" component="p" className="text-gray-700">
                    <span className="font-semibold">Suggested By:</span> {item.username}
                  </Typography>
                  <Typography variant="body1" component="p" className="text-gray-600">
                    <span className="font-semibold">Description:</span> {item.suggestion}
                  </Typography>
                  <Typography variant="body1" component="p" className="text-gray-600">
                    <span className="font-semibold">Replied:</span>{" "}
                    {!item.reply ? (
                      <span className="text-red-500 font-medium">Not Replied</span>
                    ) : (
                      <span className="text-green-600">{item.reply}</span>
                    )}
                  </Typography>

                  <div className="mt-4">
                    <Link to={`/admin/suggestions/reply/${item._id}`}>
                      <Button
                        variant="contained"
                        color="warning"
                      >
                        {!item.reply ? "Give Reply" : "Edit Reply"}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Typography className="text-center text-gray-500">
            No suggestions found.
          </Typography>
        )}
      </div>
    </div>
  );
}

export default AdminSuggestions;
