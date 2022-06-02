import axios from "axios";

const instance =  axios.create ( {
baseURL : "http://localhost:5001/clone-5e19f/us-central1/api"
});

export default instance ;