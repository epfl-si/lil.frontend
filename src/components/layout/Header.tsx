import { CircleUserRound, Menu, X } from "lucide-react";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import type {UserType} from "@/lib/types.tsx";
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  user: UserType | null | undefined;
  onLogin?: () => void;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogin, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const { t, i18n } = useTranslation();

  return (
    <div className="relative select-none border-b-2">
      <header className="text-primary-secondary py-2 px-2 sm:py-3 sm:px-6 flex items-center justify-between">

        {/* Logo & Titre */}
        <div className="flex items-center gap-2 sm:gap-4 p-1 sm:p-3">
          <img
            src="https://epfl-si.github.io/elements/svg/epfl-logo.svg"
            alt="EPFL"
            width={97}
            height={28}
            className="h-4 w-14 sm:w-22 sm:h-7"
          />
          <span className="border-l-2 border-solid sm:h-6 h-4 w-1 border-gray-300" />
          <a href="/" className="text-black hover:text-primary transition-colors" onClick={closeMobileMenu}>
            <h1 className="text-base sm:text-2xl font-bold -ml-1 sm:ml-0">LIL</h1>
          </a>
        </div>

        {/* Côté Droit (Desktop & Mobile Burger) */}
        <div className="flex items-center">

          {/* Desktop: User dropdown */}
          <div className="hidden md:flex items-center gap-3">
            {user?.username ? (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger className="outline-none">
                  <div className="flex items-center gap-1.5 hover:opacity-80 transition-opacity cursor-pointer">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.username || "Avatar"}
                        className="inline-block w-8 h-8 rounded-full ml-2 object-cover"
                      />
                    ) : (
                      <CircleUserRound className="w-8 h-8 text-muted-foreground ml-2" strokeWidth={1} />
                    )}
                    <p className="text-sm font-medium">{user.username}</p>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onSelect={onLogout} className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
                    {t('header.signOut')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button
                type="button"
                onClick={onLogin}
                className="text-muted-foreground hover:text-foreground hover:cursor-pointer font-medium px-4 py-2"
              >
                {t('header.signIn')}
              </button>
            )}
          </div>

          {/* Mobile burger button */}
          <button
            type="button"
            className="md:hidden p-2 text-muted-foreground"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile menu (Déroulant) */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute inset-x-0 top-full z-50 bg-white border-b shadow-lg">
          <nav className="p-4 space-y-1">
            {user?.username ? (
              <>
                <div className="flex items-center gap-3 px-3 py-2">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.username || "Avatar"}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <CircleUserRound className="w-8 h-8 text-muted-foreground" strokeWidth={1} />
                  )}
                  <span className="text-sm font-medium truncate">{user.username}</span>
                </div>
                <div className="border-t my-2" />
                <button
                  type="button"
                  onClick={() => {
                    if (onLogout) onLogout();
                    closeMobileMenu();
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  {t('header.signOut')}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  if (onLogin) onLogin();
                  closeMobileMenu();
                }}
                className="w-full text-left px-3 py-2 text-sm font-medium hover:bg-slate-100 rounded-md transition-colors"
              >
                 {t('header.signIn')}
              </button>
            )}
          </nav>
        </div>
      )}
    </div>
  );
};
