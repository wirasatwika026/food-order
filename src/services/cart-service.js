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

const getCartById = (productId) => {
  try {
    const cart = getCart();
    return cart.find((item) => item.id === productId) || null;
  } catch (error) {
    console.error("Error getting cart item by ID:", error);
    return null;
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
        (item) => item.item_id === itemData.item_id
      );

      if (existingItemIndex > -1) {
        // Item exists, update quantity
        cart[existingItemIndex].quantity = itemData.quantity;
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
      const initialLength = cart.length;
      cart = cart.filter((item) => item.item_id !== productId);
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

// Address management
const ADDRESS_STORAGE_KEY = "foodOrderAppAddresses";

const getAddresses = () => {
  try {
    const storedAddresses = localStorage.getItem(ADDRESS_STORAGE_KEY);
    return storedAddresses ? JSON.parse(storedAddresses) : [];
  } catch (error) {
    console.error("Error reading addresses from localStorage:", error);
    return [];
  }
};

const getAddressById = (addressId) => {
  try {
    const addresses = getAddresses();
    return addresses.find((address) => address.id === addressId) || null;
  } catch (error) {
    console.error("Error getting address by ID:", error);
    return null;
  }
};

const saveAddresses = (addresses) => {
  try {
    localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(addresses));
  } catch (error) {
    console.error("Error saving addresses to localStorage:", error);
  }
};

const addAddress = async (addressData) => {
  return new Promise((resolve, reject) => {
    try {
      const addresses = getAddresses();
      // Generate unique ID if not provided
      if (!addressData.id) {
        addressData.id = Date.now().toString();
      }

      // Check if address with this ID already exists
      const existingAddress = addresses.find(
        (address) => address.id === addressData.id
      );
      if (existingAddress) {
        return resolve({
          success: false,
          message: "Address with this ID already exists",
        });
      }

      addresses.push(addressData);
      saveAddresses(addresses);
      resolve({
        success: true,
        message: "Address added successfully",
        address: addressData,
      });
    } catch (error) {
      console.error("Error in addAddress:", error);
      reject({ success: false, message: "Failed to add address", error });
    }
  });
};

const updateAddress = async (addressId, addressData) => {
  return new Promise((resolve, reject) => {
    try {
      let addresses = getAddresses();
      const index = addresses.findIndex((address) => address.id === addressId);

      if (index !== -1) {
        addresses[index] = {
          ...addresses[index],
          ...addressData,
          id: addressId,
        };
        saveAddresses(addresses);
        resolve({
          success: true,
          message: "Address updated successfully",
          address: addresses[index],
        });
      } else {
        resolve({ success: false, message: "Address not found" });
      }
    } catch (error) {
      console.error("Error in updateAddress:", error);
      reject({ success: false, message: "Failed to update address", error });
    }
  });
};

const deleteAddress = async (addressId) => {
  return new Promise((resolve, reject) => {
    try {
      let addresses = getAddresses();
      const initialLength = addresses.length;
      addresses = addresses.filter((address) => address.id !== addressId);

      if (addresses.length < initialLength) {
        saveAddresses(addresses);
        resolve({ success: true, message: "Address deleted successfully" });
      } else {
        resolve({ success: false, message: "Address not found" });
      }
    } catch (error) {
      console.error("Error in deleteAddress:", error);
      reject({ success: false, message: "Failed to delete address", error });
    }
  });
};

// Customer management
const CUSTOMER_STORAGE_KEY = "foodOrderAppCustomers";

const getCustomers = () => {
  try {
    const storedCustomers = localStorage.getItem(CUSTOMER_STORAGE_KEY);
    return storedCustomers ? JSON.parse(storedCustomers) : [];
  } catch (error) {
    console.error("Error reading customers from localStorage:", error);
    return [];
  }
};

const getCustomerById = (customerId) => {
  try {
    const customers = getCustomers();
    return customers.find((customer) => customer.id === customerId) || null;
  } catch (error) {
    console.error("Error getting customer by ID:", error);
    return null;
  }
};

const saveCustomers = (customers) => {
  try {
    localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(customers));
  } catch (error) {
    console.error("Error saving customers to localStorage:", error);
  }
};

const addCustomer = async (customerData) => {
  return new Promise((resolve, reject) => {
    try {
      const customers = getCustomers();
      // Generate unique ID if not provided
      if (!customerData.id) {
        customerData.id = Date.now().toString();
      }

      // Check if customer with this ID already exists
      const existingCustomer = customers.find(
        (customer) => customer.id === customerData.id
      );
      if (existingCustomer) {
        return resolve({
          success: false,
          message: "Customer with this ID already exists",
        });
      }

      customers.push(customerData);
      saveCustomers(customers);
      resolve({
        success: true,
        message: "Customer added successfully",
        customer: customerData,
      });
    } catch (error) {
      console.error("Error in addCustomer:", error);
      reject({ success: false, message: "Failed to add customer", error });
    }
  });
};

const updateCustomer = async (customerId, customerData) => {
  return new Promise((resolve, reject) => {
    try {
      let customers = getCustomers();
      const index = customers.findIndex(
        (customer) => customer.id === customerId
      );

      if (index !== -1) {
        customers[index] = {
          ...customers[index],
          ...customerData,
          id: customerId,
        };
        saveCustomers(customers);
        resolve({
          success: true,
          message: "Customer updated successfully",
          customer: customers[index],
        });
      } else {
        resolve({ success: false, message: "Customer not found" });
      }
    } catch (error) {
      console.error("Error in updateCustomer:", error);
      reject({ success: false, message: "Failed to update customer", error });
    }
  });
};

const deleteCustomer = async (customerId) => {
  return new Promise((resolve, reject) => {
    try {
      let customers = getCustomers();
      const initialLength = customers.length;
      customers = customers.filter((customer) => customer.id !== customerId);

      if (customers.length < initialLength) {
        saveCustomers(customers);
        resolve({ success: true, message: "Customer deleted successfully" });
      } else {
        resolve({ success: false, message: "Customer not found" });
      }
    } catch (error) {
      console.error("Error in deleteCustomer:", error);
      reject({ success: false, message: "Failed to delete customer", error });
    }
  });
};

const addOrder = async (orderData) => {
  console.log("🚀 ~ addOrder ~ orderData:", orderData);
  return new Promise((resolve, reject) => {
    try {
      // Here you would typically send the orderData to your backend API
      // For this example, we'll just log it and resolve immediately
      // const supabase = createClient();
      // // Example: Save order to Supabase (uncomment when ready)
      // const { data, error } = supabase.from("orders").insert(orderData);
      // if (error) {
      //   throw error;
      // }
      resolve({ success: true, message: "Order placed successfully" });
    } catch (error) {
      console.error("Error in addOrder:", error);
      reject({ success: false, message: "Failed to place order", error });
    }
  });
};

export const cartService = {
  addToCart,
  getCart,
  saveCart,
  removeFromCart,
  getCartById,
  getAddresses,
  getAddressById,
  addAddress,
  updateAddress,
  deleteAddress,
  saveAddresses,
  getCustomers,
  getCustomerById,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  saveCustomers,
  addOrder,
};
