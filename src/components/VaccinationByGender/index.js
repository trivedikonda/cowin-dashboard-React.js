// Write your code here
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

import './index.css'

const VaccinationByGender = props => {
  const {genderDetails} = props

  return (
    <div className="vaccination-gender-container">
      <h1 className="heading">Vaccination by gender</h1>
      <ResponsiveContainer width={1000} height={300}>
        <PieChart align="center">
          <Pie
            cx="50%"
            cy="50%"
            data={genderDetails}
            startAngle={180}
            endAngle={0}
            innerRadius="30%"
            outerRadius="70%"
            dataKey="count"
          >
            <Cell name="Male" fill="#f54394" />
            <Cell name="Female" fill="#5a8dee" />
            <Cell name="Others" fill=" #2cc6c6" />
          </Pie>
          <Legend iconType="circle" layout="horizontal" align="center" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationByGender
