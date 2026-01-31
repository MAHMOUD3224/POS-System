// import { orders } from "../../constants";
import { GrUpdate } from "react-icons/gr";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; // todos: تحذير مهم: keepPreviousData مش حاجة تتستورد من المكتبة. هو خيار (option) بتمرره لـ useQuery، مش export.
import { getOrders, updateOrderStatus } from "../../https/index";
import { fetchDateTime, messageEnqueue } from "../../utils";

const RecentOrders = () => {
  const queryClient = useQueryClient(); // هنحتاجه عشان نحدث الكاش
  const handleStatusChange = ({ orderId, orderStatus }) => {
    console.log(orderId)
    orderStatusUpdateMutation.mutate({ orderId, orderStatus });
  };

  const orderStatusUpdateMutation = useMutation({
    mutationFn: ({ orderId, orderStatus }) => updateOrderStatus({ orderId, orderStatus }),
    onSuccess: (data) => {
      messageEnqueue({ message: "Order status updated successfully!" }, 'success')
      queryClient.invalidateQueries(["orders"]); // Refresh order list
      console.log(data.data.message)
    },
    onError: () => {
      messageEnqueue({ message: "Failed to update order status!" }, 'error')
    }
  })

  const { data: resData, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      return await getOrders();
    },
    placeholderData: keepPreviousData,
  });

  if (isError) {
    messageEnqueue({ message: "Something went wrong!" }, "error")
  }

  // setTimeout(() => {
  //       console.log(resData.data.data);
  // }, 3000)

  return (
    <div className="bg-[var(--bg-card)] p-6 rounded-3xl border border-[var(--border-default)] shadow-[var(--shadow-lg)] transition-all duration-300">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-[var(--text-primary)] text-2xl font-bold tracking-tight">
          Recent Orders
        </h2>
        <div className="bg-[var(--bg-secondary)] p-2 rounded-xl border border-[var(--border-default)]">
          <GrUpdate className="text-[var(--color-primary)] cursor-pointer hover:rotate-180 transition-transform duration-500" />
        </div>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[var(--bg-primary)] border-y border-[var(--border-default)]">
              <th className="px-6 py-4 text-[var(--text-secondary)] font-bold text-xs uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-4 text-[var(--text-secondary)] font-bold text-xs uppercase tracking-wider">Customer</th>
              <th className="px-6 py-4 text-[var(--text-secondary)] font-bold text-xs uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-[var(--text-secondary)] font-bold text-xs uppercase tracking-wider">Date & Time</th>
              <th className="px-6 py-4 text-[var(--text-secondary)] font-bold text-xs uppercase tracking-wider text-center">Items</th>
              <th className="px-6 py-4 text-[var(--text-secondary)] font-bold text-xs uppercase tracking-wider">Table</th>
              <th className="px-6 py-4 text-[var(--text-secondary)] font-bold text-xs uppercase tracking-wider text-right">Total</th>
              <th className="px-6 py-4 text-[var(--text-secondary)] font-bold text-xs uppercase tracking-wider">Payment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)]">
            {resData?.data.data.map((order, index) => (
              <tr
                key={order._id || index}
                className="hover:bg-[var(--bg-hover)] transition-colors duration-200 group"
              >
                <td className="px-6 py-5 text-[var(--text-primary)] font-mono text-sm">
                  #{Math.floor(new Date(order.orderDate).getTime()).toString().slice(-8)}
                </td>
                <td className="px-6 py-5">
                  <span className="text-[var(--text-primary)] font-bold">{order.customerDetails.name}</span>
                </td>
                <td className="px-6 py-5">
                  <select
                    className={`bg-[var(--bg-secondary)] border border-[var(--border-default)] p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all font-bold text-sm cursor-pointer ${order.orderStatus === "Ready"
                        ? "text-[var(--color-success)]"
                        : "text-[var(--color-warning)]"
                      }`}
                    value={order.orderStatus}
                    onChange={(e) => handleStatusChange({ orderId: order._id, orderStatus: e.target.value })}
                  >
                    <option className="bg-[var(--bg-card)] text-[var(--color-warning)]" value="In Progress">
                      In Progress
                    </option>
                    <option className="bg-[var(--bg-card)] text-[var(--color-success)]" value="Ready">
                      Ready
                    </option>
                  </select>
                </td>
                <td className="px-6 py-5 text-[var(--text-muted)] text-sm">{fetchDateTime(order.orderDate)}</td>
                <td className="px-6 py-5 text-center">
                  <span className="px-3 py-1 bg-[var(--bg-primary)] rounded-full text-[var(--text-primary)] text-xs font-bold border border-[var(--border-default)]">
                    {order.items.length} Items
                  </span>
                </td>
                <td className="px-6 py-5">
                  <span className="text-[var(--color-primary)] font-bold px-3 py-1 bg-[var(--color-primary)]/10 rounded-lg">
                    {order.table?.tableNo}
                  </span>
                </td>
                <td className="px-6 py-5 text-right font-bold text-[var(--text-primary)]">
                  ${order.bills.totalWithTax.toFixed(2)}
                </td>
                <td className="px-6 py-5">
                  <span className="text-[var(--text-secondary)] text-sm font-medium">{order.paymentMethod}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;