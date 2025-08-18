"use client"
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserProjects } from '@/lib/api/userApi';
import toast from 'react-hot-toast';
import ProjectCard from '@/components/ProjectCard';
import { useRouter } from 'next/navigation';
function page() {
    const user = useSelector((state)=>state.user.user);
    const isAuthenticated = useSelector((state)=>state.user.isAuthenticated);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
  // Sample projects data - in a real app, this would come from an API
  const [projects, setProjects] = useState([]);

  // State for edit modal
  const [editModal, setEditModal] = useState({ open: false, project: null });

  // Handle delete project
  const handleDelete = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(project => project.id !== projectId));
    }
  };

  // Handle edit project
  const handleEdit = (project) => {
    setEditModal({ open: true, project });
  };

  // Handle save edited project
  const handleSaveEdit = (updatedProject) => {
    setProjects(projects.map(project => 
      project.id === updatedProject.id ? updatedProject : project
    ));
    setEditModal({ open: false, project: null });
  };
useEffect(()=>{
    console.log("user is ", user);
    if(!isAuthenticated|| !user.email)return ;
    setLoading(true);
    const  loadData =  async()=>{
       const response = await getUserProjects(user?.email);
       if(response.error){
           toast.error(response.error);
           setLoading(false);
           return ;
        }
        setProjects(response);
    }
    loadData();
    setLoading(false);
},[user]);
  return (
    <div className="pt-25 container mx-auto px-4 py-8 min-h-[85vh]">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">My Projects</h1>
      {projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">You don't have any projects yet.</p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Create New Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length >0 && projects.map((project) => (
            <ProjectCard project={project} onClick = {()=>router.push(`/project/${project._id}`)}></ProjectCard>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Project</h2>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Project Name</label>
              <input 
                type="text" 
                defaultValue={editModal.project.name}
                onChange={(e) => setEditModal({
                  ...editModal,
                  project: { ...editModal.project, name: e.target.value }
                })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea 
                defaultValue={editModal.project.description}
                onChange={(e) => setEditModal({
                  ...editModal,
                  project: { ...editModal.project, description: e.target.value }
                })}
                className="w-full px-3 py-2 border rounded"
                rows="3"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Status</label>
              <select 
                defaultValue={editModal.project.status}
                onChange={(e) => setEditModal({
                  ...editModal,
                  project: { ...editModal.project, status: e.target.value }
                })}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="Planning">Planning</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setEditModal({ open: false, project: null })}
                className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleSaveEdit(editModal.project)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default page;