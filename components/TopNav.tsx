import {
  AppstoreOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const { Item } = Menu;

const TopNav = () => {
  const [currentLink, setCurrentLink] = useState("");

  //   set link to current location when refresh or location changes
  useEffect(() => {
    typeof window !== "undefined" && setCurrentLink(window.location.pathname);
  }, [typeof window !== "undefined" && window.location.pathname]);

  return (
    <Menu mode="horizontal" selectedKeys={[currentLink]}>
      <Item
        onClick={(e) => setCurrentLink(e.key)}
        key={"/"}
        icon={<AppstoreOutlined />}
      >
        <Link href={"/"}>
          <a>Home</a>
        </Link>
      </Item>
      <Item
        onClick={(e) => setCurrentLink(e.key)}
        key={"/login"}
        icon={<LoginOutlined />}
      >
        <Link href={"/login"}>
          <a>Login</a>
        </Link>
      </Item>
      <Item
        onClick={(e) => setCurrentLink(e.key)}
        key={"/register"}
        icon={<UserAddOutlined />}
      >
        <Link href={"/register"}>
          <a>Register</a>
        </Link>
      </Item>
    </Menu>
  );
};

export default TopNav;
