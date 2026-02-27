const fs = require('fs');
const path = require('path');

// Read the users.json file
const usersFilePath = path.join(__dirname, 'src', 'data', 'users.json');
console.log("Users file path = ", usersFilePath)
let usersData = fs.readFileSync(usersFilePath, 'utf8');
console.log("Users data in the file  = ", usersData)

console.log('Original data starts with:', usersData.substring(0, 50));

// Parse the JSON - handle if it's wrapped in array brackets or not
let users;
try {
  // Try parsing directly first
  users = JSON.parse(usersData);
} catch (e) {
  // If it fails, it might be missing brackets
  if (!usersData.trim().startsWith('[')) {
    usersData = '[' + usersData + ']';
    users = JSON.parse(usersData);
  } else {
    throw e;
  }
}

console.log(`Found ${users.length} users to transform`);

// Transform each user
const transformedUsers = users.map(user => ({
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    password: user.password, // Note: This is plain text; the schema pre-save hook will hash it
    organization: null, // Not in source data
    role: 'junior', // Default
    employeeEmail: null, // Not in source data
    about: null, // Not in source data
    phone: user.phone_number,
    avatar: user.picture,
    defaultCurrency: 'PKR', // Default
    occupation: null, // Not in source data
    isEmailVerified: false, // Default
    isActive: true, // Default
    lastLogin: null // Not in source data
}));

// Write back to the file
fs.writeFileSync(usersFilePath, JSON.stringify(transformedUsers, null, 2));
console.log('Users data transformed successfully.');
