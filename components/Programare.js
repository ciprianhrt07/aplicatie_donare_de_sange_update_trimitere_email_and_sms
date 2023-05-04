import { useState, useEffect } from "react";

import ProgramariService from "../service/ProgramariService";

function Programare({ idLocatie }) {
  const [loading1, setLoading1] = useState(true);
  const [programare, setProgramare] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setLoading1(true);
      const response = await ProgramariService.getProgramariFromLocation({
        idLocatie
      });
      setProgramare(response.data);
      setLoading1(false);
    };
    fetchData();
  }, []);

  return (
    <table>
      <thead></thead>
      {!loading1 && (
        <tbody>
          {programare.map((p) => (
            <tr>
              <td>{p.date}</td>
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
}

export default Programare;
