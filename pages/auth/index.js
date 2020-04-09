import Link from "next/link";
import User from "../../components/User";
const Auth = () => (
  <div>
    <h2>Auth Page</h2>
    <User name="Shobana" age="32" />
    <Link href="/">
      <a>Go Back</a>
    </Link>
  </div>
);

export default Auth;
