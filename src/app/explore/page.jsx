"use client";
import React, { useEffect, useState } from 'react';
import { Search, Star, GitFork, Eye, Code2, Flame, TrendingUp, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import Loading from './Loading';
import { loadAllProjects } from '@/lib/api/projectApi';
import toast from 'react-hot-toast';


// Explore Page Component
export default function ExplorePage() {
  const [projects, setProjects] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(false);

//sort the project by date
 const filteredProjects =
  (projects
    ?.filter(
      project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(tag =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
    )
    ?.sort((a, b) =>{
       if (activeFilter === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (activeFilter === "popular") {
        return b?.views - a?.views;
      }
      if(activeFilter ==='Upvoted'){
        return a?.likes - b?.likes;
      }
      return 0;
    }
    )) || [];


  useEffect(()=>{
   async function loadData(){
    setLoading(true);
    try{
         const response = await loadAllProjects();
         setProjects(response);
    }catch(err){
         console.log(err);
         toast.error("Error fetching data, please refresh the page");
    }finally{
       setLoading(false);
    }
   }
   loadData();
  }, []);
 if(loading){
  return <Loading></Loading>
 }
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Search Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search projects, tags, or developers..."
              className="w-full pl-12 pr-6 py-4 bg-gray-900 border border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <button
            onClick={() => setActiveFilter('all')}
            className={`flex items-center px-4 py-2 rounded-full ${activeFilter === 'all' ? 'bg-green-600 text-white' : 'bg-gray-900 text-gray-400 hover:bg-gray-800'}`}
          >
            <Code2 className="w-4 h-4 mr-2" />
            All Projects
          </button>
           <button
            onClick={() => setActiveFilter('newest')}
            className={`flex items-center px-4 py-2 rounded-full ${activeFilter === 'newest' ? 'bg-pink-600 text-white' : 'bg-gray-900 text-gray-400 hover:bg-gray-800'}`}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Newest
          </button>
          <button
            onClick={() => setActiveFilter('Upvoted')}
            className={`flex items-center px-4 py-2 rounded-full ${activeFilter === 'Upvoted' ? 'bg-blue-600 text-white' : 'bg-gray-900 text-gray-400 hover:bg-gray-800'}`}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Upvoted
          </button>
          <button
            onClick={() => setActiveFilter('popular')}
            className={`flex items-center px-4 py-2 rounded-full ${activeFilter === 'popular' ? 'bg-purple-600 text-white' : 'bg-gray-900 text-gray-400 hover:bg-gray-800'}`}
          >
            <Flame className="w-4 h-4 mr-2" />
            Popular
          </button>
         
          
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project) => (
              
              <ProjectCard key={project._id} project={project} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-gray-500 mb-4">No projects found matching your search</div>
            <button 
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('trending');
              }}
              className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}