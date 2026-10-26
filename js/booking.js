const scheduleData = {
    "Monday": {     // data sets day (eg monday) contains list of movies and movies contain a list of days
        "10 Things I Hate About You": ["09:30", "15:30"],
        "Cloudy With A Chance Of Meat Balls": ["09:30"],
        "Flipped": ["09:00", "12:15", "19:30"],
        "Transformers One": ["18:45", "21:15"],
        "Spirited Away": ["14:00", "17:00"],
        "The Truman Show": ["13:15", "19:00"],
        "Tangled": ["15:15", "20:45", "23:15"],
        "Scary Movie": ["23:15"],
        "Blade Runner 2049": ["11:30"],
        "Cyberpunk Edgerunners 2 Premiere": ["11:00"]
    },
    "Tuesday": {
        "10 Things I Hate About You": ["09:00", "12:15", "19:30"],
        "Cloudy With A Chance Of Meat Balls": ["09:30", "15:30"],
        "Flipped": ["18:45", "21:15"],
        "Transformers One": ["15:15", "20:45", "23:15"],
        "Spirited Away": ["11:00"],
        "The Truman Show": ["13:15", "19:00"],
        "Tangled": ["09:30", "15:30"],
        "Scary Movie": ["23:15"],
        "Blade Runner 2049": ["11:00"],
        "Cyberpunk Edgerunners 2 Premiere": ["13:15", "19:00"]
    },
    "Wednesday": {
        "10 Things I Hate About You": ["09:00", "12:15", "19:30"],
        "Cloudy With A Chance Of Meat Balls": ["09:30", "15:30"],
        "Flipped": ["11:00"],
        "Transformers One": ["11:30"],
        "Spirited Away": ["13:15", "19:00"],
        "The Truman Show": ["14:00", "17:00"],
        "Tangled": ["14:30"],
        "Scary Movie": ["15:15", "20:45", "23:15"],
        "Blade Runner 2049": ["17:45", "22:00"],
        "Cyberpunk Edgerunners 2 Premiere": ["18:45", "21:15"]
    },
    "Thursday": {
        "10 Things I Hate About You": ["09:30", "15:30"],
        "Cloudy With A Chance Of Meat Balls": ["09:30"],
        "Flipped": ["09:00", "12:15", "19:30"],
        "Transformers One": ["18:45", "21:15"],
        "Spirited Away": ["14:00", "17:00"],
        "The Truman Show": ["13:15", "19:00"],
        "Tangled": ["15:15", "20:45", "23:15"],
        "Scary Movie": ["23:15"],
        "Blade Runner 2049": ["11:30"],
        "Cyberpunk Edgerunners 2 Premiere": ["11:00"]
    },
    "Friday": {
        "10 Things I Hate About You": ["09:00", "12:15", "19:30"],
        "Cloudy With A Chance Of Meat Balls": ["09:30", "15:30"],
        "Flipped": ["18:45", "21:15"],
        "Transformers One": ["15:15", "20:45", "23:15"],
        "Spirited Away": ["11:00"],
        "The Truman Show": ["13:15", "19:00"],
        "Tangled": ["09:30", "15:30"],
        "Scary Movie": ["23:15"],
        "Blade Runner 2049": ["11:00"],
        "Cyberpunk Edgerunners 2 Premiere": ["13:15", "19:00"]
    },
    "Saturday": {
        "10 Things I Hate About You": ["09:30", "15:30"],
        "Cloudy With A Chance Of Meat Balls": ["09:30"],
        "Flipped": ["09:00", "12:15", "19:30"],
        "Transformers One": ["18:45", "21:15"],
        "Spirited Away": ["14:00", "17:00"],
        "The Truman Show": ["13:15", "19:00"],
        "Tangled": ["15:15", "20:45", "23:15"],
        "Scary Movie": ["23:15"],
        "Blade Runner 2049": ["11:30"],
        "Cyberpunk Edgerunners 2 Premiere": ["11:00"]
    },
    "Sunday": {
        "10 Things I Hate About You": ["09:00", "12:15", "19:30"],
        "Cloudy With A Chance Of Meat Balls": ["09:30", "15:30"],
        "Flipped": ["11:00"],
        "Transformers One": ["11:30"],
        "Spirited Away": ["13:15", "19:00"],
        "The Truman Show": ["14:00", "17:00"],
        "Tangled": ["14:30"],
        "Scary Movie": ["15:15", "20:45", "23:15"],
        "Blade Runner 2049": ["17:45", "22:00"],
        "Cyberpunk Edgerunners 2 Premiere": ["18:45", "21:15"]
    }
};


