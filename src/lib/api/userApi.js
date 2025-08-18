import axios from "axios";
//Get the token Response from the token
export async function getTokenData(tokenResponse) {
   console.log("req received");
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