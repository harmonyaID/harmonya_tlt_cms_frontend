import Card from '@/component/card/Card.tsx'
import { Eye } from 'iconsax-react'
import { BtnInfo } from '@/component/general/Button.tsx'
import { RotateCcw } from 'react-feather'

const TopTenCard = ({ title }: { title: string }) => {
    const data = [
        {
            id: 1,
            count: 30,
            name: 'Amazing Product Sales Performance',
        },
        {
            id: 2,
            count: 45,
            name: 'Monthly Revenue Growth Overview',
        },
        {
            id: 3,
            count: 20,
            name: 'Customer Satisfaction Survey Results',
        },
        {
            id: 4,
            count: 60,
            name: 'Outstanding Team Performance This Month',
        },
        {
            id: 5,
            count: 15,
            name: 'New Customer Acquisition Statistics',
        },
    ]
    return (
        <Card
            title={
                <div className="hstack justify-content-between align-items-center">
                    {title}
                    <BtnInfo className="btn-sm" isOutline>
                        Refresh
                    </BtnInfo>
                </div>
            }>
            <div className="vstack gap-2 overflow-y-auto">
                {data.map((item, idx) => (
                    <div key={item.id} className="p-3 rounded-3 bg-neutral-700">
                        <div className="hstack gap-2 align-items-start">
                            <p className="fw-bold m-0">#{idx + 1}</p>
                            <p className="m-0">{item.name}</p>
                        </div>
                        <div className="hstack gap-1 justify-content-end">
                            <Eye size={15} variant="Linear" />
                            <span>{item.count}k</span>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    )
}
export default TopTenCard
