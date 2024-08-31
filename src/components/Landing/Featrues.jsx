"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Atom, Zap, Puzzle } from "lucide-react";
import { Link } from "react-router-dom";

const FeatureCard = ({ icon: Icon, title, description }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-start p-6 bg-white rounded-lg shadow-md"
    >
      <Icon className="w-12 h-12 text-primary mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};

const FeatureItem = ({ icon, title, description }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-4 lg:flex-row"
    >
      <div>
        <span className="flex items-center justify-center bg-gray-100 rounded-full size-12">
          {icon}
        </span>
      </div>
      <div>
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="mt-2 text-sm font-medium text-gray-500">{description}</p>
      </div>
    </motion.div>
  )

export default function Features() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Transform your visitors into users with an engaging headline
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            The fastest method for working together on staging and temporary
            environments.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={Atom}
            title="Innovative Design"
            description="Our cutting-edge design offers a fresh, modern look that transforms your project into a standout experience."
          />
          <FeatureCard
            icon={Zap}
            title="Powerful Functionality"
            description="Equipped with advanced features and tools, our solution effortlessly manages complex tasks and workflows."
          />
          <FeatureCard
            icon={Puzzle}
            title="Easy Integration"
            description="Integrating with existing systems is smooth and hassle-free, thanks to our incredible flexible approach."
          />
        </div>
      </div>

      <section className="px-8 py-24 mx-auto md:px-12 lg:px-32 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="p-2 border bg-gray-50 rounded-3xl"
        >
          <div className="p-10 overflow-hidden bg-white border shadow-lg rounded-3xl md:p-20">
            <div className="grid items-center grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-24">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="md:order-first"
              >
                <h1 className="mt-8 text-2xl font-semibold tracking-tighter text-gray-900">
                  Seamless feedback, integrated instantly
                </h1>
                <p className="mt-4 text-base font-medium text-gray-500 text-balance">
                  Streamline your feedback process with our easy-to-integrate
                  solution. Capture insights effortlessly, reduce implementation
                  time, and focus on what matters
                </p>
                <div className="flex flex-col gap-12 mt-12">
                  <FeatureItem
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="text-gray-600 size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
                        ></path>
                      </svg>
                    }
                    title="Instant Updates"
                    description="Get real-time feedback without refreshing or delays, keeping you in the loop."
                  />
                  <FeatureItem
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="text-gray-600 size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        ></path>
                      </svg>
                    }
                    title="Effortless Integration"
                    description="Plug it in and go—no complex setup, just instant functionality"
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="order-first block w-full rounded-2xl"
              >
                <div className="h-full rounded-2xl">
                  <img
                    alt="Phone mockup"
                    className="relative w-full drop-shadow-2xl"
                    src="/phone.png"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </section>
  );
}
