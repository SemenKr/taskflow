import s from './Layout.module.scss';
import type { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={s.layout}>
      <header className={s.layout__header}>
        <h1>TaskFlow</h1>
      </header>

      <main className={s.layout__content}>{children}</main>

      <footer className={s.layout__footer}>
        <p>© 2025 TaskFlow</p>
      </footer>
    </div>
  );
};
