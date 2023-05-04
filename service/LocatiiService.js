import axios from "axios";

const GET_LOCATII_URL = "http://localhost:8080/locatii";
const GET_ONE_LOCATIE = "http://localhost:8080/get-locatie/"


class LocatiiService {
  getLocatii() {
    return axios.get(GET_LOCATII_URL);
  }

  getLocatie(id){
    return axios.get(GET_ONE_LOCATIE+id);
  }

}

export default new LocatiiService();