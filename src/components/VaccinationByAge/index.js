// Write your code here
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

import './index.css'

const VaccinationByAge = props => {
  const {ageDetails} = props

  return (
    <div className="vaccination-age-container">
      <h1 className="heading">Vaccination by age</h1>
      <ResponsiveContainer width={1000} height={300}>
        <PieChart align="center">
          <Pie
            cx="50%"
            cy="50%"
            data={ageDetails}
            startAngle={0}
            endAngle={360}
            outerRadius="70%"
            dataKey="count"
          >
            <Cell name="18-44" fill="#2d87bb" />
            <Cell name="44-60" fill=" #a3df9f" />
            <Cell name="Above 60" fill="#64c2a6" />
          </Pie>
          <Legend iconType="circle" layout="horizontal" align="center" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationByAge
