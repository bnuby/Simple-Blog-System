import Head from "next/head";
import styles from "./layout.module.scss";
import { FunctionComponent } from "react";
import { title, keywords, description } from "~src/config.json";
import { getToken, getLocalUser } from "~lib/auth";
import NavBar from "~components/nav-bar";
import { isBrowser } from "~lib/is-browser";
import Divider from "~components/divider";

interface LayoutProp {
  titleName?: string | null;
  pageName?: string;
  children: any;
}

const Layout: FunctionComponent<LayoutProp> = ({
  titleName,
  pageName,
  children,
}: LayoutProp) => {
  let login = false,
    user = null;

  if (isBrowser) {
    // Check Login
    login = getToken() != null;
    user = getLocalUser();
  }

  return (
    <div>
      <Head>
        <title>{titleName ? titleName : title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={description} />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            title
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={title} />
        <meta name="keywords" content={keywords} />
      </Head>
      <NavBar login={login} user={user} />
      <div className={styles.container}>
        <main className={styles.main}>
          {pageName ? <h3>{pageName}</h3> : null}
          {children}
          <Divider height={20} />
        </main>
      </div>
    </div>
  );
};

Layout.defaultProps = {
  titleName: null,
  pageName: "",
};

export default Layout;
