const express = require('express');
const router = express.Router();
const Cart = require('../Models/Cart');
const cartController = require('../Controllers/CartController');
const authMiddleware = require('../Middleware/authMiddleware');

router.get('/', authMiddleware, cartController.getCartItems);

// Add to cart
router.post('/add', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const existingItem = await Cart.findOne({ userId, productId });
    if (existingItem) {
      existingItem.quantity += quantity || 1;
      await existingItem.save();
      return res.status(200).json(existingItem);
    }

    const newItem = new Cart({ userId, productId, quantity });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add to cart', error });
  }
});

// Get cart items by user
router.get('/:userId', async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.params.userId }).populate('productId');
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get cart', error });
  }
});

// Update quantity
router.put('/update/:itemId', async (req, res) => {
  try {
    const updatedItem = await Cart.findByIdAndUpdate(
      req.params.itemId,
      { quantity: req.body.quantity },
      { new: true }
    ).populate('productId');
    
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update item', error });
  }
});

// Remove item from cart
router.delete('/:itemId', async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.itemId);
    res.status(200).json({ message: 'Item removed' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete item', error });
  }
});

module.exports = router;
