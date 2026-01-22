export default function Modal({ title, onClose, isOpen, children}) {
    if(!isOpen) return null ;
    return(
        <div className="backdrop-blur-md fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-[#1a1a1a] shadow-black shadow-xl w-full max-w-lg mx-4 rounded-lg p-4">
                <div className="flex items-start justify-between px-6 py-4 border-b border-[#333]">
                    <h2 className="text-xl text-[#f5f5f5] font-semibold">{title}</h2>
                    <button className="text-2xl text-gray-500 hover:text-gray-300" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    )

}