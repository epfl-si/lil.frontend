export const Header = ({

                       }) => {

  return (
    <header role="banner" className="header header-light">
      <div className="header-light-content">
        <a className="logo" href="https://www.epfl.ch">
          <img src="svg/epfl-logo.svg" alt="Logo EPFL, École polytechnique fédérale de Lausanne" className="img-fluid"/>
        </a>
        <p className="site-title">
          <a href="#">sub site name</a>
        </p>
        <ul className="nav-header d-none d-xl-flex">
          <li id="menu-item-1">
            <a className="nav-item" href="#">Page 1</a>
          </li>
        </ul>

        <div className="dropdown dropright search d-none d-xl-block">
        </div>

        <div className="nav-lang nav-lang-short ml-auto">
        </div>
      </div>
    </header>
  );
}
