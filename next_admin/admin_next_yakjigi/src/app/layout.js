import AdminHeader from './components/AdminHeader';
import AdminFooter from './components/AdminFooter';
import styles from '../app/globals.css'; // 글로벌 CSS 파일 import

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </head>
      <body>
        <AdminHeader />
        {children}
        <AdminFooter />
      </body>
    </html>
  );
}
