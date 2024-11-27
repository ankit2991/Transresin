import { BiGrid, BiGridAlt, BiSolidDashboard } from "react-icons/bi";
import { BsApp } from "react-icons/bs";
import { FaClipboardList, FaHeart } from "react-icons/fa";

export const ADMIN_URL = "/transresin-panel/";

export const links = [
  {
    label: "Dashboard",
    target: "",
    icon: <BiSolidDashboard />,
  },
  {
    label: "Master",
    target: null,
    icon: <BiGridAlt />,
    children: [
      {
        label: "Product Application",
        target: "product-application",
      },
      {
        label: "Product Category",
        target: "product-category",
      },
      {
        label: "Industry Category",
        target: "industry-category",
      },
      {
        label: "Brands",
        target: "brands",
      },
      {
        label: "Material",
        target: "material",
      },
      {
        label: "Features",
        target: "feature",
      },
      {
        label: "HSN / SAC",
        target: "hsn-code",
      },
    ],
  },
  {
    label: "Products",
    target: "products",
    icon: <FaHeart />,
  },
  {
    label: "Order Lists",
    target: "",
    icon: <FaClipboardList />,
  },
];
