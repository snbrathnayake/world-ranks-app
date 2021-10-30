import Head from 'next/head';
import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import {Brightness6Rounded} from '@material-ui/icons';
import styles from './Layout.module.css';

const Layout = ({children, title = 'World Ranks '}) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    document.documentElement.setAttribute('data-theme', storedTheme);
    setTheme(storedTheme);
  }, []);

  const swtichTheme = () => {
    if (theme === 'light') {
      saveTheme('dark');
    } else {
      saveTheme('light');
      // setTheme('light');
      // localStorage.setItem('theme', 'light');
      // document.documentElement.setAttribute('data-theme', 'light');
    }
  };

  const saveTheme = (theme) => {
    setTheme(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header className={styles.header}>
        <Link href='/'>
          <img src={'https://corgipunk.com/wp-content/uploads/2018/01/esport-team-logo-6.png'} />
        </Link>
        {title}
        <button className={styles.themeSwitcher} onClick={swtichTheme}>
          <Brightness6Rounded />
        </button>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>Our Awesome Support Team.</footer>
    </div>
  );
};

export default Layout;
