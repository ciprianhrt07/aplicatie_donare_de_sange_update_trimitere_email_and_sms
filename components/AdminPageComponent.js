import { useState, useEffect } from "react";
import DoctorService from "../service/DoctorService";
import Doctori from "../components/Doctori";
import { useNavigate } from "react-router-dom";

function AdminPageComponent() {

  const deleteDoctor = (e, id) => {
    e.preventDefault();
    DoctorService.deleteDoctor(id).then((res) => {
      if (doctori) {
        setDoctori((prevElement) => {
          return prevElement.filter((doctor) => doctor.id !== id);
        });
      }
    });
  };

  const [loading, setLoading] = useState(true);
  const [doctori, setDoctori] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await DoctorService.getAll();
      setDoctori(response.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1> Hello, Welcome to the admin page!</h1>
      <table>
        <thead>
          <tr>
            <td>ID_DOCTOR</td>
            <td>USERNAME</td>
            <td>PASSWORD</td>
            <td>NUME</td>
            <td>PRENUME</td>
            <td>SPECIALIZARE</td>
            <td>NUME_LOCATIE</td>
            <td> MODIFICA/STERGE!</td>
          </tr>
        </thead>
        {!loading && (
          <tbody>
            {doctori.map((doctor) => (
              <Doctori doctor={doctor} deleteDoctor={deleteDoctor}></Doctori>
            ))}
          </tbody>
        )}
      </table>

      <form>
        <h3>Introduceti de aici un nou doctor:</h3>
        <button onClick={() => navigate("/doctor-register")}>
          {" "}
          Adauga un nou doctor{" "}
        </button>
      </form>
    </div>
  );
}

export default AdminPageComponent;
