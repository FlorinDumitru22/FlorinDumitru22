import { z } from 'zod';

// Authentication validation schemas
export const loginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

// Contact form validation
export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// Volunteer signup validation
export const volunteerSignupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  buildDayId: z.string().min(1, 'Please select a build day'),
  skills: z.string().optional(),
});

// Admin funding update validation
export const fundingUpdateSchema = z.object({
  goal: z.number().min(1000, 'Goal must be at least €1000'),
  raised: z.number().min(0, 'Raised amount cannot be negative'),
  deadline: z.string().min(1, 'Deadline is required'),
  stages: z.array(z.object({
    name: z.string().min(1, 'Stage name is required'),
    budget: z.number().min(0, 'Budget cannot be negative'),
    raised: z.number().min(0, 'Raised amount cannot be negative'),
    status: z.enum(['pending', 'in-progress', 'completed']),
  })),
});

// Gallery image upload validation
export const galleryImageSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().optional(),
  stage: z.enum(['planning', 'fencing', 'foundations', 'timber-frame', 'insulation', 'roof', 'completed']),
  imageUrl: z.string().url('Invalid image URL'),
});

// Timeline event validation
export const timelineEventSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  date: z.string().min(1, 'Date is required'),
  stage: z.enum(['planning', 'fencing', 'foundations', 'timber-frame', 'insulation', 'roof', 'completed']),
  imageUrl: z.string().url().optional(),
});

// Build day scheduling validation
export const buildDaySchema = z.object({
  date: z.string().min(1, 'Date is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  maxVolunteers: z.number().min(1, 'At least 1 volunteer spot required'),
  description: z.string().optional(),
  tasks: z.string().optional(),
});

// Material cost tracking validation
export const materialSchema = z.object({
  name: z.string().min(2, 'Material name must be at least 2 characters'),
  category: z.enum(['lumber', 'insulation', 'roofing', 'foundation', 'tools', 'other']),
  budgeted: z.number().min(0, 'Budgeted amount cannot be negative'),
  actual: z.number().min(0, 'Actual cost cannot be negative'),
  supplier: z.string().optional(),
  notes: z.string().optional(),
});

// Type exports for TypeScript
export type LoginInput = z.infer<typeof loginSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type VolunteerSignupInput = z.infer<typeof volunteerSignupSchema>;
export type FundingUpdateInput = z.infer<typeof fundingUpdateSchema>;
export type GalleryImageInput = z.infer<typeof galleryImageSchema>;
export type TimelineEventInput = z.infer<typeof timelineEventSchema>;
export type BuildDayInput = z.infer<typeof buildDaySchema>;
export type MaterialInput = z.infer<typeof materialSchema>;
