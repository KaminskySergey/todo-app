import OrdersComponent from "@/components/account/OrdersComponent";
import { getOrders } from "../../../../../actions/orders";

export default async function OrdersPage() {
   const orders = await getOrders()


    return (
        <OrdersComponent orders={orders}/>
    );
}
