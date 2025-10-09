import { IProduct } from "./products";

export type OrderStatus = "PENDING" | "PAYED" | "SHIPPED" | "DELIVERED";

export interface IOrderPage {
    orders: IOrder[]
}

export interface IAddress {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  street: string;
  city: string;
  country: string;
  zip: string;
  userId: number;
  orders?: IOrder[]; 
}

export interface IOrder {
    id: number;
    createdAt: string; 
    updatedAt: string; 
    userId?: number;
    status: OrderStatus;
    name: string;
    email: string;
    phone: string;
    shippingAddress: string;
    address: IAddress | null;
    items: OrderItem[];
  }
  
  export interface OrderItem {
    id: number;
    createdAt: string;
    updatedAt: string;
    productId: number;
    orderId: number;
    quantity: number;
    price: number;
    product: IProduct;
  }
  