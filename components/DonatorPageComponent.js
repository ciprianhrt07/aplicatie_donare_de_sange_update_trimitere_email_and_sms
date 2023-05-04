import { Button } from "bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DonatorService from "../service/DonatorService";
import LocatiiComponent from "./LocatiiComponent";
import ProgramariService from "../service/ProgramariService";
function DonatorPageComponent() {
  const [loading1, setLoading1] = useState(false);
  const [programari, setProgramari] = useState();
  const { username } = useParams();
  const navigate = useNavigate();
  const [emailOrPhone, setEmailOrPhone] = new useState("email");

  const [paginaCurenta, setPaginaCurenta] = useState(0);
  const numarAfisari = 5;

  const [donator, setDonator] = useState({
    id: "",
    nume: "",
    prenume: "",
    username: "",
    password: "",
    grupa: "",
    judet: "",
  });

  const [loading, setLoading] = useState(true);

  const anuleazaProgramarea = (e, id) => {
    e.preventDefault();
    ProgramariService.anuleaza(id).then(() => {
      ProgramariService.getAllProgramariWithPagination(
        donator.id,
        paginaCurenta,
        numarAfisari
      ).then((response) => {
        console.log(response.data.content);
        setProgramari(response.data.content);
        setLoading1(false);
      });
    });
  };

  const incrementPage = () => {
    setPaginaCurenta(paginaCurenta + 1);
  };
  const decrementPage = () => {
    if (paginaCurenta >= 1) setPaginaCurenta(paginaCurenta - 1);
    else setPaginaCurenta(0);
  };

  useEffect(() => {
    setLoading(true);
    DonatorService.getDonatorByUsername(username).then((response) => {
      setDonator(response.data);
      setLoading(false);
    });
  }, [username]);

  useEffect(() => {
    console.log(donator);
    if (donator.id !== "") {
      setLoading1(true);
      ProgramariService.getAllProgramariWithPagination(
        donator.id,
        paginaCurenta,
        numarAfisari
      ).then((response) => {
        console.log(response.data.content);
        setProgramari(response.data.content);
        setLoading1(false);
      });
    }
  }, [donator, paginaCurenta]);

  //before: getAllProgramari(donator)

  return (
    <div>
      <h1 className="text-center">Hello I'm donator page</h1>

      <button onClick={() => navigate("/actualizare-donator/:" + donator.id)}>
        {" "}
        Actualizeaza datele{" "}
      </button>

      {!loading && (
        <>
          <LocatiiComponent
            donator={donator}
            programari={programari}
            setProgramari={setProgramari}
          />
          <br></br>
          <table class="table">
            <thead>
              <tr>
                <td> Id </td>
                <td> Data </td>
                <td> Nume_Locatie </td>
                <td> Programare_Anulata</td>
                <td> Programare_On_Due</td>
                <td> Anuleaza </td>
              </tr>
            </thead>

            {!loading1 && programari && programari.length > 0 && (
              <tbody>
                {programari.map((programare) => (
                  <tr>
                    <td> {programare.id} </td>
                    <td> {programare.date} </td>
                    <td> {programare.locatie.nume} </td>
                    <td> {programare.anulata ? "Yes" : "No"} </td>
                    <td> {programare.status ? "Yes" : "No"} </td>
                    <button
                      className="btn btn-warning"
                      onClick={(e, id) => anuleazaProgramarea(e, programare.id)}
                    >
                      {" "}
                      ANULEAZA{" "}
                    </button>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          <div className="center">
            <p> Pagina curent afisata: {paginaCurenta}</p>
            <p> Numar afisare/ Pagina: {numarAfisari}</p>
            <button onClick={decrementPage} className="btn btn-danger">
              {" "}
              Back
            </button>
            <button onClick={incrementPage} className="btn btn-primary">
              {" "}
              Next{" "}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default DonatorPageComponent;
