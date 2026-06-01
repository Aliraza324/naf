import React from 'react'
import DealerCard from '../../components/admindashboard/DealerCard'
import DealerTable from '../../components/admindashboard/DealerTable'

const Dealers = () => {
  return (
    <div className="p-4 max-w-7xl w-full mx-auto">
        <DealerCard/>
        <DealerTable/>
    </div>
  )
}

export default Dealers