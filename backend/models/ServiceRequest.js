import mongoose from "mongoose";

const serviceRequestSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    userId: {
        type: String,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: [true, 'Please select a category'],
        enum: [
            'Plumbing',
            'Electrical',
            'Internet/Network',
            'Cleaning',
            'Furniture',
            'AC/Ventilation',
            'Security',
            'Other'
        ]
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [500, 'Description cannot be more than 500 characters']
    },
    location: {
        building: {
                type: String,
                required: [true, 'Please add building name'],
            },
        floor: String,
        roomNumber: String
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Urgent'],
        default: 'Medium'
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Resolved', 'Rejected'],
        default: 'Pending'
    },
    assignedTo: {
        type: String,
        default: 'Unassigned'
    },
    remarks: {
        type: String,
        default: '' 
    },
    images: [{
        type: String // store image URLs if needed
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    resolvedAt: {
        type: Date
    }
});

// ✅ FIX: Use async/await WITHOUT next() callback
serviceRequestSchema.pre('save', async function() {
    this.updatedAt = Date.now();
    
    if (this.status === 'Resolved' && !this.resolvedAt) {
        this.resolvedAt = Date.now();
    }
    // No next() needed with async function
});

// Alternative: If you want to use next() callback style
// serviceRequestSchema.pre('save', function(next) {
//     this.updatedAt = Date.now();
//     
//     if (this.status === 'Resolved' && !this.resolvedAt) {
//         this.resolvedAt = Date.now();
//     }
//     next();  // Must call next() at the end
// });


export default mongoose.models.ServiceRequest || mongoose.model('ServiceRequest', serviceRequestSchema);