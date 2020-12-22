import mongoose, { Schema, Document } from 'mongoose';
const { ObjectId } = Schema.Types;

interface UserIn extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
}

const usersSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'You must have a name'],
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 5,
      select: false,
    },
    role: {
      type: String,
      default: 'user',
    },
  },
  { timestamps: true }
);

const Users = mongoose.model<UserIn>('Users', usersSchema);
export default Users;
