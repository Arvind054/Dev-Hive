import axios from "axios";

// To add a new Project
export async function addProject(data) {
   try {
      const response = await axios.post("/api/project/create", { data });
      return response.data.message;
   } catch (err) {
      return response.data.error;
   }
};

// To get the Project by ID
export async function getProjectById(id) {
   try {
      const response = await axios.get(`/api/project/${id}`);
      return response.data;
   } catch (err) {
      return response;
   }
}

// To get All the Project of the User

export async function loadAllProjects() {
   console.log("req received");
   try {
      const response = await axios.get("/api/project");
      console.log("response is", response.data);
      return response.data;
   } catch (err) {
      console.log(err);
      return { "error": "error loading the data please refresh the page" };
   }
};

//Get the token Response from the token

export async function getTokenData(tokenResponse) {
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