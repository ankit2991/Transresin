import React from "react";
import { Link } from "react-router-dom";
import { navLinks } from "./navlinks";
import "./styles.module.scss";
import { BiSearch, BiShoppingBag, BiUser } from "react-icons/bi";
import { useSelector } from "react-redux";

const Header = () => {
  // const [menus, setMenus] = useState([]);
  const { menus } = useSelector((state) => state?.home);

  return (
    <>
      <header className="relative text-center">
        <div className="container mx-auto relative">
          <div className="absolute left-0 top-0">
            <img src="/images/present_logo.png" alt="" className="max-h-12" />
          </div>
          <Link to="/" className="mt-10 inline-block">
            <img
              src="/images/logo.png"
              alt=""
              loading="lazy"
              className="max-h-16 inline-block"
            />
          </Link>
          <div className="lg:flex items-end">
            <div className="ml-auto mb-5 flex gap-3 text-primary text-primary-300">
              <Link to="/" className="hover:text-primary-600">
                <BiSearch size={30} />
              </Link>
              <Link to="/cart" className="hover:text-primary-600">
                <BiShoppingBag size={30} />
              </Link>
              <Link
                to="/login"
                className="flex items-center hover:text-primary-600"
              >
                <BiUser size={30} /> Sign In
              </Link>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-blue-950 text-white sticky top-0 z-50">
        <div className="container mx-auto">
          <ul className="main-navbar">
            {menus?.map((link, index) => (
              <li key={index}>
                <Link to={link.slug}>{link.name}</Link>

                {link?.data?.length ? (
                  <ul className="min-w-[150px] top-full start-0 w-max">
                    {link?.data.map((category) => (
                      <li key={category.id}>
                        <Link
                          to={`/category/${category.id}`}
                          className="flex items-center"
                        >
                          <img
                            src={category.image}
                            alt=""
                            className="size-8 inline-block rounded-full"
                          />
                          <div className="ml-2">{category.name}</div>
                        </Link>
                        {category?.children?.length ? (
                          <ul>
                            {category?.children?.map((subCategory) => (
                              <li key={subCategory.id}>
                                <Link to={`/category/${subCategory.id}`}>
                                  {subCategory.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
            {navLinks?.map((link, index) => (
              <li key={index}>
                <Link to={link.target}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
