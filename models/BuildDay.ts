import mongoose from 'mongoose'

export interface IVolunteer {
  name: string
  email: string
  phone?: string
  skills?: string
  signedUpAt: Date
}

export interface IBuildDay extends mongoose.Document {
  date: Date
  title: string
  description: string
  maxVolunteers: number
  volunteers: IVolunteer[]
  status: 'upcoming' | 'in-progress' | 'completed' | 'cancelled'
  tasks: string[]
  location?: string
  createdAt: Date
  updatedAt: Date
}

const VolunteerSchema = new mongoose.Schema({
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
  phone: String,
  skills: String,
  signedUpAt: {
    type: Date,
    default: Date.now,
  },
}, { _id: false })

const BuildDaySchema = new mongoose.Schema({
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
  maxVolunteers: {
    type: Number,
    required: true,
    min: 1,
  },
  volunteers: [VolunteerSchema],
  status: {
    type: String,
    enum: ['upcoming', 'in-progress', 'completed', 'cancelled'],
    default: 'upcoming',
  },
  tasks: [String],
  location: String,
}, {
  timestamps: true,
})

BuildDaySchema.index({ date: 1 })
BuildDaySchema.index({ status: 1 })

export default mongoose.models.BuildDay || mongoose.model<IBuildDay>('BuildDay', BuildDaySchema)
