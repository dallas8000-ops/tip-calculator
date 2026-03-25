// Select all necessary UI elements
const billInput = document.getElementById('billAmount');
const peopleInput = document.getElementById('peopleCount');
const customTipInput = document.getElementById('customTip');
const tipButtons = document.querySelectorAll('.tip-btn');
const displayTip = document.getElementById('displayTip');
const displayPerPerson = document.getElementById('displayPerPerson');

let currentTipPercent = 0;

const resetBtn = document.getElementById('resetBtn');

function showError(input, message) {
    input.setCustomValidity(message);
    input.reportValidity();
}

function clearError(input) {
    input.setCustomValidity('');
}

// Function to run the calculation
function updateUI() {
    const bill = parseFloat(billInput.value);
    const people = parseInt(peopleInput.value);
    const tipPercent = customTipInput.value !== '' ? parseFloat(customTipInput.value) : currentTipPercent;

    // Validation
    let valid = true;
    clearError(billInput);
    clearError(peopleInput);
    clearError(customTipInput);

    if (isNaN(bill) || bill < 0) {
        showError(billInput, 'Please enter a valid, non-negative bill amount.');
        displayTip.innerText = '$0.00';
        displayPerPerson.innerText = '$0.00';
        valid = false;
    }
    if (isNaN(people) || people < 1) {
        showError(peopleInput, 'Number of people must be at least 1.');
        displayTip.innerText = '$0.00';
        displayPerPerson.innerText = '$0.00';
        valid = false;
    }
    if (customTipInput.value !== '' && (isNaN(tipPercent) || tipPercent < 0)) {
        showError(customTipInput, 'Tip percentage must be a non-negative number.');
        displayTip.innerText = '$0.00';
        displayPerPerson.innerText = '$0.00';
        valid = false;
    }
    if (!valid) return;

    // Calculation
    const totalTip = bill * (tipPercent / 100);
    const totalPerPerson = (bill + totalTip) / people;

    displayTip.innerText = `$${totalTip.toFixed(2)}`;
    displayPerPerson.innerText = `$${totalPerPerson.toFixed(2)}`;
}

// Listen for preset button clicks
tipButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        currentTipPercent = parseFloat(btn.dataset.pct);
        customTipInput.value = '';
        updateUI();
    });
});

// Listen for typing in inputs
[billInput, peopleInput, customTipInput].forEach(input => {
    input.addEventListener('input', updateUI);
});

// Reset button functionality
resetBtn.addEventListener('click', () => {
    billInput.value = '';
    peopleInput.value = '';
    customTipInput.value = '';
    currentTipPercent = 0;
    displayTip.innerText = '$0.00';
    displayPerPerson.innerText = '$0.00';
    clearError(billInput);
    clearError(peopleInput);
    clearError(customTipInput);
});
