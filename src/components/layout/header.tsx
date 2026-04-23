export const Header = ({

                       }) => {

  return (
    <header role="banner" className="header header-light">
      <div className="header-light-content">
        <a className="logo" href="https://www.epfl.ch">
          <img src="https://web2018.epfl.ch/8.5.0/icons/epfl-logo.svg"
            alt="Logo EPFL, École polytechnique fédérale de Lausanne" className="img-fluid"/>
        </a>
        <p className="site-title"><a href="/">LIL</a></p>
        <div className="nav-user dropdown user-dropdown mr-lg-2">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px"
              viewBox="0 0 30 29" version="1.1">
              <g>
                <path d="M 8.894531 14.15625 C 8.894531 14.15625 9.625 20.582031 14.984375 20.582031 C 20.339844 20.582031 21.070312 14.160156 21.070312 14.160156 C 21.070312 14.160156 22.226562 14.390625 22.785156 11.988281 C 23.140625 10.421875 22.664062 10.003906 22.363281 10.003906 L 22.078125 10.003906 C 23.480469 2.402344 17.839844 0 14.984375 0 C 12.125 0 6.488281 2.402344 7.886719 10 L 7.601562 10 C 7.300781 10 6.828125 10.417969 7.183594 11.984375 C 7.742188 14.402344 8.894531 14.15625 8.894531 14.15625 Z M 25.070312 23.386719 C 20.246094 22.476562 19.273438 21.515625 19.09375 20.664062 C 16.648438 22.429688 13.320312 22.429688 10.875 20.664062 C 10.699219 21.515625 9.722656 22.46875 4.898438 23.386719 C -0.0664062 24.324219 0 28.339844 0 29 L 29.964844 29 C 29.964844 28.332031 30.035156 24.324219 25.070312 23.386719 Z M 25.070312 23.386719 "/>
              </g>
            </svg>
            <p className="user-name ml-2 text-sm text-left">
              Enrico<br />
              <span className="text-xs">
                123456
              </span>
            </p>
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href="#">
              <svg className="icon feather" aria-hidden="true">
                <use xlink:href="#log-out"></use>
              </svg>Logout</a>
          </div>
        </div>
      </div>
    </header>
  );
}
