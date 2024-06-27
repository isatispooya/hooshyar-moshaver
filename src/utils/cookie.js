
export const setCookieValue = (UID, value) => {
    document.cookie = `${UID}=${value}; path=/`;
  };
  
  export const getCookieValue = (UID) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i+=1) {
      const cookie = cookies[i].trim();
      const [name, value] = cookie.split('=');
      if (name === UID) {
        return decodeURIComponent(value);
      }
    }
    return null;
  };