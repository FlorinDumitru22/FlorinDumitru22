'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactInput } from '@/lib/validations';
import { useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    try {
      // In production, send to your API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitted(true);
        reset();
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">Join our community or ask questions</p>
        
        <div className="max-w-2xl mx-auto mt-12">
          {submitted && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              Thank you for your message! We'll get back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="card">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Name *</label>
                <input 
                  {...register('name')}
                  type="text" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email *</label>
                <input 
                  {...register('email')}
                  type="email" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-semibold mb-2">Message *</label>
              <textarea 
                {...register('message')}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Tell us how you'd like to get involved..."
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
              )}
            </div>
            <button type="submit" className="btn-primary w-full mt-6">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
