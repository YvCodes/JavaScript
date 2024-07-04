document.addEventListener('DOMContentLoaded', () => {
    const cars = [
        { name: 'Toyota Camry', price: 24000 },
        { name: 'Honda Accord', price: 26000 },
        { name: 'Ford Mustang', price: 35000 },
        { name: 'Chevrolet Camaro', price: 37000 },
        { name: 'BMW 3 Series', price: 41000 },
        { name: 'Audi A4', price: 42000 },
        { name: 'Mercedes-Benz C-Class', price: 43000 },
        { name: 'Tesla Model 3', price: 45000 },
        { name: 'Lexus IS', price: 39000 },
        { name: 'Nissan Altima', price: 23000 }
    ];

    const carSelect = document.getElementById('car');
    for (let i = 0; i < cars.length; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${cars[i].name} - $${cars[i].price}`;
        carSelect.appendChild(option);
    }
});

function calculateMonthlyRate() {
    const cars = [
        { name: 'Toyota Camry', price: 24000 },
        { name: 'Honda Accord', price: 26000 },
        { name: 'Ford Mustang', price: 35000 },
        { name: 'Chevrolet Camaro', price: 37000 },
        { name: 'BMW 3 Series', price: 41000 },
        { name: 'Audi A4', price: 42000 },
        { name: 'Mercedes-Benz C-Class', price: 43000 },
        { name: 'Tesla Model 3', price: 45000 },
        { name: 'Lexus IS', price: 39000 },
        { name: 'Nissan Altima', price: 23000 }
    ];

    const carSelect = document.getElementById('car');
    const selectedCarIndex = carSelect.value;
    const selectedCar = cars[selectedCarIndex];

    let downPayment = parseFloat(document.getElementById('downPayment').value);
    const name = document.getElementById('name').value;

    if (isNaN(downPayment) || downPayment < 0) {
        alert('Please enter a valid down payment amount.');
        return;
    }

    const minDownPayment = 0.1 * selectedCar.price;
    while (downPayment < minDownPayment) {
        alert(`Down payment should be at least 10% of the car price ($${minDownPayment}).`);
        downPayment = parseFloat(prompt('Enter a valid down payment amount:'));
    }

    const loanAmount = selectedCar.price - downPayment;
    const annualInterestRate = 0.05; // Assuming 5% interest rate
    const monthlyInterestRate = annualInterestRate / 12;
    const numberOfMonths = 12;
    const monthlyPayment = (loanAmount * monthlyInterestRate) / 
                           (1 - Math.pow(1 + monthlyInterestRate, -numberOfMonths));

    let priceMessage;
    if (selectedCar.price < 25000) {
        priceMessage = 'This is a budget-friendly car.';
    } else if (selectedCar.price < 40000) {
        priceMessage = 'This car offers a good balance of price and features.';
    } else {
        priceMessage = 'This is a premium car.';
    }

    document.getElementById('monthlyPayment').textContent = 
        `${name}, your estimated monthly payment is $${monthlyPayment.toFixed(2)}. ${priceMessage}`;
}
