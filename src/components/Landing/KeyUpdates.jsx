import React from "react"
import { motion } from "framer-motion"

const Milestone = ({ date, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="flex flex-col items-start"
  >
    <p className="text-blue-500 font-medium mb-2">{date}</p>
    <h3 className="text-2xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
)

export default function KeyUpdates() {
  return (
    <section className="py-24 px-5 bg-white rounded-md">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-blue-500 font-medium mb-2">MILESTONES</h2>
          <h3 className="text-4xl font-bold mb-4">Key updates & releases</h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore the evolution of our product, from the initial launch to the latest enhancements.
          </p>
        </motion.div>

        <div className="relative">
          

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <Milestone
              date="01.08.2024"
              title="The dawn of version 3.0.0"
              description="Welcome to the future with Version 3.0.0! This monumental update unveils a completely revamped interface, groundbreaking AI-powered tools, and seamless integration with your favorite apps. Get ready to explore uncharted territories in productivity!"
            />
            <Milestone
              date="02.13.2024"
              title="Version 3.1.0: the cosmic leap"
              description="Version 3.1.0 propels you into the cosmos with faster processing speeds, enhanced customization options, and new cosmic-themed visual elements. Experience the power of the stars at your fingertips."
            />
            <Milestone
              date="01.08.2024"
              title="The dawn of version 3.0.0"
              description="Welcome to the future with Version 3.0.0! This monumental update unveils a completely revamped interface, groundbreaking AI-powered tools, and seamless integration with your favorite apps. Get ready to explore uncharted territories in productivity!"
            />
          </div>
        </div>
      </div>
    </section>
  )
}