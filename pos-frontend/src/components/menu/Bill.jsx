import React, { useState } from "react";
import {
  // useDispatch,
  useSelector
} from "react-redux";
import { getTotalPrice } from "../../redux/slices/cartSlice";
import {
  // addOrder,
  createPaymentIntent,
  // updateTable,
} from "../../https/index";
import { enqueueSnackbar } from "notistack";
// import { useMutation } from "@tanstack/react-query";
// import { removeAllItems } from "../../redux/slices/cartSlice";
// import { removeCustomer } from "../../redux/slices/customerSlice";
import { messageEnqueue } from "../../utils";
// import Invoice from "../invoice/Invoice";

function loadStripeScript() {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}


const Bill = () => {
  // const dispatch = useDispatch();

  const customerData = useSelector((state) => state.customer);
  const cartData = useSelector((state) => state.cart);
  const total = useSelector(getTotalPrice);
  const taxRate = 5.25;
  const tax = (total * taxRate) / 100;
  const totalPriceWithTax = total + tax;

  const [paymentMethod, setPaymentMethod] = useState();
  // const [showInvoice, setShowInvoice] = useState(false);
  // const [orderInfo, setOrderInfo] = useState();

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      enqueueSnackbar("Please select a payment method!", {
        variant: "warning",
      });
      return;
    }

    if (paymentMethod === "Online") {
      // Load Stripe.js SDK
      try {
        const res = await loadStripeScript();

        if (!res) {
          enqueueSnackbar("Stripe SDK failed to load. Are you online?", {
            variant: "warning",
          });
          return;
        }

        // Initialize Stripe with your publishable key
        const stripe = window.Stripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

        // Create PaymentIntent on backend
        const reqData = {
          amount: totalPriceWithTax.toFixed(2),
        };

        const { data } = await createPaymentIntent(reqData);
        console.log("PaymentIntent created:", data);

        // Confirm the payment using test token (tok_visa)
        // Note: In production, use Stripe Elements UI for real card input
        const { error, paymentIntent } = await stripe.confirmCardPayment(
          data.clientSecret,
          {
            payment_method: {
              card: {
                token: "tok_visa", // Test token - works in Test Mode only
              },
              billing_details: {
                name: customerData.customerName,
                phone: customerData.customerPhone,
              },
            },
          }
        );

        if (error) {
          console.error("Stripe error:", error);
          messageEnqueue({ message: "Payment Failed!" }, "error");
        } else if (paymentIntent.status === "succeeded") {
          console.log("Payment succeeded:", paymentIntent);
          messageEnqueue({ message: "Payment Successful!" }, "success");

          // Place the order after successful payment
          // const orderData = {
          //   customerDetails: {
          //     name: customerData.customerName,
          //     phone: customerData.customerPhone,
          //     guests: customerData.guests,
          //   },
          //   orderStatus: "In Progress",
          //   bills: {
          //     total: total,
          //     tax: tax,
          //     totalWithTax: totalPriceWithTax,
          //   },
          //   items: cartData,
          //   table: customerData.table.tableId,
          //   paymentMethod: paymentMethod,
          //   paymentData: {
          //     stripe_payment_intent_id: paymentIntent.id,
          //     stripe_payment_id: paymentIntent.id,
          //   },
          // };

          // setTimeout(() => {
          //   orderMutation.mutate(orderData);
          // }, 1500);
        }
      } catch (error) {
        console.log(error);
        messageEnqueue({ message: "Payment Failed!" }, "error");
      }
    } else {
      // Place the order for Cash payment
      // const orderData = {
      //   customerDetails: {
      //     name: customerData.customerName,
      //     phone: customerData.customerPhone,
      //     guests: customerData.guests,
      //   },
      //   orderStatus: "In Progress",
      //   bills: {
      //     total: total,
      //     tax: tax,
      //     totalWithTax: totalPriceWithTax,
      //   },
      //   items: cartData,
      //   table: customerData.table.tableId,
      //   paymentMethod: paymentMethod,
      // };
      // orderMutation.mutate(orderData);
    }
  };

  // const orderMutation = useMutation({
  //   mutationFn: (reqData) => addOrder(reqData),
  //   onSuccess: (resData) => {
  //     const { data } = resData.data;
  //     console.log(data);

  //     setOrderInfo(data);

  //     // Update Table
  //     const tableData = {
  //       status: "Booked",
  //       orderId: data._id,
  //       tableId: data.table,
  //     };

  //     setTimeout(() => {
  //       tableUpdateMutation.mutate(tableData);
  //     }, 1500);
  //     messageEnqueue({message:"Order Placed!"}, "success")
  //     // enqueueSnackbar("Order Placed!", {
  //     //   variant: "success",
  //     // });
  //     setShowInvoice(true);
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //   },
  // });

  // const tableUpdateMutation = useMutation({
  //   mutationFn: (reqData) => updateTable(reqData),
  //   onSuccess: (resData) => {
  //     console.log(resData);
  //     dispatch(removeCustomer());
  //     dispatch(removeAllItems());
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //   },
  // });

  return (
    <>
      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">
          Items({cartData.length})
        </p>
        <h1 className="text-[#f5f5f5] text-md font-bold">
          ${total.toFixed(2)}
        </h1>
      </div>
      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">Tax(5.25%)</p>
        <h1 className="text-[#f5f5f5] text-md font-bold">${tax.toFixed(2)}</h1>
      </div>
      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">
          Total With Tax
        </p>
        <h1 className="text-[#f5f5f5] text-md font-bold">
          ${totalPriceWithTax.toFixed(2)}
        </h1>
      </div>
      <div className="flex items-center gap-3 px-5 mt-4">
        <button
          onClick={() => setPaymentMethod("Cash")}
          className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold ${paymentMethod === "Cash" ? "bg-[#383737]" : ""
            }`}
        >
          Cash
        </button>
        <button
          onClick={() => setPaymentMethod("Online")}
          className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold ${paymentMethod === "Online" ? "bg-[#383737]" : ""
            }`}
        >
          Online
        </button>
      </div>

      <div className="flex items-center gap-3 px-5 mt-4">
        <button className="bg-[#025cca] px-4 py-3 w-full rounded-lg text-[#f5f5f5] font-semibold text-lg">
          Print Receipt
        </button>
        <button
          onClick={handlePlaceOrder}
          className="bg-[#f6b100] px-4 py-3 w-full rounded-lg text-[#1f1f1f] font-semibold text-lg"
        >
          Place Order
        </button>
      </div>

      {/* {showInvoice && (
        <Invoice orderInfo={orderInfo} setShowInvoice={setShowInvoice} />
      )} */}
    </>
  );
};

export default Bill;