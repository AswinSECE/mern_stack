import { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import Button from '../components/Button';
import Table from '../components/Table';
import Modal from '../components/Modal';
import Alert from '../components/Alert';
import ProductForm from '../components/ProductForm';
import { productService } from '../services/productService';
import { useAuth } from '../context/AuthContext';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [alert, setAlert] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const { user } = useAuth();

  // Fetch products from backend
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAll();
      setProducts(response.data.products || []);
    } catch (error) {
      setAlert({
        message: error.response?.data?.message || 'Failed to fetch products',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories from products
  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Table data
  const tableData = filteredProducts.map((p) => ({
    id: p._id || p.id,
    Name: p.name,
    SKU: p.sku || 'N/A',
    Price: `$${p.price?.toFixed(2) || '0.00'}`,
    Quantity: p.quantity || 0,
    Category: p.category || 'Uncategorized',
  }));

  const handleAddProduct = () => {
    setEditingId(null);
    setIsFormOpen(true);
  };

  const handleEditProduct = (id) => {
    setEditingId(id);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await productService.delete(deleteId);
      setProducts(products.filter((p) => (p._id || p.id) !== deleteId));
      setIsDeleteModalOpen(false);
      setAlert({ message: 'Product deleted successfully!', type: 'success' });
    } catch (error) {
      setAlert({
        message: error.response?.data?.message || 'Failed to delete product',
        type: 'error',
      });
      setIsDeleteModalOpen(false);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingId) {
        await productService.update(editingId, formData);
        setAlert({ message: 'Product updated successfully!', type: 'success' });
      } else {
        await productService.create(formData);
        setAlert({ message: 'Product added successfully!', type: 'success' });
      }
      setIsFormOpen(false);
      fetchProducts(); // Refresh products list
    } catch (error) {
      setAlert({
        message: error.response?.data?.message || 'Failed to save product',
        type: 'error',
      });
    }
  };

  const editingProduct = editingId ? products.find((p) => (p._id || p.id) === editingId) : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Products</h1>
          <p className="text-slate-600 mt-2">Manage and organize your product catalog</p>
        </div>
        {user?.role === 'admin' && (
          <Button onClick={handleAddProduct} className="flex items-center gap-2">
            <Plus size={18} />
            Add Product
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded p-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by name or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm bg-white"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Results Count */}
        <div className="text-xs text-slate-500 font-medium">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="bg-white border border-slate-200 rounded p-8 text-center">
          <p className="text-slate-600">Loading products...</p>
        </div>
      ) : tableData.length > 0 ? (
        <Table
          columns={['Name', 'SKU', 'Price', 'Quantity', 'Category']}
          data={tableData}
          onEdit={user?.role === 'admin' ? handleEditProduct : undefined}
          onDelete={user?.role === 'admin' ? handleDeleteClick : undefined}
        />
      ) : (
        <div className="bg-white border border-slate-200 rounded p-8 text-center">
          <p className="text-slate-600">No products found. Add your first product!</p>
        </div>
      )}

      {/* Product Form Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingId ? 'Edit Product' : 'Add New Product'}
      >
        <ProductForm
          product={editingProduct}
          categories={categories}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormOpen(false)}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Product"
        onConfirm={handleDeleteConfirm}
        confirmText="Delete"
      >
        <p className="text-slate-700">Are you sure you want to delete this product? This action cannot be undone.</p>
      </Modal>

      {/* Alert */}
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
    </div>
  );
}
