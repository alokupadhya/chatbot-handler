import axios from 'axios';
class Chats{
    getCountsOnAdmin(){
        let _token = localStorage.getItem('_token');
        return Promise.resolve(axios({
            url:'/api/chat-counts',
            headers: {
                'Authorization': 'Bearer '+ _token,
                'ContentType':'application/json',
                'Accept':'application/json'
            },
            method:'GET'
        }).then((r)=>{
            if(r.status==200) return r.data.records;
            return [];
        }).catch((e)=>{
            return false;
        }));
    }

    getCountsOnAgent(){
        let _token = localStorage.getItem('_token');
        return Promise.resolve(axios({
            url:'/api/agent/chat/chat-counts',
            headers: {
                'Authorization': 'Bearer '+ _token,
                'ContentType':'application/json',
                'Accept':'application/json'
            },
            method:'GET'
        }).then((r)=>{
            if(r.status==200) return r.data.records;
            return [];
        }).catch((e)=>{
            return false;
        }));
    }
}

export default new Chats;