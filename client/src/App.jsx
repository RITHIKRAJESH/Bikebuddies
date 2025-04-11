import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import CompletedRides from "./components/rider/completedRids";
import Viewrating from "./components/rider/viewrating";
// import 'bootstrap/dist/css/bootstrap.min.css';

// Lazy-loaded components
const HomePage = lazy(() => import("./components/Homepage"));
const RegisterPage = lazy(() => import("./components/registeruser"));
const LoginPage = lazy(() => import("./components/Loginpage"));
const BookRide = lazy(() => import("./components/user/Bookride"));
const RideHistory = lazy(() => import("./components/user/rideHistory"));
const Riderhome = lazy(() => import("./components/rider/Riderhome"));
const Viewvehicles = lazy(() => import("./components/rider/viewvehicles"));
const Addvehicle = lazy(() => import("./components/rider/addvehicle/addvehicle"));
const RiderViewbookings = lazy(() => import("./components/rider/viewbookings"));
const AdminDashboard = lazy(() => import("./components/admin/admindashboard"));
const Profile=lazy(()=> import("./components/user/profile"))
const RiderProfile=lazy(()=> import("./components/rider/profile"))
// const Viewusers = lazy(() => import("./components/admin/viewusers"));
// const Viewreviews = lazy(() => import("./components/admin/viewreviews"));
// const Verifyrider = lazy(() => import("./components/admin/verifyrider"));
// const ViewRides = lazy(() => import("./components/admin/viewRides"));

// Loading fallback component
const Loading = () => <div style={{ textAlign: "center", marginTop: "20%" }}>Loading...</div>;

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<HomePage />} />
        
        {/* Authentication */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* User Routes */}
        <Route path="/user/bookride" element={<BookRide />} />
        <Route path="/user/history" element={<RideHistory />} />
        <Route path="/user/profile" element={<Profile />} />
        {/* Rider Routes */}
        <Route path="/rider/*" element={<Riderhome />} />
        <Route path="/rider/viewvehicle" element={<Viewvehicles />} />
        <Route path="/rider/addvehicle" element={<Addvehicle />} />
        <Route path="/rider/viewbooking" element={<RiderViewbookings />} />
        <Route path="/rider/completedrides" element={<CompletedRides/>}/>
        <Route path="/rider/viewrating" element={<Viewrating/>}/>
        <Route path="/rider/profile" element={<RiderProfile />} />
        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminDashboard />} />
        {/* <Route path="/admin/viewusers" element={<Viewusers />} />
        <Route path="/admin/viewreviews" element={<Viewreviews />} />
        <Route path="/admin/verifyrider" element={<Verifyrider />} />
        <Route path="/admin/bookings" element={<ViewRides />} /> */}
      </Routes>
    </Suspense>
  );
}

export default App;
