# HomeEase - Candidate Test Assignment Implementation & README

## 📌 Project Overview & Objective
**HomeEase** is an on-demand home services web and mobile app prototype designed to enable users to seamlessly browse home maintenance services (Cleaning, Plumbing, Electrical, Babysitting), select a service category, choose an available 1-hour time slot for today, and instantly receive booking confirmation with price details.

This project was built to fulfill the candidate assignment criteria, demonstrating mastery in:
- **UI Layout & Typography**: Modern visual hierarchy, color palette, glassmorphism card styling, responsive layout.
- **Page Navigation & Parameter Passing**: Dynamic state transfer (`serviceName` and `servicePrice`) across screen boundaries.
- **Dynamic Lists**: Data-driven rendering of service catalogs and time slot options.
- **Action Triggers & Dialogs**: Bottom Sheet / Alert Dialog notifications displaying context-rich confirmation messages.

---

## 🚀 Live Web Prototype & File Structure

The workspace includes a complete, fully interactive HTML/CSS/JavaScript web prototype demonstrating the exact user flow and UI state transitions required.

### Directory Structure
```
candidate test/
├── index.html       # Semantic layout for ServiceCatalogPage & BookingPage
├── style.css        # Modern glassmorphism UI, CSS grid/flex, animations & modal overlays
├── app.js           # Navigation state, parameter passing, dynamic slot rendering & triggers
└── README.md        # Comprehensive interview documentation & FlutterFlow guide
```

### How to Run the Prototype
1. Simply double-click `index.html` to open it directly in any web browser, OR
2. Serve using a lightweight HTTP server (e.g. `npx serve .` or `python -m http.server 8000`).

---

## 📱 Page Specifications & Detailed Requirements

### Page 1: Service Dashboard (`ServiceCatalogPage`)
* **Header**: Displays welcoming text (*"Welcome to HomeEase! 👋"*) and subtitle (*"What help do you need today?"*).
* **Service Offerings**: Presented in a clean 2-column Grid View with service icons, typography, and pricing badge.
  * 🧹 **Cleaning** — INR 100 / service
  * 🚰 **Plumbing** — INR 250 / service
  * ⚡ **Electrical** — INR 300 / service
  * 👶 **Babysitting** — INR 100 / hour
* **Interactivity**: Tapping any card navigates to `BookingPage`, passing `serviceName` and `servicePrice`.

### Page 2: Slot Selection (`BookingPage`)
* **Summary Banner**: Contextual card at the top displaying the passed `serviceName` and `servicePrice`.
* **Section Header**: *"Select a Time Slot (Today)"*.
* **Time Slots List**: 7 consecutive 1-hour slots from 10:00 AM to 5:00 PM:
  1. `10:00 AM - 11:00 AM`
  2. `11:00 AM - 12:00 PM`
  3. `12:00 PM - 1:00 PM`
  4. `1:00 PM - 2:00 PM`
  5. `2:00 PM - 3:00 PM`
  6. `3:00 PM - 4:00 PM`
  7. `4:00 PM - 5:00 PM`
* **Interactivity**: Tapping any slot triggers a confirmation modal/bottom sheet with the exact required string:
  > *"Your booking for **[Service Name]** at **[Selected Time Slot]** is successful! Total amount to pay: **[Price]**."*
* **Modal Controls**: Dismiss button and "Return to Home" button.

---

## 🛠️ Step-by-Step FlutterFlow Implementation Guide

For technical interview evaluation, the detailed FlutterFlow configuration steps are outlined below:

### 1. Data Schema & App State
- **DataType / Struct: ServiceStruct**
  - `name` (String)
  - `price` (String)
  - `icon` (String / IconData)
- **App State Variables**:
  - `servicesList` (List<ServiceStruct>): Initialized with default services.
  - `timeSlots` (List<String>): `["10:00 AM - 11:00 AM", "11:10 AM - 12:00 PM", ...]`

