function notify(message) {
    let notification = document.getElementById('notification');
    notification.style.display = 'block';
    notification.innerText = message;

    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
}