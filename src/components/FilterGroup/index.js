import './index.css'
import {BsSearch} from 'react-icons/bs'
import JobProfile from '../JobProfile'

const FilterGroup = props => {
  const {
    changeSearchInput,
    getJobItemsData,
    changeEmploymentItem,
    changeSalaryRange,
    activeSalaryRangeId,
    activeEmployementTypeId,
    searchInput,
  } = props

  const onChangeSearchInput = event => {
    changeSearchInput(event)
  }
  const onEnterSearchInput = event => {
    if (event.key === 'ENTER') {
      getJobItemsData()
    }
  }

  const renderSalaryRangesList = () => {
    const {salaryRangesList} = props

    return (
      <ul className="ul-list">
        {salaryRangesList.map(salaryRange => {
          const onChangeSalaryRange = () =>
            changeSalaryRange(salaryRange.salaryRangeId)

          return (
            <li
              className="list-item"
              key={salaryRange.salaryRangeId}
              onChange={onChangeSalaryRange}
            >
              <input
                type="radio"
                className="employement-type-input"
                id={salaryRange.salaryRangeId}
                value={salaryRange.salaryRangeId}
              />
              <label
                className="employementType-label"
                htmlFor={salaryRange.salaryRangeId}
              >
                {salaryRange.label}
              </label>
            </li>
          )
        })}
      </ul>
    )
  }

  const renderEmployementTypesList = () => {
    const {employmentTypesList} = props

    return (
      <ul className="ul-list">
        {employmentTypesList.map(employmentType => {
          const onChangeEmploymentType = () =>
            changeEmploymentItem(employmentType.employmentTypeId)

          return (
            <li
              className="list-item"
              key={employmentType.employmentTypeId}
              onChange={onChangeEmploymentType}
            >
              <input
                type="checkbox"
                className={activeEmployementTypeId}
                id={employmentType.employmentTypeId}
                value={employmentType.employmentTypeId}
              />
              <label
                className="employementType-label"
                htmlFor={employmentType.employmentTypeId}
              >
                {employmentType.label}
              </label>
            </li>
          )
        })}
      </ul>
    )
  }

  const renderSearchInputForMobile = () => (
    <div className="searchInput-container-mobile">
      <input
        placeholder="Search"
        type="search"
        className="input"
        onChange={onChangeSearchInput}
        onKeyDown={onEnterSearchInput}
      />
      <button
        type="button"
        onClick={getJobItemsData}
        className="search-button-container-mobile"
      >
        <BsSearch size="20" className="react-icon" />
      </button>
    </div>
  )

  return (
    <div className="filter-group-container">
      {renderSearchInputForMobile()}

      <div className="jobprofile-container">
        <JobProfile />
      </div>

      <div className="filters-container">
        <hr className="line" />
        <h1 className="employementType-list-heading">Type of Employment</h1>
        {renderEmployementTypesList()}
        <hr className="line" />

        <h1 className="employementType-list-heading">Salary Range</h1>
        {renderSalaryRangesList()}
      </div>
    </div>
  )
}

export default FilterGroup
