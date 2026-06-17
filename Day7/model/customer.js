import mongoose from 'mongoose';

// Bước 1: Tạo Schema — định nghĩa cấu trúc
const customerSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    password: {
        type: String,
        select: false  // ẩn mặc định, phải dùng .select('+password') mới lấy được
    }
});

// Bước 2: Tạo Model — ánh xạ Schema tới collection 'users' trong MongoDB
const CustomerModel  = mongoose.model('customer', customerSchema);

export default CustomerModel;