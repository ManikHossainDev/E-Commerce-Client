/* eslint-disable padding-line-between-statements */
/* eslint-disable import/order */
/* eslint-disable react/jsx-sort-props */
"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { GiShoppingCart } from "react-icons/gi";
import { Link } from "@nextui-org/link";
import { divider, link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import { Logo } from "../icons";
import { siteConfig } from "../../config/site";
import { ThemeSwitch } from "../theme-switch";
import NavberDropdown from "./dashboard/navberDropdown";
import { HiMiniShoppingCart } from "react-icons/hi2";
import clsx from "clsx";
import { useAppSelector } from "@/src/redux/hooks";
import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";
import { useEffect, useState } from "react";
import Image from "next/image";

export const Navbar = () => {
  
  const [isMounted, setIsMounted] = useState(false);
  const { user } = useAppSelector(selectCurrentUser);
    // For hydration error handle
    useEffect(() => {
      setIsMounted(true);
    }, []);
  
    if (!isMounted) {
      return null;
    }
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
          <GiShoppingCart size={30} />
            <p className="font-bold text-inherit ">ECommerce</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden md:inline-block gap-4 justify-start ml-2">
          <div className="flex gap-4">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium"
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
          </div>
        </ul>
      </NavbarContent>

      <NavbarContent className=" basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="flex justify-center items-center gap-3">
          <a href="/cart" className="rounded-full p-1">
            <HiMiniShoppingCart className="text-xl text-gray-400" />
          </a>
          <ThemeSwitch />
          <div>{user ? <NavberDropdown /> : 
          <a href="/login">
            Login</a>}</div>
        </NavbarItem>
        <div className="md:hidden w-[30px] h-[30px]">
          <NavbarMenuToggle className="w-full h-full" />
        </div>
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
