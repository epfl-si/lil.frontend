import type React from "react";
import {config, version} from '../../../package.json';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();
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
          <div className="w-full border-t pt-4 flex flex-col items-center md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1 text-sm">
                <ul className="flex flex-wrap justify-center md:justify-start items-center gap-x-4 gap-y-1 text-sm">
                  <li>
                    <a href="mailto:1234@epfl.ch" className="font-medium hover:underline">
                       {t('footer.contact')}
                    </a>
                  </li>
                  <li className="text-gray-500">{config.address}</li>
                  <li className="text-gray-500">{config.telephone}</li>
                </ul>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1 text-xs text-gray-500">
                <p>{config.appName}</p>
                <a
                  className="hover:underline"
                  href={config.githubUrl}
                >
                  {t('footer.sourceCode')}
                </a>
                v{version}
                <p>© 2026 EPFL – {t('footer.rights')}</p>
              </div>
            </div>
        </div>
      </div>
    </footer>
  );
};
