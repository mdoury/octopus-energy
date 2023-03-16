import Link from "next/link";

export default function Home() {
  return (
    <section className="page-section">
      <img
        className="image"
        src="https://static.octopuscdn.com/logos/logo.svg"
        alt="Octopus Energy Logo"
      />
      <h1>Welcome to the Octopus Energy Frontend code test!</h1>
      <p className="section-content">
        Get started by visiting the{" "}
        <Link href="/products">
          <code>/products</code>
        </Link>{" "}
        URL and give a look at <code>client/pages/products/index.ts</code> and{" "}
        <code>client/pages/products/[id].ts</code>
      </p>
    </section>
  );
}
