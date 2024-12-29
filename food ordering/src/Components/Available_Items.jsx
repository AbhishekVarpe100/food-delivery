import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Available_Items() {
  const [data, setData] = useState([]);
  const [delete_, setDelete] = useState(false);

  async function getData() {
    const res = await axios("http://localhost:3000/get-data");
    setData(res.data);
  }

  useEffect(() => {
    getData();
  }, [delete_]);

  return (
    <div className="flex flex-wrap justify-center gap-8 p-6 bg-gray-100 min-h-screen">
      {data.length > 0 ? (
        data.map((item) => (
          <div title={item.name} key={item._id}>
            <Link to={`/main_home/${item._id}`}>
              <div className="bg-white border border-gray-200 rounded-lg shadow-md w-72 hover:shadow-xl transition-shadow duration-300">
                <img
                  loading="lazy"
                  src={`http://localhost:3000/Food_Images/${item.file}`}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-5">
                  <h2 className="text-xl font-serif text-gray-800 mb-2">
                    {item.name}
                  </h2>
                  <div className="text-gray-700 mb-2">
                    <span className="font-medium">Price:</span> {item.price} Rs. / item
                  </div>
                  <div>
                    {item.quantity <= 5 ? (
                      <span className="text-sm font-medium text-red-600 italic">
                        Hurry up, limited stock available!
                      </span>
                    ) : null}
                  </div>
                  <div className="text-gray-700 mt-2">
                    <span className="font-medium">Quantity Available:</span> {item.quantity} items
                  </div>
                  
                </div>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <div className="text-gray-500 text-lg font-medium mt-10">
          No food items are found.
        </div>
      )}
    </div>
  );
}

export default Available_Items;
