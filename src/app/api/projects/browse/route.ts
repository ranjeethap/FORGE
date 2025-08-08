import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  try {
    // Mock authentication check
    const userId = 'mock-user-id';

    // Mock projects data for now
    const projects = [
      {
        id: '1',
        title: 'E-commerce Platform Migration',
        description: 'Help migrate a large e-commerce platform from on-premise to AWS with zero downtime',
        budget: { min: 50000, max: 150000 },
        timeline: '3-6 months',
        teamSize: '4-6 members',
        status: 'active',
        skills: ['AWS', 'Docker', 'Kubernetes', 'PostgreSQL'],
        client: {
          name: 'TechRetail Inc.',
          industry: 'E-commerce'
        },
        postedDate: '2024-02-15'
      },
      {
        id: '2',
        title: 'AI-Powered Customer Support Chatbot',
        description: 'Develop an intelligent chatbot using NLP and machine learning for customer support',
        budget: { min: 30000, max: 80000 },
        timeline: '2-4 months',
        teamSize: '3-4 members',
        status: 'active',
        skills: ['Python', 'TensorFlow', 'NLP', 'API Development'],
        client: {
          name: 'SupportFlow Solutions',
          industry: 'SaaS'
        },
        postedDate: '2024-02-14'
      },
      {
        id: '3',
        title: 'Healthcare Data Analytics Platform',
        description: 'Build a comprehensive analytics platform for healthcare data visualization and insights',
        budget: { min: 80000, max: 200000 },
        timeline: '6-12 months',
        teamSize: '6-8 members',
        status: 'active',
        skills: ['React', 'Python', 'Data Science', 'Healthcare APIs'],
        client: {
          name: 'HealthTech Innovations',
          industry: 'Healthcare'
        },
        postedDate: '2024-02-13'
      }
    ];

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
