document.getElementById('sendBtn').addEventListener('click', function() {
    const inputElement = document.getElementById('numberInput');
    const number = parseFloat(inputElement.value);
    const resultDiv = document.getElementById('result');

    if (isNaN(number)) {
        resultDiv.textContent = '❌ Будь ласка, введіть коректне число';
        resultDiv.style.color = 'red';
        return;
    }

    resultDiv.textContent = '⏳ Обчислення...';
    resultDiv.style.color = '#333';

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/calculate-square', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    resultDiv.textContent = `✅ Квадрат числа ${number} = ${response.square}`;
                    resultDiv.style.color = 'green';
                } catch (e) {
                    resultDiv.textContent = '❌ Помилка обробки відповіді сервера';
                    resultDiv.style.color = 'red';
                }
            } else {
                resultDiv.textContent = '❌ Помилка сервера. Спробуйте пізніше.';
                resultDiv.style.color = 'red';
            }
        }
    };
    
    xhr.send(JSON.stringify({ number: number }));
});