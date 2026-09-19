type ProductIntroProps = {
    title: string
    description: string
    subtitle?: string
}

type Feature = {
    id: number
    title: string
}

const features: Feature[] = [
    { id: 1, title: 'feature 1'},
    { id: 2, title: 'feature 2'},
    { id: 3, title: 'feature 3'}
]

function ProductIntro({ title, description, subtitle }: ProductIntroProps) {
    return (
        <section>
            <h1>{title}</h1>
            {subtitle && <h2>{subtitle}</h2>}
            <p>{description}</p>
            <ul>
                {features.map((feature) => (
                    <li key={feature.id}>{feature.title}</li>
                ))}
            </ul>
        </section>
    )
}

export default ProductIntro
