import { Card, Statistic } from 'antd'

type MetricCardProps = {
    label: string,
    value: number
    suffix?: string
}

function MetricCard({ label, value, suffix }: MetricCardProps) {
    return (
        <Card>
            <Statistic
                title={label}
                value={value}
                suffix={suffix}
            />
        </Card>
    )
}

export default MetricCard