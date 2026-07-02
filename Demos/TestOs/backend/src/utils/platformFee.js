/** Platform fee snapshot on each order — prefers nPlatformFee, falls back to nChange */
const platformFeeField = { $ifNull: ["$nPlatformFee", { $ifNull: ["$nChange", 0] }] };

const restaurantNetField = {
  $ifNull: ["$nRestaurantNet", { $subtract: ["$nFinalPrice", platformFeeField] }],
};

module.exports = { platformFeeField, restaurantNetField };
