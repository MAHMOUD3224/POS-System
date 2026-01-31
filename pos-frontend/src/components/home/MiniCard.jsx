export default function MiniCard(props) {
    let iconClass;
    let isTotal;

    if (props.title === 'Total Earnings') {
        iconClass = 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]';
        isTotal = '$' + props.number;
    } else if (props.title === 'In Progress') {
        iconClass = 'bg-[var(--color-warning)]/10 text-[var(--color-warning)]';
        isTotal = props.number;
    } else {
        iconClass = 'bg-[var(--color-info)]/10 text-[var(--color-info)]';
    }

    return (
        <div className='bg-[var(--bg-card)] py-6 px-6 rounded-2xl flex-1 border border-[var(--border-default)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-md)] transition-all duration-300'>
            <div className="flex items-start justify-between mb-4">
                <h1 className="text-[var(--text-secondary)] text-sm font-bold tracking-tight uppercase">{props.title}</h1>
                <div className={`${iconClass} p-3 rounded-xl text-2xl shadow-sm transition-colors duration-300`} aria-label={`${props.title} icon`} >
                    {props.icon}
                </div>
            </div>
            <div>
                <h1 className="text-[var(--text-primary)] text-4xl font-bold tracking-tight">{isTotal}</h1>
                <div className="flex items-center gap-2 mt-3 text-sm">
                    <span className="font-bold text-[var(--color-success)] bg-[var(--color-success)]/10 px-2 py-0.5 rounded-lg">
                        +{props.footerNum}%
                    </span>
                    <span className="text-[var(--text-muted)] font-medium">than yesterday</span>
                </div>
            </div>
        </div>
    )
}
