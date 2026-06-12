import { FC } from 'react'
import { CardTitleSectionProps } from './type/card.type'

const CardTitleSection: FC<CardTitleSectionProps> = ({ title = '' }) => (
    <div className="fw-500 fs-18 text-neutral-100 mb-4">{title}</div>
)

export default CardTitleSection
