import { Link, Outlet, useAppData, useLocation } from 'umi';
import styles from './index.less';

export default function Layout() {
  const { routes } = useAppData();
  const { pathname } = useLocation();

  return (
      <div className={styles.navs}>
        <ul>
          {
            Object.values(routes)
              .filter(({ isLayout }: any) => !isLayout)
              .map(({ path }: any) => <li key={path} className={styles[`nav-li${pathname === path ? '--active' : ''}`]}>
                  <Link to={path}>{path.split('/')[1] || 'zustand'}</Link>
                </li>)
          }
        </ul>
        <Outlet />
      </div>
  );
}
