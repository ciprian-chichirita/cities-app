
export const Footer = () => {
  return (
    <footer className='page-footer font-small pt-1 pb-1 bg-light'>
      <div className='footer-copyright text-center py-3'>© {new Date().getFullYear()}</div>
    </footer>
  );
};

export default Footer;