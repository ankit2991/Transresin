import React from "react";
import { Link } from "react-router-dom";
import { navLinks } from "./navlinks";
import "./styles.module.scss";
import { BiSearch, BiUser, BiUserCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import useCart from "../../../hooks/useCart";
import { MdShoppingCart } from "react-icons/md";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
import { doLogout } from "../../../redux/actions/authActions";

const Header = () => {
  const { cartCounter } = useCart();
  const { menus } = useSelector((state) => state?.home);

  const { isLoggedIn, user } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();

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
            <div className="header-links">
              {isLoggedIn && user.role === "user" ? (
                <Link
                  to="/profile"
                  className="relative [&>div]:hidden [&:hover>div]:block"
                >
                  <BiUser size={20} /> Your Account <FaAngleDown />
                  <div className="absolute top-full right-0 z-[9999]">
                    <div className="border bg-white p-3 rounded shadow-sm mt-2 text-start">
                      <ul>
                        <li>
                          <Link>My Account</Link>
                        </li>
                        <li>
                          <Link>Change Password</Link>
                        </li>
                        <li>
                          <Link
                            as={"button"}
                            onClick={() => dispatch(doLogout())}
                          >
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <BiUserCircle size={20} /> Sign In
                  </Link>
                  <Link to="/signup">Sign Up</Link>
                </>
              )}
              <Link to="/cart">
                <MdShoppingCart size={20} /> Cart
                {cartCounter > 0 && (
                  <span className="ms-1">({cartCounter})</span>
                )}
              </Link>
              <Link to="/">
                Search Products
                <BiSearch size={20} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-primary-300 text-white sticky top-0 z-50">
        <div className="container mx-auto">
          <ul className="main-navbar">
            {menus?.map((link, index) => (
              <li key={index} className={link.slug}>
                <Link to={link.slug}>
                  {link.name} <FaAngleDown />
                </Link>

                {link?.data?.length ? (
                  <ul className="min-w-[150px] top-full start-0 w-max">
                    {link?.data.map((category) => (
                      <li key={category.id}>
                        <Link
                          to={`/category/${category.id}`}
                          className="flex items-center"
                        >
                          {category.image && (
                            <img
                              src={category.image}
                              alt=""
                              className="size-8 inline-block rounded-full"
                            />
                          )}
                          <div className="ml-2 flex-grow">{category.name}</div>
                          {category?.children?.length > 0 && <FaAngleRight />}
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
