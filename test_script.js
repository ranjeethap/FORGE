const { execSync } = require('child_process');
const fs = require('fs');

// Configuration
const BASE_URL = 'http://localhost:3000';
const TIMEOUT = 10000; // 10 seconds

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

// Test results
const results = {
  passed: 0,
  failed: 0,
  errors: []
};

// Helper function to log with colors
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Helper function to make HTTP request
function makeRequest(url, method = 'GET', timeout = TIMEOUT) {
  try {
    const curlCommand = `curl -s -o /dev/null -w "%{http_code}" -X ${method} "${url}" --max-time ${timeout / 1000}`;
    const statusCode = execSync(curlCommand, { encoding: 'utf8' }).trim();
    return parseInt(statusCode);
  } catch (error) {
    return 0; // Connection failed
  }
}

// Helper function to check if file exists
function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (error) {
    return false;
  }
}

// Test function
function testRoute(url, expectedStatus = 200, description = '') {
  const status = makeRequest(url);
  const success = status === expectedStatus;
  
  if (success) {
    log(`✓ ${description || url} (${status})`, 'green');
    results.passed++;
  } else {
    log(`✗ ${description || url} (${status}, expected ${expectedStatus})`, 'red');
    results.failed++;
    results.errors.push(`${url} - Status: ${status}, Expected: ${expectedStatus}`);
  }
  
  return success;
}

// Test file existence
function testFile(filePath, description = '') {
  const exists = fileExists(filePath);
  
  if (exists) {
    log(`✓ ${description || filePath} (exists)`, 'green');
    results.passed++;
  } else {
    log(`✗ ${description || filePath} (missing)`, 'red');
    results.failed++;
    results.errors.push(`${filePath} - File not found`);
  }
  
  return exists;
}

