const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Starting Comprehensive FORGE Site Test...\n');

const BASE_URL = 'http://localhost:3000';
const results = { passed: 0, failed: 0, errors: [] };

function makeRequest(url, method = 'GET', body = null) {
  try {
    const curlCommand = [
      'curl', '-s', '-w', '%{http_code}', '-X', method,
      '-H', 'Content-Type: application/json', '--max-time', '10'
    ];
    if (body) curlCommand.push('-d', JSON.stringify(body));
    curlCommand.push(url);
    
    const response = execSync(curlCommand.join(' '), { encoding: 'utf8' });
    const statusCode = response.slice(-3);
    return {
      statusCode: parseInt(statusCode),
      success: parseInt(statusCode) >= 200 && parseInt(statusCode) < 400
    };
  } catch (error) {
    return { statusCode: 0, success: false };
  }
}

function testRoute(description, url, expectedStatus = 200) {
  console.log(`🔍 Testing: ${description}`);
  const result = makeRequest(url);
  
  if (result.success && result.statusCode === expectedStatus) {
    console.log(`   ✅ PASSED (${result.statusCode})`);
    results.passed++;
  } else {
    console.log(`   ❌ FAILED (${result.statusCode}) - Expected: ${expectedStatus}`);
    results.failed++;
    results.errors.push(`${description}: ${result.statusCode}`);
  }
}

function testAPI(description, endpoint, method = 'GET', body = null) {
  console.log(`🔍 Testing API: ${description}`);
  const result = makeRequest(`${BASE_URL}${endpoint}`, method, body);
  
  if (result.success) {
    console.log(`   ✅ PASSED (${result.statusCode})`);
    results.passed++;
  } else {
    console.log(`   ❌ FAILED (${result.statusCode})`);
    results.failed++;
    results.errors.push(`${description}: ${result.statusCode}`);
  }
}

function checkFile(description, filePath) {
  console.log(`📁 Checking: ${description}`);
  
  if (fs.existsSync(filePath)) {
    console.log(`   ✅ EXISTS`);
    results.passed++;
  } else {
    console.log(`   ❌ MISSING`);
    results.failed++;
    results.errors.push(`${description}: File not found`);
  }
}

// Core Pages
console.log('🏠 1. CORE PAGES & NAVIGATION');
console.log('=====================================');
testRoute('Landing Page', `${BASE_URL}/`);
testRoute('About Page', `${BASE_URL}/about`);
testRoute('Pricing Page', `${BASE_URL}/pricing`);
testRoute('Sign In Page', `${BASE_URL}/sign-in`);
testRoute('Sign Up Page', `${BASE_URL}/sign-up`);
testRoute('Dashboard', `${BASE_URL}/dashboard`);

// Dashboard Features
console.log('\n📊 2. DASHBOARD FEATURES');
console.log('=====================================');
testRoute('User Profile', `${BASE_URL}/dashboard/profile`);
testRoute('User Settings', `${BASE_URL}/dashboard/settings`);
testRoute('My Projects', `${BASE_URL}/dashboard/projects`);
testRoute('Create New Project', `${BASE_URL}/dashboard/projects/new`);
testRoute('Project Details', `${BASE_URL}/dashboard/projects/1`);
testRoute('My Teams', `${BASE_URL}/dashboard/teams`);
testRoute('Create New Team', `${BASE_URL}/dashboard/teams/new`);
testRoute('Team Details', `${BASE_URL}/dashboard/teams/1`);
testRoute('My Applications', `${BASE_URL}/dashboard/applications`);

// API Endpoints
console.log('\n🔌 3. API ENDPOINTS');
console.log('=====================================');
testAPI('Admin Stats', '/api/admin/stats');
testAPI('Admin Users', '/api/admin/users');
testAPI('User Profile', '/api/users/profile?email=demo@example.com');
testAPI('Analytics', '/api/analytics?email=demo@example.com&type=overview&period=30d');
testAPI('Notifications', '/api/notifications?email=demo@example.com');
testAPI('Messages', '/api/messages?conversationId=demo-conversation&email=demo@example.com');
testAPI('Conversations', '/api/conversations');
testAPI('Teams List', '/api/teams');
testAPI('Teams Browse', '/api/teams/browse');
testAPI('Projects Browse', '/api/projects/browse');
testAPI('Subscription Upgrade', '/api/subscriptions/upgrade', 'POST', { tier: 'INDIVIDUAL', billingCycle: 'monthly' });

// File Structure
console.log('\n📁 4. FILE STRUCTURE');
console.log('=====================================');
checkFile('Main Layout', 'src/app/layout.tsx');
checkFile('Dashboard Layout', 'src/app/dashboard/layout.tsx');
checkFile('Projects Page', 'src/app/dashboard/projects/page.tsx');
checkFile('Project Detail Page', 'src/app/dashboard/projects/[id]/page.tsx');
checkFile('Teams Page', 'src/app/dashboard/teams/page.tsx');
checkFile('Team Detail Page', 'src/app/dashboard/teams/[id]/page.tsx');
checkFile('Applications Page', 'src/app/dashboard/applications/page.tsx');
checkFile('Profile Page', 'src/app/dashboard/profile/page.tsx');
checkFile('Settings Page', 'src/app/dashboard/settings/page.tsx');
checkFile('Pricing Page', 'src/app/pricing/page.tsx');
checkFile('Landing Page', 'src/app/page.tsx');
checkFile('About Page', 'src/app/about/page.tsx');
checkFile('Package.json', 'package.json');
checkFile('Environment Config', '.env.local');

// Summary
console.log('\n📊 TEST SUMMARY');
console.log('=====================================');
console.log(`✅ Passed: ${results.passed}`);
console.log(`❌ Failed: ${results.failed}`);
console.log(`📈 Success Rate: ${((results.passed / (results.passed + results.failed)) * 100).toFixed(1)}%`);

if (results.errors.length > 0) {
  console.log('\n❌ ERRORS FOUND:');
  results.errors.forEach((error, index) => {
    console.log(`${index + 1}. ${error}`);
  });
}

console.log('\n🎯 RECOMMENDATIONS:');
if (results.failed === 0) {
  console.log('🎉 All tests passed! The site is working perfectly.');
} else {
  console.log('🔧 Issues found. Please address the following:');
  if (results.errors.some(e => e.includes('500'))) {
    console.log('   • Fix server errors (500 status codes)');
  }
  if (results.errors.some(e => e.includes('404'))) {
    console.log('   • Create missing pages (404 status codes)');
  }
  if (results.errors.some(e => e.includes('MISSING'))) {
    console.log('   • Create missing files');
  }
}

console.log('\n🚀 Test completed!');
