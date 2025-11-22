export default function FavouriteCard() {
  return (
    <div className='w-full bg-white rounded-lg border p-4 flex items-start gap-4 hover:shadow-sm transition'>
      {/* Image */}
      <div className='w-28 h-28 shrink-0 rounded-md overflow-hidden'>
        <img
          src='https://via.placeholder.com/150'
          alt='item'
          className='object-cover w-full h-full'
        />
      </div>

      {/* Content */}
      <div className='flex-1'>
        {/* Title */}
        <h3 className='font-medium text-gray-800'>
          Mua Bán cỏ nhân tạo thanh lý giá sốc 19k/ m vuông
        </h3>

        {/* Price */}
        <div className='mt-1 flex items-center gap-2'>
          <span className='text-red-600 font-semibold text-lg'>19.000 đ</span>
          <span className='line-through text-gray-400 text-sm'>20.000 đ</span>
        </div>

        {/* Meta info */}
        <div className='mt-2 flex items-center gap-3 text-sm text-gray-600'>
          <span className='flex items-center gap-1'>
            <span className='w-3 h-3 bg-green-600 rounded-full inline-block'></span>
            Cá Nhân
          </span>

          <span className='flex items-center gap-1'>
            <span className='w-3 h-3 bg-yellow-400 rounded-full inline-block'></span>
            Tin Ưu Tiên
          </span>

          <span>Quận Tân Bình</span>
        </div>
      </div>

      {/* Right Buttons */}
      <div className='flex flex-col items-center gap-2'>
        {/* Chat Button */}
        <button className='border border-green-600 text-green-600 px-5 py-1 rounded-full text-sm hover:bg-green-50'>
          Chat
        </button>

        {/* Heart icon */}
        <button className='text-red-600 text-xl'>♥</button>
      </div>
    </div>
  )
}
