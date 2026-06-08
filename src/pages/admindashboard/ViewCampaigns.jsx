import React from 'react'
import CampaignOverview from '../../components/admindashboard/marketing/ViewCampaign'
import ViewTable from '../../components/admindashboard/marketing/ViewTable'

const ViewCampaigns = () => {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-7 px-4 py-5 text-white sm:px-6 lg:px-8">
      <CampaignOverview />
      <ViewTable />
    </main>
  )
}

export default ViewCampaigns
