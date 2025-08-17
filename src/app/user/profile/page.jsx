"use client"
import React from 'react';
import { useSelector } from 'react-redux';
function page() {
    const isAuthenticated = useSelector((state)=>state.user.isAuthenticated);
    const user = useSelector((state)=>state.user.user);

  return (
    <div className="flex justify-center items-center min-h-screen bg-black p-6">
      <div className="flex items-center max-w-2xl w-full space-x-10 p-8 bg-black rounded-3xl border-2 border-gray-200 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_50px_-10px_rgba(0,0,0,0.15)] transition-shadow duration-300">
        {/* Profile Picture with creative border */}
        <div className="flex-shrink-0 relative">
          <div className="absolute -inset-2 rounded-full opacity-75 blur-sm"></div>
          <img
            className="relative h-40 w-40 rounded-full object-cover border-4 border-white z-10"
            src={user?.profileUrl}
            alt="Profile"
          />
        </div>

        {/* User Info */}
        <div className="space-y-4 border-l-2 border-gray-100 pl-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{user?.name}</h1>
          </div>

          <div className="space-y-3">

            <div className="flex items-center group">
              <div className="p-1.5 mr-3 rounded-lg bg-gray-100 group-hover:bg-blue-50 transition-colors">
                <svg className="w-5 h-5 text-gray-500 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{user?.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;