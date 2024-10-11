export const Card = ({bill}) => {
    const {amount, category, date, description} = bill;

    return (
            <div className='my-5 rounded-md'>

                <div className='flex flex-col justify-center  bg-gray-800 hover:bg-gray-700 py-5 gap-2 px-10  rounded-md shadow-2xl border-l-4 border-red-300'>
                    <h2 className={"font-bold text-xl"}>Gasto:<span className={"font-bold"}>{amount}$</span></h2>
                    <div className="flex gap-5 justify-between  w-full">
                            <div>
                                <p>En: <span className="text-lg font-semibold">{description}</span> </p>
                            </div>
                            <div className='flex flex-col items-center text-center'>
                                <span className="font-bold border-b-4 shadow-lg rounded-md border-red-400 px-3 py-2">{category}</span>
                                <span className=" px-3 py-2 rounded-md">{date}</span>
                            </div>
                    </div>
                </div>

            </div>

    )
}
