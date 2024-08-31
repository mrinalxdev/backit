import React from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  Lock,
} from "lucide-react";

const Header = () => (
  <header className="flex justify-between items-center py-4 px-6 bg-white">
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
  </header>
);

const Hero = () => (
  <section className="text-center py-20 px-4">
    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
      Put Your Customer
      <br />
      Engagement on Autopilot{" "}
      <span className="inline-block align-middle">🚀</span>
    </h1>
    <p className="text-xl mb-8 max-w-3xl mx-auto">
      Empower Your Sales, Marketing, Service Teams with AI-Driven Personalized
      Interactions Across Email, SMS, and WhatsApp. Manage the Entire Customer
      Journey with Zixflow.
    </p>
    <div className="flex justify-center space-x-4">
      <Button className="bg-gray-900 text-white hover:bg-gray-800">
        Try it free <ChevronDown className="ml-2 w-4 h-4" />
      </Button>
      <Button variant="outline">Book Demo</Button>
    </div>
  </section>
);


export default function HeroLanding() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <div className="w-[60%] max-sm:w-[90%] mx-auto border-2 rounded-md">
        <img src="/banner.png" className="rounded-md" />
      </div>
    </div>
  );
}
