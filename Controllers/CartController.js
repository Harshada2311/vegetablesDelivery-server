const Cart = require('../Models/Cart');

exports.getCartItems = async (req, res) => {
  try {
    // console.log('Decoded user:', req.user);

    const userId = req.user.userId;

    // console.log('🟢 Searching Cart for userId:', userId); // Add this

    const cartItems = await Cart.find({ userId }).populate('productId');
    //console.log('🟢 Cart items found:', cartItems); // Add this
    // Filter out null productId items
    const validItems = cartItems.filter(item => item.productId !== null);
    
    // Optional: clean up broken entries from DB

    const invalidItems = cartItems.filter(item => item.productId === null);
    if (invalidItems.length > 0) {
      const invalidIds = invalidItems.map(item => item._id);
      await Cart.deleteMany({ _id: { $in: invalidIds } });
    }
    //res.status(200).json(validItems);

    if ((!cartItems || cartItems.length === 0) && (!validItems || validItems.length === 0)) {
      return res.status(404).json({ message: 'No items found in cart' });
    }
    // Return the cart items
    res.status(200).json(validItems);
  } catch (error) {
    //console.error("❌ Cart Fetch Error:", error);  // ADD THIS
    res.status(500).json({ message: 'Failed to fetch cart items', error });
  }
};
