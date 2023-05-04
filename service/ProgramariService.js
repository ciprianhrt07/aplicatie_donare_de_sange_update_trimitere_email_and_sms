import axios from "axios"

const PROGRAMARI_GET_FROM_LOCATION = "http://localhost:8080/get-from-location/";
const PROGRAMARI_GET_ALL_PROGRAMARI= "http://localhost:8080/get-all-programari";
class ProgramariService{


    getAllProgramariWithPagination(id,page,size){

      const url = "http://localhost:8080/get-all-page/"+id+"/"+page+"/"+size;
      console.log( url );
      return   axios.get(url);
      
    }
    
    getProgramariFromLocation(id){
        return axios.get(PROGRAMARI_GET_FROM_LOCATION+id);
    }

    getAll(){
        return axios.get(PROGRAMARI_GET_ALL_PROGRAMARI);
    }
    getAllPD(donator){
        return axios.post("http://localhost:8080/getProgramariDonator",donator);
    }

    anuleaza(id) {
        return new Promise((resolve, reject) => {
          axios.post("http://localhost:8080/anuleaza-programarea/" + id)
            .then(response => {
              resolve(response.data);
            })
            .catch(error => {
              reject(error);
            });
        });
      }
 
    
    absent(id) {
        return new Promise((resolve, reject) => {
          axios.post("http://localhost:8080/finalizeaza-programarea/"+id)
            .then(response => {
              resolve(response.data);
            })
            .catch(error => {
              reject(error);
            });
        });
      }

      succesDonare(id) {
        return new Promise((resolve, reject) => {
          axios.post("http://localhost:8080/succes-programarea/"+id)
            .then(response => {
              resolve(response.data);
            })
            .catch(error => {
              reject(error);
            });
        });
      }  

}

export default new ProgramariService();