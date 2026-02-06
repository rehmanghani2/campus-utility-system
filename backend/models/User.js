import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        lowercase: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false
    },
    role: {
        type: String,
        enum: ['student', 'staff', 'admin'],
        default: 'student'
    },
    studentId: {
        type: String,
        required: function() { return this.role === 'student'; }
    },
    department: {
        type: String,
        required: [true, 'Please add department'],
        enum: ['Computer Science', 'Electronics', 'Mechanical', 
               'Civil', 'Electrical', 'Administration', 'Other']
    },
    phone: {
        type: String,
        match: [/^[0-9]{10}$/, 'Please add valid 10-digit phone number']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// ✅ FIX: Encrypt password before saving - Using async/await properly
userSchema.pre('save', async function() {
    // Only hash password if it's modified
    if (!this.isModified('password')) {
        return; // Just return, no next() needed
    }
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// ✅ FIX: Encrypt password before saving - Using async/await properly
userSchema.pre('save', async function() {
    // Only hash password if it's modified
    if (!this.isModified('password')) {
        return; // Just return, no next() needed
    }
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Match user password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);