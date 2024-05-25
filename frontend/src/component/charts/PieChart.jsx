import React from 'react'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({activeData , disposeData , defectiveData , donateData}) {


    const data = {
        labels: [
          'active',
          'defective',
          'dispose',
          'donate'
        ],
        datasets: [{
          label: 'ITEM',
          data: [activeData.count ,defectiveData.count ,disposeData.count  , donateData.count],
          backgroundColor: [
            'rgba(117, 244, 97, 1)',
            'rgba(245, 112, 112, 1)',
            'rgba(198, 196, 196, 1)',
            'rgba(240, 245, 94, 1)'
          ],
          hoverOffset: 5
        }]
      };


  return (
    <div><Pie data={data}>
        </Pie></div>
  )
}

export default PieChart