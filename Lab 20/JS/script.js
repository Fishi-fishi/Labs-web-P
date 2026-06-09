(function() {
    const body = document.body;

    const calculator = document.createElement('div');
    calculator.className = 'calculator';

    const display = document.createElement('div');
    display.className = 'display';
    display.textContent = '0';

    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'buttons';

    body.style.margin = '0';
    body.style.padding = '0';
    body.style.fontFamily = 'Arial, Helvetica, sans-serif';
    body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    body.style.minHeight = '100vh';
    body.style.display = 'flex';
    body.style.justifyContent = 'center';
    body.style.alignItems = 'center';

    calculator.style.backgroundColor = '#1e1e2f';
    calculator.style.borderRadius = '30px';
    calculator.style.padding = '20px';
    calculator.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
    calculator.style.width = '100%';
    calculator.style.maxWidth = '400px';
    calculator.style.transition = 'all 0.3s ease';

    display.style.backgroundColor = '#2d2d44';
    display.style.color = '#ffffff';
    display.style.fontSize = '2.5rem';
    display.style.textAlign = 'right';
    display.style.padding = '20px';
    display.style.borderRadius = '20px';
    display.style.marginBottom = '20px';
    display.style.overflowX = 'auto';
    display.style.whiteSpace = 'nowrap';
    display.style.fontFamily = 'monospace';
    display.style.wordBreak = 'break-all';
    display.style.whiteSpace = 'normal';
    display.style.wordWrap = 'break-word';
    display.style.minHeight = '80px';

    buttonsContainer.style.display = 'grid';
    buttonsContainer.style.gridTemplateColumns = 'repeat(4, 1fr)';
    buttonsContainer.style.gap = '12px';

    const buttons = [
        { text: 'AC', type: 'clear', value: 'AC' },
        { text: '+/-', type: 'sign', value: '+/-' },
        { text: '%', type: 'percent', value: '%' },
        { text: '÷', type: 'operator', value: '/' },
        { text: '7', type: 'number', value: '7' },
        { text: '8', type: 'number', value: '8' },
        { text: '9', type: 'number', value: '9' },
        { text: '×', type: 'operator', value: '*' },
        { text: '4', type: 'number', value: '4' },
        { text: '5', type: 'number', value: '5' },
        { text: '6', type: 'number', value: '6' },
        { text: '-', type: 'operator', value: '-' },
        { text: '1', type: 'number', value: '1' },
        { text: '2', type: 'number', value: '2' },
        { text: '3', type: 'number', value: '3' },
        { text: '+', type: 'operator', value: '+' },
        { text: '0', type: 'number', value: '0' },
        { text: '.', type: 'decimal', value: '.' },
        { text: '=', type: 'equals', value: '=' }
    ];

    let expression = '';
    let currentNumber = '';
    let resultDisplayed = false;

    function updateDisplay() {
        if (expression === '' && currentNumber === '') {
            display.textContent = '0';
        } else if (expression === '') {
            display.textContent = currentNumber;
        } else {
            display.textContent = expression + currentNumber;
        }
    }

    function clearAll() {
        expression = '';
        currentNumber = '';
        resultDisplayed = false;
        updateDisplay();
    }

    function changeSign() {
        if (currentNumber === '') return;
        
        if (currentNumber.startsWith('-')) {
            currentNumber = currentNumber.substring(1);
        } else {
            currentNumber = '-' + currentNumber;
        }
        updateDisplay();
    }

    function percent() {
        if (currentNumber === '') return;
        
        const num = parseFloat(currentNumber);
        if (!isNaN(num)) {
            currentNumber = (num / 100).toString();
            updateDisplay();
        }
    }

    function inputNumber(num) {
        if (resultDisplayed) {
            clearAll();
            resultDisplayed = false;
        }
        
        if (currentNumber === '0' && !currentNumber.includes('.')) {
            currentNumber = num;
        } else {
            currentNumber = currentNumber + num;
        }
        updateDisplay();
    }

    function inputDecimal() {
        if (resultDisplayed) {
            clearAll();
            resultDisplayed = false;
        }
        
        if (currentNumber === '') {
            currentNumber = '0.';
        } else if (!currentNumber.includes('.')) {
            currentNumber = currentNumber + '.';
        }
        updateDisplay();
    }

    function calculate() {
        if (expression === '' && currentNumber === '') return;
        
        let fullExpression = expression + currentNumber;
        
        fullExpression = fullExpression.replace(/×/g, '*');
        fullExpression = fullExpression.replace(/÷/g, '/');
        
        try {
            let result = eval(fullExpression);
            
            if (!isFinite(result)) {
                display.textContent = 'Помилка';
                expression = '';
                currentNumber = '';
                resultDisplayed = true;
                return;
            }
            
            result = Math.round(result * 10000000) / 10000000;
            
            expression = '';
            currentNumber = result.toString();
            resultDisplayed = true;
            updateDisplay();
            
        } catch (error) {
            display.textContent = 'Помилка';
            expression = '';
            currentNumber = '';
            resultDisplayed = true;
        }
    }

    function handleOperator(op) {
        if (resultDisplayed) {
            resultDisplayed = false;
        }
        
        if (currentNumber === '' && expression === '') return;
        
        if (currentNumber === '') {
            if (expression.length > 0) {
                expression = expression.slice(0, -1) + op;
            }
            updateDisplay();
            return;
        }
        
        let operatorSymbol = op;
        if (op === '*') operatorSymbol = '×';
        if (op === '/') operatorSymbol = '÷';
        
        expression = expression + currentNumber + operatorSymbol;
        currentNumber = '';
        updateDisplay();
    }

    function handleButton(btn) {
        switch (btn.type) {
            case 'number':
                inputNumber(btn.value);
                break;
            case 'decimal':
                inputDecimal();
                break;
            case 'operator':
                handleOperator(btn.value);
                break;
            case 'clear':
                clearAll();
                break;
            case 'sign':
                changeSign();
                break;
            case 'percent':
                percent();
                break;
            case 'equals':
                calculate();
                break;
        }
    }

    buttons.forEach(btnData => {
        const button = document.createElement('button');
        button.textContent = btnData.text;
        
        button.style.padding = '20px';
        button.style.fontSize = '1.3rem';
        button.style.border = 'none';
        button.style.borderRadius = '15px';
        button.style.cursor = 'pointer';
        button.style.transition = 'all 0.2s ease';
        button.style.fontWeight = 'bold';
        
        if (btnData.type === 'operator' || btnData.type === 'equals') {
            button.style.backgroundColor = '#ff9500';
            button.style.color = 'white';
        } else if (btnData.type === 'clear' || btnData.type === 'sign' || btnData.type === 'percent') {
            button.style.backgroundColor = '#a5a5a5';
            button.style.color = 'black';
        } else {
            button.style.backgroundColor = '#3a3a5c';
            button.style.color = 'white';
        }
        
        button.addEventListener('mouseenter', () => {
            button.style.opacity = '0.85';
            button.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.opacity = '1';
            button.style.transform = 'scale(1)';
        });
        
        button.addEventListener('click', () => handleButton(btnData));
        
        buttonsContainer.appendChild(button);
    });

    const zeroButton = buttonsContainer.children[16];
    if (zeroButton) {
        zeroButton.style.gridColumn = 'span 2';
    }

    calculator.appendChild(display);
    calculator.appendChild(buttonsContainer);
    body.appendChild(calculator);

    function handleResponsive() {
        const width = window.innerWidth;
        if (width < 480) {
            calculator.style.maxWidth = '95%';
            calculator.style.padding = '15px';
            display.style.fontSize = '1.8rem';
            display.style.padding = '15px';
            buttonsContainer.style.gap = '8px';
            const allButtons = document.querySelectorAll('.buttons button');
            allButtons.forEach(btn => {
                btn.style.padding = '15px';
                btn.style.fontSize = '1rem';
            });
        } else {
            calculator.style.maxWidth = '400px';
            calculator.style.padding = '20px';
            display.style.fontSize = '2.5rem';
            display.style.padding = '20px';
            buttonsContainer.style.gap = '12px';
            const allButtons = document.querySelectorAll('.buttons button');
            allButtons.forEach(btn => {
                btn.style.padding = '20px';
                btn.style.fontSize = '1.3rem';
            });
        }
    }

    window.addEventListener('resize', handleResponsive);
    handleResponsive();

    document.addEventListener('keydown', (e) => {
        const key = e.key;
        if (/[0-9]/.test(key)) {
            inputNumber(key);
        } else if (key === '.') {
            inputDecimal();
        } else if (key === '+' || key === '-' || key === '*' || key === '/') {
            let op = key;
            if (key === '*') op = '*';
            if (key === '/') op = '/';
            handleOperator(op);
        } else if (key === 'Enter' || key === '=') {
            e.preventDefault();
            calculate();
        } else if (key === 'Escape') {
            clearAll();
        } else if (key === '%') {
            percent();
        } else if (key === 'Backspace') {
            if (currentNumber.length > 0) {
                currentNumber = currentNumber.slice(0, -1);
                updateDisplay();
            } else if (expression.length > 0) {
                expression = expression.slice(0, -1);
                updateDisplay();
            }
        }
    });
})();