import { Search, Star, GitFork, Eye, Code2, Flame, TrendingUp, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
const ProjectCard = ({ project }) => {
  return (
    <motion.div 
      className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800 hover:border-blue-500/30 transition-all hover:shadow-lg hover:shadow-blue-500/10"
      whileHover={{ y: -5 }}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
              <img src={project.user.avatar} alt={project.user.name} className="w-full h-full object-cover" />
            </div>
            <span className="text-sm font-medium">{project.user.name}</span>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold line-clamp-1">{project.title}</h3>
          <span className="flex items-center text-yellow-400 text-sm bg-yellow-400/10 px-2 py-1 rounded-full">
            <Star className="w-3 h-3 mr-1" />
            {project.stars}
          </span>
        </div>
        
        <p className="text-gray-400 text-sm line-clamp-2 mb-4">{project.description}</p>
        
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex gap-3">
            <span className="flex items-center">
              <GitFork className="w-4 h-4 mr-1" />
              {project.forks}
            </span>
            <span className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              {project.views}
            </span>
          </div>
          <div className="flex gap-2">
            {project.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-gray-800 rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default ProjectCard;
