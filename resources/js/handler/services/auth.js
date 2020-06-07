import axios from 'axios';
class Auth{
    
    isAdmin(){
        return this.authentication('admin');
    }

    isAgent(){
        return this.authentication('agent');
    }

    authentication(u){
        let _token = localStorage.getItem('_token');
        return Promise.resolve(axios({
            url:'/api/is-'+u,
            headers: {
                'Authorization': 'Bearer '+ _token,
                'ContentType':'application/json',
                'Accept':'application/json'
            },
            method:'POST'
        }).then((r)=>{
            if(r.data==1) return true;
            else return false;
        }).catch((e)=>{
            return false;
        }));
        
    }
}

export default new Auth;