// utils/guest.js
import { v4 as uuidv4 } from "uuid";

/**
 * Returns the persistent guest UUID from localStorage.
 * Generates and stores a new one if none exists.
 */
export function getGuestId() {
  let guestId = localStorage.getItem("guest_id");
  if (!guestId) {
    guestId = uuidv4();
    localStorage.setItem("guest_id", guestId);
  }
  return guestId;
}

/**
 * Clears cart and guest UUID from localStorage.
 * Call this on logout.
 */
export function clearGuestSession() {
  localStorage.removeItem("guest_id");
  localStorage.removeItem("cart_items");
}
