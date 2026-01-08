# JobTrackPath Waitlist

A beautiful dark-themed waitlist landing page for JobTrackPath, built with Next.js 16 and Tailwind CSS v4.

## Features

- **Dark Theme**: Elegant dark design with gradient backgrounds
- **Brand Colors**: Uses JobTrackPath's primary color (#31B19E)
- **Animated Background**: Subtle animated blob effects
- **Email Collection**: Simple waitlist form with validation
- **Responsive Design**: Mobile-first approach
- **Modern Stack**: Next.js 16, React 19, TypeScript, Tailwind CSS v4

## Getting Started

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the waitlist page.

### Build

```bash
npm run build
npm run start
```

## Design

- **Primary Color**: #31B19E (teal)
- **Background**: Dark gradient (gray-900 to black)
- **Typography**: Geist Sans and Geist Mono fonts
- **Components**: Email input with focus states, animated submit button

## Features Breakdown

### Landing Page
- Hero section with JobTrackPath branding
- Feature highlights (Kanban Board, Conversation Tracker, AI Summaries)
- Animated background elements

### Waitlist Form
- Email validation
- Loading states
- Success confirmation
- Privacy message

## Customization

To connect to a real backend, update the `handleSubmit` function in `app/page.tsx`:

```typescript
const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  setStatus('loading')

  try {
    const response = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })

    if (response.ok) {
      setStatus('success')
      setMessage('Thanks for joining! We\'ll notify you when we launch.')
      setEmail('')
    }
  } catch (error) {
    setStatus('error')
    setMessage('Something went wrong. Please try again.')
  }
}
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

Private project - All rights reserved
