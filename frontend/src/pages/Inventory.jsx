import { useState, useEffect } from 'react';
import { productService } from '../services/productService';

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productService.getAll();
      setProducts(response.data.products || []);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const inventoryStats = [
    { label: 'Total Items', value: products.length },
    { label: 'Total Stock', value: products.reduce((sum, p) => sum + (p.quantity || 0), 0) },
    { label: 'Low Stock', value: products.filter((p) => (p.quantity || 0) < (p.minStock || 0)).length },
  ];

  const inventoryData = products.map((product) => {
    const quantity = product.quantity || 0;
    const minStock = product.minStock || 0;
    const status = quantity < minStock ? 'Low' : 'OK';
    return {
      id: product._id || product.id,
      'Product Name': product.name,
      'Current Stock': quantity,
      'Min Stock': minStock,
      Status: status,
      _isLow: status === 'Low',
    };
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900">Inventory</h1>
        <p className="text-slate-600 mt-2">Track stock levels and manage product availability</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {inventoryStats.map((stat, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded p-6">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{stat.label}</p>
            <p className="text-3xl font-semibold text-slate-900 mt-3">{loading ? '...' : stat.value}</p>
          </div>
        ))}
      </div>

      {/* Inventory List */}
      <div className="bg-white border border-slate-200 rounded overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-600">Loading inventory...</div>
        ) : inventoryData.length === 0 ? (
          <div className="p-8 text-center text-slate-600">No products in inventory</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">Product</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">Current Stock</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">Min Stock</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-slate-700 uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.map((row, idx) => (
                <tr
                  key={row.id}
                  className={`border-b border-slate-200 transition-colors hover:bg-slate-50 ${row._isLow ? 'bg-red-50' : idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                    }`}
                >
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{row['Product Name']}</td>
                  <td className="px-6 py-4 text-sm text-slate-700">{row['Current Stock']}</td>
                  <td className="px-6 py-4 text-sm text-slate-700">{row['Min Stock']}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold ${row._isLow ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                      {row.Status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Low Stock Products */}
      {inventoryData.some((r) => r._isLow) && (
        <div className="bg-amber-50 border border-amber-200 rounded p-6">
          <h3 className="text-sm font-semibold text-amber-900 mb-4">⚠️ Low Stock Products</h3>
          <div className="space-y-2">
            {inventoryData
              .filter((r) => r._isLow)
              .map((row) => (
                <div key={row.id} className="flex items-center justify-between p-3 bg-white border border-amber-100 rounded text-sm">
                  <span className="font-medium text-slate-900">{row['Product Name']}</span>
                  <div className="text-xs text-slate-600">
                    {row['Current Stock']} / {row['Min Stock']}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
