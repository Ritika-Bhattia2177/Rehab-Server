const bcrypt = require('bcryptjs');

async function testBcrypt() {
  const password = 'patient123';
  const hash = await bcrypt.hash(password, 10);
  console.log('Hash:', hash);
  
  const match = await bcrypt.compare(password, hash);
  console.log('Match:', match);
  
  const wrongMatch = await bcrypt.compare('wrongpassword', hash);
  console.log('Wrong match:', wrongMatch);
}

testBcrypt();
