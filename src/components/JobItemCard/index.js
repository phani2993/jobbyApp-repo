import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

const JobItemCard = props => {
  const {jobItemDetails} = props

  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobItemDetails

  return (
    <div className="JobItem-container">
      <div className="logo-title-rating-container">
        <img src={companyLogoUrl} alt="jobs" className="card-logo" />
        <div className="title-rating-container">
          <h1 className="title">{title} </h1>
          <div className="star-rating-container">
            <AiFillStar size="23" className="star-icon" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <div className="loc-intern_package-container">
        <div className="loc-intern-container">
          <div className="location-container">
            <MdLocationOn className="react-icon" size="28" />
            <p className="icon-text">{location}</p>
          </div>
          <div className="intern-container">
            <BsBriefcaseFill className="react-icon" size="28" />
            <p className="icon-text">{employmentType}</p>
          </div>
        </div>
        <div className="package">
          <p className="icon-text">{packagePerAnnum}</p>
        </div>
      </div>
      <hr className="horizental-line" />
      <h1 className="description">Description</h1>
      <p className="description-text">{jobDescription}</p>
    </div>
  )
}
export default JobItemCard
