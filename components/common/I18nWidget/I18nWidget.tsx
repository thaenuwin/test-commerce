import cn from 'classnames';
import Link from 'next/link';
import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import s from './I18nWidget.module.css';
import ClickOutside from '@lib/click-outside';
interface LOCALE_DATA {
  name: string;
  img: {
    filename: string;
    alt: string;
  };
}

const LOCALES_MAP: Record<string, LOCALE_DATA> = {
  'zh-CN': {
    name: 'Chinese',
    img: {
      filename: 'flag-zh-cn.png',
      alt: 'Chinese Flag',
    },
  },
  'en-US': {
    name: 'English',
    img: {
      filename: 'flag-en-us.svg',
      alt: 'US Flag',
    },
  },
  'my': {
    name: 'Myanmar',
    img: {
      filename: 'flag-my.svg',
      alt: 'Myanmar Flag',
    },
  },
  'es': {
    name: 'Spainish',
    img: {
      filename: 'flag-es.svg',
      alt: 'Spain Flag',
    },
  },
};

const I18nWidget: FC = () => {
  const [display, setDisplay] = useState(false);
  const { locale, locales, defaultLocale = 'en-US', asPath: currentPath } = useRouter();

  const options = locales?.filter((val) => val !== locale);
  const currentLocale = locale || defaultLocale;

  return (
    <ClickOutside active={display} onClick={() => setDisplay(false)}>
      <nav className={s.root}>
        <div className="flex items-center relative" onClick={() => setDisplay(!display)}>
          <button className={s.button} aria-label="Language selector">
            <img
              width="20"
              height="20"
              className="block mr-2 w-5"
              src={`/${LOCALES_MAP[currentLocale].img.filename}`}
              alt={LOCALES_MAP[currentLocale].img.alt}
            />
            {options && <span className="cursor-pointer">&#9650;</span>}
          </button>
        </div>
        <div className="absolute top-0 right-0">
          {options?.length && display ? (
            <div className={s.dropdownMenu}>
              <div className="flex flex-row justify-end px-6">
                <button onClick={() => setDisplay(false)} aria-label="Close panel" className={s.closeButton}>
                  &0134;
                </button>
              </div>
              <ul>
                {options.map((locale) => (
                  <li key={locale}>
                    <Link href={currentPath} locale={locale}>
                      <a className={cn(s.item)} onClick={() => setDisplay(false)}>
                        {LOCALES_MAP[locale].name}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </nav>
    </ClickOutside>
  );
};

export default I18nWidget;
