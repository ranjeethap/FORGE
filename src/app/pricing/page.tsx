'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Check, X, Star, Users, Briefcase, Building, Crown, ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";

const pricingTiers = [
  {
    name: 'Free',
    tier: 'FREE',
    price: 0,
    description: 'Perfect for getting started and exploring the platform',
    icon: Users,
    popular: false,
    features: {
      included: [
        'Up to 1 team',
        'Up to 3 projects', 
        'Basic messaging',
        'Community support',
        'Standard profiles',
        'Basic project discovery'
      ],
      limits: [
        'Max 5 team members',
        'Max 3 project members',
        'Basic analytics only',
        'No priority support'
      ]
    },
    maxTeams: 1,
    maxProjects: 3,
    maxTeamMembers: 5,
    maxProjectMembers: 3,
    cta: 'Get Started Free'
  },
  {
    name: 'Individual',
    tier: 'INDIVIDUAL',
    price: 29,
    description: 'For individual professionals and freelancers',
    icon: Users,
    popular: true,
    features: {
      included: [
        'Everything in Free',
        'Up to 3 teams',
        'Up to 10 projects',
        'Advanced messaging',
        'Priority listing',
        'Enhanced profiles',
        'Advanced search filters',
        'Email notifications'
      ],
      limits: [
        'Max 10 team members per team',
        'Max 8 project members',
        'Standard analytics',
        'Email support only'
      ]
    },
    maxTeams: 3,
    maxProjects: 10,
    maxTeamMembers: 10,
    maxProjectMembers: 8,
    cta: 'Start Individual Plan'
  },
  {
    name: 'Startup',
    tier: 'STARTUP',
    price: 79,
    description: 'For growing startups and small teams',
    icon: Briefcase,
    popular: false,
    features: {
      included: [
        'Everything in Individual',
        'Up to 10 teams',
        'Up to 50 projects',
        'Team collaboration tools',
        'Advanced analytics',
        'Custom branding',
        'Project templates',
        'Priority support',
        'Video calls integration'
      ],
      limits: [
        'Max 25 team members per team',
        'Max 15 project members',
        'Advanced analytics included',
        'Priority email & chat support'
      ]
    },
    maxTeams: 10,
    maxProjects: 50,
    maxTeamMembers: 25,
    maxProjectMembers: 15,
    cta: 'Choose Startup'
  },
  {
    name: 'Business',
    tier: 'BUSINESS',
    price: 199,
    description: 'For established businesses and agencies',
    icon: Building,
    popular: false,
    features: {
      included: [
        'Everything in Startup',
        'Unlimited teams',
        'Unlimited projects',
        'Advanced team management',
        'Custom workflows',
        'API access',
        'White-label options',
        'Dedicated support',
        'Advanced reporting',
        'SSO integration'
      ],
      limits: [
        'Max 100 team members per team',
        'Max 50 project members',
        'Full analytics suite',
        'Phone & priority support'
      ]
    },
    maxTeams: -1, // Unlimited
    maxProjects: -1, // Unlimited
    maxTeamMembers: 100,
    maxProjectMembers: 50,
    cta: 'Choose Business'
  },
  {
    name: 'Enterprise',
    tier: 'ENTERPRISE',
    price: null,
    description: 'For large organizations with custom needs',
    icon: Crown,
    popular: false,
    features: {
      included: [
        'Everything in Business',
        'Custom integrations',
        'Dedicated account manager',
        'Custom SLAs',
        'On-premise deployment',
        'Advanced security',
        'Custom training',
        '24/7 phone support',
        'Custom analytics',
        'Unlimited everything'
      ],
      limits: [
        'Unlimited team members',
        'Unlimited project members',
        'Custom analytics',
        'Dedicated support team'
      ]
    },
    maxTeams: -1,
    maxProjects: -1,
    maxTeamMembers: -1,
    maxProjectMembers: -1,
    cta: 'Contact Sales'
  }
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const getPrice = (price: number | null) => {
    if (price === null) return (
      <div className="flex items-baseline justify-center gap-1">
        <span className="text-3xl font-bold">Custom</span>
      </div>
    );
    if (price === 0) return (
      <div className="flex items-baseline justify-center gap-1">
        <span className="text-3xl font-bold">Free</span>
      </div>
    );
    
    if (billingCycle === 'yearly') {
      const yearlyPrice = Math.floor(price * 0.8);
      return (
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-lg line-through text-slate-400">${price}</span>
          <span className="text-4xl font-extrabold tracking-tight">${yearlyPrice}</span>
          <span className="text-sm text-slate-500">/mo</span>
        </div>
      );
    }
    
    return (
      <div className="flex items-baseline justify-center gap-1">
        <span className="text-4xl font-extrabold tracking-tight">${price}</span>
        <span className="text-sm text-slate-500">/mo</span>
      </div>
    );
  };

  const handleUpgrade = async (tier: string) => {
    if (tier === 'ENTERPRISE') {
      window.location.href = 'mailto:sales@forge-collective.com?subject=Enterprise Inquiry';
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const email = params.get('email') || localStorage.getItem('userEmail') || '';
    const firstName = params.get('firstName') || localStorage.getItem('userFirstName') || '';
    const lastName = params.get('lastName') || localStorage.getItem('userLastName') || '';
    const qs = new URLSearchParams({
      plan: tier,
      email,
      firstName,
      lastName,
      billingCycle,
    });
    window.location.href = `/checkout?${qs.toString()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <a
              href="/dashboard"
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </a>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100">
              Choose Your Plan
            </h1>
            <div className="w-24" />
          </div>

          <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 text-center max-w-3xl mx-auto">
            Start for free, then scale as you grow. All plans include our core collaborative features.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-slate-900 dark:text-slate-100' : 'text-slate-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                billingCycle === 'yearly' ? 'bg-orange-500' : 'bg-slate-300 dark:bg-slate-600'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-slate-900 dark:text-slate-100' : 'text-slate-500'}`}>
              Yearly
            </span>
            {billingCycle === 'yearly' && (
              <Badge variant="secondary" className="ml-2 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100">
                Save 20%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16 items-stretch">
          {pricingTiers.map((tier) => {
            const IconComponent = tier.icon;
            
            return (
              <Card 
                key={tier.tier} 
                className={`relative h-full flex flex-col overflow-hidden rounded-2xl ${
                  tier.popular 
                    ? 'border-orange-400 ring-1 ring-orange-200' 
                    : 'border-slate-200 dark:border-slate-700'
                } transition-shadow duration-200 hover:shadow-md`}
              >
                {tier.popular && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-orange-500 text-white shadow-sm">Most Popular</Badge>
                  </div>
                )}

                <CardHeader className="pb-2 text-center space-y-3">
                  <div className={`mx-auto h-10 w-10 rounded-xl flex items-center justify-center ${tier.popular ? 'bg-orange-50' : 'bg-slate-100 dark:bg-slate-800'}`}>
                    <IconComponent className={`${tier.popular ? 'text-orange-500' : 'text-slate-600 dark:text-slate-400'} h-5 w-5`} />
                  </div>
                  <CardTitle className="text-lg font-semibold tracking-tight">{tier.name}</CardTitle>
                  <div>{getPrice(tier.price)}</div>
                  <CardDescription className="text-sm leading-relaxed min-h-[44px]">{tier.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-1 pt-2">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-sm text-slate-900 dark:text-slate-100 mb-3">What's included</h4>
                      <ul className="space-y-2">
                        {tier.features.included.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3 text-sm">
                            <Check className="h-4 w-4 text-green-500 mt-0.5" />
                            <span className="text-slate-600 dark:text-slate-400">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {tier.features.limits.length > 0 && (
                      <div className="border-t border-slate-100 dark:border-slate-800 pt-5">
                        <h4 className="font-medium text-sm text-slate-900 dark:text-slate-100 mb-3">Limits</h4>
                        <ul className="space-y-2">
                          {tier.features.limits.map((limit, index) => (
                            <li key={index} className="flex items-start gap-3 text-sm">
                              <X className="h-4 w-4 text-slate-400 mt-0.5" />
                              <span className="text-slate-500">{limit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="gap-3 mt-auto bg-slate-50/50 dark:bg-slate-900/20 border-t border-slate-100 dark:border-slate-800">
                  <Button 
                    className={`w-full py-5 text-sm font-medium ${
                      tier.popular 
                        ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                        : 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900'
                    }`}
                    onClick={() => handleUpgrade(tier.tier)}
                  >
                    {tier.cta}
                  </Button>
                  {['INDIVIDUAL','STARTUP','BUSINESS'].includes(tier.tier) && (
                    <Button 
                      variant="outline" 
                      className="w-full py-5 text-sm border-slate-300 dark:border-slate-700"
                      onClick={() => {
                        const email = localStorage.getItem('userEmail') || '';
                        const firstName = localStorage.getItem('userFirstName') || '';
                        const lastName = localStorage.getItem('userLastName') || '';
                        const qs = new URLSearchParams({ plan: tier.tier, email, firstName, lastName, billingCycle, trial: '1' });
                        window.location.href = `/checkout?${qs.toString()}`;
                      }}
                    >
                      Start 14-day Free Trial
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Feature Comparison */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-sm mb-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-4">Feature Comparison</h2>
            <p className="text-slate-600 dark:text-slate-400 text-center mb-8">Compare plans to find the best fit for your needs</p>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-slate-200 dark:border-slate-700">
                    <th className="text-left py-4 px-6 w-1/4">Feature</th>
                    {pricingTiers.map((tier) => (
                      <th key={tier.tier} className="text-center py-4 px-6">
                        <div className="font-medium text-base mb-1">{tier.name}</div>
                        <div className="text-sm text-slate-500">
                          {tier.price === null ? 'Custom' : tier.price === 0 ? 'Free' : `$${tier.price}/mo`}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr>
                    <td className="py-4 px-6 font-medium">Max Teams</td>
                    {pricingTiers.map((tier) => (
                      <td key={tier.tier} className="text-center py-4 px-6">
                        <span className={tier.popular ? 'text-orange-600 font-medium' : ''}>
                          {tier.maxTeams === -1 ? 'Unlimited' : tier.maxTeams}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium">Max Projects</td>
                    {pricingTiers.map((tier) => (
                      <td key={tier.tier} className="text-center py-4 px-6">
                        <span className={tier.popular ? 'text-orange-600 font-medium' : ''}>
                          {tier.maxProjects === -1 ? 'Unlimited' : tier.maxProjects}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium">Team Members</td>
                    {pricingTiers.map((tier) => (
                      <td key={tier.tier} className="text-center py-4 px-6">
                        <span className={tier.popular ? 'text-orange-600 font-medium' : ''}>
                          {tier.maxTeamMembers === -1 ? 'Unlimited' : `Up to ${tier.maxTeamMembers}`}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium">Advanced Analytics</td>
                    {pricingTiers.map((tier) => (
                      <td key={tier.tier} className="text-center py-4 px-6">
                        {['STARTUP', 'BUSINESS', 'ENTERPRISE'].includes(tier.tier) ? (
                          <div className="flex items-center justify-center gap-2">
                            <Check className="h-5 w-5 text-green-500" />
                            <span className="text-sm text-green-600">Included</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <X className="h-5 w-5 text-slate-400" />
                            <span className="text-sm text-slate-500">Not included</span>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium">API Access</td>
                    {pricingTiers.map((tier) => (
                      <td key={tier.tier} className="text-center py-4 px-6">
                        {['BUSINESS', 'ENTERPRISE'].includes(tier.tier) ? (
                          <div className="flex items-center justify-center gap-2">
                            <Check className="h-5 w-5 text-green-500" />
                            <span className="text-sm text-green-600">Included</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <X className="h-5 w-5 text-slate-400" />
                            <span className="text-sm text-slate-500">Not included</span>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium">Custom Branding</td>
                    {pricingTiers.map((tier) => (
                      <td key={tier.tier} className="text-center py-4 px-6">
                        {['STARTUP', 'BUSINESS', 'ENTERPRISE'].includes(tier.tier) ? (
                          <div className="flex items-center justify-center gap-2">
                            <Check className="h-5 w-5 text-green-500" />
                            <span className="text-sm text-green-600">Included</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <X className="h-5 w-5 text-slate-400" />
                            <span className="text-sm text-slate-500">Not included</span>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Can I upgrade or downgrade my plan anytime?</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What happens to my data if I downgrade?</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Your data is preserved, but access to premium features will be limited. If you exceed plan limits, you'll need to archive some content or upgrade again.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
              <p className="text-slate-600 dark:text-slate-400">
                We offer a 30-day money-back guarantee for all paid plans. Contact our support team for assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}