'use client';

import { useState } from 'react';

export default function BookEvent() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  }

  return (
    <div id='book-event'>
      {submitted ? (
        <p className='text-sm text-teal-200'>
          Thanks for signing up, we&apos;ll be in touch soon!
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='email'>Email Address</label>
            <input
              type='email'
              id='email'
              value={email}
              placeholder='Enter your email address'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type='submit' className='button-submit'>
            Sign Up
          </button>
        </form>
      )}
    </div>
  );
}
