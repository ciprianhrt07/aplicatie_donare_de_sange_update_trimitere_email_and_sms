import DoctorService from "../service/DoctorService";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";

function Doctori({ doctor , deleteDoctor}) {
  const navigate = useNavigate();  

  return (
    <tr>
      <td>{doctor.id}</td>
      <td>{doctor.username}</td>
      <td>{doctor.password}</td>
      <td>{doctor.nume}</td>
      <td>{doctor.prenume}</td>
      <td>{doctor.specializare}</td>
      <td>{doctor.locatie.nume} </td>
      <td> 
        <button   onClick={(e, id) => deleteDoctor(e, doctor.id) } > Delete </button>
        <button onClick={() => navigate("/actualizare-doctor/:"+ doctor.id)}> UPDATE </button>
      </td>
    </tr>
  );
}

export default Doctori;
