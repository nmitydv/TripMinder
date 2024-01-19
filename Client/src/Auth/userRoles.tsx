// Desc: Check if user is valid or not

// function for check that role is admin or not
export const isAdmin = () => {
    const role = localStorage.getItem('role');
    if ('Admin' === role) {
        return true;
    } else {
        return false;
    }
};

// function for check that role is driver or not
export const isDriver = () => {
    const role = localStorage.getItem('role');
    // //('role: ', role);
    if ('Driver' === role) {
        return true;indexedDB
    } else {
        return false;
    }
};

// function for check that role is vehicle owner or not
export const isVehicleOwner = () => {
    const role = localStorage.getItem('role');
    if ('VehicleOwner' === role) {
        return true;
    } else {
        return false;
    }
};


// function for check that role is customer or not
export const isCustomer = () => {
    const role = localStorage.getItem('role');
    if ('User' === role) {
        return true;
    } else {
        return false;
    }
};
