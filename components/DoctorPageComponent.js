import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DoctorService from "../service/DoctorService";
import ProgramariService from "../service/ProgramariService";

function DoctorPageComponent() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [programari, setProgramari] = useState();
  const [programariAzi, setprogramariAzi] = useState();

  const [doctor, setDoctor] = useState({
    username: "",
    password: "",
    nume: "",
    prenume: "",
    specializare: "",
    locatie: "",
  });

  const absentProgramare = (e, id) => {
    e.preventDefault();
    ProgramariService.absent(id).then(() =>{
      ProgramariService.getProgramariFromLocation(doctor.locatie.id).then(
        (response) => {
          setProgramari(response.data);
        })
      })
  };

  //donare cu succes

  const succesDonare = (e, id) => {
    e.preventDefault();
    ProgramariService.succesDonare(id).then(() =>{
      ProgramariService.getProgramariFromLocation(doctor.locatie.id).then(
        (response) => {
          setProgramari(response.data);
        })
      })
  };



  const [loading, setLoading] = useState(true);

  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);

  useEffect(() => {
    setLoading(true);
    DoctorService.getDoctorByUsername(username).then((response) => {
      setDoctor(response.data);
      setLoading(false);
    });
  }, [username]);

  useEffect(() => {
    if (doctor && doctor.locatie) {
      setLoading1(true);
      ProgramariService.getProgramariFromLocation(doctor.locatie.id).then(
        (response) => {
          setProgramari(response.data);
          setLoading1(false);
        }
      );
    }
  }, [doctor]);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  useEffect(() => {
    if (programari) {
      setLoading2(true) 
      setprogramariAzi(
        programari.filter((programare) => {
          return programare.date === formattedDate;
        })
      );
      setLoading2(false)
    }
  } , [programari]);

  //------------------

  return (
    <div>
      <>
        <h1> Doctor Page: </h1>
        <h2>Hello,doctore: {doctor.nume} {doctor.prenume} </h2>
        <h3> Ati fost asignat la locatia: {doctor.locatie.nume}</h3>
        
      </>
      <br />
      {!loading && (
        <table class="table">
          <thead>
            <tr>
              <td>Nume_Donator</td>
              <td>Prenume_Donator</td>
              <td>Grupa_Sanguina</td>
              <td>Data Programarii</td>
              <td>Absent</td>
              <td>Donare cu succes</td>
              <td> Absent_la_donare </td>
              <td> Succes_donare</td>
            </tr>
          </thead>

          {!loading1 && (
            <tbody>
              {programari.map((programare) => (
                <tr>
                  <td> {programare.donator.nume} </td>
                  <td> {programare.donator.prenume} </td>
                  <td> {programare.donator.grupa} </td>
                  <td> {programare.date}</td>
                  <td> {programare.anulata ? "Yes" : "No"} </td>
                  <td> {programare.stare ? "Yes" : "No"} </td>
                  <button
                    onClick={(e, id) => absentProgramare(e, programare.id)}
                  >
                    {" "}
                    Absent_Donare{" "}
                  </button>
                  <button
                    onClick={(e, id) => succesDonare(e, programare.id)}
                  >
                    {" "}
                    Succes_donare{" "}
                  </button>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      )}

      <>
        <h1> Programarile din ziua de azi: </h1>

        <table class="table">
          <thead>
            <tr>
              <td>Nume_Donator</td>
              <td>Prenume_Donator</td>
              <td>Grupa_Sanguina</td>
              <td>Data Programarii</td>
              <td>Absent</td>
              <td>Stare</td>
            </tr>
          </thead>

          {!loading2 && (          
          <tbody>
              {programariAzi.map((programare) => (
                <tr>
                  <td> {programare.donator.nume} </td>
                  <td> {programare.donator.prenume} </td>
                  <td> {programare.donator.grupa} </td>
                  <td> {programare.date}</td>
                  <td> {programare.anulata ? "Yes" : "No"} </td>
                  <td> {programare.stare ? "Yes" : "No"} </td>

                </tr>
              ))
              }  

          </tbody>
          )}

        </table>
      </>
    </div>
  );
}

export default DoctorPageComponent;

 