### 2. Page 1: `ServiceCatalogPage` Construction
1. **Widget Hierarchy**:
   ```
   Scaffold
   └── SafeArea
       └── Column
           ├── Container (Header)
           │   ├── Text ("Welcome to HomeEase! 👋", Style: Display Medium)
           │   └── Text ("What help do you need today?", Style: Body Medium)
           └── GridView / ListView (Dynamic Children from App State servicesList)
               └── ServiceCard (Container Component)
                   └── Column
                       ├── Icon
                       ├── Text (serviceItem.name)
                       └── Text (serviceItem.price)
   ```
2. **On Tap Action Setup**:
   - Select the `ServiceCard` widget in FlutterFlow UI Builder.
   - Open **Actions** tab -> Add Action -> **Navigate To** -> `BookingPage`.
   - Under **Pass Parameters**, define:
     - `serviceName`: `serviceItem.name`
     - `servicePrice`: `serviceItem.price`

### 3. Page 2: `BookingPage` Construction
1. **Page Parameters Definition**:
   - Open `BookingPage` settings in FlutterFlow.
   - Add Parameter 1: `serviceName` (Type: `String`, Required: `True`).
   - Add Parameter 2: `servicePrice` (Type: `String`, Required: `True`).

2. **Summary Banner Widget**:
   ```
   Container (Banner gradient)
   └── Row
       ├── Icon (Service Icon)
       └── Column
           ├── Text ("SELECTED SERVICE", Style: Label Small)
           ├── Text (Get Page Parameter: serviceName, Style: Title Large)
           └── Text (Get Page Parameter: servicePrice, Style: Body Medium)
   ```

3. **Dynamic Slot List & Alert/Bottom Sheet Trigger**:
   - Add a `ListView` for slots generated from `App State -> timeSlots`.
   - On `SlotContainer` Tap:
     - Add Action -> **Show Alert Dialog** (or **Show Bottom Sheet**).
     - Title: `"Booking Confirmed!"`
     - Body Text (Combined Text Expression):
       `"Your booking for " + [serviceName] + " at " + [itemInList] + " is successful! Total amount to pay: " + [servicePrice] + "."`
     - Actions: Add "Dismiss" (Dismiss Dialog) and "Home" (Navigate To `ServiceCatalogPage`).

---

## 🎤 Interview Defense & Technical Discussion Points

During the technical interview discussion, use these architectural rationales to explain the implementation:

### Q1: Why pass `serviceName` and `servicePrice` via Page Parameters instead of a global selected object?
> **Answer**: Page parameter passing promotes loose coupling, immutable page state, and predictable single-direction data flow. It enables direct deep-linking or page restoration without relying on transient global state mutations that could get out of sync if the user navigates back and forth.

### Q2: How are dynamic lists handled efficiently in FlutterFlow and Flutter?
> **Answer**: Under the hood, FlutterFlow maps dynamic children to Flutter's `ListView.builder` or `GridView.builder`. Instead of instantiating all children upfront in memory, `builder` constructs items lazily on demand as they scroll into view, ensuring 60fps performance even with large datasets.

### Q3: Why choose a Bottom Sheet vs an Alert Dialog for slot confirmation?
> **Answer**: On mobile devices, a Bottom Sheet offers better thumb-zone ergonomics, maintaining full context of the background screen while enabling easy single-handed interaction to confirm or dismiss.

### Q4: How would you extend this app for real-world backend production?
> **Answer**:
> 1. **Database**: Store services and slot availability in Firebase Firestore or Supabase with real-time listeners.
> 2. **Slot Locking**: When a user selects a time slot, execute an atomic transaction/mutex to mark `isBooked = true` for today's date, preventing double-booking race conditions.
> 3. **Payment Gateway**: Integrate Razorpay or Stripe SDKs prior to triggering the final booking confirmation modal.

---

## 📸 Screenshots & UI Design System
- **Colors**: Primary Blue (`#4F46E5`), Sky Blue (`#0EA5E9`), Success Green (`#10B981`), Slate Body (`#F8FAFC`).
- **Typography**: `Plus Jakarta Sans` (Google Fonts).
- **Responsive Container**: Mobile-optimized viewport (480px width, clean glassmorphism drop shadows).
