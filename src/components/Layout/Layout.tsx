import { SwitchToggle } from '@/components/common/SwitchToggle/SwitchToggle';
import s from './Layout.module.scss';
import type { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
  isDark: boolean;
  onToggleTheme?: () => void;
};

export const Layout = ({
  children,
  isDark = false,
  onToggleTheme,
}: LayoutProps) => {
  return (
    <div className={s.layout} data-theme={isDark ? 'dark' : 'light'}>
      <header className={s.layout__header}>
        <div className={s.layout__headerContent}>
          <h1 className={s.layout__title}>TaskFlow</h1>
          {onToggleTheme && (
            <SwitchToggle
              onDarkHandler={onToggleTheme}
              aria-label="Toggle theme"
              size="medium"
              isDark={isDark}
            />
          )}
        </div>
      </header>

      <main className={s.layout__content}>
        <div className={s.layout__container}>{children}</div>
      </main>

      <footer className={s.layout__footer}>
        <div className={s.layout__footerContent}>
          <p>© 2025 TaskFlow</p>
        </div>
      </footer>
    </div>
  );
};
