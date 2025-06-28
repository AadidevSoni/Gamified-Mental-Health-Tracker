import { Outlet } from 'react-router-dom';
import Navigation from './pages/auth/Navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div style={{ display: 'flex' }}>
      <ToastContainer />
      <Navigation />
      <main style={{ marginLeft: '6%', width: '94%' }}>
        <Outlet />
      </main>
    </div>
  );
}

export default App