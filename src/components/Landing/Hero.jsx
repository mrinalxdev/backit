import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Lock } from "lucide-react";
import { motion } from "framer-motion";

const Header = () => (
  <motion.header
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="flex justify-between items-center py-4 px-6 bg-white"
  >
    <div className="flex items-center gap-2">
      <span className="text-2xl">📦</span>
      <span className="text-xl font-bold">DropIt</span>
    </div>
    <div className="flex items-center space-x-4">
      <Button variant="outline" className="hidden md:flex items-center">
        <Lock className="mr-2 w-4 h-4" /> Login
      </Button>
      <Button className="bg-gray-900 text-white hover:bg-gray-800">
        Create free account
      </Button>
    </div>
  </motion.header>
);

const Hero = () => (
  <motion.section
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="text-center py-20 px-4"
  >
    <motion.h1
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
    >
      Put Your Customer
      <br />
      Engagement on Autopilot{" "}
      <motion.span
        initial={{ rotate: -10 }}
        animate={{ rotate: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="inline-block align-middle"
      >
        🚀
      </motion.span>
    </motion.h1>
    <motion.p
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="text-xl mb-8 max-w-3xl mx-auto"
    >
      Empower Your Sales, Marketing, Service Teams with AI-Driven Personalized
      Interactions Across Email, SMS, and WhatsApp. Manage the Entire Customer
      Journey with Zixflow.
    </motion.p>
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="flex justify-center space-x-4"
    >
      <Button className="bg-gray-900 text-white hover:bg-gray-800">
        Try it free <ChevronDown className="ml-2 w-4 h-4" />
      </Button>
      <Button variant="outline">Book Demo</Button>
    </motion.div>
  </motion.section>
);

export default function HeroLanding() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="w-[60%] max-sm:w-[90%] mx-auto border-2 rounded-md"
      >
        <img src="/banner.png" alt="Banner" className="rounded-md w-full" />
      </motion.div>
    </div>
  );
}