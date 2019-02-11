import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://services-hw66.firebaseio.com/' // Your URL here!
});

instance.interceptors.request.use(req => {
    console.log('In request interceptor', req);
    return req;
});

instance.interceptors.response.use(res => {
    console.log('In response success interceptor', res);
    return res;
}, err => {
    console.log('In response error interceptor', err);
    throw err;
});

export default instance;