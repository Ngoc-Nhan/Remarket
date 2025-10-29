export const capitalizeFirstLetter = (val) => {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}

// fix empty column
export const generatePlaceHolderCard = (column) => {
  return {
    _id: `${column._id}-placeholder-card`,
    boardId: column.boaerdId,
    columnId: column._id,
    FE_PlaceholderCard: true
  }
}

// Kỹ thuật dùng css pointer-event để chặn user spam click tại bất kỳ chỗ nào có hành động click gọi api
// Đây Là một kỹ thuat rat hay tan dụng Axios Interceptors và CSSPointer-events để chỉ phải viết code xử
// Lý một Lần cho toàn bộ dự án
// Cách sử dụng: Với tat ca cac Link hoac button ma có hành động gọi api thì them class
// 'interceptor-loading' cho nó là-xong.
export const interceptorLoadingElements = (calling) => {
  // .DOMLay ratoan bộ phần tu tren page hiện tại co className La 'interceptor-loading'
  const elements = document.querySelectorAll('.interceptor-loading')
  for (let i = 0; i < elements.length; i++) {
    if (calling) {
      // Neu đang trong thời gian chờ gọi API (calling = true) thì se lam mo phan tu va chan click bang
      // css pointer-events
      elements[i].style.opacity = '0.5'
      elements[i].style.pointerEvents = 'none'
    } else {
      // .Ngược lại thì tra về nhu ban đầu, không Lam gì ca
      elements[i].style.opacity = 'initial'
      elements[i].style.pointerEvents = 'initial'
    }
  }
}