function getOrdinalSuffix(day) {    // got function inpso getOrdinalSuffix, showDays from forums and google searches
    if (day > 3 && day < 21) return 'th';   // this function adds the day prefixs to dates found in bookings
    switch (day % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
    }
}

function showDays() {       // function shows days with dates found in booking
    var daySelect = document.getElementById("dayselect");
    var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    var today = new Date();
    var todayIndex = today.getDay();

    daysOfWeek.forEach(function(dayName, index) {   // function does calc thats based on todays date, ensures that the day is always the next date and not the past
        var diff = index - todayIndex;
        if (diff < 0) {
            diff += 7;
        }

        var targetDate = new Date(today);
        targetDate.setDate(today.getDate() + diff);

        var dayNum = targetDate.getDate();
        var monthName = targetDate.toLocaleString('en-US', { month: 'long' });
        var suffix = getOrdinalSuffix(dayNum);

        var optionText = dayName + " - " + monthName + " " + dayNum + suffix;
        
        var option = document.createElement("option");
        option.value = dayName;
        option.textContent = optionText;
        daySelect.appendChild(option);
    });
}

document.addEventListener("DOMContentLoaded", function () {     // this function tackles the pricing of tickets based on selection data in real time
    const adult_price = 22;
    const child_price = 11;
    const concession_price = 9;
    const imax_addon = 10;

    const ticketInputs = document.querySelectorAll(
        'input[name="adult_tickets"], input[name="child_tickets"], input[name="concession_tickets"], #imax_ticket'
    );
    const totalPriceSpan = document.getElementById("totalPrice");

    function calculateTotal() {
        const adult_amount = parseInt(document.querySelector('input[name="adult_tickets"]:checked')?.value || 0);
        const child_amount = parseInt(document.querySelector('input[name="child_tickets"]:checked')?.value || 0);
        const concession_amount = parseInt(document.querySelector('input[name="concession_tickets"]:checked')?.value || 0);

        let subtotal = (adult_amount * adult_price) + (child_amount * child_price) + (concession_amount * concession_price);

        const isImaxChecked = document.getElementById("imax_ticket").checked;
        
        if (isImaxChecked && subtotal > 0) {
            subtotal += imax_addon;
        }
        totalPriceSpan.textContent = subtotal.toFixed(2);
    }
    ticketInputs.forEach(input => {
        input.addEventListener("change", calculateTotal);
    });
    calculateTotal();
});

function validate() {   // validate function, very similar to what was done in labs
    var sid = document.getElementById("sid").value;
    var uname = document.getElementById("uname").value;
    var phone = document.getElementById("phone").value;

    var adult = document.getElementById("adult_0").checked;
    var child = document.getElementById("child_0").checked;
    var concession = document.getElementById("concession_0").checked;

    var time = document.getElementById("timeSelect").value;

    var paymentMethod = document.getElementById("paymentmethod").value;
    var cardNumber = document.getElementById("cardnumber").value;
    var cardPin = document.getElementById("cardpin").value;
    var bill = document.getElementById("bill").value;

    var errMsg = "";                    
    var result = true;                  
    var pattern = /^[a-zA-Z ]+$/;       
    var symbolPattern = /[^a-zA-Z0-9]/;

    if (sid == "") {
        errMsg += "Email cannot be empty.\n";
    }
    if (phone.length <= 9) {
        errMsg += "Phone number must be more than 9 digits.\n";
    }
    if (phone.match(symbolPattern)) {
        errMsg += "Phone number shouldn't contain symbols.\n";
    }
    if (uname == "") {
        errMsg += "Username cannot be empty.\n";
    }
    if (sid.indexOf('@') == 0) {
        errMsg += "Email cannot start with an @ symbol.\n";
    }
    if (sid.indexOf('@') < 0) {
        errMsg += "Email must contain an @ symbol.\n";
    }
    if (!uname.match(pattern)) {
        errMsg += "Username shouldn't contain symbols.\n";
    }
    if ((adult == true) && (child == true) && (concession == true)) {
        errMsg += "Select movie ticket.\n";
    }
    if (time == "" || time == "defualt") {
        errMsg += "Select a movie time.\n";
    }
    if (paymentMethod == "" || paymentMethod == "0") {
        errMsg += "Please select a payment method.\n";
    }
    if (paymentMethod == "1" && cardNumber.length > 0 && cardNumber.length !== 16) {
        errMsg += "Mastercard/Visa cards must contain 16 digits.\n";        
    }
    if (paymentMethod == "2" && cardNumber.length > 0 && cardNumber.length !== 15) {
        errMsg += "Amex cards must contain 15 digits.\n";        
    }
    if (paymentMethod == "3" && cardNumber.length > 0 && cardNumber.length !== 12) {
        errMsg += "Vouchers must contain 12 digits.\n";        
    }
    if (cardNumber.match(symbolPattern)) {
        errMsg += "Card number shouldn't contain symbols.\n";
    }
    if (cardPin.length > 0 && cardPin.length !== 4) {
        errMsg += "Card Pin must contain 4 digits.\n";        
    }
    if (cardPin.match(symbolPattern)) {
        errMsg += "Card number shouldn't contain symbols.\n";
    }
    if (bill == "") {
        errMsg += "Billing Email cannot be empty.\n";
    }
    if (bill.indexOf('@') == 0) {
        errMsg += "Billing Email cannot start with an @ symbol.\n";
    }
    if (bill.indexOf('@') < 0) {
        errMsg += "Billing Email must contain an @ symbol.\n";
    }

    if (errMsg != "") {
        alert(errMsg);
        result = false;
    } 
    return result;
}

