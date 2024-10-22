import { useBills } from "@/context";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Card = ({bill}) => {
    const router = useRouter()
    const {deletBill, formatPesos} = useBills()
    const {amount, category, date, description, _id} = bill;

    const handleDelete = async () =>{
        const res = await deletBill(_id)
        console.log(res)
    }


    return (
            <div className='my-5 rounded-md'>

                <div className='flex flex-col justify-center  bg-gray-800 hover:bg-gray-700 py-5 gap-2 px-10  rounded-md shadow-2xl border-l-4 border-red-300'>
                    <div className="flex justify-between">
                        <h2 className={"font-bold text-xl"}>Gasto:<span className={"font-bold"}>{formatPesos(amount)}$</span></h2>
                        <div >
                            <button onClick={handleDelete} className="font-bold bg-red-500 rounded-md px-3 py-2">delet</button>
                            <Link href={`/page/form/${_id}`} className="font-bold bg-green-500 rounded-md  px-3 py-2 mx-3">edit</Link>
                        </div>
                    </div>

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
