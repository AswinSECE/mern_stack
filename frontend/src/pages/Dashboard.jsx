import { useState, useEffect } from 'react';
import Card from '../components/Card';
import Table from '../components/Table';
import { productService } from '../services/productService';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStock: 0,
    totalSales: 0,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productService.getAll();
      const productsData = response.data.products || [];
      setProducts(productsData);

      // Calculate stats
      const totalProducts = productsData.length;
      const lowStock = productsData.filter((p) => (p.quantity || 0) < (p.minStock || 0)).length;
      const totalSales = productsData.reduce((sum, p) => sum + ((p.price || 0) * (p.quantity || 0)), 0);

      setStats({ totalProducts, lowStock, totalSales });
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const lowStockProducts = products.filter((p) => (p.quantity || 0) < (p.minStock || 0));
  const recentProducts = products.slice(0, 5).map((p) => ({
    id: p._id || p.id,
    Name: p.name,
    SKU: p.sku || 'N/A',
    Stock: p.quantity || 0,
    Status: (p.quantity || 0) < (p.minStock || 0) ? 'Low' : 'OK',
  }));

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-2">Welcome to ProdMaster – manage your store inventory and products</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Total Products" value={loading ? '...' : stats.totalProducts} icon="📦" />
        <Card title="Low Stock Items" value={loading ? '...' : stats.lowStock} icon="⚠️" />
        <Card title="Total Value" value={loading ? '...' : `$${stats.totalSales.toFixed(2)}`} icon="💰" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stock Trend */}
        <div className="bg-white border border-slate-200 rounded p-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Weekly Stock Trend</h3>
          <div className="flex items-end justify-around h-40 gap-2">
            {[60, 75, 45, 80, 90, 70, 85].map((height, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1">
                <div className="w-full bg-blue-100 rounded-t" style={{ height: `${height}px` }}></div>
                <span className="text-xs text-slate-500 mt-2">W{idx + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white border border-slate-200 rounded p-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Products by Category</h3>
          <div className="space-y-3">
            {loading ? (
              <p className="text-sm text-slate-500">Loading...</p>
            ) : (() => {
              const categoryCounts = products.reduce((acc, p) => {
                const cat = p.category || 'Uncategorized';
                acc[cat] = (acc[cat] || 0) + 1;
                return acc;
              }, {});
              const maxCount = Math.max(...Object.values(categoryCounts), 1);

              return Object.entries(categoryCounts).map(([name, count], idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-slate-700">{name}</span>
                    <span className="text-slate-500">{count}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${(count / maxCount) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ));
            })()}
          </div>
        </div>
      </div>

      {/* Recent Products & Low Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Products Table */}
        <div className="lg:col-span-2">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-slate-900">Recent Products</h3>
          </div>
          <Table
            columns={['Name', 'SKU', 'Stock', 'Status']}
            data={recentProducts}
            onEdit={() => { }}
            onDelete={() => { }}
          />
        </div>

        {/* Low Stock Alert Sidebar */}
        <div className="bg-white border border-slate-200 rounded p-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Low Stock Alert</h3>
          {lowStockProducts.length > 0 ? (
            <div className="space-y-3">
              {lowStockProducts.map((product) => (
                <div key={product.id} className="p-3 bg-amber-50 border border-amber-200 rounded text-sm">
                  <p className="font-medium text-slate-900">{product.name}</p>
                  <p className="text-xs text-slate-600 mt-1">
                    Stock: {product.quantity} / Min: {product.minStock}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">All products have sufficient stock</p>
          )}
        </div>
      </div>
    </div>
  );
}
