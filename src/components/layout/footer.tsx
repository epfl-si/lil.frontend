import type React from "react";

export const Footer: React.FC = () => {
  const version = "1.0.0";

  return (
    <footer className="bg-muted">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center md:flex-row md:items-start md:justify-between gap-6">
          <a href="/" className="shrink-0">
            <img
              src="https://epfl-si.github.io/elements/svg/epfl-logo.svg"
              alt="Logo EPFL, École polytechnique fédérale de Lausanne"
              className="w-24 h-auto"
              width={97}
              height={28}
            />
          </a>
          <div className="flex flex-col items-center md:items-start gap-4 flex-1 md:ml-8">
            <ul className="flex flex-wrap justify-center md:justify-start items-center gap-x-4 gap-y-1 text-sm">
              <li>
                <a href="mailto:1234@epfl.ch" className="font-medium hover:underline">
                  Contact
                </a>
              </li>
              <li className="text-gray-500">EPFL CH-1015 Lausanne</li>
              <li className="text-gray-500">+41 21 693 11 11</li>
            </ul>
            <div className="w-full border-t pt-4 flex flex-col items-center md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1 text-sm">
                <a
                  href="https://www.epfl.ch/about/overview/fr/reglements-et-directives/mentions-legales/"
                  className="hover:underline"
                >
                  Accessibilité
                </a>
                <a
                  href="https://www.epfl.ch/about/overview/fr/reglements-et-directives/mentions-legales/"
                  className="hover:underline"
                >
                  Avertissement
                </a>
                <a
                  href="https://go.epfl.ch/protection-des-donnees/"
                  className="hover:underline"
                >
                  Protection des données
                </a>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1 text-xs text-gray-500">
                <p>LIL</p>
                <a
                  className="hover:underline"
                  href="https://github.com/epfl-si/barcode.dev"
                >
                  Code source
                </a>
                <a
                  className="hover:underline"
                  href={`https://github.com/epfl-si/barcode.dev/releases/tag/v${version}`}
                >
                  v{version}
                </a>
                <p>© 2026 EPFL – Tous droits réservés</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
