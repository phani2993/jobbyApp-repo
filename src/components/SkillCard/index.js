import './index.css'

const SkillCard = props => {
  const {skillDetails} = props
  const {name, imageUrl} = skillDetails

  return (
    <li className="li-item">
      <img src={imageUrl} className="skill-image" alt={name} />

      <p className="skill-name">{name}</p>
    </li>
  )
}

export default SkillCard
