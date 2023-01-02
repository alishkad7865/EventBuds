import axios from "axios"
export async function getUser(userId: number){
    let baseUrl= "http://127.0.0.1:8000/User/getUser?userId="+userId
    return axios.get(`${baseUrl}`, {
        headers: {
            Accept : "application/json",
        }
    }).then((response:any) =>{
        
        if(response.status >= 200 && response.status <300){
            return response.data;
        }
    })
    .catch((e:any) => console.log(e));
}