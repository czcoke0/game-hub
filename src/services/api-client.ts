import axios from  'axios';

export default axios.create({
    baseURL:'https://api.rawg.io/api',
    params:{
        key:'9bb8c128b0534ccb9ae12eb44bee8978'
    }
})