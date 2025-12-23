import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const Footer = () => {
  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "For Employers", path: "/for-employers" },
        { name: "For Talents", path: "/for-talents" },
        { name: "Pricing", path: "/pricing" },
        { name: "How It Works", path: "/" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/" },
        { name: "Careers", path: "/" },
        { name: "Blog", path: "/" },
        { name: "Contact", path: "/" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Help Center", path: "/" },
        { name: "Documentation", path: "/" },
        { name: "API", path: "/" },
        { name: "Partners", path: "/" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", path: "/" },
        { name: "Terms of Service", path: "/" },
        { name: "Cookie Policy", path: "/" },
        { name: "GDPR", path: "/" },
      ],
    },
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img src="/assets/Talen-Tek.png" alt="TalenTek" className="h-30 w-30" />
            </Link>
            <p className="text-sm text-gray-600">
              Empowering the future workforce by connecting top global talent with leading companies.
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4 text-gray-900">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-gray-600 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} TalenTek. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
