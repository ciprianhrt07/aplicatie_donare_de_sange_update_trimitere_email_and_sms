import axios from "axios"

const DOCTOR_SAVE_URL = "http://localhost:8080/doctor-save";
const DOCTOR_GET_ALL = "http://localhost:8080/doctor-get-all";
const DOCTOR_DELETE_URL = "http://localhost:8080/doctor/delete/";
const DOCTOR_UPDATE_URL = "http://localhost:8080/doctor/update/";
const DOCTOR_GET_ONE = "http://localhost:8080/doctor/get/";
const DOCTOR_GET_BY_USERNAME = "http://localhost:8080/doctor/getDoctor/";
class DoctorService{

    saveDoctor(doctor){
        return axios.post(DOCTOR_SAVE_URL, doctor);
    }

    getAll(){
        return axios.get(DOCTOR_GET_ALL);
    }

    deleteDoctor(id){
        return axios.post(DOCTOR_DELETE_URL+id);
    }

    updateDoctor(doctor,id) {
        return axios.put(DOCTOR_UPDATE_URL+id,doctor);
      }

    getDoctor(id){
        return axios.get(DOCTOR_GET_ONE+id);
    }  

    getDoctorByUsername(username){
        return axios.get(DOCTOR_GET_BY_USERNAME+username);
    }

  
}

export default new DoctorService();