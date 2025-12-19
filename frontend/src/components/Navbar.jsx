import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-20 bg-white border-b border-slate-200">
      <div className="px-6 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold text-slate-900 hidden md:block">ProdMaster</h2>
        </div>
        <div className="flex items-center gap-4">
          {isAuthenticated && user && (
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-600">
                {user.name} ({user.role})
              </span>
              <Button
                onClick={handleLogout}
                variant="secondary"
                className="text-xs px-3 py-1"
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
