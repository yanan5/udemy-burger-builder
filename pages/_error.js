import Link from "next/link";
const errorPage = () => (
  <div>
    <h2>Oops, something went wrong</h2>
    <p>
      Try to{" "}
      <Link href="/">
        <a>Go Back</a>
      </Link>
    </p>
  </div>
);

export default errorPage;
