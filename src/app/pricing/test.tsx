'use client';

import { useState } from 'react';

export default function TestPricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Pricing Test</h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Simple Test</h2>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm ${billingCycle === 'monthly' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 transition-colors"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${billingCycle === 'yearly' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              Yearly
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Free</h3>
              <div className="text-3xl font-bold mb-4">$0</div>
              <ul className="space-y-2 text-sm">
                <li>✓ Basic features</li>
                <li>✓ 1 team</li>
                <li>✓ 3 projects</li>
              </ul>
            </div>

            <div className="border rounded-lg p-6 bg-blue-50">
              <h3 className="text-xl font-semibold mb-2">Individual</h3>
              <div className="text-3xl font-bold mb-4">
                ${billingCycle === 'yearly' ? '23' : '29'}
              </div>
              <ul className="space-y-2 text-sm">
                <li>✓ Everything in Free</li>
                <li>✓ 3 teams</li>
                <li>✓ 10 projects</li>
              </ul>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Startup</h3>
              <div className="text-3xl font-bold mb-4">
                ${billingCycle === 'yearly' ? '63' : '79'}
              </div>
              <ul className="space-y-2 text-sm">
                <li>✓ Everything in Individual</li>
                <li>✓ 10 teams</li>
                <li>✓ 50 projects</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
