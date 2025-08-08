'use client';

import { SignInButton, SignUpButton, SignOutButton, useUser } from "@clerk/nextjs";

export default function HomePage() {
  const { user } = useUser();

  const handleBrowseProjects = () => {
    window.location.href = '/projects';
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          {/* User Info Bar for Logged-in Users */}
          {user && (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-8 flex items-center justify-between max-w-2xl mx-auto">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {user.firstName?.charAt(0) || user.emailAddresses[0]?.emailAddress.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-white font-medium">
                    Welcome back, {user.firstName || user.emailAddresses[0]?.emailAddress}!
                  </p>
                  <p className="text-white/80 text-sm">Ready to continue building?</p>
                </div>
              </div>
              <SignOutButton>
                <button className="text-white/80 hover:text-white text-sm font-medium">
                  Sign Out
                </button>
              </SignOutButton>
            </div>
          )}
          
          <h1 className="text-5xl font-bold mb-6">
            {user ? "Welcome Back to FORGE" : "Transform Your Layoff Into Your Launch"}
          </h1>
          <p className="text-xl mb-8">
            {user 
              ? "Continue your journey with 641K+ tech professionals" 
              : "Join 641K+ tech professionals building the future together"
            }
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {user ? (
              <a 
                href="/dashboard"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block text-center"
              >
                Go to Dashboard
              </a>
            ) : (
              <>
                <SignUpButton mode="modal">
                  <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Join FORGE
                  </button>
                </SignUpButton>
                <SignInButton mode="modal">
                  <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                    Sign In
                  </button>
                </SignInButton>
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
      
      {/* Value Propositions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why FORGE?</h2>
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
