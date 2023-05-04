import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import LoginPageComponent from "./components/LoginPageComponent";
import RegisterPageComponent from "./components/RegisterPageComponent";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import LocatiiComponent from "./components/LocatiiComponent";
import DoctorRegisterComponent from "./components/DoctorRegisterComponent";
import DonatorPageComponent from "./components/DonatorPageComponent";
import UpdateDonator from "./components/UpdateDonator";
 
import AdminPageComponent from "./components/AdminPageComponent";
import UpdateDoctor from "./components/UpdateDoctor";
import DoctorPageComponent from "./components/DoctorPageComponent";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginPageComponent />} />
          <Route exact path="/register" element={<RegisterPageComponent />} />
          <Route exact path="/admin" element={<AdminPageComponent/>}></Route>
          <Route exact path="/doctor/:username" element={<DoctorPageComponent/>} ></Route>
          <Route exact path="/locatii" element={<LocatiiComponent />} />
          <Route
            exact
            path="/doctor-register"
            element={<DoctorRegisterComponent />}
          />
          <Route
            exact
            path="/donator/:username"
            element={<DonatorPageComponent />}
          ></Route>
          <Route
            exact
            path="/actualizare-donator/:id"
            element={<UpdateDonator />}
          ></Route>

          <Route
            exact
            path="/actualizare-doctor/:id"
            element={<UpdateDoctor />}
          ></Route>

          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
