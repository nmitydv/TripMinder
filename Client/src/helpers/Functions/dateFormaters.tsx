export const formateDateYYYYMMDD = (date: string) => {
    const originalDateString = date;
    const originalDate = new Date(originalDateString);

    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(originalDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
};

//  For Vahicle cards
//  Format -
export const formatDateWithDayMonth = (inputDate: string) => {
    const date = new Date(inputDate);

    const options = {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
};

//  For Calculate day difference
export const dayDifferenceInDays = (startDate, endDate) => {
    // Two date strings
    const date1String = startDate.toString();
    const date2String = endDate.toString();

    // Create Date objects from the strings
    const date1 = new Date(date1String);
    const date2 = new Date(date2String);

    // Calculate the time difference in milliseconds
    const timeDifference = date2 - date1;

    // Calculate the number of days
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    return daysDifference;
};