// Main test execution
async function runTests() {
  log('🚀 Starting comprehensive link and route testing...', 'bold');
  log('', 'reset');
  
  // Test main pages
  log('📄 Testing Main Pages:', 'blue');
  testRoute(`${BASE_URL}/`, 200, 'Landing Page');
  testRoute(`${BASE_URL}/pricing`, 200, 'Pricing Page');
  testRoute(`${BASE_URL}/dashboard`, 200, 'Dashboard');
  testRoute(`${BASE_URL}/admin`, 200, 'Admin Dashboard');
  log('', 'reset');
  
  // Test dashboard pages
  log('📊 Testing Dashboard Pages:', 'blue');
  testRoute(`${BASE_URL}/dashboard/profile`, 200, 'User Profile');
  testRoute(`${BASE_URL}/dashboard/settings`, 200, 'User Settings');
  testRoute(`${BASE_URL}/dashboard/projects`, 200, 'My Projects');
  testRoute(`${BASE_URL}/dashboard/teams`, 200, 'My Teams');
  testRoute(`${BASE_URL}/dashboard/applications`, 200, 'Applications');
  testRoute(`${BASE_URL}/dashboard/messages`, 200, 'Messages');
  testRoute(`${BASE_URL}/dashboard/notifications`, 200, 'Notifications');
  testRoute(`${BASE_URL}/dashboard/analytics`, 200, 'Analytics');
  log('', 'reset');
  
  // Test project pages
  log('�� Testing Project Pages:', 'blue');
  testRoute(`${BASE_URL}/dashboard/projects/new`, 200, 'New Project');
  testRoute(`${BASE_URL}/dashboard/projects/1`, 200, 'Project Details');
  testRoute(`${BASE_URL}/dashboard/projects/browse`, 200, 'Browse Projects');
  log('', 'reset');
  
  // Test team pages
  log('👥 Testing Team Pages:', 'blue');
  testRoute(`${BASE_URL}/dashboard/teams/new`, 200, 'New Team');
  testRoute(`${BASE_URL}/dashboard/teams/1`, 200, 'Team Details');
  testRoute(`${BASE_URL}/dashboard/teams/browse`, 200, 'Browse Teams');
  testRoute(`${BASE_URL}/teams/create`, 200, 'Create Team');
  testRoute(`${BASE_URL}/teams/browse`, 200, 'Teams Browse');
  testRoute(`${BASE_URL}/teams/1`, 200, 'Team Detail Page');
  log('', 'reset');
  
  // Test application pages
  log('📝 Testing Application Pages:', 'blue');
  testRoute(`${BASE_URL}/dashboard/applications/project/1`, 200, 'Project Application Details');
  testRoute(`${BASE_URL}/dashboard/applications/team/1`, 200, 'Team Application Details');
  log('', 'reset');
  
  // Test API endpoints
  log('🔌 Testing API Endpoints:', 'blue');
  testRoute(`${BASE_URL}/api/admin/stats`, 200, 'Admin Stats API');
  testRoute(`${BASE_URL}/api/admin/users`, 200, 'Admin Users API');
  testRoute(`${BASE_URL}/api/analytics`, 200, 'Analytics API');
  testRoute(`${BASE_URL}/api/conversations`, 200, 'Conversations API');
  testRoute(`${BASE_URL}/api/messages`, 200, 'Messages API');
  testRoute(`${BASE_URL}/api/notifications`, 200, 'Notifications API');
  testRoute(`${BASE_URL}/api/users/profile`, 200, 'User Profile API');
  testRoute(`${BASE_URL}/api/teams`, 200, 'Teams API');
  testRoute(`${BASE_URL}/api/teams/create`, 200, 'Create Team API');
  testRoute(`${BASE_URL}/api/teams/browse`, 200, 'Browse Teams API');
  testRoute(`${BASE_URL}/api/teams/1`, 200, 'Team Details API');
  testRoute(`${BASE_URL}/api/projects/browse`, 200, 'Browse Projects API');
  testRoute(`${BASE_URL}/api/subscriptions/upgrade`, 200, 'Subscription Upgrade API');
  log('', 'reset');
  
  // Test file existence for critical components
  log('📂 Testing Critical Files:', 'blue');
  testFile('src/app/dashboard/projects/[id]/page.tsx', 'Project Details Page Component');
  testFile('src/app/dashboard/teams/[id]/page.tsx', 'Team Details Page Component');
  testFile('src/app/dashboard/applications/project/[id]/page.tsx', 'Project Application Details Component');
  testFile('src/app/dashboard/applications/team/[id]/page.tsx', 'Team Application Details Component');
  testFile('src/app/teams/[id]/page.tsx', 'Teams Detail Page Component');
  testFile('src/app/api/teams/[id]/route.ts', 'Team API Route');
  testFile('src/app/api/projects/browse/route.ts', 'Projects Browse API Route');
  testFile('src/app/api/teams/browse/route.ts', 'Teams Browse API Route');
  testFile('src/app/api/teams/create/route.ts', 'Teams Create API Route');
  testFile('src/app/api/subscriptions/upgrade/route.ts', 'Subscription Upgrade API Route');
  log('', 'reset');
  
  // Test specific error cases
  log('⚠️  Testing Error Cases:', 'blue');
  testRoute(`${BASE_URL}/nonexistent-page`, 404, 'Non-existent Page (should return 404)');
  testRoute(`${BASE_URL}/api/nonexistent-api`, 404, 'Non-existent API (should return 404)');
  log('', 'reset');
  
  // Summary
  log('📋 Test Summary:', 'bold');
  log(`Total Tests: ${results.passed + results.failed}`, 'reset');
  log(`Passed: ${results.passed}`, 'green');
  log(`Failed: ${results.failed}`, 'red');
  
  if (results.errors.length > 0) {
    log('', 'reset');
    log('❌ Failed Tests:', 'red');
    results.errors.forEach((error, index) => {
      log(`${index + 1}. ${error}`, 'red');
    });
  }
  
  if (results.failed === 0) {
    log('', 'reset');
    log('🎉 All tests passed! The application is working correctly.', 'green');
  } else {
    log('', 'reset');
    log('🔧 Some tests failed. Please check the errors above and fix the issues.', 'yellow');
  }
}

// Run the tests
runTests().catch(error => {
  log(`❌ Test execution failed: ${error.message}`, 'red');
  process.exit(1);
});
