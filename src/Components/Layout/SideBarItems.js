import React from "react";
import { FaMedal } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { MdOutlineReportGmailerrorred } from "react-icons/md";

import { IoRestaurant } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { MdPrivacyTip } from "react-icons/md";
import { MdOutlineNoteAlt } from "react-icons/md";
import { PiUsersThreeFill } from "react-icons/pi";
function SideBarItems({ isLarge }) {
  const loaction = useLocation();
  const sideItems = [
    {
      submenus: [
        { icon: <MdDashboard size={25} />, title: "Dashboard", url: "/admin" },
        {
          icon: <PiUsersThreeFill size={25} />,
          title: "Users",
          url: "/admin/users",
        },
      ],
    },

    {
      categories: "Restaurants",
      submenus: [
        {
          icon: <IoRestaurant size={25} />,
          title: "Restaurants",
          url: "/admin/restaurants/list",
        },
        {
          icon: <FaMedal size={25} />,
          title: "Butterbest",
          url: "/admin/restaurants/butterbest",
        },
      ],
    },
    {
      categories: "Posts",
      submenus: [
        {
          icon: <MdOutlineReportGmailerrorred size={25} />,
          title: "Reported Posts",
          url: "/admin/reported-posts",
        },
      ],
    },
    {
      categories: "Settings",
      submenus: [
        {
          icon: <IoMdSettings size={25} />,
          title: "Email Settings",
          url: "/admin/settings/emails",
        },
        {
          icon: <MdPrivacyTip size={25} />,
          title: "Privacy & Policy",
          url: "/admin/privacy&policy",
        },
        {
          icon: <MdOutlineNoteAlt size={25} />,
          title: "Terms & Condition",
          url: "/admin/terms&condition",
        },
      ],
    },

    // {
    //   categories: "Chats",
    //   submenus: [
    //     {
    //       icon: <IoMdChatbubbles size={25} />,
    //       title: "Text Chat",
    //       url: "/admin/chat/text",
    //     },
    //     {
    //       icon: <MdVideoChat size={25} />,
    //       title: "Video Chat",
    //       url: "/admin/chat/video",
    //     },
    //   ],
    // },
  ];

  return (
    <>
      <div className="sidebar-items">
        {sideItems?.map((elm, ind) => {
          return (
            <>
              <div className="sidebar-categories">{elm.categories}</div>
              {elm.submenus.map((item, i) => {
                return (
                  <>
                    <Link className="linknone" to={item.url}>
                      <div
                        className={`sidebar-submenus  ${
                          loaction.pathname == item.url &&
                          "sidebar-submenus-active"
                        }`}
                      >
                        {item.icon}{" "}
                        <span
                          className={`er ${!isLarge && "visibility-hidden"}`}
                        >
                          {item.title}
                        </span>
                      </div>
                    </Link>
                  </>
                );
              })}
            </>
          );
        })}
      </div>
    </>
  );
}

export default SideBarItems;
