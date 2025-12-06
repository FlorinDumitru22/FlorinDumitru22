import mongoose from 'mongoose'

export interface IGalleryImage extends mongoose.Document {
  title: string
  description?: string
  imageUrl: string
  thumbnailUrl?: string
  stage: 'fencing' | 'foundation' | 'timber-frame' | 'insulation' | 'roof' | 'other'
  order: number
  uploadedBy: string
  createdAt: Date
  updatedAt: Date
}

const GalleryImageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    maxlength: 500,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  thumbnailUrl: String,
  stage: {
    type: String,
    enum: ['fencing', 'foundation', 'timber-frame', 'insulation', 'roof', 'other'],
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  uploadedBy: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
})

GalleryImageSchema.index({ stage: 1, order: 1 })
GalleryImageSchema.index({ createdAt: -1 })

export default mongoose.models.GalleryImage || mongoose.model<IGalleryImage>('GalleryImage', GalleryImageSchema)
