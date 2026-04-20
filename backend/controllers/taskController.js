const Directive = require('../models/Task');

// Retrieve all directives from the registry
exports.getTasks = async (req, res) => {
    try {
        const missions = await Directive.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            totalCount: missions.length,
            data: missions
        });
    } catch (err) {
        res.status(500).json({ success: false, msg: 'Registry sync failure' });
    }
};

// Initialize a new operational directive
exports.createTask = async (req, res) => {
    try {
        const mission = await Directive.create({
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority || 'Medium',
            category: req.body.category || 'Technical'
        });
        res.status(201).json({ success: true, data: mission });
    } catch (err) {
        res.status(400).json({ success: false, msg: 'Initialization data corrupted' });
    }
};

// Update existing directive parameters
exports.updateTask = async (req, res) => {
    try {
        const item = await Directive.findById(req.params.id);
        if (!item) return res.status(404).json({ success: false, msg: 'Directive not found in active grid' });

        const updatedSelection = await Directive.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: updatedSelection });
    } catch (err) {
        res.status(500).json({ success: false, msg: 'Modification protocol failure' });
    }
};

// Purge directive from active records
exports.deleteTask = async (req, res) => {
    try {
        const item = await Directive.findById(req.params.id);
        if (!item) return res.status(404).json({ success: false, msg: 'Directive already absent from registry' });

        await item.deleteOne();
        res.status(200).json({ success: true, payload: null, msg: 'Purge protocol completed' });
    } catch (err) {
        res.status(500).json({ success: false, msg: 'Purge protocol failed - System lock' });
    }
};
