const Layout = ({ childen }: { childen: React.ReactNode }) => {
  return (
    <div>
      <aside className="nav nav-left">Sidebav</aside>
      <main>
        <h1>Main</h1>
        {childen}
      </main>
    </div>
  );
};

export default Layout;
