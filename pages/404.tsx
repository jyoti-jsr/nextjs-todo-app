import Link from "next/link";

const Custom404 = () => {
  return (
    <div>
      <h1>Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link href="/dashboard">Go back to dashboard</Link>
    </div>
  );
};

export default Custom404;
