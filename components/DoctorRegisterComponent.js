import { useState, useEffect } from "react";
import LocatiiService from "../service/LocatiiService";
import DoctorService from "../service/DoctorService";
import { useNavigate } from "react-router-dom";


function DoctorRegisterComponent() {
  const [loading, setLoading] = useState(true);
  const [locatii, setLocatii] = useState();
  const navigate = useNavigate();


  const [doctor , setDoctor] = useState({ 
    username:"",
    password:"",
    nume:"",
    prenume:"",
    specializare:"",
    locatie:""
  })

   const handleChange = (e) => {
    const value = e.target.value;
     
    setDoctor({ ...doctor, [e.target.name]: value });
    
  };


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const response = await LocatiiService.getLocatii();
      setLocatii(response.data);

      setLoading(false);
    };
    fetchData();
  }, []);


  const saveDoctor = (e) => {
    e.preventDefault();
    DoctorService.saveDoctor(doctor)
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form className="text-center">
      <h1> Doctor Register </h1>

      <form>
        <label> Username </label>
        <input type="text" name="username" value={doctor.username}  onChange={(e) => handleChange(e)}></input>
      </form>

      <form>
        <label> Password </label>
        <input type="password" name="password" value={doctor.password}  onChange={(e) => handleChange(e)}></input>
      </form>

      <form>
        <label> Nume </label>
        <input type="text" name="nume" value={doctor.nume}  onChange={(e) => handleChange(e)}></input>
      </form>

      <form>
        <label> Prenume </label>
        <input type="text" name="prenume" value={doctor.prenume}  onChange={(e) => handleChange(e)}></input>
      </form>

      <form>
        <label> Specializare </label>
        <input type="text" name="specializare" value={doctor.specializare}  onChange={(e) => handleChange(e)}></input>
      </form>

      {!loading && (
        <select name="locatie" value={doctor.locatie} onChange={(e) => handleChange(e)}>
          {locatii.map((locatie) => (
            <option>{locatie.nume}</option>
          ))}
        </select>
      )}

      <button onClick={saveDoctor}> Save Doctor </button>
      
      <div>
      <button onClick={()=>navigate("/admin")}> BACK </button>
      </div>
      
    </form>
   
  );
}

export default DoctorRegisterComponent;
