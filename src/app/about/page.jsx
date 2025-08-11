"use client";
import { Code2, Users, Star, GitPullRequest, HeartHandshake, Shield } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
  const features = [
    {
      icon: <Code2 className="w-8 h-8 text-blue-500" />,
      title: "Showcase Projects",
      description: "Developers can publish their projects to gain visibility, attract users, and find collaborators."
    },
    {
      icon: <Users className="w-8 h-8 text-purple-500" />,
      title: "Find Contributors",
      description: "Open source projects can discover passionate developers to help bring ideas to life."
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      title: "Rate & Review",
      description: "Users provide feedback through ratings and reviews to help quality projects stand out."
    },
    {
      icon: <GitPullRequest className="w-8 h-8 text-green-500" />,
      title: "Contribute Code",
      description: "Developers can directly contribute to projects through our integrated Git workflow."
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-pink-500" />,
      title: "Support Creators",
      description: "Users can donate to project creators or become sponsors to support ongoing development."
    },
    {
      icon: <Shield className="w-8 h-8 text-indigo-500" />,
      title: "Safe Ecosystem",
      description: "All projects are verified to ensure quality and protect against malicious code."
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            About DevHive
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
            The platform where developers connect, collaborate, and create amazing projects together.
          </p>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gray-800/50 p-8 rounded-xl border border-gray-700"
          >
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed">
              DevHive was created to solve the challenge developers face in getting real users and contributors for their projects. 
              Too many great ideas never see the light of day because developers work in isolation. We're building a community 
              where projects get the attention they deserve, contributors find meaningful work, and users discover valuable tools.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          How DevHive Works
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-blue-500/30 transition-colors"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-900 to-gray-950">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Ready to join the hive?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Whether you're looking to share your project or contribute to others, DevHive is the place for developers to grow together.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/signup"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Get Started - It's Free
              </Link>
              <Link
                href="/discover"
                className="px-6 py-3 border border-gray-700 rounded-lg font-medium hover:bg-gray-800/50 transition-colors"
              >
                Browse Projects
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}