"use client";
import React, { useState } from 'react';
import { Search, Star, GitFork, Eye, Code2, Flame, TrendingUp, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';

const dummyProjects = [
  {
    id: 1,
    title: "React UI Components Library",
    description: "A collection of beautiful, accessible, and customizable React components for your next project.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    stars: 1243,
    forks: 342,
    views: 8921,
    tags: ["react", "ui", "components"],
    user: {
      name: "SarahDev",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    }
  },
  {
    id: 2,
    title: "AI Image Generator",
    description: "Generate stunning AI artwork with simple text prompts using Stable Diffusion.",
    image: "https://images.unsplash.com/photo-1677442135136-760c813a743d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    stars: 892,
    forks: 156,
    views: 5421,
    tags: ["ai", "machine learning", "python"],
    user: {
      name: "AICreator",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    }
  },
  {
    id: 3,
    title: "DevHive CLI Tool",
    description: "Command line interface for interacting with DevHive projects and communities.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    stars: 567,
    forks: 89,
    views: 3210,
    tags: ["cli", "nodejs", "tools"],
    user: {
      name: "CLIMaster",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  },
  {
    id: 4,
    title: "3D Portfolio Template",
    description: "Stunning Three.js powered portfolio template with smooth animations.",
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    stars: 2104,
    forks: 432,
    views: 12543,
    tags: ["threejs", "portfolio", "webgl"],
    user: {
      name: "3DDesigner",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg"
    }
  },
  {
    id: 5,
    title: "Blockchain Voting System",
    description: "Decentralized voting application built on Ethereum blockchain.",
    image: "https://images.unsplash.com/photo-1626624340243-6d2e0c5fe75b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    stars: 789,
    forks: 210,
    views: 4567,
    tags: ["blockchain", "ethereum", "web3"],
    user: {
      name: "CryptoDev",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg"
    }
  },
  {
    id: 6,
    title: "AI Code Assistant",
    description: "VS Code extension that suggests code completions using AI.",
    image: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    stars: 3456,
    forks: 876,
    views: 19876,
    tags: ["vscode", "ai", "extension"],
    user: {
      name: "AIHelper",
      avatar: "https://randomuser.me/api/portraits/men/91.jpg"
    }
  }
];

// Explore Page Component
export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('trending');

  const filteredProjects = dummyProjects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (activeFilter === 'trending') return b.views - a.views;
      if (activeFilter === 'popular') return b.stars - a.stars;
      if (activeFilter === 'newest') return b.id - a.id;
      return 0;
    }));

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
            onClick={() => setActiveFilter('trending')}
            className={`flex items-center px-4 py-2 rounded-full ${activeFilter === 'trending' ? 'bg-blue-600 text-white' : 'bg-gray-900 text-gray-400 hover:bg-gray-800'}`}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Trending
          </button>
          <button
            onClick={() => setActiveFilter('popular')}
            className={`flex items-center px-4 py-2 rounded-full ${activeFilter === 'popular' ? 'bg-purple-600 text-white' : 'bg-gray-900 text-gray-400 hover:bg-gray-800'}`}
          >
            <Flame className="w-4 h-4 mr-2" />
            Popular
          </button>
          <button
            onClick={() => setActiveFilter('newest')}
            className={`flex items-center px-4 py-2 rounded-full ${activeFilter === 'newest' ? 'bg-pink-600 text-white' : 'bg-gray-900 text-gray-400 hover:bg-gray-800'}`}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Newest
          </button>
          <button
            onClick={() => setActiveFilter('all')}
            className={`flex items-center px-4 py-2 rounded-full ${activeFilter === 'all' ? 'bg-green-600 text-white' : 'bg-gray-900 text-gray-400 hover:bg-gray-800'}`}
          >
            <Code2 className="w-4 h-4 mr-2" />
            All Projects
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
              <ProjectCard key={project.id} project={project} />
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