import mongoose from 'mongoose'

export interface ITimelineEvent extends mongoose.Document {
  date: Date
  title: string
  description: string
  category: 'milestone' | 'update' | 'announcement' | 'completion'
  imageUrl?: string
  videoUrl?: string
  createdAt: Date
  updatedAt: Date
}

const TimelineEventSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['milestone', 'update', 'announcement', 'completion'],
    default: 'update',
  },
  imageUrl: String,
  videoUrl: String,
}, {
  timestamps: true,
})

TimelineEventSchema.index({ date: -1 })
TimelineEventSchema.index({ category: 1 })

export default mongoose.models.TimelineEvent || mongoose.model<ITimelineEvent>('TimelineEvent', TimelineEventSchema)
