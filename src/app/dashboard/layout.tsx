import SidebarWithSuspense from "@/src/components/UI/dashboard/Sidebar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex mx-auto max-w-7xl w-full">
      <div className="md:w-[300px] w-[80px]">
        <SidebarWithSuspense />
      </div>
      <div className="flex justify-center md:pl-[100px]">{children}</div>
    </div>
  );
};

export default layout;
