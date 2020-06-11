import axios from 'axios';
class User{
    getUserDetails(){
        let _token = localStorage.getItem('_token');
        return Promise.resolve(axios({
            url:'/api/user-details',
            headers: {
                'Authorization': 'Bearer '+ _token,
                'ContentType':'application/json',
                'Accept':'application/json'
            },
            method:'GET'
        }).then((r)=>{
            if(r.status==200) return r.data;
            return [];
        }).catch((e)=>{
            return false;
        }));
        
    }
}

export default new User;