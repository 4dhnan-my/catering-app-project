document.addEventListener('DOMContentLoaded', () => {
    // Initial array of job slots
    const slots = [
        {
            companyName: "ABC Catering",
            startTime: "18:00",
            workHours: 4,
            payout: 800,
            uniform: "Black T-shirt, Black Trousers",
            notes: "Serving and cleanup duties."
        },
        {
            companyName: "Grand Events",
            startTime: "17:30",
            workHours: 6,
            payout: 1200,
            uniform: "White Shirt, Black Pants",
            notes: "Assist with event setup and guest management."
        },
        {
            companyName: "City Convention Center",
            startTime: "10:00",
            workHours: 8,
            payout: 1500,
            uniform: "Provided jacket, own black trousers",
            notes: "Full-day event support."
        }
    ];

    const slotsContainer = document.getElementById('slots-container');
    const addSlotForm = document.getElementById('add-slot-form');

    // Function to render the job slots
    function renderSlots() {
        slotsContainer.innerHTML = '';
        slots.forEach((slot, index) => {
            const slotCard = document.createElement('div');
            slotCard.classList.add('slot-card');

            slotCard.innerHTML = `
                <h3>${slot.companyName}</h3>
                <p><strong>Start Time:</strong> ${slot.startTime}</p>
                <p><strong>Duration:</strong> ${slot.workHours} hours</p>
                <p><strong>Payout:</strong> ₹${slot.payout}</p>
                <p><strong>Uniform:</strong> ${slot.uniform}</p>
                <p><strong>Notes:</strong> ${slot.notes}</p>
                <button class="book-slot-btn" data-index="${index}">Book Slot</button>
            `;
            slotsContainer.appendChild(slotCard);
        });

        // Add event listeners to the new "Book Slot" buttons
        document.querySelectorAll('.book-slot-btn').forEach(button => {
            button.addEventListener('click', handleBooking);
        });
    }

    // Function to handle booking a slot
    function handleBooking(event) {
        const button = event.target;
        alert('Slot booked successfully!');
        button.textContent = 'Booked';
        button.disabled = true;
    }

    // Function to handle adding a new slot
    function handleAddSlot(event) {
        event.preventDefault();

        const newSlot = {
            companyName: document.getElementById('company-name').value,
            startTime: document.getElementById('start-time').value,
            workHours: parseInt(document.getElementById('work-hours').value),
            payout: parseInt(document.getElementById('payout').value),
            uniform: document.getElementById('uniform-details').value,
            notes: document.getElementById('special-notes').value
        };

        slots.push(newSlot);
        renderSlots();
        addSlotForm.reset();
    }

    // Add form submission event listener
    addSlotForm.addEventListener('submit', handleAddSlot);

    // Initial render of the slots
    renderSlots();
});
