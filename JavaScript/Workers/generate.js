// listen for messages from the main thread.
// if the message command is 'generate', then call `generatePrimes()`

// addEventListener() and postMessage() are both global functions in a worker.
addEventListener("message", (message) => {
  if (message.data.command === "generate") {
    generatePrimes(message.data.quota);
  }
});

// Generate primes (inefficiently)
function generatePrimes(quota) {
  function isPrime(n) {
    for (let c = 2; c <= Math.sqrt(n); c++) {
      if (n % c === 0) {
        return false;
      }
    }
    return true;
  }
  const primes = [];
  const maximum = 1000000;

  while (primes.length < quota) {
    const candidate = Math.floor(Math.random() * (maximum + 1));
    if (isPrime(candidate)) {
      primes.push(candidate);
    }
  }

  // when has finished running, send a message to the main thread, including
  // the number of primes we generated.
  postMessage(primes.length);
}
