import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Available_Items() {
  const [data, setData] = useState([]);
  const [delete_, setDelete] = useState(false);
  const [option,setOption]=useState('')


  async function getData() {
    const res = await axios.get("http://localhost:3000/get-data-cust");
    setData(res.data);
  } 

  const handleOption=async(e)=>{
    const option=e.target.value;
    const res= await axios.get('http://localhost:3000/order-by',{params:{option:option}})
    if(res.data){
      setData([])
      setData(res.data)
    }
  }

  useEffect(() => {
    getData();
  }, [delete_]);

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
  {/* Sorting Dropdown */}
  <form className="mb-8">
    <select
      className="border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:border-blue-500 transition-colors duration-300"
      onChange={handleOption}
    >
      <option value="">---Sort by---</option>
      <option value="price">Price</option>
      <option value="quantity">Quantity</option>
      <option value="name">Item name</option>
    </select>
  </form>

  {/* Items Grid */}
  {data.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {data.map((item) => (
        <div title={item.name} key={item._id}>
          <Link to={`/main_home/${item._id}`}>
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1">
              {/* Image */}
              <img
                loading="lazy"
                src={`http://localhost:3000/Food_Images/${item.file}`}
                alt={item.name}
                className="w-full h-56 object-cover rounded-t-lg"
              />
              {/* Content */}
              <div className="p-6">
                <h2 className="text-2xl font-serif text-gray-900 mb-3">
                  {item.name}
                </h2>
                <div className="text-gray-700 mb-3">
                  <span className="font-semibold">Price:</span> {item.price} Rs. / item
                </div>
                {item.quantity <= 5 && (
                  <div className="text-sm font-medium text-red-600 italic mb-3">
                    Hurry up, limited stock available!
                  </div>
                )}
                <div className="text-gray-700">
                  <span className="font-semibold">Quantity Available:</span> {item.quantity} items
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  ) : (
    <div className="text-gray-600 text-xl font-medium mt-10">
      No food items found.
    </div>
  )}
</div>
  );
}

export default Available_Items;
