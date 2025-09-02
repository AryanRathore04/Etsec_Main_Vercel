// Debug script to help identify the React error #130 cause
const { execSync } = require('child_process');

console.log('Starting debug build...');

try {
  const result = execSync('npm run build', { 
    cwd: process.cwd(),
    encoding: 'utf8',
    stdio: 'pipe'
  });
  console.log('Build succeeded!');
  console.log(result);
} catch (error) {
  console.log('Build failed with error:');
  console.log(error.stdout);
  console.log('Error details:');
  console.log(error.stderr);
  
  // Try to extract more specific error information
  if (error.stdout.includes('React error #130')) {
    console.log('\nReact error #130 detected - this usually means an object is being rendered as a React child');
    console.log('Common causes:');
    console.log('1. Passing an object where a string/number is expected');
    console.log('2. Motion component animation props with incorrect structure');
    console.log('3. Component props being passed incorrectly');
  }
}
