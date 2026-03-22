const db = require('../config/db');

// CRUD Operations
exports.getAllData = async (req, res) => {
    try {
        const { category, department, startDate, endDate } = req.query;
        let query = 'SELECT * FROM business_data WHERE 1=1';
        let params = [];

        if (category) {
            query += ' AND category = ?';
            params.push(category);
        }
        if (department) {
            query += ' AND department = ?';
            params.push(department);
        }
        if (startDate && endDate) {
            query += ' AND date BETWEEN ? AND ?';
            params.push(startDate, endDate);
        }

        query += ' ORDER BY date DESC';
        const [data] = await db.query(query, params);
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.addData = async (req, res) => {
    const { date, category, department, amount, revenue, expenses, description } = req.body;
    try {
        await db.query(
            'INSERT INTO business_data (date, category, department, amount, revenue, expenses, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [date, category, department, amount, revenue, expenses, description]
        );
        res.status(201).json({ message: 'Data added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateData = async (req, res) => {
    const { id } = req.params;
    const { date, category, department, amount, revenue, expenses, description } = req.body;
    try {
        await db.query(
            'UPDATE business_data SET date = ?, category = ?, department = ?, amount = ?, revenue = ?, expenses = ?, description = ? WHERE id = ?',
            [date, category, department, amount, revenue, expenses, description, id]
        );
        res.json({ message: 'Data updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteData = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM business_data WHERE id = ?', [id]);
        res.json({ message: 'Data deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Analytics Data
exports.getAnalytics = async (req, res) => {
    try {
        const [monthly] = await db.query(`
            SELECT 
                DATE_FORMAT(date, '%Y-%m') as month, 
                SUM(revenue) as total_revenue, 
                SUM(expenses) as total_expenses,
                SUM(revenue - expenses) as profit
            FROM business_data 
            GROUP BY month 
            ORDER BY month ASC
        `);

        const [byCategory] = await db.query(`
            SELECT category, SUM(revenue) as revenue
            FROM business_data 
            GROUP BY category
        `);

        const [summary] = await db.query(`
            SELECT 
                SUM(revenue) as totalRevenue,
                SUM(expenses) as totalExpenses,
                SUM(revenue - expenses) as netProfit,
                COUNT(*) as totalTransactions
            FROM business_data
        `);

        res.json({
            monthly,
            byCategory,
            summary: summary[0]
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
