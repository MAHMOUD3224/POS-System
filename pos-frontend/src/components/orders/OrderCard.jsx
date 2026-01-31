import { FaCheckDouble } from "react-icons/fa6";
import { FaCircle, FaLongArrowAltRight } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";
import { fetchDateTime, getAvatarName } from "../../utils";
import OrderItemsModal from "./OrderItemsModal";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function OrderCard({ order }) {
  const [showModal, setShowModal] = useState(false);

  // Show max 3 items, then show "+X more items"
  const MAX_VISIBLE_ITEMS = 3;
  const visibleItems = order.items.slice(0, MAX_VISIBLE_ITEMS);
  const remainingCount = order.items.length - MAX_VISIBLE_ITEMS;

  return (
    <>
      <div className="w-[500px] bg-[var(--bg-card)] p-5 rounded-xl mb-4 h-fit border border-[var(--border-default)] hover:border-[var(--color-primary)]/40 transition-all duration-300 shadow-[var(--shadow-card)]">
        {/* Customer Header */}
        <div className="flex items-center gap-5">
          <button className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] p-3 text-xl rounded-xl font-bold shadow-md text-white">
            {getAvatarName(order.customerDetails.name) || "CN"}
          </button>
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col items-start">
              <h1 className="max-text text-[var(--text-primary)] text-lg font-semibold tracking-wide">
                {order.customerDetails.name}
              </h1>
              <p className="max-text text-[var(--text-muted)] text-sm">
                #{Math.floor(new Date(order.orderDate).getTime())} / Dine in
              </p>
              <p className="text-[var(--text-muted)] text-sm flex items-center gap-1">
                Table <FaLongArrowAltRight className="text-[var(--text-dim)] mx-1" />
                <span className="text-[var(--color-accent)] font-semibold">{order?.table?.tableNo}</span>
              </p>
            </div>

            {/* Status Badge */}
            <div className="flex flex-col items-end gap-2">
              {order.orderStatus === "Ready" ? (
                <>
                  <p className="flex items-center gap-2 text-[var(--color-success)] bg-[var(--color-success)]/15 px-3 py-1.5 rounded-lg font-medium">
                    <FaCheckDouble /> {order.orderStatus}
                  </p>
                  <p className="flex items-center gap-2 text-[var(--text-muted)] text-sm">
                    <FaCircle className="text-[var(--color-success)] text-xs" /> Ready to serve
                  </p>
                </>
              ) : (
                <>
                  <p className="flex items-center gap-2 text-[var(--color-warning)] bg-[var(--color-warning)]/15 px-3 py-1.5 rounded-lg font-medium">
                    <MdOutlineTimer className="text-lg" /> {order.orderStatus}
                  </p>
                  <p className="flex items-center gap-2 text-[var(--text-muted)] text-sm">
                    <MdOutlineTimer className="text-[var(--color-warning)] text-xs" /> Preparing your order
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Order Items Section */}
        <div className="mt-4 p-3 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-default)]">
          <div className="space-y-2">
            {visibleItems.map((item, index) => (
              <div
                key={item.id || index}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-semibold text-xs">
                    {item.quantity}x
                  </span>
                  <span className="text-[var(--text-primary)] font-medium">{item.name}</span>
                </div>
                <span className="text-[var(--text-secondary)]">${item.price?.toFixed(2) || '0.00'}</span>
              </div>
            ))}
          </div>

          {/* Show More Items Link */}
          {remainingCount > 0 && (
            <button
              onClick={() => setShowModal(true)}
              className="mt-3 text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-light)] font-medium cursor-pointer transition-colors duration-200 flex items-center gap-1"
            >
              +{remainingCount} more item{remainingCount > 1 ? 's' : ''}
              <span className="text-xs text-[var(--text-muted)]">• Click to view all</span>
            </button>
          )}
        </div>

        <div className="flex items-center justify-between mt-4 text-[var(--text-muted)]">
          <span className="text-sm">{fetchDateTime(order.updatedAt)}</span>
          <button
            onClick={() => setShowModal(true)}
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            {order.items.length} items total
          </button>
        </div>

        <hr className="w-full mt-4 border-[var(--border-subtle)]" />

        <div className="text-[var(--text-primary)] flex items-center justify-between mt-4">
          <h1 className="text-xl font-bold">Total</h1>
          <p className="text-xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">
            ${order?.bills?.totalWithTax?.toFixed(2) || '0.00'}
          </p>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <OrderItemsModal
            order={order}
            onClose={() => setShowModal(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
