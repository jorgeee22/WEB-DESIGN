
function fibonacci(n) {
  if (n <= 1) {
      return n;
  } else {
      return fibonacci(n - 1) + fibonacci(n - 2);
  }
}

function displayFibonacci() {
  const num = document.getElementById("num").value;
  const resultElement = document.getElementById("result");

  const position = parseInt(num);
  const fibonacciNumber = fibonacci(position);

  resultElement.textContent = `Fibonacci number at position ${position} is: ${fibonacciNumber}`;
}
