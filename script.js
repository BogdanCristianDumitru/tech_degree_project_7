const alertBanner = document.getElementById("alert");

const trafficCanvas = document.getElementById("traffic_chart");
const dailyCanvas = document.getElementById('daily_chart');
const mobileCanvas = document.getElementById('doghnut_chart');

const user = document.getElementById('user_field');
const message = document.getElementById('message_field');
const send = document.getElementById('send');


alertBanner.innerHTML = `
    <div class="alert-banner">
        <p><strong>Alert:</strong> You have unread messages</p>
        <p class="alert-banner-close">x</p>
    </div>
`;

alertBanner.addEventListener('click', e => {
    const element = e.target;
    if (element.classList.contains("alert-banner-close")) {
        alertBanner.style.display = "none";
    }
});

/* Object literal represeting the data for the line chart */
let trafficData = {
    labels: ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'],
    datasets: [{
        data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500,
            2500],
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

let trafficChart = new Chart(trafficCanvas, {
    type: 'line',
    data: trafficData,
    options: trafficOptions
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

    /* Message Section */
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