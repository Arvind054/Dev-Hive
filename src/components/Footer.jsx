"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Twitter, Linkedin, Mail, Heart } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <Github className="w-4 h-4" />,
      href: "https://github.com/devhive",
      name: "GitHub",
    },
    {
      icon: <Twitter className="w-4 h-4" />,
      href: "https://twitter.com/devhive",
      name: "Twitter",
    },
    {
      icon: <Linkedin className="w-4 h-4" />,
      href: "https://linkedin.com/company/devhive",
      name: "LinkedIn",
    },
    {
      icon: <Mail className="w-4 h-4" />,
      href: "mailto:hello@devhive.io",
      name: "Email",
    },
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left side - Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-gray-400 text-sm"
          >
            © {currentYear} DevHive. All rights reserved.
          </motion.div>

          {/* Center - Legal Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex gap-4"
          >
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-blue-400 text-sm transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-gray-400 hover:text-blue-400 text-sm transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/cookies"
              className="text-gray-400 hover:text-blue-400 text-sm transition-colors"
            >
              Cookies
            </Link>
          </motion.div>

          {/* Right side - Social + Credit */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
            
            <span className="text-gray-500 text-sm hidden sm:inline-flex items-center">
              Made with <Heart className="w-3 h-3 mx-1 text-pink-500" /> by Arvind
            </span>
          </motion.div>
        </div>

        {/* Mobile credit */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-gray-500 text-sm text-center mt-4 sm:hidden"
        >
          Made with <Heart className="w-3 h-3 inline text-pink-500" /> by Arvind
        </motion.div>
      </div>
    </footer>
  );
};