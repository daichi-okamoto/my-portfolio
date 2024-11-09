import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

const ContactForm = () => {
  const [state, handleSubmit] = useForm("mzzpngqz");

  return (
    <form onSubmit={handleSubmit} className='flex flex-col space-y-10'>
      <div>
        <label htmlFor="name" className='block tracking-widest text-xs md:text-sm lg:text-base xl:text-lg font-bold text-black'>
          NAME
        </label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          required 
          className='mt-2 block w-full px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-8 xl:px-10 xl:py-10 focus:outline-none focus:ring-none text-xs lg:text-base'
        />
        <ValidationError 
          prefix="Name" 
          field="name"
          errors={state.errors}
        />
      </div>
      
      <div>
        <label htmlFor="email" className='block tracking-widest text-xs md:text-sm lg:text-base xl:text-lg font-bold text-black'>
          MAIL ADDRESS
        </label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          required 
          className='mt-2 block w-full px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-8 xl:px-10 xl:py-10 focus:outline-none focus:ring-none text-xs lg:text-base'
        />
        <ValidationError 
          prefix="Email" 
          field="email"
          errors={state.errors}
        />
      </div>
      
      <div>
        <label htmlFor="message" className='block tracking-widest text-xs md:text-sm lg:text-base xl:text-lg font-bold text-black'>
          MESSAGE
        </label>
        <textarea 
          id="message" 
          name="message" 
          required 
          className='mt-2 block w-full px-4 pt-4 pb-16 xl:px-10 xl:pt-10 xl:pb-40 focus:outline-none focus:ring-none text-xs lg:text-base'
        />
        <ValidationError 
          prefix="Message" 
          field="message"
          errors={state.errors}
        />
      </div>
      
      <div className='flex justify-center items-center'>
        <button 
          type="submit" 
          disabled={state.submitting || state.succeeded}
          className='w-full md:w-64 mt-10 text-sm md:text-base tracking-widest font-semibold bg-header text-white py-6 md:py-4 xl:py-6 px-4 hover:opacity-80 focus:outline-none duration-300'
        >
          {state.submitting 
            ? "送信中..." 
            : state.succeeded 
            ? "送信しました" 
            : "送信する"}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;