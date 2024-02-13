const Order = require('../models/orderModel');

exports.getSales = async (req, res, next) => {
    try {
        // Getting order details from MongoDB
        const orderDetails = await Order.find();

        // Extracting filter parameters from the request
        const { filter } = req.query;

        let filteredOrders = [];

        // Filter orders based on the requested filter
        switch (filter) {
            case 'today':
                filteredOrders = filterTodaySales(orderDetails);
                break;
            case 'past30days':
                filteredOrders = filterPast30DaysSales(orderDetails);
                break;
            case 'specificMonth':
                const { month, year } = req.query;
                filteredOrders = filterSpecificMonthSales(orderDetails, month, year);
                break;
            case 'specificYear':
                const { specificYear } = req.query;
                filteredOrders = filterSpecificYearSales(orderDetails, specificYear);
                break;
            case 'specificDate':
                const { specificDate } = req.query;
                filteredOrders = filterSpecificDateSales(orderDetails, specificDate);
                break;
            default:
                // Invalid filter parameter
                return res.status(400).json({ message: 'Invalid filter parameter' });
        }

        if (filteredOrders.length !== 0) {
            res.status(200).json(filteredOrders);
        } else {
            res.status(200).json({ message: 'No sales matching the requested filter' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Unexpected server error' });
    }
}

// Function to filter today's sales
const filterTodaySales = (orderDetails) => {
    const currentDate = new Date();
    return orderDetails.filter(order => isSameDay(new Date(order.createdAt), currentDate));
}

// Function to filter past 30 days' sales
const filterPast30DaysSales = (orderDetails) => {
    const currentDate = new Date();
    const pastDate = new Date(currentDate);
    pastDate.setDate(currentDate.getDate() - 30);
    return orderDetails.filter(order => new Date(order.createdAt) >= pastDate && new Date(order.createdAt) <= currentDate);
}

// Function to filter sales for a specific month of a specific year
const filterSpecificMonthSales = (orderDetails, month, year) => {
    return orderDetails.filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate.getMonth() + 1 === parseInt(month) && orderDate.getFullYear() === parseInt(year);
    });
}

// Function to filter sales for a specific year
const filterSpecificYearSales = (orderDetails, specificYear) => {
    return orderDetails.filter(order => new Date(order.createdAt).getFullYear() === parseInt(specificYear));
}

// Function to filter sales for a specific date
const filterSpecificDateSales = (orderDetails, specificDate) => {
    return orderDetails.filter(order => {
        const orderDate = new Date(order.createdAt);
        const filterDate = new Date(specificDate);
        return isSameDay(orderDate, filterDate);
    });
}

// Function to check if two dates are the same day
const isSameDay = (date1, date2) => {
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();
}
