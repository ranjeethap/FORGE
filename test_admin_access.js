const { execSync } = require('child_process');

console.log('🔍 Testing Admin Access...\n');

// Test admin pages directly
const adminPages = [
  'http://localhost:3000/admin',
  'http://localhost:3000/admin/manage-users'
];

adminPages.forEach(page => {
  try {
    console.log(`Testing: ${page}`);
    const result = execSync(`curl -s -o /dev/null -w "%{http_code}" ${page}`, { encoding: 'utf8' });
    console.log(`   Status: ${result}`);
    
    if (result.trim() === '200') {
      console.log('   ✅ Page accessible');
    } else {
      console.log('   ❌ Page not accessible');
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }
  console.log('');
});

// Test admin API endpoints
const adminAPIs = [
  'http://localhost:3000/api/admin/stats',
  'http://localhost:3000/api/admin/users',
  'http://localhost:3000/api/admin/users/manage-plan'
];

console.log('🔌 Testing Admin APIs...\n');

adminAPIs.forEach(api => {
  try {
    console.log(`Testing: ${api}`);
    const result = execSync(`curl -s -o /dev/null -w "%{http_code}" ${api}`, { encoding: 'utf8' });
    console.log(`   Status: ${result}`);
    
    if (result.trim() === '200') {
      console.log('   ✅ API accessible');
    } else {
      console.log('   ❌ API not accessible');
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }
  console.log('');
});

console.log('✅ Admin access test completed!');
