import { useState, useEffect } from "react";
import LocatiiService from "../service/LocatiiService";
import DoctorService from "../service/DoctorService";
import { useNavigate,useParams } from "react-router-dom";


function UpdateDoctor() {
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [locatii, setLocatii] = useState();
  const navigate = useNavigate();

  const {id} = useParams();  

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
      try {
        setLoading1(true);
        const response = await DoctorService.getDoctor(id);
        setDoctor(response.data);
        setLoading1(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const response = await LocatiiService.getLocatii();
      setLocatii(response.data);

      setLoading(false);
    };
    fetchData();
  }, []);


  const updateDoctor = (e) => {
    e.preventDefault();
    DoctorService.updateDoctor(doctor,id)
      .then((response) => {
        console.log(response);
        navigate("/admin");
      })
      .catch((error) => {
        //navigate("/admin");
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

      {!loading &&!loading1 && (
        <select name="locatie" value={doctor.locatie} onChange={(e) => handleChange(e)}>
          {locatii.map((locatie) => (
            <option>{locatie.nume}</option>
          ))}
        </select>
      )}

      <button onClick={updateDoctor}> UPDATE Doctor </button>
      
      <div>
      <button onClick={()=>navigate("/admin")}> BACK </button>
      </div>
      
    </form>
   
  );
}

export default UpdateDoctor;
