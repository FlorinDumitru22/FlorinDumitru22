import mongoose from 'mongoose'

export interface IFunding extends mongoose.Document {
  totalGoal: number
  raisedAmount: number
  supporterCount: number
  daysRemaining: number
  stages: Array<{
    name: string
    budget: number
    spent: number
    progress: number
    status: 'complete' | 'progress' | 'pending'
  }>
  createdAt: Date
  updatedAt: Date
}

const FundingSchema = new mongoose.Schema({
  totalGoal: {
    type: Number,
    required: true,
    default: 85000,
  },
  raisedAmount: {
    type: Number,
    required: true,
    default: 0,
  },
  supporterCount: {
    type: Number,
    required: true,
    default: 0,
  },
  daysRemaining: {
    type: Number,
    required: true,
  },
  stages: [{
    name: String,
    budget: Number,
    spent: Number,
    progress: Number,
    status: {
      type: String,
      enum: ['complete', 'progress', 'pending'],
    },
  }],
}, {
  timestamps: true,
})

export default mongoose.models.Funding || mongoose.model<IFunding>('Funding', FundingSchema)
