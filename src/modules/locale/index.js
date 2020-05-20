export const ORDER_STATUS = {
  NEW: "New",
  IN_PROGRESS: "In Progress",
  READY_FOR_BILLING: "Ready For Billing",
  READY_FOR_PICKUP: "Ready For Pickup",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled"
};

export const ORDER_STATUS_ENUM = {
  "0": ORDER_STATUS.NEW,
  "1": ORDER_STATUS.IN_PROGRESS,
  "2": ORDER_STATUS.READY_FOR_BILLING,
  "3": ORDER_STATUS.READY_FOR_PICKUP,
  "4": ORDER_STATUS.COMPLETED,
  "5": ORDER_STATUS.CANCELLED
};

export const ORDER_ITEM_STATUS = [
  "Added",
  "Not Available",
  "Substituted"
];

export const APP_NAME = "Store Manager";