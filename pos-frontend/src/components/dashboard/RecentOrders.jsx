// import { orders } from "../../constants";
import { GrUpdate } from "react-icons/gr";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; // todos: تحذير مهم: keepPreviousData مش حاجة تتستورد من المكتبة. هو خيار (option) بتمرره لـ useQuery، مش export.
import { getOrders, updateOrderStatus } from "../../https/index";
import { fetchDateTime, messageEnqueue } from "../../utils";

const RecentOrders = () => {
  const queryClient = useQueryClient(); // هنحتاجه عشان نحدث الكاش
  const handleStatusChange = ({orderId, orderStatus}) => {
    console.log(orderId)
    orderStatusUpdateMutation.mutate({orderId, orderStatus});
  };

  const orderStatusUpdateMutation = useMutation({
    mutationFn: ({orderId, orderStatus}) => updateOrderStatus({orderId, orderStatus}),
    onSuccess: (data) => {
      messageEnqueue({message:"Order status updated successfully!"},'success')
      queryClient.invalidateQueries(["orders"]); // Refresh order list
      console.log(data.data.message)
    },
    onError: () => {
      messageEnqueue({message:"Failed to update order status!"},'error')
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
    messageEnqueue({message:"Something went wrong!"},"error")
  }

  // setTimeout(() => {
  //       console.log(resData.data.data);
  // }, 3000)

  return (
    <div className="container mx-auto bg-[#262626] p-4 rounded-lg">
      <h2 className="text-[#f5f5f5] text-xl font-semibold mb-4">
        Recent Orders
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[#f5f5f5]">
          <thead className="bg-[#333] text-[#ababab]">
            <tr>
              <th className="text-center min-w-[120px] py-2">Order ID</th>
              <th className="text-center min-w-[120px] py-2">Customer</th>
              <th className="text-center min-w-[120px] py-2">Status</th>
              <th className="text-center min-w-[120px] py-2">Date & Time</th>
              <th className="text-center min-w-[120px] py-2">Items</th>
              <th className="text-center min-w-[120px] py-2">Table No</th>
              <th className="text-center min-w-[120px] py-2">Total</th>
              <th className="text-center min-w-[120px] py-2">Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {resData?.data.data.map((order, index) => (
              <tr
                key={index}
                className="border-b border-gray-600 hover:bg-[#333]"
              >
                <td className="p-4">#{Math.floor(new Date(order.orderDate).getTime())}</td>
                <td className="p-4">{order.customerDetails.name}</td>
                <td className="p-4">
                  <select
                    className={`bg-[#1a1a1a] text-[#f5f5f5] border border-gray-500 p-2 rounded-lg focus:outline-none ${
                      order.orderStatus === "Ready"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                    value={order.orderStatus}
                    onChange={(e) => handleStatusChange({orderId: order._id, orderStatus: e.target.value})}
                  >
                    <option className="text-yellow-500" value="In Progress">
                      In Progress
                    </option>
                    <option className="text-green-500" value="Ready">
                      Ready
                    </option>
                  </select>
                </td>
                <td className="p-4">{fetchDateTime(order.orderDate)}</td>
                <td className="p-4">{order.items.length} Items</td>
                <td className="p-4">Table - {order.table?.tableNo}</td>
                <td className="p-4">${order.bills.totalWithTax}</td>
                <td className="p-4">
                  {order.paymentMethod}
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