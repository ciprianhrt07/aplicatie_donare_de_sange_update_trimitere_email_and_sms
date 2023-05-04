import axios from "axios";

const DONATOR_SAVE_URL = "http://localhost:8080/register-donator";
const DONATOR_UPDATE_URL ="http://localhost:8080/update-donator"
const DONATOR_GET_ONE_URL = "http://localhost:8080/getOne-donator"
const DONATOR_GET_DONATOR = "http://localhost:8080/get-donator"
const DONATOR_SAVE_PROGRAMARE = "http://localhost:8080/save-programare"

class DonatorService {
  saveDonator(donator) {
    return axios.post(DONATOR_SAVE_URL, donator);
  }

  updateDonator(donator, id) {
    return axios.put(DONATOR_UPDATE_URL + "/" + id, donator);
  }

  getDonatorById(id) {
    return axios.get(DONATOR_GET_ONE_URL + "/" + id);
  }

  getDonatorByUsername(username) {
    return axios.get(DONATOR_GET_DONATOR + "/" + username);
  }

  saveProgramare(programare){
    return axios.post(DONATOR_SAVE_PROGRAMARE,programare);
  }

   


}

export default new DonatorService();
