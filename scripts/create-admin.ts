import { PrismaClient } from '../prisma/src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  try {
    // Create admin user
    const admin = await prisma.user.upsert({
      where: { email: 'ranjeeth_ap@outlook.com' },
      update: {
        role: 'ADMIN',
        subscriptionTier: 'ENTERPRISE',
        subscriptionStatus: 'ACTIVE',
        maxTeams: -1,
        maxProjects: -1,
        maxTeamMembers: -1,
        maxProjectMembers: -1,
        hasAdvancedAnalytics: true,
        hasPrioritySupport: true,
        hasCustomBranding: true,
        hasAPIAccess: true,
      },
      create: {
        email: 'ranjeeth_ap@outlook.com',
        firstName: 'Ranjeeth',
        lastName: 'Kumar',
        role: 'ADMIN',
        subscriptionTier: 'ENTERPRISE',
        subscriptionStatus: 'ACTIVE',
        maxTeams: -1,
        maxProjects: -1,
        maxTeamMembers: -1,
        maxProjectMembers: -1,
        hasAdvancedAnalytics: true,
        hasPrioritySupport: true,
        hasCustomBranding: true,
        hasAPIAccess: true,
      },
    });

    console.log('Admin user created/updated:', admin);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
