import mongoose from "mongoose"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { IUser, IUserMethods } from "../../types/users/user.type";

const UserSchema = new mongoose.Schema<IUser, mongoose.Model<IUser, {}, IUserMethods>, IUserMethods>({
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    select: false,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  mobile: {
    type: String,
    trim: true,
    required: true,
  },
  dp: {
    public_id: { type: String },
    url: { type: String },
    size: { type: String },
    format: { type: String },
  },
  client_id: {
    type: String,
    required: true,
    trim: true,
  },
  client_data_path: {
    type: String,
    required: true,
    trim: true,
  },
  connected_number: {
    type: String,
    trim: true,
    index: true
  },
  is_whatsapp_active: {
    type: Boolean,
    default: false,
    required: true,
  },

  is_admin: {
    type: Boolean,
    default: false,
    required: true,
  },
  lead_fields: [
    {
      field: { type: String },
      readonly: { type: Boolean, default: true },
      hidden: { type: Boolean, default: false }
    }
  ],
  bot_fields: [
    {
      field: { type: String },
      readonly: { type: Boolean, default: true },
      hidden: { type: Boolean, default: false }
    }
  ],
  email_verified: {
    type: Boolean,
    default: false,
    required: true
  },
  is_active: {
    type: Boolean,
    default: true,
    required: true
  },
  last_login: {
    type: Date,
    default: new Date(),
    required: true,

  },
  created_at: {
    type: Date,
    default: new Date(),
    required: true,

  },
  created_by_username: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updated_at: {
    type: Date,
    default: new Date(),
    required: true,

  },
  updated_by_username: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
  },
  updated_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  resetPasswordToken: {
    type: String,
    default: null
  },
  resetPasswordExpire: {
    type: Date,
    default: null
  },
  emailVerifyToken: {
    type: String,
    default: null
  },
  emailVerifyExpire: {
    type: Date,
    default: null
  },
})

// hashing passwords
UserSchema.pre('save', async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 10)
});
// // authenticaion tokens
UserSchema.method(
  "getAccessToken", function () {
    return jwt.sign({ id: this._id }, process.env.JWT_ACCESS_USER_SECRET || "kkskhsdhk", {
      expiresIn: process.env.JWT_ACCESS_EXPIRE,
    });
  }
)

// Compare Password
UserSchema.method("comparePassword", function (password: string) {
  return bcrypt.compare(password, this.password);
})
// Generating Password Reset Token
UserSchema.method("getResetPasswordToken", function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.resetPasswordToken = resetToken
  this.resetPasswordExpire = new Date(Date.now() + 15 * 60 * 1000);
  return resetToken;
})
//generating email verification token
UserSchema.method("getEmailVerifyToken", function () {
  const emailToken = crypto.randomBytes(32).toString('hex');
  this.emailVerifyToken = emailToken
  this.emailVerifyExpire = new Date(Date.now() + 15 * 60 * 1000);
  return emailToken;
})
UserSchema.index({ '$**': 'text' })
export const User = mongoose.model<IUser, mongoose.Model<IUser, {}, IUserMethods>>("User", UserSchema)