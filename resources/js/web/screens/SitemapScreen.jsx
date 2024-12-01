import React from "react";

const SitemapScreen = () => {
  // Sample sitemap sections and links
  const sitemapData = [
    {
      section: "About Us",
      links: [
        { name: "Company Overview", href: "/about" },
        { name: "Our Team", href: "/team" },
        { name: "Careers", href: "/careers" },
      ],
    },
    {
      section: "Products",
      links: [
        { name: "Product 1", href: "/products/1" },
        { name: "Product 2", href: "/products/2" },
        { name: "Product 3", href: "/products/3" },
      ],
    },
    {
      section: "Support",
      links: [
        { name: "Help Center", href: "/help" },
        { name: "FAQs", href: "/faqs" },
        { name: "Contact Us", href: "/contact" },
      ],
    },
    {
      section: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
      ],
    },
  ];

  return (
    <div className="bg-blue-50">
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Sitemap</h1>
          <p className="text-lg">
            Explore the links below to learn more about our services and
            offerings.
          </p>
        </div>
      </section>

      {/* Sitemap Section */}
      <div className="container mx-auto py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sitemapData.map((section, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {section.section}
              </h2>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-primary-300 hover:underline"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SitemapScreen;
