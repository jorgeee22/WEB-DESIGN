/*
    Sieve of Eratosthenes - The sieve of Eratosthenes is one of the most efficient ways
    to find all of the smaller primes (below 10 million or so).
*/

// TODO: Adjust this script so it can work with the sieve.html file.

function sieve (n) {
  let isPrime = Array(n + 1).fill(true);
    isPrime[0] = isPrime[1] = false; 

    for (let p = 2; p * p <= n; p++) {
        if (isPrime[p]) {
            for (let i = p * p; i <= n; i += p) {
                isPrime[i] = false;
            }
        }
    }

    let primes = [];
    for (let i = 2; i <= n; i++) {
        if (isPrime[i]) {
            primes.push(i);
        }
    }
    return primes;
}

function calculatePrimes() {
  const n = parseInt(document.getElementById("num").value);
  const primes = sieve(n);
  document.getElementById("primes").textContent = primes.join(", ");
}

console.log(sieve(1000000));
