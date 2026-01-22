
export default function MiniCard(props) {
    let iconColor ;
    let isTotal ;
    if(props.title == 'Total Earnings'){
        iconColor = 'bg-[#02ca3a]' ;
        isTotal = '$'+ props.number;
    }else if(props.title == 'In Progress'){
        iconColor = 'bg-[#f6b100]' ;
        isTotal = props.number;
    }else{
        iconColor = 'bg-[#025cca]' ;
    }
    return(
        <div className='bg-[#1a1a1a] py-5 px-5 rounded-lg w-[50%]'>
            <div className="flex items-start justify-between">
                <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">{props.title}</h1>
                <button className={`${iconColor} p-3 rounded-lg text-[#f5f5f5] text-2xl`} aria-label={`${props.title} icon`} >{props.icon}</button>
            </div>
            <div>
                <h1 className="text-[#f5f5f5] text-4xl font-bold mt-3">{isTotal}</h1>
                <h1 className="text-[#f5f5f5] text-lg mt-2"><span className="text-[#02ca3a]">{props.footerNum}</span> than yesterday</h1>
            </div>
        </div>
    )
}
