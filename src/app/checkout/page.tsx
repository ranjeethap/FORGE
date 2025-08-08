'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

const PLAN_PRICES: Record<string, number | null> = {
  FREE: 0,
  INDIVIDUAL: 29,
  STARTUP: 79,
  BUSINESS: 199,
  ENTERPRISE: null,
};

export default function CheckoutPage() {
  const [plan, setPlan] = useState<string>('FREE');
  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [trial, setTrial] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const p = (params.get('plan') || localStorage.getItem('userPlan') || 'FREE').toUpperCase();
    setPlan(p);
    setEmail(params.get('email') || localStorage.getItem('userEmail') || '');
    setFirstName(params.get('firstName') || localStorage.getItem('userFirstName') || '');
    setLastName(params.get('lastName') || localStorage.getItem('userLastName') || '');
    const bc = (params.get('billingCycle') as 'monthly' | 'yearly') || (localStorage.getItem('userBillingCycle') as 'monthly' | 'yearly') || 'monthly';
    setBillingCycle(bc);
    setTrial(params.get('trial') === '1' || localStorage.getItem('userTrial') === '1');
  }, []);

  const basePrice = useMemo(() => PLAN_PRICES[plan] ?? null, [plan]);
  const price = useMemo(() => {
    if (basePrice === null) return null;
    if (basePrice === 0) return 0;
    const perMonth = billingCycle === 'yearly' ? Math.floor(basePrice * 0.8) : basePrice;
    return perMonth;
  }, [basePrice, billingCycle]);

  const handleConfirm = () => {
    if (!email) {
      alert('Please enter your email to continue');
      return;
    }
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPlan', plan);
    localStorage.setItem('userBillingCycle', billingCycle);
    localStorage.setItem('userTrial', trial ? '1' : '0');
    if (firstName) localStorage.setItem('userFirstName', firstName);
    if (lastName) localStorage.setItem('userLastName', lastName);

    const qs = new URLSearchParams({
      email,
      plan,
      firstName,
      lastName,
      billingCycle,
    });
    if (trial) qs.set('trial', '1');

    window.location.href = `/dashboard?${qs.toString()}&payment=success`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/pricing" className="text-sm text-slate-600 hover:text-slate-900">← Back to Pricing</Link>
          <div className="flex items-center gap-3">
            <select className="border rounded px-3 py-2" value={billingCycle} onChange={e => setBillingCycle(e.target.value as 'monthly' | 'yearly')}>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly (Save 20%)</option>
            </select>
            <select className="border rounded px-3 py-2" value={plan} onChange={e => setPlan(e.target.value.toUpperCase())}>
              <option value="FREE">Free - $0</option>
              <option value="INDIVIDUAL">Individual - $29/mo</option>
              <option value="STARTUP">Startup - $79/mo</option>
              <option value="BUSINESS">Business - $199/mo</option>
            </select>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Checkout</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-600">Selected Plan</span>
                <span className="font-medium">{plan} {trial && ['INDIVIDUAL','STARTUP','BUSINESS'].includes(plan) ? <span className="text-xs text-green-600">(14-day trial)</span> : null}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Price</span>
                <span className="font-medium">{price === null ? 'Custom' : price === 0 ? '$0' : `$${price}/mo`} {billingCycle === 'yearly' && price ? <span className="text-xs text-slate-500">billed yearly</span> : null}</span>
              </div>
              {['INDIVIDUAL','STARTUP','BUSINESS'].includes(plan) && (
                <div className="flex items-center">
                  <input id="trial" type="checkbox" className="h-4 w-4 mr-2" checked={trial} onChange={(e) => setTrial(e.target.checked)} />
                  <label htmlFor="trial" className="text-sm text-slate-700">Start 14-day free trial (no charge today)</label>
                </div>
              )}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-slate-600">Email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} className="border rounded px-3 py-2" placeholder="you@example.com" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-slate-600">First name</label>
                  <input value={firstName} onChange={e => setFirstName(e.target.value)} className="border rounded px-3 py-2" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-slate-600">Last name</label>
                  <input value={lastName} onChange={e => setLastName(e.target.value)} className="border rounded px-3 py-2" />
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <Button className="flex-1" onClick={handleConfirm}>
                  {price && price > 0 ? (trial ? 'Start Trial' : `Confirm and Pay - $${price}/mo`) : 'Activate Free Plan'}
                </Button>
                <Button variant="outline" onClick={() => (window.location.href = '/pricing')}>Cancel</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
