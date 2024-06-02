import React from 'react';
import './ContactPage.css';
import  { useRef } from 'react';
  import emailjs from 'emailjs-com';
  import {MdOutlineEmail} from 'react-icons/md'
  import {RiMessengerLine} from 'react-icons/ri'
  import {BsWhatsapp} from 'react-icons/bs'
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import PinterestIcon from '@mui/icons-material/Pinterest';
import InstagramIcon from '@mui/icons-material/Instagram';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import LanguageIcon from '@mui/icons-material/Language';
import EndDetail from './EndDetail';

const ContactPage = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_jdv6e8p', 'template_ruaxz5s', form.current, "mnX9o6bmVVlnxZQLK") 
      
      
      .then(
        () => {
          console.log('SUCCESS!');
          form.current.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
      
  };

  return (
    <div className='contact-one'>
      {/* Contact Details Box */}
      <div className="contact-details-box">
        <div className="contact-container1">
          <div className="contact-header1">
            <h1>Contact Us</h1>
            <p>Have questions or feedback? Reach out to us!</p>
          </div>

          {/* Contact Form */}
          <form className="contact-form1" ref={form} onSubmit={sendEmail}>
            <div className="form-group1">
              <label htmlFor="name">Your Name:</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group1">
              <label htmlFor="email">Your Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group1">
              <label htmlFor="message">Your Message:</label>
              <textarea id="message" name="message" rows="4" required />
            </div>
            <button type="submit">Send Message</button>
          </form>

          {/* Social Media Icons */}
          <div className="social-icons1">
          <FacebookOutlinedIcon style={{ marginRight:'15px',  borderRadius: '5px',fontSize:'15px'  }} /><TwitterIcon style={{  marginRight:'15px',borderRadius: '5px',fontSize:'15px'  }}/> <GoogleIcon style={{   marginRight:'15px',borderRadius: '2px',fontSize:'15px'  }}/>
            {/* Add more social media icons as needed */}
            <PinterestIcon style={{ marginRight:'15px',borderRadius: '1px' ,fontSize:'15px' }} />
        <LanguageIcon style={{ marginRight:'15px',borderRadius: '1px' ,fontSize:'15px' }}/>
        <InstagramIcon style={{ marginRight:'15px',borderRadius: '1px' ,fontSize:'15px' }} />
        <SportsVolleyballIcon style={{ marginRight:'15px',borderRadius: '1px' ,fontSize:'15px' }} />
        <LinkedInIcon style={{ borderRadius: '1px' ,fontSize:'15px' }} />
          </div>
        </div>
      </div>

    <EndDetail/>
    </div>
  );
};

export default ContactPage;
