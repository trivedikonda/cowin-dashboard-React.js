// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {apiStatus: apiStatusConstants.initial, fetchedData: {}}

  componentDidMount() {
    this.getVaccinationDetails()
  }

  getVaccinationDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const covidVaccinationDataApiUrl =
      'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(covidVaccinationDataApiUrl)
    console.log(response)

    if (response.ok === true) {
      const data = await response.json()
      console.log(data)

      const updatedData = {
        last7DaysVaccination: data.last_7_days_vaccination.map(each => ({
          vaccineDate: each.vaccine_date,
          dose1: each.dose_1,
          dose2: each.dose_2,
        })),
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      }

      console.log(updatedData)

      this.setState({
        apiStatus: apiStatusConstants.success,
        fetchedData: updatedData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderCharts = () => {
    const {fetchedData} = this.state
    const {
      last7DaysVaccination,
      vaccinationByAge,
      vaccinationByGender,
    } = fetchedData
    return (
      <div className="bar-and-pie-charts">
        <VaccinationCoverage coverageDetails={last7DaysVaccination} />
        <VaccinationByGender genderDetails={vaccinationByGender} />
        <VaccinationByAge ageDetails={vaccinationByAge} />
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        height={300}
        width={400}
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
        alt="failure view"
      />
      <h1 className="failure-msg">Something went wrong</h1>
    </div>
  )

  renderContent = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCharts()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="cowin-dashboard-container">
        <div className="logo-and-heading">
          <div className="logo">
            <img
              className="image-logo-plus"
              height={30}
              width={30}
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png "
              alt="website logo"
            />
            <p className="cowin-logo-name">Co-WIN</p>
          </div>
          <h1 className="main-heading">CoWIN Vaccination in India</h1>
        </div>
        <div className="rendered-container">{this.renderContent()}</div>
      </div>
    )
  }
}

export default CowinDashboard
