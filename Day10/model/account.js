import mongoose from 'mongoose';

// Bước 1: Tạo Schema — định nghĩa cấu trúc
const accountSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    department:String,
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    }
});

// Bước 2: Tạo Model — ánh xạ Schema tới collection 'users' trong MongoDB
const AccountModel  = mongoose.model('customer', accountSchema);

export default AccountModel;