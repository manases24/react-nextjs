"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  CreateOrderData,
  CreateOrderActions,
  OnApproveData,
  OnApproveActions,
} from "@paypal/paypal-js";
import { setTransactionId, paypalCheckPayment } from "@/actions";

interface Props {
  orderId: string;
  amount: number;
}

export const PayPalButton = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = Math.round(amount * 100) / 100;

  if (isPending) {
    return (
      <div className="animate-pulse mb-16">
        <div className="h-11 bg-gray-300 rounded" />
        <div className="h-11 bg-gray-300 rounded mt-2" />
      </div>
    );
  }

  async function createOrder(
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> {
    const transactionId = await actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            currency_code: "USD",
            value: roundedAmount.toString(),
          },
        },
      ],
    });

    const { ok } = await setTransactionId(orderId, transactionId);
    if (!ok) {
      throw new Error("No se pudo actualizar el id de la transacción");
    }

    return transactionId;
  }

  async function onApprove(data: OnApproveData, actions: OnApproveActions) {
    const details = await actions.order?.capture();
    if (!details) return;
    await paypalCheckPayment(details.id ?? "");
  }

  return <PayPalButtons createOrder={createOrder} onApprove={onApprove} />;
};
