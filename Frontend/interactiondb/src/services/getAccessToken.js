export const getAccessToken = () => {
    const cookies = document.cookie.split(';');
    console.log(document.cookie);
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('accessToken=')) {
            return cookie.substring('accessToken='.length, cookie.length);
        }
    }
    return null; 
};