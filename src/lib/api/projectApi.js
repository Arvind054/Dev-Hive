import axios from "axios";

// To add a new Project
export async function addProject(data) {
   try {
      const response = await axios.post("/api/project/create", { data });
      console.log("response ", response);
      return response.data.message;
   } catch (err) {
      return null;
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
//Edit the Project
export async function editProject(data){
   try{
       const response = await axios.post('/api/project/edit', {data});
       console.log("message is ", response)
       return response.data.message;
   }catch(err){
      return null;
   }
}

// To get All the Project of the Users
export async function loadAllProjects() {
   try {
      const response = await axios.get("/api/project");
      console.log("response is", response.data);
      return response.data;
   } catch (err) {
      console.log(err);
      return { "error": "error loading the data please refresh the page" };
   }
};

// To delete the project
export async function deleteProject(projectId){
   try{
       const response = await axios.delete(`/api/project/${projectId}`);
       return response.data.message;
   }catch(err){

   }
}



