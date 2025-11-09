// Simple script to reset Strapi admin password via Railway
const bcrypt = require('bcryptjs');
const { Client } = require('pg');

async function resetPassword() {
  const email = 'purplegumdropz@gmail.com';
  const newPassword = 'Flomadpass!';
  
  // Hash the password
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  
  // Connect to database
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  
  await client.connect();
  
  try {
    // Update the admin user password
    const result = await client.query(
      'UPDATE admin_users SET password = $1 WHERE email = $2',
      [hashedPassword, email]
    );
    
    console.log(`✅ Password reset successful. Rows affected: ${result.rowCount}`);
    
    if (result.rowCount === 0) {
      console.log('⚠️  No user found with that email. Creating new admin user...');
      
      await client.query(
        'INSERT INTO admin_users (firstname, lastname, email, password, username, is_active) VALUES ($1, $2, $3, $4, $5, $6)',
        ['Admin', 'User', email, hashedPassword, email, true]
      );
      
      console.log('✅ Admin user created successfully');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

resetPassword().catch(console.error);
