
export const Card = () => {
    return (
            <div className='my-5 rounded-md'>
                <div className='flex flex-col justify-center items-center bg-gray-800 hover:bg-gray-700 py-5 gap-2 px-10  rounded-md shadow-xl border-l-4 border-red-300'>
                    <h2 className={"font-light"}>Tu Objetivo <span className={"font-bold"}>La moto</span></h2>
                    <div className="flex flex-col justify-between items-center w-full">
                        <div>
                            <div className="flex items-center text-xs px-3 bg-blue-200 text-blue-800 rounded-full">000%</div>
                        </div>
                        <div>
                            <div className="p-2">
                                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" stroke-linejoin="round"
                                        d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                                </svg> */}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

    )
}
