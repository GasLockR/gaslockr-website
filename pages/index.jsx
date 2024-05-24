import Head from "next/head"
import Features from "@/components/features/Features"
import Teams from "@/components/teams/Teams"
import TimeLine from "@/components/timeline/Timeline"
import PrimaryFeatures from "@/components/primaryFeatures/PrimaryFeatures"
import PartnerLogos from "@/components/partnerLogos/PartnerLogos"

const Home = () => {
  return (
    <div>
      <Head>
        <title>GasLockR - The First Trustless GasFi Protocol </title>
        <meta content="GasLockR" name="The First Trustless GasFi Protocol" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <Features />
      <PrimaryFeatures />
      {/* <PartnerLogos /> */}
      {/* <Teams /> */}
      {/* <TimeLine /> */}
    </div>
  )
}

export default Home
