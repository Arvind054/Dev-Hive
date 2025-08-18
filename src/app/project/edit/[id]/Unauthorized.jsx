import React from "react";
import { Lock, AlertTriangle, ArrowLeft, Home, ShieldAlert, Mail } from "lucide-react";
import { motion } from "framer-motion";

const Unauthorized = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black flex items-center justify-center p-4 pt-25"
    >
      <div className="bg-black rounded-2xl shadow-xl overflow-hidden w-full max-w-md border border-slate-100">
        {/* Header with animated lock icon */}
        <div className="bg-rose-500 p-6 flex items-center justify-center relative overflow-hidden">
          <motion.div
            animate={{
              y: [0, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut"
            }}
            className="z-10"
          >
            <Lock className="h-12 w-12 text-white stroke-[1.5]" />
          </motion.div>
          <ShieldAlert className="absolute h-24 w-24 text-rose-400 opacity-20" />
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <AlertTriangle className="h-6 w-6 text-amber-500" />
            <h1 className="text-2xl font-bold text-slate-800">Access Restricted</h1>
          </div>
          
          <h2 className="text-lg text-rose-600 font-medium mb-6">401 Unauthorized</h2>
          
          <p className="text-slate-600 mb-6">
            You don't have the required permissions to view this page. Please contact your administrator if you believe this is an error. You can only edit this if you are the owner of this project.
          </p>

          {/* Animated divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
            className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent my-6"
          />

          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.history.back()}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
              Go Back
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => (window.location.href = "/")}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-lg transition-colors duration-200"
            >
              <Home className="h-5 w-5" />
              Return Home
            </motion.button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-black px-6 py-4 text-center border-t border-slate-100">
          <p className="text-sm text-slate-500 flex items-center justify-center gap-2">
            <Mail className="h-4 w-4 text-slate-400" />
            Need access? <a href="/" className="text-blue-600 hover:underline">Login</a>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Unauthorized;