import SidebarMenu from "./SidebarMenu";

export default function Layout({ children }) {
  return (
    <div>
      {/* GLOBAL SIDEBAR */}
      <SidebarMenu />

      {/* PAGE CONTENT */}
      <div className="pt-16">
        {children}
      </div>
    </div>
  );
}