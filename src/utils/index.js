// Function to set an item in local storage
export const setItemInLocalStorage = (key, value) => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error("Error setting item in local storage", error);
    }
  };
  
  // Function to get an item from local storage
  export const getItemFromLocalStorage = (key) => {
    try {
      const serializedValue = localStorage.getItem(key);
      return serializedValue ? JSON.parse(serializedValue) : null;
    } catch (error) {
      console.error("Error getting item from local storage", error);
      return null;
    }
  };