function init() {
    var regtest = document.getElementById("regtest");
    if (regtest) {
        regtest.onsubmit = validate;
    }

    showDays();

    var daySelect = document.getElementById("dayselect");
    var movieSelect = document.getElementById("movieselect");
    var timeSelect = document.getElementById("timeSelect");

    daySelect.addEventListener("change", function () {      //  function and one below set selectmovie and selecttime to default, opens options when prev selection is inputed
    
        var selectedDay = this.value;

        movieSelect.innerHTML = '<option value="">-- Please select a movie --</option>';
        timeSelect.innerHTML = '<option value="">-- Select a time --</option>';
        timeSelect.disabled = true;

        if (selectedDay && scheduleData[selectedDay]) {
            movieSelect.disabled = false;

            var availableMovies = Object.keys(scheduleData[selectedDay]);

            availableMovies.forEach(function(movie) {
                var option = document.createElement("option");
                option.value = movie;
                option.textContent = movie;
                movieSelect.appendChild(option);
            });
        } else {
            movieSelect.disabled = true;
        }
    });

    movieSelect.addEventListener("change", function () {
        var selectedDay = daySelect.value;
        var selectedMovie = this.value;

        timeSelect.innerHTML = '<option value="">-- Select a time --</option>';

        if (selectedDay && selectedMovie && scheduleData[selectedDay][selectedMovie]) {
            timeSelect.disabled = false;

            scheduleData[selectedDay][selectedMovie].forEach(function(time) {
                var option = document.createElement("option");
                option.value = time;
                option.textContent = time;
                timeSelect.appendChild(option);
            });
        } else {
            timeSelect.disabled = true;
        }
    });

    const urlParams = new URLSearchParams(window.location.search);      // takes params of links (found in movies) and sets them in booking. It's not a perfect method as it can only setup the hard coded wednesday times
    const paramDay = urlParams.get("day");
    const paramMovie = urlParams.get("movie");
    const paramTime = urlParams.get("time");

    if (paramDay) {
        daySelect.value = paramDay;
        daySelect.dispatchEvent(new Event("change")); // selects day
    }

    if (paramMovie) {
        movieSelect.value = paramMovie;
        movieSelect.dispatchEvent(new Event("change")); // selects event
    }

    if (paramTime) {
        timeSelect.value = paramTime; //selects time
    }

    const paymentMethodSelect = document.getElementById('paymentmethod');       // checks which payment method has been selected, then shows or hide pin based on selection
    const cardPinContainer = document.getElementById('cardpinContainer');

    paymentMethodSelect.addEventListener('change', function() {
        var selectedPayment = paymentMethodSelect.value;

        if (selectedPayment === '3') {
            cardPinContainer.classList.add('hidden');
        } else {
            cardPinContainer.classList.remove('hidden');
        }
    });

    const sameEmail = document.getElementById("sameEmail");     // reads email sid and copies+places in billingemail, also blocks editing of billing when enabled 
    const customerEmail = document.getElementById("sid"); 
    const billingEmail = document.getElementById("bill");   

    if (sameEmail && customerEmail && billingEmail) {
        sameEmail.addEventListener("change", function () {
            if (this.checked) {
                billingEmail.value = customerEmail.value;
                billingEmail.readOnly = true;   // blocking of editing
            } else {
                billingEmail.readOnly = false;      // opening of editing
            }
        });

        customerEmail.addEventListener("input", function () {
            if (sameEmail.checked) {
                billingEmail.value = customerEmail.value;
            }
        });
    }
}

window.onload = init;