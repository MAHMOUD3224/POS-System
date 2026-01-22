import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { motion } from "framer-motion";
import { FaCheck, FaPrint, FaTimes } from "react-icons/fa";

const Invoice = ({ orderInfo, setShowInvoice }) => {
  const invoiceRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: invoiceRef,  // تم تغيير content إلى contentRef
    documentTitle: `Receipt-${orderInfo._id}`,
    pageStyle: `
      @page {
        size: 80mm auto;
        margin: 5mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `,
  });

  // Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="receipt-title"
      onKeyDown={(e) => e.key === 'Escape' && setShowInvoice(false)}
      tabIndex={-1}
    >
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-[400px] mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Success Animation Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
          <div className="flex items-center justify-center mb-2">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 150 }}
              className="flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <FaCheck className="text-green-500 text-3xl" />
              </motion.span>
            </motion.div>
          </div>
          <h2 className="text-xl font-bold text-center">Order Successful!</h2>
          <p className="text-center text-green-100 text-sm">Your receipt is ready</p>
        </div>

        {/* Scrollable Receipt Content */}
        <div className="overflow-y-auto flex-1 p-4">
          <div ref={invoiceRef} className="receipt-content" style={{ fontFamily: 'Arial, sans-serif' }}>
            {/* Restaurant Logo/Name */}
            <div className="text-center mb-4 pb-4 border-b-2 border-dashed border-gray-300">
              <div className="text-3xl font-bold mb-1">🍽️ Restaurant</div>
              <h3 id="receipt-title" className="text-2xl font-bold uppercase tracking-wide">
                Order Receipt
              </h3>
            </div>

            {/* Order Information */}
            <div className="mb-4 pb-4 border-b border-gray-200 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-gray-600">Order ID</p>
                  <p className="font-mono font-semibold">#{orderInfo._id.slice(-8).toUpperCase()}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600">Date & Time</p>
                  <p className="font-semibold">{formatDate(orderInfo.createdAt || new Date())}</p>
                  <p className="text-gray-700">{formatTime(orderInfo.createdAt || new Date())}</p>
                </div>
              </div>
              {orderInfo.table && (
                <div className="mt-2">
                  <p className="text-gray-600">Table Number</p>
                  <p className="font-semibold">Table {orderInfo.table}</p>
                </div>
              )}
            </div>

            {/* Customer Details */}
            <div className="mb-4 pb-4 border-b border-gray-200">
              <h4 className="font-bold text-gray-700 mb-2 uppercase text-sm">Customer Details</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-semibold">{orderInfo.customerDetails.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-semibold">{orderInfo.customerDetails.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Guests:</span>
                  <span className="font-semibold">{orderInfo.customerDetails.guests}</span>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-4 pb-4 border-b border-gray-200">
              <h4 className="font-bold text-gray-700 mb-3 uppercase text-sm">Items Ordered</h4>
              <div className="space-y-2">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-gray-600 border-b pb-2">
                  <div className="col-span-6">Item</div>
                  <div className="col-span-2 text-center">Qty</div>
                  <div className="col-span-4 text-right">Price</div>
                </div>

                {/* Items */}
                {orderInfo.items.map((item, index) => (
                  <div
                    key={index}
                    className={`grid grid-cols-12 gap-2 text-sm py-2 ${index % 2 === 0 ? 'bg-gray-50' : ''
                      }`}
                  >
                    <div className="col-span-6 font-medium">{item.name}</div>
                    <div className="col-span-2 text-center text-gray-600">×{item.quantity}</div>
                    <div className="col-span-4 text-right font-mono font-semibold">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t-2 border-dashed border-gray-300 mt-3"></div>
            </div>

            {/* Billing Summary */}
            <div className="mb-4 pb-4 border-b border-gray-200">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-mono font-semibold">${orderInfo.bills.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (5.25%):</span>
                  <span className="font-mono font-semibold">${orderInfo.bills.tax.toFixed(2)}</span>
                </div>
                <div className="border-t-2 border-gray-800 pt-2 mt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>TOTAL:</span>
                    <span className="font-mono">${orderInfo.bills.totalWithTax.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="mb-4 pb-4 border-b border-gray-200">
              <h4 className="font-bold text-gray-700 mb-2 uppercase text-sm">Payment Information</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Method:</span>
                  <span className="font-semibold">{orderInfo.paymentMethod}</span>
                </div>
                {orderInfo.paymentMethod !== "Cash" && orderInfo.paymentData?.stripe_payment_intent_id && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transaction ID:</span>
                    <span className="font-mono text-xs">
                      {orderInfo.paymentData.stripe_payment_intent_id.slice(-12)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-600">Status:</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">
                    PAID ✓
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-gray-600 space-y-2">
              <p className="font-semibold text-gray-800">Thank you for your order!</p>
              <p>Please visit us again.</p>
              <div className="pt-3 border-t border-gray-200 mt-3">
                <p className="text-xs">123 Main Street, Anytown, USA</p>
                <p className="text-xs">+1 123 456 7890</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-gray-50 p-4 flex gap-3 border-t">
          <button
            onClick={handlePrint}
            aria-label="Print Receipt"
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <FaPrint /> Print Receipt
          </button>
          <button
            onClick={() => setShowInvoice(false)}
            aria-label="Close Receipt"
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            <FaTimes /> Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;