"use client";
import React, { useState } from 'react';
import { Upload, X, Plus, Tag, Image as ImageIcon, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { addProject } from '@/lib/api/projectApi';


export default function Page() {
    const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: [],
    image: null,
    imagePreview: null,
    newTag: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = () => {
    if (formData.newTag.trim() && !formData.tags.includes(formData.newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.newTag.trim()],
        newTag: ''
      }));
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length === 0) {
        const response = await addProject(formData);
        if(response != null){
           toast.success(response);
           router.push("/");
        }else{
            toast.error(response);
        }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Project title is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (formData.description.trim().length < 50) errors.description = 'Description should be at least 50 characters';
    if (formData.tags.length === 0) errors.tags = 'Add at least one tag';
    if (!formData.image) errors.image = 'Project image is required';
    return errors;
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
            Share Your Project
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Showcase your work to the DevHive community and connect with contributors and users.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 sm:p-8"
        >
          {/* Project Title */}
          <div className="mb-8">
            <label htmlFor="title" className="text-sm font-medium mb-2 flex items-center">
              <Code2 className="w-4 h-4 mr-2 text-blue-400" />
              Project Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Awesome Project Name"
              className={`w-full px-4 py-3 bg-gray-800 border ${errors.title ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
            {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title}</p>}
          </div>

          {/* Project Description */}
          <div className="mb-8">
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Project Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              placeholder="Describe your project in detail. What problem does it solve? What technologies does it use? How can others contribute?"
              className={`w-full px-4 py-3 bg-gray-800 border ${errors.description ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
            <div className="flex justify-between mt-1">
              {errors.description ? (
                <p className="text-sm text-red-400">{errors.description}</p>
              ) : (
                <p className="text-sm text-gray-500">Minimum 50 characters</p>
              )}
              <p className="text-sm text-gray-500">{formData.description.length}/500</p>
            </div>
          </div>

          {/* Project Tags */}
          <div className="mb-8">
            <label htmlFor="tags" className=" text-sm font-medium mb-2 flex items-center">
              <Tag className="w-4 h-4 mr-2 text-purple-400" />
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.tags.map((tag) => (
                <motion.div
                  key={tag}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="flex items-center bg-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-gray-400 hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </motion.div>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                id="newTag"
                name="newTag"
                value={formData.newTag}
                onChange={handleChange}
                placeholder="Add tags (e.g., react, javascript, ai)"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 bg-blue-600 hover:bg-blue-700 rounded-r-lg transition-colors flex items-center"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {errors.tags && <p className="mt-1 text-sm text-red-400">{errors.tags}</p>}
          </div>

          {/* Project Image */}
          <div className="mb-10">
            <label className="text-sm font-medium mb-2 flex items-center">
              <ImageIcon className="w-4 h-4 mr-2 text-pink-400" />
              Project Image
            </label>
            
            {formData.imagePreview ? (
              <div className="relative group">
                <img
                  src={formData.imagePreview}
                  alt="Project preview"
                  className="w-full h-64 object-cover rounded-lg border border-gray-700"
                />
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, image: null, imagePreview: null }))}
                  className="absolute top-3 right-3 p-2 bg-gray-900/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-blue-400 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG (Max. 5MB)</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            )}
            {errors.image && <p className="mt-1 text-sm text-red-400">{errors.image}</p>}
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 px-6 rounded-lg font-medium ${isSubmitting ? 'bg-blue-700' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500'} transition-all flex items-center justify-center`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Publishing...
              </>
            ) : (
              'Publish Project'
            )}
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}