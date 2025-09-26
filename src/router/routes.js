import { Route, Routes } from 'react-router-dom';
import SplashScreen from '../components/SplashScreen';
import Login from '../components/Login';
import HomeScreen from '../components/HomeScreen';
import RideConfirmation from '../components/RideConfirmation';
import LiveTracking from '../components/LiveTracking';
import PaymentPage from '../components/PaymentPage';
import RideHistory from '../components/RideHistory';

export const Routes = () => (
  <Routes>
    <Route path="/" element={<SplashScreen />} />
    <Route path="/login" element={<Login />} />
    <Route path="/home" element={<HomeScreen />} />
    <Route path="/ride-confirmation" element={<RideConfirmation />} />
    <Route path="/live-tracking" element={<LiveTracking />} />
    <Route path="/payment" element={<PaymentPage />} />
    <Route path="/ride-history" element={<RideHistory />} />
  </Routes>
);
