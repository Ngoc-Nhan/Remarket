function TimeAgo(date) {
    const now = new Date();
    const seconds = Math.floor((now - new Date(date)) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) return interval + " năm trước";
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return interval + " tháng trước";
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return interval + " ngày trước";
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return interval + " giờ trước";
    interval = Math.floor(seconds / 60);
    if (interval > 1) return interval + " phút trước";
    return Math.floor(seconds) + " giây trước";
}

export default TimeAgo;