import mongoose from 'mongoose'

export interface ISession extends mongoose.Document {
  adminId: mongoose.Types.ObjectId
  token: string
  expiresAt: Date
  ipAddress?: string
  userAgent?: string
  createdAt: Date
}

const SessionSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  ipAddress: String,
  userAgent: String,
}, {
  timestamps: true,
})

SessionSchema.index({ token: 1 })
SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })
SessionSchema.index({ adminId: 1 })

export default mongoose.models.Session || mongoose.model<ISession>('Session', SessionSchema)
