import React from "react";
import CareersHero from "@/components/sections/careers/CareersHero";
import CareersStats from "@/components/sections/careers/CareersStats";
import CareersWhyJoinUs from "@/components/sections/careers/CareersWhyJoinUs";
import CareersBenefits from "@/components/sections/careers/CareersBenefits";
import CareersTimeline from "@/components/sections/careers/CareersTimeline";
import CareersJobListings from "@/components/sections/careers/CareersJobListings";
import CareersFAQ from "@/components/sections/careers/CareersFAQ";
import CareersCTA from "@/components/sections/careers/CareersCTA";
import FloatingApplyButton from "@/components/sections/careers/FloatingApplyButton";

export const metadata = {
  title: "Careers | Excel Ardor",
  description: "Build Your Career at Excel Ardor. View our open engineering and manufacturing positions.",
};

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-white pt-[115px]">
      <CareersHero />
      <CareersStats />
      <CareersWhyJoinUs />
      <CareersBenefits />
      <CareersTimeline />
      <CareersJobListings />
      <CareersFAQ />
      <CareersCTA />
      <FloatingApplyButton />
    </main>
  );
}
