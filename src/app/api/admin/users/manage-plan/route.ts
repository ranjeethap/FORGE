import { NextRequest, NextResponse } from 'next/server';

// POST /api/admin/users/manage-plan - Admin endpoint to change user plans
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { adminEmail, userEmail, newPlan } = body;

    // Validate required fields
    if (!adminEmail || !userEmail || !newPlan) {
      return NextResponse.json(
        { error: 'adminEmail, userEmail, and newPlan are required' },
        { status: 400 }
      );
    }

    // Validate plan options
    const validPlans = ['FREE', 'INDIVIDUAL', 'STARTUP', 'BUSINESS', 'ENTERPRISE'];
    if (!validPlans.includes(newPlan)) {
      return NextResponse.json(
        { error: 'Invalid plan. Must be one of: FREE, INDIVIDUAL, STARTUP, BUSINESS, ENTERPRISE' },
        { status: 400 }
      );
    }

    // Check if admin user exists and has admin role
    if (adminEmail !== 'ranjeeth_ap@outlook.com') {
      return NextResponse.json(
        { error: 'Unauthorized. Only admin users can manage plans.' },
        { status: 403 }
      );
    }

    // Mock successful plan change
    const mockResponse = {
      success: true,
      message: `User ${userEmail} plan changed to ${newPlan}`,
      userEmail,
      newPlan,
      changedAt: new Date().toISOString(),
      changedBy: adminEmail
    };

    return NextResponse.json(mockResponse);

  } catch (error) {
    console.error('Error managing user plan:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// GET /api/admin/users/manage-plan - Get available plans
export async function GET() {
  try {
    const availablePlans = [
      {
        id: 'FREE',
        name: 'Free Plan',
        price: '$0/month',
        features: ['Basic features', 'Limited projects', 'Community support']
      },
      {
        id: 'INDIVIDUAL',
        name: 'Individual',
        price: '$9/month',
        features: ['All Free features', 'Unlimited projects', 'Priority support']
      },
      {
        id: 'STARTUP',
        name: 'Startup',
        price: '$29/month',
        features: ['All Individual features', 'Team collaboration', 'Advanced analytics']
      },
      {
        id: 'BUSINESS',
        name: 'Business',
        price: '$99/month',
        features: ['All Startup features', 'Custom integrations', 'Dedicated support']
      },
      {
        id: 'ENTERPRISE',
        name: 'Enterprise',
        price: 'Contact Sales',
        features: ['All Business features', 'Custom solutions', '24/7 support', 'SLA guarantee']
      }
    ];

    return NextResponse.json({ plans: availablePlans });

  } catch (error) {
    console.error('Error fetching plans:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
