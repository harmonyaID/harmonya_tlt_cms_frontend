import { Bar, Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import Card from '@/component/card/Card.tsx'
import { BtnInfo } from '@/component/general/Button.tsx'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
)

const data = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
    datasets: [
        {
            label: 'Dataset',
            data: [30, -50, 80, -20, 60, -70],
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            pointStyle: 'circle',
            pointRadius: 10,
            pointHoverRadius: 15,
        },
    ],
}

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {},
}

const LineChart = () => {
    return (
        <Card
            title={
                <div className="hstack justify-content-between align-items-center">
                    Chart score distribution property review
                    <BtnInfo className="btn-sm" isOutline>
                        Refresh
                    </BtnInfo>
                </div>
            }>
            <div
                style={{
                    width: '100%',
                    height: 'clamp(550px, 30vh, 620px)',
                }}>
                <Line data={data} options={options} />
            </div>
        </Card>
    )
}

export default LineChart
