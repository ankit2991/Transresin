import { BiGrid, BiGridAlt, BiSolidDashboard } from "react-icons/bi";
import { BsApp } from "react-icons/bs";
import {
  FaClipboardList,
  FaComment,
  FaFile,
  FaFileAlt,
  FaHeart,
  FaUsers,
  FaVideo,
} from "react-icons/fa";

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
    target: "order",
    icon: <FaClipboardList />,
  },
  {
    label: "Users",
    target: "user",
    icon: <FaUsers />,
  },
  {
    label: "Pages",
    target: "page",
    icon: <FaFileAlt />,
  },
  {
    label: "Videos",
    target: "video",
    icon: <FaVideo />,
  },
  {
    label: "Testimonial",
    target: "testimonial",
    icon: <FaComment />,
  },
];
