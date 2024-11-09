import React from 'react';
import { Element } from 'react-scroll';
import ContactForm from './ContactForm';
import { FadeInSection } from '../../common/FadeInSection';

const Contact = () => {
  return (
    <Element name="contact">
      <section>
        <FadeInSection>
          <div className='w-3/4 mx-auto tracking-widest mt-20 mb-14 xl:my-28'>
            <p className='text-xs md:text-base lg:text-lg xl:text-xl font-bold text-black'>声をかける</p>
            <div className='flex justify-between items-center'>
              <h2 className='text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-widest text-black'>CONTACT</h2>
            </div>
          </div>
          <div className='w-3/4 mx-auto tracking-widest mb-20 xl:mb-28'>
            <p className='font-medium text-xs md:text-sm lg:text-sm xl:text-base leading-loose'>
              お仕事のご相談はもちろん、励ましのお言葉や雑談でも大歓迎です。どんなことでも、お気軽にお声がけください。
            </p>
          </div>
          <div className='w-3/4 mx-auto'>
            <ContactForm />
          </div>
        </FadeInSection>
      </section>
    </Element>
  );
};

export default Contact;