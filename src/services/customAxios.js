import axios from 'axios';
import NProgress from 'nprogress'

const customAxios = axios.create({
    baseURL: `https://udhar-khata.herokuapp.com/`
});


customAxios.interceptors.request.use((config) => {
        document.body.classList.add('loading-indicator');
        console.log("Intercepting request");
        return config;
    });

customAxios.interceptors.response.use((response) => {
    document.body.classList.remove('loading-indicator');
    console.log("Intercepting response");
    return response;
});


// Step-4: Export the newly created Axios instance to be used in different locations.
export default customAxios;