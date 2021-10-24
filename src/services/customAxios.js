import axios from 'axios';

    const customAxios = axios.create({
        baseURL: `https://udhar-khata.herokuapp.com/`
    });


customAxios.interceptors.request.use((config) => {
        document.body.classList.add('loading-indicator');
        return config;
    });

customAxios.interceptors.response.use((response) => {
    document.body.classList.remove('loading-indicator');
    return response;
});


// Step-4: Export the newly created Axios instance to be used in different locations.
export default customAxios;