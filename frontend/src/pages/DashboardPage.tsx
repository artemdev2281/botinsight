import MetricCard from "../MetricCard"

type Metric = {
  id: number
  label: string
  value: number
  suffix?: string
}

const metrics: Metric[] = [
  { id: 1, label: 'Fallback rate', value: 8.3, suffix: '%' },
  { id: 2, label: 'Completion rate', value: 71, suffix: '%' },
  { id: 3, label: 'Диалоги', value: 12540 },
]


function DashboardPage() {
    return (
        <section>
            <h1>Dashboard</h1>
            {metrics.map((metric) => (
                <MetricCard
                    key={metric.id}
                    label={metric.label}
                    value={metric.value}
                    suffix={metric.suffix}
                />
            ))}
        </section>
    )
}

export default DashboardPage