"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { useGetSingleshopQuery } from "@/src/redux/features/shop/shopApi";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { logout, selectCurrentUser } from "@/src/redux/features/auth/authSlice";

const NavberDropdown = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectCurrentUser);
  const userId = (user as any)?.id;
  const userRole = (user as any)?.role;
  const { data: shopData } = useGetSingleshopQuery(userId);
  const shopId = shopData?.data?.id;

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  const handleLogOut = () => {
    dispatch(logout());
  };

  // for hydration error handling
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar className="cursor-pointer" name="User" />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        {userRole === "vendor" && shopData ? (
          <>
            <DropdownItem key={`profile-${shopId}`} onClick={() => handleNavigation(`/shop/${shopId}`)}>
              Profile
            </DropdownItem>
            <DropdownItem key={`dashboard-${shopId}`} onClick={() => handleNavigation("/dashboard?key=dashboard")}>
              Dashboard
            </DropdownItem>
          </>
        ) : null}

        {userRole === "vendor" && !shopData ? (
          <DropdownItem key="create-shop" onClick={() => handleNavigation("/create-shop")}>
            Create shop
          </DropdownItem>
        ) : null}

        {userRole !== "vendor" ? (
          <DropdownItem key="dashboard" onClick={() => handleNavigation("/dashboard?key=dashboard")}>
            Dashboard
          </DropdownItem>
        ) : null}

        <DropdownItem key="logout" onClick={handleLogOut} className="text-danger" color="danger">
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavberDropdown;
