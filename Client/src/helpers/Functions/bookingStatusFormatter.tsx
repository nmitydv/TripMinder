import { bookingRequests, bookingStatus1 } from '../constants/idConstants';

export const bookingStatusFormatter = (status, request) => {
    let statusText;
    if (
        status === bookingStatus1?.inrunning &&
        request === bookingRequests?.approved
    ) {
        statusText = 'In Running';
    } else if (
        status === bookingStatus1?.pending &&
        request === bookingRequests?.approved
    ) {
        statusText = 'Approved';
    } else if (
        status === bookingStatus1?.pending &&
        request === bookingRequests?.requested
    ) {
        statusText = 'Requested';
    } else if (
        status === bookingStatus1?.pending &&
        request === bookingRequests?.rejected
    ) {
        statusText = 'Rejected';
    } else if (
        status === bookingStatus1?.completed &&
        request === bookingRequests?.approved
    ) {
        statusText = 'Completed';
    }
    return statusText;
};
