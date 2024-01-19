export const BookingNotificationCont = {
    confirmation: {
        title: 'Booking Confirmation',
        body: 'Your booking from {{pickupLocation}} to {{dropLocation}} has been confirmed for the dates from {{startDate}} to {{endDate}}. We cant wait to make your journey special! 🚗' ,
    },
    bookingRequest: {
        "title": "Booking Request",
        "body": "You have a new booking request for a journey from {{pickupLocation}} to {{dropLocation}} on {{startDate}} to {{endDate}}. Please review and confirm. 🚗✨"
    },
    rejectBooking: {
        title: "Booking Rejected",
        body: "Your booking request from {{pickupLocation}} to {{dropLocation}} for the dates from {{startDate}} to {{endDate}} has been rejected by the {{userType}}. If you have any concerns, please contact support. 🚗🚫",
    },
    vehicleOwnerOrDriverApproveBooking: {
        title: "Booking Approved",
        body:  "Great news! Your booking request from {{pickupLocation}} to {{dropLocation}} for the dates from {{startDate}} to {{endDate}} has been approved by the {{userType}}. Get ready for a fantastic journey! 🚗✨",
    },
    bookingCompleted: {
        title: "Booking Completed",
        body: "Congratulations! Your booked journey from {{pickupLocation}} to {{dropLocation}} for the dates from {{startDate}} to {{endDate}} has been successfully completed. We hope you had a great experience! 🚗🏁",
    },
    bookingStartOnTheDay: {
        title: "Booking Day",
        body: "Your booked journey is starting today. Have a safe and enjoyable trip! 🚗🌟",
    },
    // Add more notification types as needed
};