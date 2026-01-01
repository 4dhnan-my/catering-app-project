document.addEventListener('DOMContentLoaded', () => {
    // Initial array of job slots
    const slots = [
        {
            companyName: "ABC Catering",
            startTime: "18:00",
            workHours: 4,
            payout: 800,
            uniform: "Black T-shirt, Black Trousers",
            notes: "Serving and cleanup duties.",
            booked: false
        },
        {
            companyName: "Grand Events",
            startTime: "17:30",
            workHours: 6,
            payout: 1200,
            uniform: "White Shirt, Black Pants",
            notes: "Assist with event setup and guest management.",
            booked: false
        },
        {
            companyName: "City Convention Center",
            startTime: "10:00",
            workHours: 8,
            payout: 1500,
            uniform: "Provided jacket, own black trousers",
            notes: "Full-day event support.",
            booked: false
        }
    ];

    const slotsContainer = document.getElementById('slots-container');
    const addSlotForm = document.getElementById('add-slot-form');
    const showSlotsBtn = document.getElementById('show-slots-btn');
    const showAddSlotBtn = document.getElementById('show-add-slot-btn');
    const availableSlotsView = document.getElementById('available-slots');
    const addSlotView = document.getElementById('add-slot');
    const confirmationMessage = document.getElementById('confirmation-message');

    // Function to switch between views
    function switchView(viewToShow) {
        if (viewToShow === 'add') {
            addSlotView.classList.add('active');
            availableSlotsView.classList.remove('active');
            showAddSlotBtn.classList.add('active');
            showSlotsBtn.classList.remove('active');
        } else {
            availableSlotsView.classList.add('active');
            addSlotView.classList.remove('active');
            showSlotsBtn.classList.add('active');
            showAddSlotBtn.classList.remove('active');
        }
    }

    // Event listeners for view switching
    showSlotsBtn.addEventListener('click', () => switchView('slots'));
    showAddSlotBtn.addEventListener('click', () => switchView('add'));

    // Function to render the job slots
    function renderSlots() {
        slotsContainer.innerHTML = '';
        slots.forEach((slot, index) => {
            const slotCard = document.createElement('div');
            slotCard.classList.add('slot-card');
            if (slot.booked) {
                slotCard.classList.add('booked');
            }

            slotCard.innerHTML = `
                <h3>${slot.companyName}</h3>
                <p><strong>Start Time:</strong> ${slot.startTime}</p>
                <p><strong>Duration:</strong> ${slot.workHours} hours</p>
                <p><strong>Payout:</strong> ₹${slot.payout}</p>
                <p><strong>Uniform:</strong> ${slot.uniform}</p>
                <p><strong>Notes:</strong> ${slot.notes}</p>
                <button class="book-slot-btn" data-index="${index}" ${slot.booked ? 'disabled' : ''}>
                    ${slot.booked ? 'Booked' : 'Book Slot'}
                </button>
            `;
            slotsContainer.appendChild(slotCard);
        });

        // Add event listeners to the "Book Slot" buttons
        document.querySelectorAll('.book-slot-btn').forEach(button => {
            button.addEventListener('click', handleBooking);
        });
    }

    // Function to handle booking a slot
    function handleBooking(event) {
        const button = event.target;
        const slotIndex = button.dataset.index;
        
        slots[slotIndex].booked = true;
        
        showConfirmationMessage();
        renderSlots();
    }

    // Function to show the confirmation message
    function showConfirmationMessage() {
        confirmationMessage.classList.add('show');
        setTimeout(() => {
            confirmationMessage.classList.remove('show');
        }, 3000);
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
            notes: document.getElementById('special-notes').value,
            booked: false
        };

        slots.push(newSlot);
        renderSlots();
        addSlotForm.reset();
        switchView('slots'); // Switch back to slots view after adding
    }

    // Add form submission event listener
    addSlotForm.addEventListener('submit', handleAddSlot);

    // Initial render of the slots
    renderSlots();
});
