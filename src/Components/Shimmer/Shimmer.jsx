import React from 'react'

const Shimmer = () => {
    const arr = new Array(10)
    console.log(arr.length)
    return (
        <div className='mt-24 h-[100vh]'>
            <div className='w-full h-[40vh] bg-slate-800 flex justify-center items-center flex-col gap-5'>
                <div className='relative'>
                    <span className='loader'></span>
                    <img className='w-16 absolute top-4 left-4' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossly,f_auto,q_auto/icecream_wwomsa" alt="" />

                </div>
                <h1 className='text-white text-2xl'>Looking for greet food near you..</h1>
            </div>
            <div className='w-full px-2 md:w-[70%] h-[60vh] mt-4 flex flex-wrap mx-auto gap-8'>
            {Array(5)
                    .fill("")
                    .map((data , i) => (
                        <div key={i} className="w-full h-40 flex justify-between">
                            <div className="w-[60%] flex flex-col gap-5 h-full">
                                <div className="w-[100%] h-5 animate"></div>
                                <div className="w-[50%] h-5 animate"></div>
                                <div className="w-[30%] h-5 animate"></div>
                            </div>
                            <div className="w-[30%] rounded-xl h-full animate"></div>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Shimmer