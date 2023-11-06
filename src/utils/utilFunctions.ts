export const formatBookingDate = (booking: HotelBooking) => {
    const monthNames = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];

    const bookingMonth = monthNames.indexOf(booking.month);

    if (bookingMonth === -1) return null;

    const bookingDate = new Date(booking.year, bookingMonth, booking.day);

    // to check if valid date,
    // eg: if date is 31 Feb then JavaScript Date makes it 3 March
    // so checking if the date is correct what we wanted
    if(bookingDate.getDate() === booking.day)return bookingDate;
    else return null;
}