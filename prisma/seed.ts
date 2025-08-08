import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create skills
  const skills = [
    // Frontend
    { name: 'React', category: 'Frontend' },
    { name: 'Vue.js', category: 'Frontend' },
    { name: 'Angular', category: 'Frontend' },
    { name: 'TypeScript', category: 'Frontend' },
    { name: 'JavaScript', category: 'Frontend' },
    { name: 'HTML/CSS', category: 'Frontend' },
    { name: 'Tailwind CSS', category: 'Frontend' },
    
    // Backend
    { name: 'Node.js', category: 'Backend' },
    { name: 'Python', category: 'Backend' },
    { name: 'Java', category: 'Backend' },
    { name: 'C#', category: 'Backend' },
    { name: 'Go', category: 'Backend' },
    { name: 'PHP', category: 'Backend' },
    { name: 'Ruby', category: 'Backend' },
    
    // Database
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'MongoDB', category: 'Database' },
    { name: 'MySQL', category: 'Database' },
    { name: 'Redis', category: 'Database' },
    { name: 'DynamoDB', category: 'Database' },
    
    // Cloud & DevOps
    { name: 'AWS', category: 'Cloud' },
    { name: 'Azure', category: 'Cloud' },
    { name: 'GCP', category: 'Cloud' },
    { name: 'Docker', category: 'DevOps' },
    { name: 'Kubernetes', category: 'DevOps' },
    { name: 'Terraform', category: 'DevOps' },
    { name: 'CI/CD', category: 'DevOps' },
    { name: 'Jenkins', category: 'DevOps' },
    { name: 'GitLab', category: 'DevOps' },
    
    // AI/ML
    { name: 'TensorFlow', category: 'AI/ML' },
    { name: 'PyTorch', category: 'AI/ML' },
    { name: 'Computer Vision', category: 'AI/ML' },
    { name: 'NLP', category: 'AI/ML' },
    { name: 'Machine Learning', category: 'AI/ML' },
    
    // Blockchain
    { name: 'Solidity', category: 'Blockchain' },
    { name: 'Ethereum', category: 'Blockchain' },
    { name: 'Smart Contracts', category: 'Blockchain' },
    { name: 'Web3', category: 'Blockchain' },
    
    // Mobile
    { name: 'React Native', category: 'Mobile' },
    { name: 'Flutter', category: 'Mobile' },
    { name: 'iOS', category: 'Mobile' },
    { name: 'Android', category: 'Mobile' },
  ];

  console.log('Creating skills...');
  for (const skill of skills) {
    await prisma.skill.upsert({
      where: { name: skill.name },
      update: {},
      create: skill,
    });
  }

  // Create sample users (these would normally be created via Clerk)
  console.log('Creating sample users...');
  const user1 = await prisma.user.upsert({
    where: { email: 'sarah.chen@example.com' },
    update: {},
    create: {
      clerkId: 'clerk_sarah_chen',
      email: 'sarah.chen@example.com',
      firstName: 'Sarah',
      lastName: 'Chen',
      bio: 'Senior cloud architect with 8+ years of experience in AWS, Azure, and GCP migrations.',
      location: 'San Francisco, CA',
      timezone: 'PST',
      hourlyRate: 140,
      isAvailable: true,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'david.kim@example.com' },
    update: {},
    create: {
      clerkId: 'clerk_david_kim',
      email: 'david.kim@example.com',
      firstName: 'David',
      lastName: 'Kim',
      bio: 'DevOps engineer specializing in Kubernetes, Docker, and CI/CD pipelines.',
      location: 'Seattle, WA',
      timezone: 'PST',
      hourlyRate: 120,
      isAvailable: true,
    },
  });

  const user3 = await prisma.user.upsert({
    where: { email: 'maria.rodriguez@example.com' },
    update: {},
    create: {
      clerkId: 'clerk_maria_rodriguez',
      email: 'maria.rodriguez@example.com',
      firstName: 'Maria',
      lastName: 'Rodriguez',
      bio: 'Full-stack developer with expertise in React, Node.js, and PostgreSQL.',
      location: 'Austin, TX',
      timezone: 'CST',
      hourlyRate: 110,
      isAvailable: true,
    },
  });

  // Get skills for team creation
  const awsSkill = await prisma.skill.findUnique({ where: { name: 'AWS' } });
  const azureSkill = await prisma.skill.findUnique({ where: { name: 'Azure' } });
  const gcpSkill = await prisma.skill.findUnique({ where: { name: 'GCP' } });
  const terraformSkill = await prisma.skill.findUnique({ where: { name: 'Terraform' } });
  const kubernetesSkill = await prisma.skill.findUnique({ where: { name: 'Kubernetes' } });
  const dockerSkill = await prisma.skill.findUnique({ where: { name: 'Docker' } });
  const reactSkill = await prisma.skill.findUnique({ where: { name: 'React' } });
  const nodeSkill = await prisma.skill.findUnique({ where: { name: 'Node.js' } });
  const postgresSkill = await prisma.skill.findUnique({ where: { name: 'PostgreSQL' } });

  // Create sample teams
  console.log('Creating sample teams...');
  const cloudTeam = await prisma.team.create({
    data: {
      name: 'Cloud Architects United',
      description: 'Senior cloud architects specializing in AWS, Azure, and GCP migrations. We bring enterprise-level expertise to complex cloud infrastructure projects.',
      hourlyRate: 140,
      maxMembers: 6,
      status: 'OPEN',
      location: 'Remote',
      timezone: 'PST/EST',
      communication: ['Slack', 'Zoom', 'GitHub'],
      totalEarnings: 45000,
      averageRating: 4.8,
      leaderId: user1.id,
      skills: {
        connect: [
          { id: awsSkill!.id },
          { id: azureSkill!.id },
          { id: gcpSkill!.id },
          { id: terraformSkill!.id },
          { id: kubernetesSkill!.id },
          { id: dockerSkill!.id },
        ],
      },
    },
  });

  const fullstackTeam = await prisma.team.create({
    data: {
      name: 'Full-Stack Warriors',
      description: 'Versatile developers covering frontend, backend, and DevOps. We deliver complete solutions from concept to deployment.',
      hourlyRate: 120,
      maxMembers: 5,
      status: 'FULL',
      location: 'Remote',
      timezone: 'CST/EST',
      communication: ['Discord', 'Zoom', 'GitHub'],
      totalEarnings: 38000,
      averageRating: 4.6,
      leaderId: user3.id,
      skills: {
        connect: [
          { id: reactSkill!.id },
          { id: nodeSkill!.id },
          { id: postgresSkill!.id },
          { id: dockerSkill!.id },
          { id: awsSkill!.id },
        ],
      },
    },
  });

  // Add team members
  console.log('Adding team members...');
  await prisma.teamMember.createMany({
    data: [
      {
        userId: user1.id,
        teamId: cloudTeam.id,
        role: 'LEADER',
      },
      {
        userId: user2.id,
        teamId: cloudTeam.id,
        role: 'MEMBER',
      },
      {
        userId: user3.id,
        teamId: fullstackTeam.id,
        role: 'LEADER',
      },
    ],
    skipDuplicates: true,
  });

  // Create sample projects
  console.log('Creating sample projects...');
  const project1 = await prisma.project.create({
    data: {
      title: 'E-commerce Platform Migration',
      description: 'Migrate a legacy e-commerce platform to modern cloud infrastructure with improved scalability and performance.',
      hourlyRate: 140,
      estimatedHours: 240,
      duration: '6 weeks',
      status: 'COMPLETED',
      budget: 33600,
      clientName: 'TechCorp Inc.',
      requirements: 'AWS migration, performance optimization, CI/CD pipeline setup',
      teamId: cloudTeam.id,
      leaderId: user1.id,
      skills: {
        connect: [
          { id: awsSkill!.id },
          { id: terraformSkill!.id },
          { id: dockerSkill!.id },
        ],
      },
    },
  });

  const project2 = await prisma.project.create({
    data: {
      title: 'Healthcare Data Platform',
      description: 'Build a secure, HIPAA-compliant data platform for healthcare analytics and patient management.',
      hourlyRate: 150,
      estimatedHours: 320,
      duration: '8 weeks',
      status: 'IN_PROGRESS',
      budget: 48000,
      clientName: 'HealthTech Solutions',
      requirements: 'Security compliance, data encryption, real-time analytics',
      teamId: cloudTeam.id,
      leaderId: user1.id,
      skills: {
        connect: [
          { id: awsSkill!.id },
          { id: postgresSkill!.id },
          { id: kubernetesSkill!.id },
        ],
      },
    },
  });

  const project3 = await prisma.project.create({
    data: {
      title: 'Financial Services Infrastructure',
      description: 'Modernize financial services infrastructure with microservices architecture and enhanced security.',
      hourlyRate: 160,
      estimatedHours: 200,
      duration: '4 weeks',
      status: 'COMPLETED',
      budget: 32000,
      clientName: 'FinServe Pro',
      requirements: 'Microservices, security hardening, compliance audit',
      teamId: fullstackTeam.id,
      leaderId: user3.id,
      skills: {
        connect: [
          { id: reactSkill!.id },
          { id: nodeSkill!.id },
          { id: postgresSkill!.id },
        ],
      },
    },
  });

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 