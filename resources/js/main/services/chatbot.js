import axios from 'axios';  
class Chatbot{
    getRootNode(){
        return Promise.resolve(axios({
            url:"/api/chat/get-root-node",
            headers: {
                'ContentType':'application/json',
                'Accept':'application/json',
            },
            method:"GET",
        }).then((r)=>{
            if(r.status==200) return r.data.records;
            return [];
        }).catch((error)=>{
            return false
        }));
    }

    getNode(id){
        let form = {
            id:id,
        }
        return Promise.resolve(axios({
            url:"/api/chat/get-node",
            headers: {
                'ContentType':'application/json',
                'Accept':'application/json',
            },
            method:"POST",
            data:form
        }).then((r)=>{
            if(r.status==200) return r.data.records;
            return [];
        }).catch((error)=>{
            return false
        }));
    }
}

export default new Chatbot;