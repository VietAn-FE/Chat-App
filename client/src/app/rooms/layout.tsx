import InfoUser from "./components/InfoUser/InfoUser";
import ListRoom from "./components/ListRoom/ListRoom";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-[20px] p-[20px] bg-[#1A1A1A] h-full">
      <aside className="nav nav-left w-[300px] h-full bg-[#3E4042] rounded-[15px]">
        <InfoUser />
        <ListRoom />
      </aside>
      <main className="grow bg-[#3E4042] rounded-[15px] h-full">
        {children}
      </main>
    </div>
  );
};

export default Layout;
