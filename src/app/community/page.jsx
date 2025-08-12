import React from 'react'

function CommunityPage() {
  return (
    <div className=" pt-25 max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8 bg-black text-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
            DevHive Community
          </span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Where developers connect, collaborate, and grow together
        </p>
      </header>

      {/* What We Do Section */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold mb-8 text-center">What We Do</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors">
            <div className="text-blue-400 mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-3">Free Resources</h3>
            <p className="text-gray-400">
              Use & review the Project of Developers, help Others to improve and Grow.
            </p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-indigo-500 transition-colors">
            <div className="text-indigo-400 mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-3">Collaboration</h3>
            <p className="text-gray-400">
              Find project partners, get feedback on your work, and contribute to open-source initiatives.
            </p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-colors">
            <div className="text-purple-400 mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-3">Support</h3>
            <p className="text-gray-400">
              Support Others Developers to grow by supporting them if you like their Work.
            </p>
          </div>
        </div>
      </section>

      {/* Community Guidelines Section */}
      <section className="mb-20 bg-gray-800 rounded-xl p-8 border border-gray-700">
        <h2 className="text-2xl font-semibold mb-8 text-center">Community Guidelines</h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {[
            "Be respectful and inclusive to everyone regardless of background or skill level",
            "Help Others to Grow, support as much you can",
            "Share knowledge freely but give proper credit to others' work",
            " no spam or self-promotion",
            "Help maintain a positive environment by reporting issues",
            "Be patient with newcomers - we all started somewhere",
            "Colloborate and Grow Together."
          ].map((guideline, index) => (
            <div key={index} className="flex items-start">
              <span className="bg-blue-900 text-blue-400 rounded-full w-6 h-6 flex items-center justify-center mr-4 mt-1 flex-shrink-0 text-sm">
                {index + 1}
              </span>
              <p className="text-gray-300">{guideline}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Ready to join us?</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
          Our community thrives on active participation. Your voice matters.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors">
            Sign Up
          </button>
          <button className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-medium py-2 px-6 rounded-md transition-colors">
            Learn More
          </button>
        </div>
      </section>
    </div>
  )
}

export default CommunityPage