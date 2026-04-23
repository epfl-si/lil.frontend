export const Footer = ({

                       }) => {

  return (
    <div class="bg-gray-100 pt-5 mt-auto">
      <div class="container">
        <footer className="footer-light">
          <div className="row">
            <div className="col-6 mx-auto mx-md-0 mb-4 col-md-3 col-lg-2">
              <a href="//www.epfl.ch">
                <img src="//web2018.epfl.ch/8.5.0/icons/epfl-logo.svg" alt="Logo EPFL, Ecole polytechnique fédérale de Lausanne" className="img-fluid" />
              </a>
            </div>
            <div className="col-md-9 col-lg-10 mb-4">
              <div className="ml-md-2 ml-lg-5">
                <ul className="list-inline list-unstyled">
                  <li className="list-inline-item">Contact</li>
                  <li className="list-inline-item text-muted pl-3"><small>EPFL  CH-1015 Lausanne</small></li>
                  <li className="list-inline-item text-muted pl-3"><small>+41 21 693 11 11</small></li>
                </ul>
                <div className="footer-light-socials">
                  <p className="footer-title footer-title-no-underline">Follow the pulses of EPFL on social networks</p>
                  <ul className="social-icon-list list-inline">
                    <li>
                      <a href="https://www.facebook.com/epflcampus" className="social-icon social-icon-facebook social-icon-negative" rel="noopener" target="_blank">
                        <svg className="icon" aria-hidden="true"><use xlink:href="#icon-facebook"></use></svg>
                        <span className="sr-only">Follow us on Facebook.</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://instagram.com/epflcampus" className="social-icon social-icon-instagram social-icon-negative" rel="noopener" target="_blank">
                        <svg className="icon" aria-hidden="true"><use xlink:href="#icon-instagram"></use></svg>
                        <span className="sr-only">Follow us on Instagram.</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.linkedin.com/school/epfl/" className="social-icon social-icon-linkedin social-icon-negative" rel="noopener" target="_blank">
                        <svg className="icon" aria-hidden="true"><use xlink:href="#icon-linkedin"></use></svg>
                        <span className="sr-only">Follow us on LinkedIn.</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://social.epfl.ch/@epfl/" className="social-icon social-icon-mastodon social-icon-negative" rel="noopener" target="_blank">
                        <svg className="icon" aria-hidden="true"><use xlink:href="#icon-mastodon"></use></svg>
                        <span className="sr-only">Follow us on Mastodon.</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://x.com/epfl_en" className="social-icon social-icon-x social-icon-negative" rel="noopener" target="_blank">
                        <svg className="icon" aria-hidden="true"><use xlink:href="#icon-x"></use></svg>
                        <span className="sr-only">Follow us on X.</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.youtube.com/user/epflnews" className="social-icon social-icon-youtube social-icon-negative" rel="noopener" target="_blank">
                        <svg className="icon" aria-hidden="true"><use xlink:href="#icon-youtube"></use></svg>
                        <span className="sr-only">Follow us on Youtube.</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="footer-legal">
                  <div className="footer-legal-links">
                    <a href="//www.epfl.ch/about/overview/regulations-and-guidelines/disclaimer/">Accessibility</a>
                    <a href="//www.epfl.ch/about/overview/regulations-and-guidelines/disclaimer/">Legal notice</a>
                    <a href="//go.epfl.ch/privacy-policy/">Privacy Policy</a>
                  </div>
                  <div>
                    <p>&copy; 2026 EPFL, all rights reserved</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
        <button id="back-to-top" className="btn btn-primary btn-back-to-top">
          <span className="sr-only">Back to top</span>
          <svg className="icon" aria-hidden="true">
            <use xlink:href="#icon-chevron-top"></use>
          </svg>
        </button>
      </div>
    </div>
  );
}
