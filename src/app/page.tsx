'use client';

import { useState, useEffect } from "react";
import Link from "next/link";

export default function HomePage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserEmail(email);
      setIsLoggedIn(true);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPlan');
    sessionStorage.clear();
    window.location.href = '/?logout=true&t=' + Date.now();
  };

  const handleBrowseProjects = () => {
    window.location.href = '/projects';
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          {/* User Info Bar for Logged-in Users */}
          {isLoggedIn && (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-8 flex items-center justify-between max-w-2xl mx-auto">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {userEmail?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-white font-medium">
                    Welcome back, {userEmail}!
                  </p>
                  <p className="text-white/80 text-sm">Ready to continue building?</p>
                </div>
              </div>
              <button 
                onClick={handleSignOut}
                className="text-white/80 hover:text-white text-sm font-medium"
              >
                Sign Out
              </button>
            </div>
          )}
          
          <h1 className="text-5xl font-bold mb-6">
            {isLoggedIn ? "Welcome Back to FORGE" : "Transform Your Layoff Into Your Launch"}
          </h1>
          <p className="text-xl mb-8">
            {isLoggedIn 
              ? "Continue your journey with 641K+ tech professionals" 
              : "Join 641K+ tech professionals building the future together"
            }
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {isLoggedIn ? (
              <a 
                href="/dashboard"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block text-center"
              >
                Go to Dashboard
              </a>
            ) : (
              <>
                <Link 
                  href="/sign-up"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block text-center"
                >
                  Join FORGE
                </Link>
                <Link 
                  href="/sign-in"
                  className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-block text-center"
                >
                  Sign In
                </Link>
                <Link 
                  href="/pricing"
                  className="border border-white/70 text-white/90 px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors inline-block text-center"
                >
                  View Pricing
                </Link>
              </>
            )}
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-2xl font-bold">641,734+</h3>
              <p>Tech Workers Laid Off (2022-2025)</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-2xl font-bold">$6.7T</h3>
              <p>Market Opportunity</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-2xl font-bold">$80-180/hr</h3>
              <p>Premium Team Rates</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* What is FORGE? */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What is FORGE?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              FORGE is a revolutionary collaborative platform designed specifically for tech professionals who have been laid off or are seeking better opportunities. We transform individual freelancers into powerful, high-earning teams.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6">The Problem We Solve</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-red-600 text-sm font-bold">!</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Mass Tech Layoffs</h4>
                    <p className="text-gray-600">641,734+ tech workers laid off since 2022, struggling to find stable income</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-red-600 text-sm font-bold">!</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Low Freelance Rates</h4>
                    <p className="text-gray-600">Solo freelancers earn $20-50/hour, barely covering living expenses</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-red-600 text-sm font-bold">!</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Isolation & Risk</h4>
                    <p className="text-gray-600">Working alone means no backup, no support, and high failure risk</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6">Our Solution</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Team-Based Projects</h4>
                    <p className="text-gray-600">Form teams of 3-5 professionals to tackle complex, high-value projects</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Premium Rates</h4>
                    <p className="text-gray-600">Earn $80-180/hour as a team vs $20-50/hour solo</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Shared Success</h4>
                    <p className="text-gray-600">60% of profits go directly to teams, with democratic governance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose FORGE?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">Premium Projects</h3>
              <p className="text-gray-600">$80-180/hour team-based projects vs $20-50 solo freelancing</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-2">Shared Risk</h3>
              <p className="text-gray-600">Team support and backup coverage - never work alone</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">🗳️</div>
              <h3 className="text-xl font-semibold mb-2">Democratic Governance</h3>
              <p className="text-gray-600">60% profit to teams, community-driven decisions</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold mb-2">Social Impact</h3>
              <p className="text-gray-600">Give back through education and NGO partnerships</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits & Opportunities */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Benefits & Opportunities</h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Financial Benefits */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-6 text-blue-600">💰 Financial Benefits</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">•</span>
                  <div>
                    <strong>3-4x Higher Earnings:</strong> $80-180/hour vs $20-50/hour solo
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">•</span>
                  <div>
                    <strong>Stable Income:</strong> Long-term projects with reliable payment
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">•</span>
                  <div>
                    <strong>Profit Sharing:</strong> 60% of profits go directly to teams
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">•</span>
                  <div>
                    <strong>No Upfront Costs:</strong> Join teams without investment
                  </div>
                </li>
              </ul>
            </div>

            {/* Professional Growth */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-6 text-purple-600">🚀 Professional Growth</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <span className="text-purple-500 text-xl">•</span>
                  <div>
                    <strong>Skill Development:</strong> Learn from diverse team members
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-purple-500 text-xl">•</span>
                  <div>
                    <strong>Portfolio Building:</strong> Work on high-profile projects
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-purple-500 text-xl">•</span>
                  <div>
                    <strong>Networking:</strong> Connect with 641K+ tech professionals
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-purple-500 text-xl">•</span>
                  <div>
                    <strong>Career Advancement:</strong> Move from freelancer to team leader
                  </div>
                </li>
              </ul>
            </div>

            {/* Work-Life Balance */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-6 text-green-600">⚖️ Work-Life Balance</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">•</span>
                  <div>
                    <strong>Flexible Hours:</strong> Work when it suits your schedule
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">•</span>
                  <div>
                    <strong>Team Support:</strong> Never work alone or feel isolated
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">•</span>
                  <div>
                    <strong>Remote Work:</strong> Work from anywhere in the world
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">•</span>
                  <div>
                    <strong>Reduced Stress:</strong> Shared responsibility and backup coverage
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How FORGE Works</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Join FORGE</h3>
              <p className="text-gray-600">Sign up and create your professional profile</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Form Teams</h3>
              <p className="text-gray-600">Connect with other professionals and form teams</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Projects</h3>
              <p className="text-gray-600">Bid on high-value projects as a team</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Earn & Grow</h3>
              <p className="text-gray-600">Complete projects and earn premium rates</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Build Your Future?</h2>
          <p className="text-xl text-gray-600 mb-8">Join thousands of tech professionals creating sustainable careers together</p>
          <div className="flex justify-center">
            <button 
              onClick={handleBrowseProjects}
              className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Browse Projects
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 FORGE - Collaborative Platform for Tech Professionals</p>
        </div>
      </footer>
    </div>
  );
}
