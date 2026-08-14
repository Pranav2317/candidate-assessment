/**
 * HomeEase Prototype Application Logic
 * Implements navigation, parameter passing, dynamic slot rendering, and modal action triggers.
 */

// Data definitions
const SERVICES_DATA = [
    {
        id: 'cleaning',
        name: 'Cleaning',
        price: 'INR 100 / service',
        icon: 'fa-solid fa-broom'
    },
    {
        id: 'plumbing',
        name: 'Plumbing',
        price: 'INR 250 / service',
        icon: 'fa-solid fa-faucet-drip'
    },
    {
        id: 'electrical',
        name: 'Electrical',
        price: 'INR 300 / service',
        icon: 'fa-solid fa-bolt'
    },
    {
        id: 'babysitting',
        name: 'Babysitting',
        price: 'INR 100 / hour',
        icon: 'fa-solid fa-baby-carriage'
    }
];

const TIME_SLOTS = [
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM"
];

// App State (holds parameters passed between pages)
const appState = {
    selectedService: null,
    selectedSlot: null
};

// DOM Elements
const pages = {
    catalog: document.getElementById('ServiceCatalogPage'),
    booking: document.getElementById('BookingPage')
};

const elements = {
    servicesGrid: document.getElementById('servicesGrid'),
    slotsContainer: document.getElementById('slotsContainer'),
    btnBackToCatalog: document.getElementById('btnBackToCatalog'),
    summaryServiceName: document.getElementById('summaryServiceName'),
    summaryServicePrice: document.getElementById('summaryServicePrice'),
    bannerIconWrapper: document.getElementById('bannerIconWrapper'),
    modalOverlay: document.getElementById('bookingModalOverlay'),
    modalMessageText: document.getElementById('modalMessageText'),
    btnDismissModal: document.getElementById('btnDismissModal'),
    btnReturnHomeModal: document.getElementById('btnReturnHomeModal')
};

// Initialize Application
function initApp() {
    renderServices();
    renderTimeSlots();
    attachEventListeners();
}

// Render Services Catalog Grid
function renderServices() {
    elements.servicesGrid.innerHTML = SERVICES_DATA.map(service => `
        <div class="service-card" data-service="${service.name}" data-id="${service.id}">
            <div class="card-icon">
                <i class="${service.icon}"></i>
            </div>
            <h3 class="service-name">${service.name}</h3>
            <p class="service-price">${service.price}</p>
            <i class="fa-solid fa-chevron-right arrow-indicator"></i>
        </div>
    `).join('');
}

// Render Time Slots
function renderTimeSlots() {
    elements.slotsContainer.innerHTML = TIME_SLOTS.map(slot => `
        <div class="slot-item" data-slot="${slot}">
            <div class="slot-time">
                <i class="fa-regular fa-clock"></i>
                <span>${slot}</span>
            </div>
            <div class="slot-action">
                <span>Select</span>
                <i class="fa-solid fa-chevron-right"></i>
            </div>
        </div>
    `).join('');
}

// Navigation Helper
function navigateToPage(pageId) {
    Object.keys(pages).forEach(key => {
        if (pages[key].id === pageId) {
            pages[key].classList.add('active');
        } else {
            pages[key].classList.remove('active');
        }
    });
}

// Select Service Action Trigger & Parameter Passing
function selectService(serviceObj) {
    // Pass parameters dynamically into appState
    appState.selectedService = serviceObj;

    // Update BookingPage Banner UI with passed parameters
    elements.summaryServiceName.textContent = serviceObj.name;
    elements.summaryServicePrice.textContent = serviceObj.price;
    elements.bannerIconWrapper.innerHTML = `<i class="${serviceObj.icon}"></i>`;

    // Navigate to BookingPage
    navigateToPage('BookingPage');
}

// Select Time Slot Action Trigger & Alert/Modal Popup
function selectSlot(slotTime) {
    appState.selectedSlot = slotTime;
    const { name, price } = appState.selectedService;

    // Formulate exact required message text
    // "Your booking for [Service Name] at [Selected Time Slot] is successful! Total amount to pay: [Price]."
    const message = `Your booking for ${name} at ${slotTime} is successful! Total amount to pay: ${price}.`;

    elements.modalMessageText.textContent = message;
    elements.modalOverlay.classList.add('active');
    elements.modalOverlay.setAttribute('aria-hidden', 'false');
}

// Close Modal
function closeModal() {
    elements.modalOverlay.classList.remove('active');
    elements.modalOverlay.setAttribute('aria-hidden', 'true');
}

// Event Listeners
function attachEventListeners() {
    // Service Card Click Handler
    elements.servicesGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.service-card');
        if (!card) return;
        
        const serviceId = card.getAttribute('data-id');
        const serviceObj = SERVICES_DATA.find(s => s.id === serviceId);
        if (serviceObj) {
            selectService(serviceObj);
        }
    });

    // Time Slot Click Handler
    elements.slotsContainer.addEventListener('click', (e) => {
        const item = e.target.closest('.slot-item');
        if (!item) return;

        const slotTime = item.getAttribute('data-slot');
        if (slotTime) {
            selectSlot(slotTime);
        }
    });

    // Back to Catalog Button
    elements.btnBackToCatalog.addEventListener('click', () => {
        navigateToPage('ServiceCatalogPage');
    });

    // Modal Actions
    elements.btnDismissModal.addEventListener('click', () => {
        closeModal();
    });

    elements.btnReturnHomeModal.addEventListener('click', () => {
        closeModal();
        navigateToPage('ServiceCatalogPage');
    });

    // Click outside modal card to close
    elements.modalOverlay.addEventListener('click', (e) => {
        if (e.target === elements.modalOverlay) {
            closeModal();
        }
    });
}

// Start app on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initApp);
