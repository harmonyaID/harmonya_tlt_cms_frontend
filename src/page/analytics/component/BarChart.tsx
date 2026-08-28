import { Bar, Chart } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import Card from '@/component/card/Card.tsx'
import { BtnInfo } from '@/component/general/Button.tsx'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const data = {
    labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
    ],
    datasets: [
        {
            label: 'Fully Rounded',
            data: [30, -20, 50, 10, -40, 70, 20],
            borderColor: 'rgb(255 138 138)',
            backgroundColor: 'rgb(255 138 138 / 0.5)',
            borderWidth: 2,
            borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
        },
        {
            label: 'Small Radius',
            data: [20, 40, -30, 60, 10, -50, 80],
            borderColor: 'rgb(126 216 255)',
            backgroundColor: 'rgb(126 216 255 / 0.5)',
            borderWidth: 2,
            borderRadius: 5,
            borderSkipped: false,
        },
    ],
}

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top' as const,
        },
    },
}

const BarChart = () => {
    return (
        <Card
            title={
                <div className="hstack justify-content-between align-items-center">
                    Chart Boat Inquiry
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
                <Bar data={data} options={options} />
            </div>
        </Card>
    )
}

export default BarChart
