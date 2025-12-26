import {
  Navbar,
  Hero,
  Features,
  Examples,
  Comparison,
  CTA,
  Footer,
} from "@/components";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Examples />
        <Comparison />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
