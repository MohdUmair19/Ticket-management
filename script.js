const railwayCities = [
    "Mumbai", "Delhi", "Kolkata", "Chennai", "Bengaluru", "Hyderabad", "Ahmedabad",
    "Pune", "Jaipur", "Lucknow", "Bhopal", "Patna", "Nagpur", "Chandigarh", "Kanpur",
    "Indore", "Surat", "Vadodara", "Guwahati", "Ranchi", "Visakhapatnam", "Amritsar",
    "Coimbatore", "Madurai", "Thiruvananthapuram", "Jodhpur", "Agra", "Varanasi"
];

// Train types
const trainTypes = ["Express", "Superfast", "Passenger", "Shatabdi"];

// Generate random departure time
function randomTime() {
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

// Predefined train dataset with numbers
let trainNumberCounter = 12001;
const trains = {};
railwayCities.forEach(fromCity => {
    railwayCities.forEach(toCity => {
        if (fromCity !== toCity) {
            const routeKey = `${fromCity}-${toCity}`;
            trains[routeKey] = trainTypes.map(type => {
                return {
                    number: trainNumberCounter++,
                    name: `${fromCity}-${toCity} ${type}`,
                };
            });
        }
    });
});

function populateCityDatalist() {
    const datalist = document.getElementById("city-list");
    railwayCities.forEach(city => {
        const option = document.createElement("option");
        option.value = city;
        datalist.appendChild(option);
    });
}
window.addEventListener("DOMContentLoaded", populateCityDatalist);

// Search available trains
document.getElementById("search-trains-btn").addEventListener("click", () => {
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;

    if (!from || !to || from === to) {
        alert("Please select valid From and To locations.");
        return;
    }

    const trainSelect = document.getElementById("train");
    trainSelect.style.display = "block";
    document.getElementById("book-btn").style.display = "block";
    trainSelect.innerHTML = '<option value=\"\">Select Train</option>';

    const routeKey = `${from}-${to}`;
    const reverseKey = `${to}-${from}`;
    let availableTrains = trains[routeKey] || trains[reverseKey] || [];

    // Shuffle and pick 3 random trains
    availableTrains = availableTrains.sort(() => 0.5 - Math.random()).slice(0, 3);

    availableTrains.forEach(train => {
        const time = randomTime();
        const option = document.createElement("option");
        option.value = `${train.number} - ${train.name} (Dep: ${time})`;
        option.textContent = `${train.number} - ${train.name} (Dep: ${time})`;
        trainSelect.appendChild(option);
    });
});

// Book Ticket
document.getElementById("ticket-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const date = document.getElementById("date").value;
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const train = document.getElementById("train").value;

    if (!train) {
        alert("Please select a train.");
        return;
    }

    // Random seat allotment
    const seat = "S" + Math.floor(Math.random() * 100 + 1);
    const ticketId = "T" + Math.floor(Math.random() * 10000);

    const tableBody = document.getElementById("history-table-body");
    const newRow = tableBody.insertRow();
    newRow.innerHTML =
        `<td>${ticketId}</td>
         <td>${name}</td>
         <td>${train}</td>
         <td>${seat}</td>
         <td>${date}</td>
         <td>${from}</td>
         <td>${to}</td>
         <td><button class='delete-btn' data-ticket-id='${ticketId}'>Delete</button></td>`;

    alert("Ticket with ID " + ticketId + " has been booked successfully.");
    document.getElementById("ticket-form").reset();
    document.getElementById("train").style.display = "none";
    document.getElementById("book-btn").style.display = "none";
});

// Show ticket history
document.getElementById("view-history-btn").addEventListener("click", function() {
    document.getElementById("ticket-history").style.display = "block";
});

// Delete ticket
document.getElementById("ticket-history").addEventListener("click", function(event) {
    if (event.target.classList.contains('delete-btn')) {
        const ticketIdToDelete = event.target.getAttribute('data-ticket-id');
        event.target.closest('tr').remove();
        alert("Ticket with ID " + ticketIdToDelete + " has been deleted.");
    }
});
