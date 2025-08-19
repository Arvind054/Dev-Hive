"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation';
import ProjectLoading from '@/components/Loaders/ProjectLoading';
import { getProjectById } from '@/lib/api/projectApi';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { deleteProject } from '@/lib/api/projectApi';
function page() {
    const user = useSelector((state)=>state.user.user);
    const router = useRouter();
    const [projectDetails, setProjectDetails]  = useState('');
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const params = useParams();
    const { id } = params;

  // Handle Project Delete
    const handleDelete = async()=>{
      if(!id){
        toast.error('Invalid Project Id');
        return ;
      }
      setDeleting(true);
      const response = await deleteProject(id);
      if(!response){
        toast.error('Error Deleting Project');
        setDeleting(false);
        return ;
      }
      setDeleting(false);
      router.push('/');
      toast.success('Project Deleted Successfully');
    }
    useEffect(()=>{
        async function fetchData() {
    setLoading(true);
    try {
      const data = await getProjectById(id); 
      setProjectDetails(data);
    } catch (err) {
      console.log(err);
      toast.error("Error Getting data, please refresh the page");
    } finally {
      setLoading(false);
    }
  }

  fetchData();
    },[]);

    if(loading){
        return <ProjectLoading/>
    }
    if(!projectDetails){
        return <>
        <h2 className='h-screen pt-25'>404 Project Not Found</h2>
        </>
    }

  return (
    <div className="pt-30 max-w-4xl mx-auto p-6">
      {/* Project Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{projectDetails?.title}</h1>
        <div className="h-1 w-20 bg-blue-500"></div>
      </div>

      {/* Project Image */}
      <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
        <img 
          src={projectDetails?.imageUrl} 
          alt={projectDetails?.title} 
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Project Links */}
      <div className="flex gap-4 mb-6 justify-between">
        <div className='flex flex-row gap-4'>
        <div 
          onClick={()=>window.open(`${projectDetails?.liveLink}`, "_blank")}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Live Demo
        </div>
        <div
          onClick={() => {
            if (projectDetails?.codeLink) {
              window.open(projectDetails.codeLink, "_blank");
            }
          }} 
          className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Code
        </div>
        </div >
        {projectDetails?.userEmail == user?.email && <div className='flex flex-row gap-4'>
        <div 
          onClick={()=>router.push(`/project/edit/${projectDetails?._id}`)}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors cursor-pointer"
          target="_blank"
          rel="noopener noreferrer"
        >
          Edit
        </div>
        <button
          className="px-6 py-2 bg-red-800 text-white rounded-md hover:bg-red-900 transition-colors cursor-pointer"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleDelete}
          disabled = {deleting}
        >
         {deleting? 'Deleting': 'Delete'}
        </button>
        </div>}
      </div>

      {/* Project Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {projectDetails?.tags?.map((tag, index) => (
          <span 
            key={index}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Project Description */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">About the Project</h2>
        <p className="text-gray-600 leading-relaxed">{projectDetails?.description}</p>
      </div>

      {/* Developer Contact */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Contact the Developer</h3>
        <p className="text-gray-600">{projectDetails?.userEmail
}</p>
      </div>
    </div>
  );
}

export default page