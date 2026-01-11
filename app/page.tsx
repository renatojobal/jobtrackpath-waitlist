'use client'

import { useState, FormEvent, useEffect } from 'react'
import Image from 'next/image'

const images = [
  { src: '/images/board_trans_bg.png', alt: 'Kanban Board View' },
  { src: '/images/conversation_trans_bg.png', alt: 'Conversation Tracker View' }
]

export default function WaitlistPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-advance carousel every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        setStatus('error')
        setMessage(data.error || 'Failed to join waitlist. Please try again.')
        return
      }

      setStatus('success')
      setMessage('Thanks for joining! We\'ll notify you when we launch.')
      setEmail('')
    } catch (error) {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
      console.error('Error submitting email:', error)
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-black to-black overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#31B19E] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-[#31B19E] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-[#31B19E] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <main className="relative flex min-h-screen flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl text-center space-y-8">
          {/* Logo/Title */}
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#31B19E] to-[#289181] mb-6 shadow-lg shadow-[#31B19E]/20">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                JobTrackPath
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-light">
              Track your job applications with ease
            </p>
          </div>

          {/* Description */}
          <div className="max-w-xl mx-auto space-y-4">
            <p className="text-lg text-gray-300 leading-relaxed">
              Manage your job search journey with a powerful Kanban board, track conversations with recruiters, and get AI-powered insights.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <span className="px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700 text-sm text-gray-300">
                📋 Kanban Board
              </span>
              <span className="px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700 text-sm text-gray-300">
                💬 Conversation Tracker
              </span>
              <span className="px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700 text-sm text-gray-300">
                🤖 AI Summaries
              </span>
            </div>
          </div>

          {/* Product Preview Carousel */}
          <div className="relative max-w-5xl mx-auto mt-16 mb-8">
            <div className="relative h-[400px] md:h-[500px] flex items-center justify-center">
              {/* Carousel Images */}
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="relative h-full flex items-center justify-center animate-float">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={1200}
                      height={800}
                      className="object-contain max-h-full w-auto drop-shadow-2xl"
                      priority={index === 0}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'w-8 bg-[#31B19E]'
                      : 'w-2 bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full bg-gray-800/80 hover:bg-gray-700/80 border border-gray-700 flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % images.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-gray-800/80 hover:bg-gray-700/80 border border-gray-700 flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Waitlist Form */}
          <div className="max-w-md mx-auto mt-12">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-2xl">
              <h2 className="text-2xl font-semibold mb-2 text-white">Join the Waitlist</h2>
              <p className="text-gray-400 mb-6">Get exclusive launch discount + early access</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    disabled={status === 'loading' || status === 'success'}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#31B19E] focus:border-transparent transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="w-full px-6 py-3 rounded-lg bg-[#31B19E] hover:bg-[#289181] text-white font-medium shadow-lg shadow-[#31B19E]/20 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                >
                  {status === 'loading' ? 'Joining...' : status === 'success' ? '✓ Joined!' : 'Join Waitlist'}
                </button>

                {status === 'success' && (
                  <p className="text-sm text-[#31B19E] text-center animate-fade-in">
                    {message}
                  </p>
                )}

                {status === 'error' && (
                  <p className="text-sm text-red-400 text-center animate-fade-in">
                    {message}
                  </p>
                )}
              </form>

              <p className="text-xs text-gray-500 mt-4 text-center">
                We respect your privacy. No spam, ever.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 text-center text-sm text-gray-600">
            <p>© 2026 JobTrackPath. All rights reserved.</p>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
