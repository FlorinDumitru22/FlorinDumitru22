import mongoose from 'mongoose'

export interface IMaterial extends mongoose.Document {
  category: string
  name: string
  budgeted: number
  spent: number
  quantity?: number
  unit?: string
  supplier?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const MaterialSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  budgeted: {
    type: Number,
    required: true,
    min: 0,
  },
  spent: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  quantity: Number,
  unit: String,
  supplier: String,
  notes: String,
}, {
  timestamps: true,
})

MaterialSchema.index({ category: 1 })

export default mongoose.models.Material || mongoose.model<IMaterial>('Material', MaterialSchema)
