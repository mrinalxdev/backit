import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Lock, LockOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function HeroLanding() {
  const { isSignedIn } = useUser();
  return (
    <div className="min-h-screen bg-gray-50">
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
          {isSignedIn ? (
            <Button variant="outline" className="hidden md:flex items-center">
              <LockOpen className="w-4 h-4" />
            </Button>
          ) : (
            <Button variant="outline" className="hidden md:flex items-center">
              <Lock className="mr-2 w-4 h-4" /> Login
            </Button>
          )}

          {isSignedIn ? (
            <Link to="/dashboard">
              <Button className="bg-gray-900 text-white hover:bg-gray-800">
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link to="/sign-in">
              <Button className="bg-gray-900 text-white hover:bg-gray-800">
                Create free account
              </Button>
            </Link>
          )}
        </div>
      </motion.header>
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
          Master Dropshipping
          <br />
          with Confidence and Ease{" "}
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
          Our all-in-one guide from zero to hero in dropshipping. Get
          personalized tips, stay updated, and take your first steps toward
          success—all in one place.
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center space-x-4"
        >
          {isSignedIn ? (
            <Link to="/dashboard">
              <Button className="bg-gray-900 text-white hover:bg-gray-800">
                Try it free <ChevronDown className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          ) : (
            <AlertDialog>
              <AlertDialogTrigger>
              <Button className="bg-gray-900 text-white hover:bg-gray-800">
                Try it free <ChevronDown className="ml-2 w-4 h-4" />
              </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Looks like you don't have an account 🤧 . Lets SignIn with
                    your github or google account !!
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Link to="/sign-in">
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </Link>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          <Button variant="outline">Support Our Project</Button>
        </motion.div>
      </motion.section>
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
