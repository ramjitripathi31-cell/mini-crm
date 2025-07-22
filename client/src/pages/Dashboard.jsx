import { useAuth } from '../App';
import CustomerList from '../components/CustomerList';

export default function Dashboard() {
  const { logout } = useAuth();
  return (
    <div className="p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Mini CRM Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </header>

     <div className="min-h-screen bg-gray-50">
      <CustomerList />
    </div>
    </div>
  );
}
