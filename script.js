const railwayCities = [
    "Mumbai", "Delhi", "Kolkata", "Chennai", "Bengaluru", "Hyderabad", "Ahmedabad",
    "Pune", "Jaipur", "Lucknow", "Bhopal", "Patna", "Nagpur", "Chandigarh", "Kanpur",
    "Indore", "Surat", "Vadodara", "Guwahati", "Ranchi", "Visakhapatnam", "Amritsar",
    "Coimbatore", "Madurai", "Thiruvananthapuram", "Jodhpur", "Agra", "Varanasi"
];

function populateCityDatalist() {
    const datalist = document.getElementById("city-list");

    railwayCities.forEach(city => {
        const option = document.createElement("option");
        option.value = city;
        datalist.appendChild(option);
    });
}

window.addEventListener("DOMContentLoaded", populateCityDatalist);

document.getElementById("ticket-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const seat = document.getElementById("seat").value;
    const date = document.getElementById("date").value;
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;

    const ticketId = "T" + Math.floor(Math.random() * 10000);

    const tableBody = document.getElementById("history-table-body");
    const newRow = tableBody.insertRow();
    newRow.innerHTML =
        `<td>${ticketId}</td>
         <td>${name}</td>
         <td>${seat}</td>
         <td>${date}</td>
         <td>${from}</td>
         <td>${to}</td>
         <td>Booked</td>
         <td><button class='delete-btn' data-ticket-id='${ticketId}'>Delete</button></td>`;

    alert("Ticket with ID " + ticketId + " has been booked successfully.");
    document.getElementById("ticket-form").reset();
});

document.getElementById("view-history-btn").addEventListener("click", function() {
    document.getElementById("ticket-history").style.display = "block";
});

document.getElementById("ticket-history").addEventListener("click", function(event) {
    if (event.target.classList.contains('delete-btn')) {
        const ticketIdToDelete = event.target.getAttribute('data-ticket-id');
        event.target.closest('tr').remove();
        alert("Ticket with ID " + ticketIdToDelete + " has been deleted.");
    }
});
