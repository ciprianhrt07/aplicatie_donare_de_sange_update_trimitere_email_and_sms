import React, { useEffect, useState } from "react";
import {  useNavigate , useParams } from "react-router-dom";
import DonatorService from "../service/DonatorService";

function UpdateDonator() {
  
  const {id} = useParams();  
  const navigate = useNavigate();

 const [loading, setLoading] = useState(true);

  const [donator, setDonator] = useState({
    nume: "",
    prenume: "",
    username: "",
    password: "",
    grupa: "",
    judet: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setDonator({ ...donator, [e.target.name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await DonatorService.getDonatorById(id);
        setDonator(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);


  const updateDonator = (e) =>{

    e.preventDefault();
    console.log(donator);
    DonatorService.updateDonator(donator, id)
      .then((response) => {
        navigate("/donator/"+donator.username);
      })
      .catch((error) => {
        console.log(error);
      });
  }


  return(

    <div>
    <h1 className="text-center"> Registration Page </h1>
   
    {!loading && (
    <form className="text-center">
      <label> Nume </label>
      <input
        type="text"
        name="nume"
        value={donator.nume}
        onChange={(e) => handleChange(e)}
      >
      
      </input>

      <br />

      <label> Prenume </label>
      <input
        type="text"
        name="prenume"
        value={donator.prenume}
        onChange={(e) => handleChange(e)}
      />

      <br />
      <form>
        <label> Grupa Sanguina </label>
        <select
          name="grupa"
          value={donator.grupa}
          onChange={(e) => handleChange(e)}
        >
          <option> A+ </option>
          <option> A- </option>
          <option> B+ </option>
          <option> B- </option>
          <option> AB+ </option>
          <option> AB- </option>
          <option> O+ </option>
          <option> O- </option>
        </select>
      </form>

      <br />

      <label> Username </label>
      <input
        type="text"
        name="username"
        value={donator.username}
        onChange={(e) => handleChange(e)}
      />

      <br />

      <label> Parola </label>
      <input
        type="password"
        name="password"
        value={donator.password}
        onChange={(e) => handleChange(e)}
      />

      <br />

      <form>
        <label> Judet </label>
        <select
          name="judet"
          value={donator.judet}
          onChange={(e) => handleChange(e)}
        >
          <option>Alba_Iulia</option>
          <option>Arad</option>

          <option>Arges</option>
          <option>Bacau</option>

          <option>Bihor</option>
          <option>Bistrita_Nasaud</option>

          <option>Botosani</option>
          <option>Brasov</option>

          <option>Braila</option>
          <option>Bucuresti</option>

          <option>Caras_Severin</option>
          <option>Cluj_Napoca</option>

          <option>Constanta</option>
          <option>Covasna</option>

          <option>Calarasi</option>
          <option>Dolj</option>

          <option>Dambovita</option>
          <option>Galati</option>

          <option>Giurgiu</option>
          <option>Gorj</option>

          <option>Harghita</option>
          <option>Hunedoara</option>

          <option>Ialomita</option>
          <option>Iasi</option>

          <option>Ilfov</option>
          <option>Maramures</option>

          <option>Mehedinti</option>
          <option>Mures</option>

          <option>Neamt</option>
          <option>Olt</option>

          <option>Prahova</option>
          <option> Satu_Mare</option>

          <option>Sibiu</option>
          <option>Suceava</option>

          <option>Salaj</option>
          <option>Teleorman</option>

          <option>Timisoara</option>
          <option>Tulcea</option>

          <option>Vaslui</option>
          <option>Vrancea</option>
          <option>Valcea</option>
        </select>
      </form>

      <form>
        <button type="button" class="btn btn-info " onClick={updateDonator}>
          {" "}
          UPDATE{" "}
        </button>

        <button type="button" class="btn btn-info "onClick={()=>navigate("/donator/"+donator.username)}>
          {" "}
          BACK{" "}
        </button>
        
      </form>
    </form>
    )}
  </div>



  )


}

export default UpdateDonator;
