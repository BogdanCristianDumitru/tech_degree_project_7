const bellIcon = document.getElementById('bell_icon');
const alertBanner = document.getElementById("alert");

const trafficCanvas = document.getElementById("traffic_chart");
const dailyCanvas = document.getElementById('daily_chart');
const mobileCanvas = document.getElementById('doghnut_chart');

const user = document.getElementById('user_field');
const message = document.getElementById('message_field');
const send = document.getElementById('send');

const buttons = document.querySelectorAll('.traffic_nav_link button');
const defaultButton = document.getElementById('default_button');


alertBanner.innerHTML = `
    <div class="alert_banner">
        <p><strong>Alert:</strong> You have unread messages</p>
        <p class="alert_banner_close">x</p>
    </div>
`;

alertBanner.addEventListener('click', e => {
    const element = e.target;
    if (element.classList.contains("alert_banner_close")) {
        alertBanner.style.display = "none";
    }
});

/* Notifications */
bellIcon.addEventListener('click', () => {
    window.alert('Message 1: J.K. wants to set up a meeting with you.\nMessage 2: Jane M. left a comment on your latest Facebook post.');
    const notification = document.getElementById('notifications');
    notification.classList.remove('notification');
});


/* Objects literal represeting the data for the line chart */
let trafficDataHourly = {
    labels: ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'],
    datasets: [{
        data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500],
        backgroundColor: 'rgba(116, 119, 191, .3)',
        borderWidth: 1,    
    }]
};
let trafficDataDaily = {
    labels: ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'],
    datasets: [{
        data: [150, 280, 500, 600, 700, 1100, 1200, 1250, 1300, 1400, 1500],
        backgroundColor: 'rgba(116, 119, 191, .3)',
        borderWidth: 1,    
    }]
};
let trafficDataWeekly = {
    labels: ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'],
    datasets: [{
        data: [300, 900, 1000, 1500, 1650, 1100, 1700, 1950, 2000, 1400, 1500],
        backgroundColor: 'rgba(116, 119, 191, .3)',
        borderWidth: 1,    
    }]
};
let trafficDataMonthly = {
    labels: ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'],
    datasets: [{
        data: [100, 250, 400, 550, 700, 1000, 1100, 1150, 1200, 1250, 1280],
        backgroundColor: 'rgba(116, 119, 191, .3)',
        borderWidth: 1,    
    }]
};

/* Object literal with the options that change for the line chart */
let trafficOptions = {
    backgroundColor: 'rgba(112, 104, 201, .5)',
    fill: true,
    aspectRatio: 2.5,
    animation: {
        duration: 0
        },
    scales: {
        y: {
        beginAtZero: true
        }
    },
    plugins: {
        legend: {
        display: false
        }
    },
    elements: {
        line: {
            tension: 0.4,
            borderJoinStyle: 'round'
        }
    }
};

/* Line graph chart */
trafficOptions.responsive = true;
trafficOptions.maintainAspectRatio = false;

let currentData = trafficDataHourly; // Default to hourly data

let trafficChart = new Chart(trafficCanvas, {
    type: 'line',
    data: currentData,
    options: trafficOptions,
});

function updateChart(selectedInterval) {

    if (selectedInterval === 'hourly') {
        currentData = trafficDataHourly;
    } else if (selectedInterval === 'daily') {
        currentData = trafficDataDaily;
    } else if (selectedInterval === 'weekly') {
        currentData = trafficDataWeekly;
    } else if (selectedInterval === 'monthly') {
        currentData = trafficDataMonthly;
    } else {
        // Handle an unknown interval if needed
        console.error(`Unknown interval: ${selectedInterval}`);
        return;
    }
    
    if (trafficChart) {
        trafficChart.destroy();
    }
    
    trafficChart = new Chart(trafficCanvas, {
        type: 'line',
        data: currentData,
        options: trafficOptions,
    });
}

// Set the "clicked" class on the default button
defaultButton.classList.add('clicked');

// Add a click event listener to each button
buttons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove the "clicked" class from all buttons
        buttons.forEach(btn => {
            btn.classList.remove('clicked');
        });

        // Add the "clicked" class to the clicked button
        this.classList.add('clicked');

        // Handle the logic based on the selected interval
        const selectedInterval = this.getAttribute('data-interval');
        updateChart(selectedInterval);
    });
});

/* Object literal represeting the data for the bar chart */
const dailyData = {
    labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    datasets: [{
        label: '# of Hits',
        data: [75, 115, 175, 125, 225, 200, 100],
        backgroundColor: '#7477BF',
        borderWidth: 1 
    }]
};

/* Object literal with options for the bar chart */
const dailyOptions = {
    scales: {
        y: {
        beginAtZero: true
        }
    },
    plugins: {
        legend: {
        display: false
        }
    }
};

/* Bar graph chart */
dailyOptions.responsive = true;
dailyOptions.maintainAspectRatio = false;

let dailyChart = new Chart(dailyCanvas, {
    type: 'bar',
    data: dailyData,
    options: dailyOptions
});

/* Object literal represeting the data for the doughnut chart */
const mobileData = {
    labels: ["Desktop", "Tablet", "Phones"],
    datasets: [{
        label: '# of Users',
        data: [2000, 550, 500],
        borderWidth: 0,
        backgroundColor: [
            '#7477BF',
            '#78CF82',
            '#51B6C8'
            ]
        }]
    };

    /* Object literal with optionsfor the doughnut chart */
    const mobileOptions = {
        aspectRatio: 1.9,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    boxWidth: 20,
                    fontStyle: 'bold'
                 }
             }
        }
    };

    /* Doughnut Chart */
    mobileOptions.responsive = true;
    mobileOptions.maintainAspectRatio = false;

    let mobileChart = new Chart(mobileCanvas, {
        type: 'doughnut',
        data: mobileData,
        options: mobileOptions
    });

    // Message Section 
    send.addEventListener('click', () => {
        if(user.value === "" && message.value === "") {
            alert('Please fill out user and message fields before sending.');
        } else if (user.value === "") {
            alert('Please fill out user field before sending.');
        } else if (message.value === "") {
            alert('Please fill out message field before sending.');
        } else {
            alert(`Message successfully sent to: ${user.value}`);
        }
    });

    // Autocomplete search input field 
document.addEventListener('DOMContentLoaded', function() {
    const userField = document.getElementById('user_field');

    // User Data
    const users = [
        'John Doe',
        'Jane Smith',
        'Dumitru Bogdan',
        'Bob Johnson',
        'Florin Curta',
        'Alice Williams',
        'Alice Freifeld',
        'Charlie Brown',
        'Dumitru Luca'
    ];

    const autocompleteContainer = document.createElement('div');
    autocompleteContainer.classList.add('autocomplete-container');
    userField.parentNode.appendChild(autocompleteContainer);

    function updateList() {
        const searchItem = userField.value.toLowerCase();
        const filteredUsers = users.filter(user => user.toLowerCase().includes(searchItem));
        
        autocompleteContainer.innerHTML = '';

        filteredUsers.forEach(user => {
            const listItem = document.createElement('div');
            listItem.textContent = user;

            listItem.addEventListener('click', () => {
                userField.value = user;
                autocompleteContainer.innerHTML = '';
            });

            autocompleteContainer.appendChild(listItem);
        });
    }

    userField.addEventListener('input', updateList);

    document.addEventListener('click', (e) => {
        if(!e.target.closest('.autocomplete-container') && !e.target.matches('#user_field')) {
            autocompleteContainer.innerHTML = '';
        }
    });
});