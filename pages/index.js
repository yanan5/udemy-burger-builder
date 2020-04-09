import Link from 'next/link';
import Router from 'next/router';

const Index = () => (
  <div>
    <h1>Hello Next.js</h1>
    <Link href="/auth">
      <a>Auth</a>
    </Link>
    <button onClick={() => Router.push("/auth")}>Click to got to Auth</button>
  </div>
);

export default Index;
