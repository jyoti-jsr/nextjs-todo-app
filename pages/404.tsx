import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
const Custom404 = () => {
  return (
    <div className={`${styles.main} ${inter.className}`}>
      <h1>Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link href="/">Go back to Login Page</Link>
    </div>
  );
};

export default Custom404;
