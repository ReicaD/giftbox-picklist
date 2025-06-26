'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [pickList, setPickList] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPickList();
  }, [date]);

  const fetchPickList = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/picklist?date=${date}`);
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'Failed to fetch pick list');
      
      setPickList(data.pickList);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Warehouse Pick List</h1>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Select Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border rounded p-2"
          />
        </div>

        {loading && <p>Loading pick list...</p>}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pickList.map(({ product, quantity }) => (
                  <tr key={product}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
