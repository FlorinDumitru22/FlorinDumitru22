import mongoose from 'mongoose'

export interface ISupporter extends mongoose.Document {
  name: string
  email: string
  amount: number
  tier: 'seed' | 'sapling' | 'tree' | 'forest' | 'custom'
  message?: string
  anonymous: boolean
  stripeSessionId?: string
  stripeCustomerId?: string
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  createdAt: Date
  updatedAt: Date
}

const SupporterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  tier: {
    type: String,
    enum: ['seed', 'sapling', 'tree', 'forest', 'custom'],
    required: true,
  },
  message: {
    type: String,
    maxlength: 500,
  },
  anonymous: {
    type: Boolean,
    default: false,
  },
  stripeSessionId: {
    type: String,
    unique: true,
    sparse: true,
  },
  stripeCustomerId: String,
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending',
  },
}, {
  timestamps: true,
})

SupporterSchema.index({ email: 1 })
SupporterSchema.index({ status: 1 })
SupporterSchema.index({ createdAt: -1 })

export default mongoose.models.Supporter || mongoose.model<ISupporter>('Supporter', SupporterSchema)
