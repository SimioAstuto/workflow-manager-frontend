import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import ForgotPassword from './routes/ForgotPassword';
import ResetPassword from './routes/ResetPassword';

import Dashboard from './routes/Dashboard';
import JobForm from './routes/JobForm';
import AccountSettings from './routes/AccountSettings';

export default function App() {
  return (
    <BrowserRouter>
      <header>
        <NavBar />
      </header>

      <main className="App">
        <Routes>
          {/* Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/jobs/new" element={<JobForm />} />
            <Route path="/settings" element={<AccountSettings />} />
          </Route>
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}
