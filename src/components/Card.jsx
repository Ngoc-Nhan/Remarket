import React from 'react'
import TimeAgo from '../services/useAgain'

const Card = ({ item }) => {
    return (
        <div
            key={item.id}
            className="card bg-base-100 shadow-md hover:bg-gray-200"
        >
            <figure>
                <img
                    className="h-50 mt-4"
                    src={item.image}
                    alt={item.title}
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-lg font-bold">
                    {item.title}
                </h2>
                <p className="text-green-600 font-semibold flex justify-end">
                    {item.price.toLocaleString()} đ
                </p>
                <div className="flex mx-2 space-x-3">
                    <p className="text-sm text-gray-500">{item.category}</p>
                    <p className="text-lg text-red-500 flex justify-end">
                        {item.condition}
                    </p>
                </div>
                <div className="flex">
                    <p className="text-sm text-gray-500">
                        📍 {item.location}
                    </p>
                    <p className="text-xs text-gray-400 mt-1 justify-end flex flex-1">
                        {TimeAgo(item.postedAt)}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Card