import Link from "next/link";
import User from "../../components/User";
const Auth = (props) => (
  <div>
    <h2>Auth Page {props.authProp}</h2>
    <User name="Shobana" age="32" />
    <Link href="/">
      <a>Go Back</a>
    </Link>
  </div>
);

Auth.getInitialProps = (context) => {
  const promise = new Promise((resolve, reject) =>
    setTimeout(() => resolve({ authProp: "getInitialProps from Auth" }), 5000)
  );
  return promise;
}
export default Auth;
