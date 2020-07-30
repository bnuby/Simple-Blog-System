/* eslint-disable react-hooks/rules-of-hooks */
import styles from "~components/nav-bar.module.scss";
import UserModel from "~src/model/user.model";
import { FunctionComponent, useState, createRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { logout } from "~lib/auth";
import { useRouter } from "next/dist/client/router";

interface NavBarProps {
  login: boolean;
  user: UserModel | null;
}

interface RouterType {
  title: string;
  path: string;
  auth?: boolean;
}

const routers: RouterType[] = [
  {
    title: "Home",
    path: "/posts",
  },
  {
    title: "My Posts",
    path: "/posts/me",
    auth: true,
  },
  {
    title: "Create New Post",
    path: "/posts/create",
    auth: true,
  },
];

const navbar: FunctionComponent<NavBarProps> = ({
  login,
  user,
}: NavBarProps) => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const navBarRef = createRef<HTMLDivElement>();
  const navBG = createRef<HTMLDivElement>();

  const showMenuHandler = () => {
    if (!showMenu) {
      if (navBarRef.current)
        navBarRef.current.style.height = `${window.innerHeight - 60}px`;
      if (navBG.current) navBG.current.style.overflow = "visible";
    } else {
      if (navBarRef.current) navBarRef.current.style.height = "";
      if (navBG.current) navBG.current.style.overflow = "hidden";
    }
    setShowMenu(!showMenu);
  };

  return (
    <div ref={navBG} className={styles.navBG}>
      <div className={styles.buttonBlk}>
        <button
          type="button"
          className={styles.navButton}
          onClick={showMenuHandler}
        >
          <i className="fa fa-bars" />
        </button>
      </div>
      <nav ref={navBarRef} className={styles.nav}>
        <div className={styles.navBar}>
          <ul className={styles.navList}>
            {routers.map((route, idx) => {
              const key = `route-list-${idx}`;
              const routeTemplate = (r: RouterType, k: string) => (
                <Link href={r.path} key={k}>
                  <li
                    className={`${styles.navItem} ${
                      // eslint-disable-next-line no-restricted-globals
                      location.pathname === r.path ? styles.active : ""
                    }`}
                  >
                    <a>{r.title}</a>
                  </li>
                </Link>
              );

              if (route.auth == null || route.auth === login) {
                return routeTemplate(route, key);
              }

              return null;
            })}
          </ul>
        </div>

        <div className={styles.authPanel}>
          {!login ? (
            <Link href="/login">
              <div className={styles.loginBlk}>Login</div>
            </Link>
          ) : (
            <div className={styles.authBlock}>
              <Link href="/user/me">
                <div className={styles.userBlk}>
                  Hi, {user?.first_name || ""}
                </div>
              </Link>
              <button
                className={`button danger ${styles.logoutBtn}`}
                onClick={() => {
                  logout();
                  router.push("/login");
                }}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

const NavBar = dynamic(() => Promise.resolve(navbar), {
  ssr: false,
});

export default NavBar;
