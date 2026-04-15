const { spawn } = require('child_process');

if (!process.env._LAUNCHED) {
  const child = spawn('node', [__filename], {
    env: { ...process.env, UV_THREADPOOL_SIZE: 2, _LAUNCHED: 'true' }
  });

  child.stdout.on('data', data => {
    process.stdout.write(data.toString()); // prints live
  });

  child.stderr.on('data', data => {
    process.stderr.write(data.toString());
  });

  child.on('close', code => {
    console.log(`Child exited with code ${code}`);
  });

  return; // don’t run parent logic
}

// --- actual workload in child ---
console.log('Threadpool size:', process.env.UV_THREADPOOL_SIZE);

const crypto = require('crypto');
for (let i = 1; i <= 8; i++) {
  crypto.pbkdf2('password', 'salt', 5000000, 50, 'sha512', () => {
    console.log(`crypto Done. ${i}`);
  });
}
