import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import cn from 'classnames';
import type { Page } from '@commerce/types/page';
import type { Category } from '@commerce/types/site';
import { CommerceProvider } from '@framework';
import { useAcceptCookies } from '@lib/hooks/useAcceptCookies';
import { useUI } from '@components/ui/context';
import { Navbar, Footer } from '@components/common';
import { Sidebar } from '@components/ui';
import CartSidebarView from '@components/cart/CartSidebarView';
import s from './Layout.module.css';
import { getThemeMenu } from '@global/theme';

const Loading = () => <div className="w-80 h-80 flex items-center text-center justify-center p-3">Loading...</div>;

const dynamicProps = {
  loading: () => <p>Loading...</p>,
};

const FeatureBar = dynamic(() => import('@components/common/FeatureBar'), dynamicProps);

interface Props {
  pageProps: {
    pages?: Page[];
    categories: Category[];
  };
}

const Layout: FC<Props> = ({ children, pageProps: { categories = [], ...pageProps } }) => {
  const { displaySidebar, displayModal, closeSidebar, closeModal, modalView } = useUI();
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies();
  const { locale = 'en-US' } = useRouter();
  const [links, setLinks] = useState([]);

  useEffect(() => {
    getThemeMenu('main-menu').then((res) => setLinks(res));
  }, []);

  return (
    <CommerceProvider locale={locale}>
      <div className={cn(s.root)}>
        <Navbar links={links} />
        <main className="fit">{children}</main>
        <Footer pages={pageProps.pages} />

        <Sidebar open={displaySidebar} onClose={closeSidebar}>
          <CartSidebarView />
        </Sidebar>

        <FeatureBar
          title="This site uses cookies to improve your experience. By clicking, you agree to our Privacy Policy."
          hide={acceptedCookies}
          action={
            <button className="mx-5" onClick={() => onAcceptCookies()}>
              Accept cookies
            </button>
          }
        />
      </div>
    </CommerceProvider>
  );
};

export default Layout;
