/*
 * Cart Feature — Type Definitions
 * =================================
 * Domain types for cart items and related entities.
 */

/** Represents an item in the cart */
export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  size: string;
}
