import CTA from "@/components/landing/cta";
import FAQ from "@/components/landing/faq";
import Features from "@/components/landing/features";
import Footer from "@/components/landing/footer";
import Hero from "@/components/landing/hero";
import Navbar from "@/components/landing/page";
import { redirect } from "next/navigation";

export default function Page() {
 return(
  <>
    <Navbar/>
    <Hero/>
    <Features/>
    <FAQ/>
    <CTA/>
    <Footer/>
  </>
 ) 
}
