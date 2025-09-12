1. Executive Summary
This document outlines the requirements for "RideWith," a real-time, full-stack car booking mobile application built using Expo React Native. The app will connect passengers with nearby drivers, facilitating ride requests, real-time tracking, and in-app communication. The system will leverage Twilio for SMS-based phone number verification 
, Nylas for email-based OTP verification 
, and Google Maps APIs for location services and route planning 
. The application will consist of two distinct mobile clients (Passenger and Driver) and a Node.js backend, featuring real-time communication via WebSockets.

2. Target Users
Primary Users:
Passengers: Individuals seeking to book a ride from their current location to a desired destination.
Drivers: Vehicle owners who wish to accept ride requests from nearby passengers to earn money.
Secondary Users:
System Administrators: For potential future dashboard to manually verify driver documents (registration number, license).
3. Core Features & User Stories
3.1. Authentication & User Management
User Story (Passenger/Driver): As a new user, I want to sign up using my phone number so that I can access the app.
Acceptance Criteria:
User can select their country code from a list.
User can enter their phone number.
System sends a 4-digit SMS OTP via Twilio Verify API 
.
User can enter the received OTP for verification.
For first-time users, system prompts for name and email address after phone verification.
System sends a 4-digit email OTP via Nylas Email API 
.
User can enter the received email OTP to complete registration.
Upon successful registration/login, user is granted a JWT access token stored in AsyncStorage for persistent sessions.
User Story (Passenger/Driver): As a returning user, I want to log in quickly so that I can book/request rides without re-entering my details.
Acceptance Criteria:
User can enter their verified phone number.
System sends an SMS OTP via Twilio 
.
User can enter the OTP to log in.
System retrieves user profile using the JWT token.
User Story (Driver): As a driver, I want to provide detailed information about myself and my vehicle during signup so that passengers can make informed choices.
Acceptance Criteria:
Driver can enter their full name, country, phone number, and email.
Driver can select their vehicle type (Car, Motorcycle, CNC).
Driver can enter their vehicle's registration number and registration date.
Driver can enter their driving license number and vehicle color.
Driver can set their rate per kilometer for calculating fares.
User Story (Passenger/Driver): As a user, I want to be able to log out of the app so that I can secure my account on a shared device.
Acceptance Criteria:
A logout option is available in the profile section.
Upon logout, the JWT token is removed from AsyncStorage.
User is redirected to the login screen.
3.2. Passenger App Features
User Story (Passenger): As a passenger, I want to see my current location on a map so that I know where I am starting from.
Acceptance Criteria:
App requests and requires location permission.
Home screen displays an interactive map centered on the user's current location using Google Maps API 
.
Map updates as the user moves (with a 200-meter threshold to reduce unnecessary updates).
User Story (Passenger): As a passenger, I want to search for and select my destination so that I can book a ride.
Acceptance Criteria:
A search bar is available for entering destination addresses.
App uses Google Places API to provide auto-complete suggestions.
User can select a destination from the suggestions.
Map updates to show the route from the current location to the selected destination using Google Maps Directions API.
App displays the estimated distance and travel time for the route.
User Story (Passenger): As a passenger, I want to see available vehicle options and their estimated fares so that I can choose the best one for my needs.
Acceptance Criteria:
After selecting a destination, a list of available nearby drivers (within a 5km radius) is displayed.
The list shows the vehicle type (e.g., Car, Motorcycle), an image representing the type, and the estimated fare (calculated as distance * driver's rate per km).
User can select a preferred vehicle/driver.
User Story (Passenger): As a passenger, I want to confirm my booking and notify the driver so that my ride can begin.
Acceptance Criteria:
A "Confirm Booking" button is available after selecting a driver.
Upon confirmation, a push notification is sent to the selected driver with ride details (passenger name, phone, pickup location, destination, distance, fare).
Passenger is taken to a "Ride Details" screen.
User Story (Passenger): As a passenger, I want to view details about my confirmed ride and be able to contact the driver so that I can coordinate the pickup.
Acceptance Criteria:
"Ride Details" screen shows the driver's name, phone number (clickable to initiate a call), vehicle color, and the total payable amount.
Screen displays a map with the driver's location and the route to the pickup point.
Screen provides a note: "Pay to your driver after reaching your destination."
User Story (Passenger): As a passenger, I want to view my ride history so that I can see past trips and fares.
Acceptance Criteria:
A "History" tab is available in the main navigation.
The tab displays a list of past rides, showing the driver's name, date/time, distance, and fare for each ride.
3.3. Driver App Features
User Story (Driver): As a driver, I want to toggle my availability status so that I can control when I receive ride requests.
Acceptance Criteria:
Home screen has a toggle button labeled "Available for Ride."
When toggled ON, the driver's status is updated to "active" in the backend, and their location is broadcast via WebSocket.
When toggled OFF, status is updated to "inactive," and location broadcasting stops.
The toggle state persists across app sessions.
User Story (Driver): As a driver, I want to receive real-time notifications for new ride requests so that I can accept or decline them promptly.
Acceptance Criteria:
When a passenger books a ride within the driver's 5km radius, the driver receives a push notification.
Tapping the notification opens a modal within the app.
The modal displays ride details: passenger name, phone number, pickup location, destination, distance, and estimated fare.
Modal has "Accept" and "Decline" buttons.
User Story (Driver): As a driver, I want to accept or decline a ride request so that I can manage my workload.
Acceptance Criteria:
Pressing "Accept" sends a confirmation to the passenger (via push notification) and navigates the driver to the "Ride Details" screen.
Pressing "Decline" closes the modal, and the request is offered to other drivers.
User Story (Driver): As a driver, I want to view details about my accepted ride and be able to contact the passenger so that I can pick them up.
Acceptance Criteria:
"Ride Details" screen shows the passenger's name, phone number (clickable to initiate a call), and the total payable amount.
Screen displays a map with the passenger's location (pickup point) and the destination.
A "Pick Up Passenger" button is available.
User Story (Driver): As a driver, I want to mark when I have picked up the passenger and when I have dropped them off so that the ride can be completed and I can get paid.
Acceptance Criteria:
After pressing "Pick Up Passenger," a confirmation message ("Let's have a safe journey!") is shown, and the ride status is updated to "ongoing."
A "Drop Off Passenger" button becomes available.
After pressing "Drop Off Passenger," a success message ("Well done, [Driver Name]!") is shown, and the ride status is updated to "completed."
The driver's total earnings and completed rides count are updated in the backend and reflected on the home screen.
User Story (Driver): As a driver, I want to view my performance statistics and ride history so that I can track my earnings and activity.
Acceptance Criteria:
Home screen displays key metrics: Total Earnings, Total Completed Rides, Pending Rides, Cancelled Rides.
A "History" tab is available in the main navigation.
The tab displays a list of past rides, showing the passenger's name, date/time, distance, and fare for each ride.
3.4. Real-Time System Features
User Story (System): As the system, I need to establish a real-time connection between drivers and passengers so that ride requests and statuses can be communicated instantly.
Acceptance Criteria:
A WebSocket server is implemented to handle real-time communication.
Active drivers continuously (with throttling) send their location to the WebSocket server.
When a passenger requests a ride, the system queries the WebSocket server for all active drivers within a 5km radius of the passenger.
The system then sends a push notification to those nearby drivers.
User Story (System): As the system, I need to send push notifications to users for critical events so that they are informed in real-time.
Acceptance Criteria:
Push notifications are sent for: New ride request (to driver), Ride request accepted (to passenger), Ride status updates (e.g., passenger picked up - to passenger).
Notifications are implemented using Expo Notifications.
4. Technical Requirements & Constraints
4.1. Technology Stack
Frontend (Mobile): Expo React Native (for both Passenger and Driver apps).
Backend: Node.js, Express.js.
Database: MongoDB (via Prisma ORM).
Real-Time Communication: Custom WebSocket Server.
Authentication:
Phone Verification: Twilio Verify API 
.
Email Verification: Nylas Email API 
.
Session Management: JSON Web Tokens (JWT).
Maps & Location:
Maps Display & Interaction: react-native-maps with Google Maps SDK 
.
Place Search: Google Places API.
Directions & Distance: Google Maps Directions API and Geolib for distance calculations 
.
Push Notifications: Expo Notifications.
State Management: React Hooks (useState, useEffect, useContext).
Navigation: Expo Router.
HTTP Client: Axios.
Environment Variables: Expo Environment Variables, Dotenv for backend.
4.2. Key Constraints
Location Accuracy: The app must run on a physical device for accurate location tracking; simulators/emulators are insufficient for testing core features.
Network Dependency: The app requires a stable internet connection for authentication, fetching drivers, maps, and real-time communication.
API Keys & Billing: Google Cloud Platform, Twilio, and Nylas accounts require valid API keys and may incur costs. Billing must be enabled on GCP 
.
Push Notifications: Push notifications require physical devices for testing and specific configurations (e.g., Expo project ID) 
.
5. Non-Functional Requirements
Performance:
Map rendering and location updates should be smooth and responsive.
Ride request and acceptance should have minimal latency (target < 2 seconds).
Usability:
The UI should be intuitive and easy to navigate for both passengers and drivers.
Core actions (booking a ride, accepting a request) should require minimal steps.
Reliability:
The system should handle WebSocket disconnections gracefully and attempt to reconnect.
The app should provide clear error messages for common failures (e.g., network error, invalid OTP).
Security:
All API communication must use HTTPS.
Sensitive data (phone numbers) must be handled according to privacy regulations.
JWT tokens must be stored securely (AsyncStorage) and have an expiration (e.g., 30 days).
Scalability (Initial): The architecture should support a moderate number of concurrent users (dozens to hundreds) in a single geographic area. The WebSocket server and database are primary scaling points.
6. Success Metrics & Validation
User Acquisition: Number of successful passenger and driver registrations.
Ride Completion Rate: Percentage of requested rides that are successfully completed (picked up and dropped off).
Driver Acceptance Rate: Percentage of ride requests that are accepted by drivers.
Average Response Time: Time taken for a driver to receive and respond to a ride request.
App Store Ratings: User ratings and reviews on the iOS App Store and Google Play Store.
Technical Validation:
End-to-end manual testing of the core user journey (Passenger: Signup -> Book Ride -> Complete Ride; Driver: Signup -> Go Online -> Accept Ride -> Complete Ride).
Validation of real-time features (notifications, driver location updates) on physical devices.
Code coverage for critical backend APIs (authentication, ride creation, status updates).
for further and full repository code :https://github.com/shahriarsajeeb/Ridewave.git