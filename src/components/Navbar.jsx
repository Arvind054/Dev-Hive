"use client"
import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Search, Sparkles, Code, Users, Home, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "Explore", path: "/explore", icon: <Code size={18} /> },
    { name: "Community", path: "/community", icon: <Users size={18} /> },
    { name: "About", path: "/about", icon: <Sparkles size={18} /> }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'backdrop-blur-xl bg-black shadow-xl' : 'backdrop-blur-lg bg-black'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo & Name - Animated */}
          <motion.div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => router.push("/")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.img
              src="/logo.png"
              alt="DevHive Logo"
              className="h-10 rounded-md shadow-lg"
              animate={{ 
                rotate: scrolled ? 0 : 360,
                scale: scrolled ? 1 : 1.1
              }}
              transition={{ type: "spring", damping: 10 }}
            />
            <motion.span 
              className="font-bold text-2xl tracking-tight bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              DevHive
            </motion.span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (index * 0.1) }}
              >
                <Link 
                  href={item.path}
                  className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-800/50 transition-all group"
                >
                  <span className="mr-2 text-blue-400 group-hover:text-purple-400 transition-colors">
                    {item.icon}
                  </span>
                  <span className="font-medium text-gray-200 group-hover:text-white">
                    {item.name}
                  </span>
                </Link>
              </motion.div>
            ))}

           

            {/* Contribute Button */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Link
                href="/contribute"
                className="ml-2 flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg hover:shadow-blue-500/20 group"
              >
                <Plus size={18} className="mr-2" />
                <span className="font-medium">Contribute</span>
              </Link>
            </motion.div>

            {/* Profile Section */}
            <motion.div 
              className="relative ml-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center space-x-2 focus:outline-none group"
              >
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src="/logo.png"
                    alt="Profile"
                    className="h-10 w-10 rounded-full border-2 border-transparent group-hover:border-blue-500 transition-all"
                  />
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
                </motion.div>
              </button>

              <AnimatePresence>
                {profileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute right-0 mt-3 w-56 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl overflow-hidden py-2 z-50"
                  >
                    <div className="px-4 py-3 border-b border-gray-700">
                      <p className="font-medium text-white">John Developer</p>
                      <p className="text-sm text-gray-400">@johndev</p>
                    </div>
                    <a href="/profile" className="flex items-center px-4 py-3 hover:bg-gray-700/50 transition-colors">
                      <Users size={16} className="mr-3 text-blue-400" />
                      <span>My Profile</span>
                    </a>
                    <a href="/my-projects" className="flex items-center px-4 py-3 hover:bg-gray-700/50 transition-colors">
                      <Code size={16} className="mr-3 text-purple-400" />
                      <span>My Projects</span>
                    </a>
                    <a href="/settings" className="flex items-center px-4 py-3 hover:bg-gray-700/50 transition-colors">
                      <svg className="w-4 h-4 mr-3 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>Settings</span>
                    </a>
                    <div className="border-t border-gray-700 mt-2">
                      <a href="/logout" className="flex items-center px-4 py-3 text-red-400 hover:bg-gray-700/50 transition-colors">
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Log Out</span>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-full hover:bg-gray-800/50 transition-colors"
            >
              <Search className="text-gray-300 hover:text-blue-400" />
            </button>
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-full hover:bg-gray-800/50 transition-colors"
            >
              {menuOpen ? (
                <X className="text-gray-300 hover:text-red-400" size={24} />
              ) : (
                <Menu className="text-gray-300 hover:text-blue-400" size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="md:hidden bg-gray-800/95 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-700/50 transition-colors text-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="mr-3 text-blue-400">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-2 border-t border-gray-700 mt-2">
                <Link
                  href="/profile"
                  className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-700/50 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  <Users size={18} className="mr-3 text-purple-400" />
                  My Profile
                </Link>
                <Link
                  href="/my-projects"
                  className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-700/50 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  <Code size={18} className="mr-3 text-blue-400" />
                  My Projects
                </Link>
              </div>
              
              <Link
                href="/contribute"
                className="flex items-center justify-center mt-4 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:opacity-90 transition-opacity"
                onClick={() => setMenuOpen(false)}
              >
                <Plus size={18} className="mr-2" />
                Contribute
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
};