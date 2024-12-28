import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Update_Status() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [status, setStatus] = useState([]);
  const [reload, setReload] = useState(false);

  const getData = async () => {
    const res = await axios.get('http://localhost:3000/get-status/' + id);
    setData(res.data);
  };

  useEffect(() => {
    getData();
    updateStatus();
  }, [status]);

  const updateStatus = async () => {
    const res = await axios.put('http://localhost:3000/update-status/' + id, status);
  };

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setStatus([name, checked]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Update Status</h1>
        <form className="space-y-6">
          <div className="flex items-center justify-between">
            <label htmlFor="ordered" className="text-gray-700 font-medium">
              Ordered
            </label>
            <input
              disabled
              checked={data.ordered}
              type="checkbox"
              id="ordered"
              className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="packed" className="text-gray-700 font-medium">
              Packed
            </label>
            <input
              name="packed"
              checked={data.packed}
              type="checkbox"
              id="packed"
              onChange={handleChange}
              className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="dispatched" className="text-gray-700 font-medium">
              Dispatched
            </label>
            <input
              name="dispached"
              checked={data.dispached}
              type="checkbox"
              id="dispatched"
              onChange={handleChange}
              className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="shipped" className="text-gray-700 font-medium">
              Shipped
            </label>
            <input
              name="shipped"
              checked={data.shipped}
              type="checkbox"
              id="shipped"
              onChange={handleChange}
              className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="delivered" className="text-gray-700 font-medium">
              Delivered
            </label>
            <input
              name="delivered"
              checked={data.delivered}
              type="checkbox"
              id="delivered"
              onChange={handleChange}
              className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Update_Status;
