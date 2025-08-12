"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const [isHovering, setIsHovering] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100,
              y: Math.random() * 100,
              opacity: 0.1
            }}
            animate={{
              x: [null, Math.random() * 100],
              y: [null, Math.random() * 100],
              transition: {
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Custom cursor effect */}
      {/*
      <motion.div 
        className="fixed w-8 h-8 bg-blue-500/30 rounded-full pointer-events-none z-50"
        animate={{
          x: cursorPosition.x - 16,
          y: cursorPosition.y - 16,
          scale: isHovering ? 2 : 1,
          opacity: isHovering ? 0.8 : 0.4
        }}
        transition={{ type: "spring", damping: 20 }}
      />
*/}
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Animated logo/brand */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block relative">
              <motion.h1 
                className="text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
                whileHover={{ scale: 1.05 }}
              >
                DevHive
              </motion.h1>
              <motion.div 
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </motion.div>

          <motion.p
            className="mt-6 text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Where <span className="text-blue-400 font-medium">developers</span> connect,{" "}
            <span className="text-purple-400 font-medium">collaborate</span>, and{" "}
            <span className="text-pink-400 font-medium">create</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12"
          >
            <motion.button
              className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-lg font-medium overflow-hidden group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onClick={()=>router.push("/explore")}
            >
              <span className="relative z-10">Explore Projects</span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
              />
              <motion.span
                className="absolute -inset-1 bg-white/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.button>
          </motion.div>

          {/* Animated code preview */}
          <motion.div 
            className="mt-16 max-w-3xl mx-auto bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 shadow-xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <div className="flex px-4 py-3 bg-gray-800/50 border-b border-gray-700">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <div className="p-6 font-mono text-left">
              <div className="text-purple-400">function <span className="text-blue-400">joinDevHive</span>() {"{"}</div>
              <div className="pl-4 text-green-400">const <span className="text-yellow-400">community</span> = <span className="text-blue-400">await</span> <span className="text-pink-400">connect</span>();</div>
              <div className="pl-4 text-green-400">const <span className="text-yellow-400">projects</span> = <span className="text-blue-400">await</span> <span className="text-pink-400">collaborate</span>();</div>
              <div className="pl-4 text-green-400">const <span className="text-yellow-400">success</span> = <span className="text-blue-400">await</span> <span className="text-pink-400">create</span>();</div>
              <div className="text-purple-400">{"}"}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metrics Section */}
       <section className="relative pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Growing Community
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { 
                number: "50+", 
                label: "Happy Developers", 
                bgColor: "bg-blue-900/30",
                borderColor: "border-blue-500",
                textColor: "text-blue-400",
                icon: "👨‍💻",
                delay: 0.1
              },
              { 
                number: "100+", 
                label: "Monthly Users", 
                bgColor: "bg-purple-900/30",
                borderColor: "border-purple-500",
                textColor: "text-purple-400",
                icon: "👥",
                delay: 0.2
              },
              { 
                number: "500+", 
                label: "Projects", 
                bgColor: "bg-pink-900/30",
                borderColor: "border-pink-500",
                textColor: "text-pink-400",
                icon: "🚀",
                delay: 0.3
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: item.delay }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative group"
              >
                <div className={`absolute -inset-1 rounded-xl bg-gradient-to-br from-white/10 to-transparent blur-md opacity-60 group-hover:opacity-90 transition-opacity duration-300`}></div>
                <div className={`relative ${item.bgColor} backdrop-blur-sm rounded-xl p-8 text-center border ${item.borderColor}/30 hover:${item.borderColor}/80 transition-all duration-300 h-full flex flex-col items-center justify-center overflow-hidden`}>
                  
                  {/* Animated background element */}
                  <div className={`absolute -bottom-20 -right-20 w-40 h-40 rounded-full ${item.bgColor.replace('/30', '/20')} blur-xl z-0`}></div>
                  
                  <div className="relative z-10">
                    {/* Icon with pulse animation */}
                    <motion.div 
                      className="text-5xl mb-6"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "mirror"
                      }}
                    >
                      {item.icon}
                    </motion.div>
                    
                    {/* Number with strong contrast */}
                    <motion.h2 
                      className={`text-6xl font-extrabold mb-2 ${item.textColor} drop-shadow-lg`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {item.number}
                    </motion.h2>
                    
                    {/* Label with better readability */}
                    <p className="mt-4 text-gray-100 text-lg font-medium tracking-wide">
                      {item.label}
                    </p>
                    
                    {/* Animated underline */}
                    <motion.div 
                      className={`w-20 h-1 mt-6 rounded-full ${item.bgColor.replace('/30', '')} mx-auto`}
                      initial={{ scaleX: 0.5 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating animated elements */}
      <motion.div 
        className="absolute top-1/4 left-10 w-16 h-16 rounded-full bg-blue-500/20 blur-xl"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="absolute bottom-1/3 right-20 w-24 h-24 rounded-full bg-purple-500/20 blur-xl"
        animate={{
          y: [0, 30, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2
        }}
      />
    </div>
  );
}