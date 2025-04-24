import Github from '../assets/github.svg';
import Facebook from '../assets/facebook.svg';

const Footer = () => {
  const links = [
    { name: 'GitHub', url: import.meta.env.VITE_REACT_APP_GITHUB_URL || '' },
    {
      name: 'Facebook',
      url: import.meta.env.VITE_REACT_APP_FACEBOOK_URL || '',
    },
  ];

  return (
    <footer className="footer">
      <div className="footerContent">
        <div>Oran Wiriya</div>
        <div>By day, an Architect, crafting the skyline</div>
        <div>By night, a Software Engineer, coding the divine.</div>
      </div>
      <div className="footerLinks">
        {links.map((link, index) => (
          <a
            key={index}
            target="_blank"
            href={link.url}
            rel="noopener noreferrer"
            className="footerLink"
          >
            <img src={link.name === 'GitHub' ? Github : Facebook} width={24} />
            {link.name}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
