import axios from "axios";
//Get the token Response from the token
export async function getTokenData(tokenResponse) {
   localStorage.setItem("tokenResponse", JSON.stringify(tokenResponse));
   try {
      const response = await axios.get("/api/user/login", {
         headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
         },
      });
      return response.data.data;
   } catch (err) {
         return null;
   }
}

export async function getUserProjects(email){
   console.log("req received");
   try{
      const response  = await axios.get("/api/user/projects", {params:{email:email}});
      console.log("projects are projcts", response.data.data);
      return response.data.data;
   }catch(err){
      return {message: "Error Loadin Your Projects, please Try again"}
   }
}