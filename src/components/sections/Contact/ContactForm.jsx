'use client';

import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

const inputClass =
  'mt-3 block w-full bg-surface/70 border border-line rounded-sm px-5 py-4 text-sm text-black placeholder-side focus:outline-none focus:border-accent transition-colors duration-300';
const labelClass = 'block text-xs tracking-[0.25em] font-bold text-black';

const ContactForm = () => {
  const [state, handleSubmit] = useForm('mzzpngqz');

  if (state.succeeded) {
    return (
      <div className="bg-surface/70 border border-line rounded-sm px-8 py-16 text-center">
        <p className="font-serif text-2xl text-accent mb-3">Thank you!</p>
        <p className="text-black/70 text-sm tracking-wide">
          メッセージを送信しました。お返事までしばらくお待ちください。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-7">
      <div>
        <label htmlFor="name" className={labelClass}>
          NAME
        </label>
        <input type="text" id="name" name="name" required className={inputClass} placeholder="お名前" />
        <ValidationError prefix="Name" field="name" errors={state.errors} className="text-accent text-xs mt-1" />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          MAIL ADDRESS
        </label>
        <input type="email" id="email" name="email" required className={inputClass} placeholder="you@example.com" />
        <ValidationError prefix="Email" field="email" errors={state.errors} className="text-accent text-xs mt-1" />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          MESSAGE
        </label>
        <textarea id="message" name="message" required rows={6} className={inputClass} placeholder="お問い合わせ内容をご記入ください。" />
        <ValidationError prefix="Message" field="message" errors={state.errors} className="text-accent text-xs mt-1" />
      </div>

      <button
        type="submit"
        disabled={state.submitting}
        className="group inline-flex items-center justify-center gap-3 w-full md:w-72 mt-2 bg-accent text-background tracking-[0.25em] text-sm font-bold py-4 rounded-sm hover:opacity-85 transition-opacity duration-300 disabled:opacity-60"
      >
        {state.submitting ? '送信中…' : '送信する'}
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </button>
    </form>
  );
};

export default ContactForm;
