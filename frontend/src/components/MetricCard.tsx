import { Card, Statistic } from 'antd'
import type { Metric } from '../types'

type MetricCardProps = Pick<Metric, 'label' | 'value' | 'suffix'>

function MetricCard({ label, value, suffix }: MetricCardProps) {
  return (
    <Card>
      <Statistic title={label} value={value} suffix={suffix} groupSeparator=" " />
    </Card>
  )
}

export default MetricCard
