import axios from "axios"
export async function getEvent(eventId: number){
    let baseUrl= "http://140.238.138.230:8000/event/Result?eventId="+eventId+"?event={}"
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