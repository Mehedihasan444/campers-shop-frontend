import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
      <div className="">
  <h1 className="text-2xl font-bold mb-2">Campers Shop</h1>
  <p>
    Welcome to Campers Shop, your one-stop destination for all your camping needs! Since 2015
  </p>
</div>

        {/* Product Column */}
        <div>
  <h3 className="text-lg font-bold mb-2">Product</h3>
  <ul className="space-y-2">
    <li>
      <Link to="/tents" className="hover:underline">
        Tents
      </Link>
    </li>
    <li>
      <Link to="/sleeping-bags" className="hover:underline">
        Sleeping Bags
      </Link>
    </li>
    <li>
      <Link to="/backpacks" className="hover:underline">
        Backpacks
      </Link>
    </li>
    <li>
      <Link to="/camping-furniture" className="hover:underline">
        Camping Furniture
      </Link>
    </li>
    <li>
      <Link to="/cooking-gear" className="hover:underline">
        Cooking Gear
      </Link>
    </li>
    <li>
      <Link to="/lighting" className="hover:underline">
        Lighting
      </Link>
    </li>
    <li>
      <Link to="/accessories" className="hover:underline">
        Accessories
      </Link>
    </li>
  </ul>
</div>


        {/* Resource Column */}
        <div>
          <h3 className="text-lg font-bold mb-2">Resource</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/blog" className="hover:underline">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/newsletter" className="hover:underline">
                Newsletter
              </Link>
            </li>
            <li>
              <Link to="/events" className="hover:underline">
                Events
              </Link>
            </li>
            <li>
              <Link to="/help-center" className="hover:underline">
                Help Center
              </Link>
            </li>
          </ul>
        </div>

        {/* Relevant Links */}
        <div>
          <h3 className="text-lg font-bold mb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:underline">
                Products
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:underline">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        <div className="mb-6 md:mb-0">
          <h3 className="text-lg font-bold mb-2">Contact Us</h3>
          <p>123 Campers Lane</p>
          <p>Adventure City, AC 12345</p>
          <p>Email: info@campersshop.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-primary-foreground pt-4 text-center">
        <div className="flex justify-center space-x-4 mb-4">
          <a
            href="https://facebook.com"
            className="text-primary-foreground hover:text-white"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://twitter.com"
            className="text-primary-foreground hover:text-white"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://instagram.com"
            className="text-primary-foreground hover:text-white"
          >
            <FaInstagram size={24} />
          </a>
        </div>
        <p>&copy; 2024 Campers Shop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
