const CART_STORAGE_KEY = "foodOrderAppCart";

const getCart = () => {
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error("Error reading cart from localStorage:", error);
    return [];
  }
};

const saveCart = (cart) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

const addToCart = async (itemData) => {
  return new Promise((resolve, reject) => {
    try {
      const cart = getCart();
      const existingItemIndex = cart.findIndex(
        (item) => item.id === itemData.id
      );

      if (existingItemIndex > -1) {
        // Item exists, update quantity
        cart[existingItemIndex].quantity += itemData.quantity;
      } else {
        // New item, add to cart
        cart.push(itemData);
      }

      saveCart(cart);
      resolve({
        success: true,
        message: "Item added successfully",
        item: itemData,
      });
    } catch (error) {
      console.error("Error in addToCart (localStorage):", error);
      reject({ success: false, message: "Failed to add item to cart", error });
    }
  });
};

const removeFromCart = async (productId) => {
  return new Promise((resolve, reject) => {
    try {
      let cart = getCart();
      console.log("🚀 ~ returnnewPromise ~ cart:", cart);
      const initialLength = cart.length;
      console.log("🚀 ~ returnnewPromise ~ initialLength:", initialLength);
      cart = cart.filter((item) => item.id !== productId);
      console.log("🚀 ~ returnnewPromise ~ cart:", cart);

      if (cart.length < initialLength) {
        saveCart(cart);
        resolve({ success: true, message: "Item removed successfully" });
      } else {
        resolve({ success: false, message: "Item not found in cart" });
      }
    } catch (error) {
      console.error("Error in removeFromCart (localStorage):", error);
      reject({
        success: false,
        message: "Failed to remove item from cart",
        error,
      });
    }
  });
};

export const cartService = {
  addToCart,
  getCart,
  saveCart,
  removeFromCart,
};
