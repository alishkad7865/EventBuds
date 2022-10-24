import axios from "axios"
export async function getDemoTotal(pageName: string){
    let baseUrl= "http://localhost:8000/Demo/Result?pageName="+pageName
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