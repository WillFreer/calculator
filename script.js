class Calculator {
  constructor(displayElement, historyElement) {
    this.displayElement = displayElement;
    this.historyElement = historyElement;
    this.clear();
  }

  clear() {
    this.currentOperand = '0';
    this.previousOperand = '';
    this.operation = undefined;
    this.updateDisplay();
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    if (this.currentOperand === '0' && number !== '.') {
      this.currentOperand = number;
    } else {
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    this.updateDisplay();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
    this.updateDisplay();
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '/':
        computation = prev / current;
        break;
      default:
        return;
    }

    // Add to history
    this.addToHistory(`${prev} ${this.operation} ${current} = ${computation}`);
    
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  // Scientific Functions
  sin() {
    const result = Math.sin(this.parseCurrentOperand() * Math.PI / 180);
    this.addToHistory(`sin(${this.currentOperand}) = ${result}`);
    this.currentOperand = result;
    this.updateDisplay();
  }

  cos() {
    const result = Math.cos(this.parseCurrentOperand() * Math.PI / 180);
    this.addToHistory(`cos(${this.currentOperand}) = ${result}`);
    this.currentOperand = result;
    this.updateDisplay();
  }

  tan() {
    const result = Math.tan(this.parseCurrentOperand() * Math.PI / 180);
    this.addToHistory(`tan(${this.currentOperand}) = ${result}`);
    this.currentOperand = result;
    this.updateDisplay();
  }

  sqrt() {
    const result = Math.sqrt(this.parseCurrentOperand());
    this.addToHistory(`√(${this.currentOperand}) = ${result}`);
    this.currentOperand = result;
    this.updateDisplay();
  }

  pow() {
    const result = Math.pow(this.parseCurrentOperand(), 2);
    this.addToHistory(`(${this.currentOperand})² = ${result}`);
    this.currentOperand = result;
    this.updateDisplay();
  }

  parseCurrentOperand() {
    return parseFloat(this.currentOperand);
  }

  addToHistory(entry) {
    const historyItem = document.createElement('div');
    historyItem.textContent = entry;
    this.historyElement.appendChild(historyItem);
    this.historyElement.scrollTop = this.historyElement.scrollHeight;
  }

  updateDisplay() {
    this.displayElement.textContent = this.currentOperand;
  }
}

// Initialize Calculator
const display = document.getElementById('display');
const history = document.getElementById('history');
const calculator = new Calculator(display, history);

// Add Event Listeners
document.querySelectorAll('.cssbuttons-io').forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');
    
    switch(value) {
      case 'C':
        calculator.clear();
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        calculator.chooseOperation(value);
        break;
      case '=':
        calculator.compute();
        calculator.updateDisplay();
        break;
      case 'sin':
        calculator.sin();
        break;
      case 'cos':
        calculator.cos();
        break;
      case 'tan':
        calculator.tan();
        break;
      case 'sqrt':
        calculator.sqrt();
        break;
      case 'pow':
        calculator.pow();
        break;
      default:
        calculator.appendNumber(value);
    }
  });
});
