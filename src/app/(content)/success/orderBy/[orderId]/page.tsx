import SuccessComponent from "@/components/success/SuccessComponet";

interface ISuccess {
    params: Promise<{ [key: string]: string }>;
}

export default async function Success({params}: ISuccess) {
    const { orderId } = await params
    return (
        <SuccessComponent orderId={orderId}/>
    );
}   