import { useState, useEffect } from "react";
import LocatiiService from "../service/LocatiiService";
import Locatii from "./Locatii";

function LocatiiComponent({donator ,programari , setProgramari}) {


  ///////////
  

///////////////////////
  const [loading, setLoading] = useState(true);
  const [locatii, setLocatii] = useState();

  useEffect(() => {
    const fetchData = async () => {
      
      setLoading(true);

      const response = await LocatiiService.getLocatii();
      setLocatii(response.data);

      setLoading(false);
    };
    fetchData();
  }, []);

  return (
  
    <table>
 
      <thead>
        <tr>
          <th> Nume Locatie de Donare </th>
          <th> Judet </th>
          <th> Strada </th>
          <th> Orar de Functionare </th>
          <th> Numar Programari/Zi</th>
          <th> Numar Programari Ramase</th>
          <th> Alege o data </th>
          <th> Adauga o Programare</th>
        </tr>
      </thead>

      {!loading && (
        <tbody>
          {locatii.map((locatie) => (
            <Locatii locatie={locatie} donator={donator} setLocatie={setLocatii} programari={programari} setProgramari={setProgramari}>                
            </Locatii> 
            
          ))}
          
        </tbody>
      )}
    </table>
  );
}

export default LocatiiComponent;
