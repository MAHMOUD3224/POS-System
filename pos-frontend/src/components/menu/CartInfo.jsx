import React, { useEffect, useRef } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaNotesMedical } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../../redux/slices/cartSlice";

const CartInfo = () => {
  const cartData = useSelector((state) => state.cart);
  const scrolLRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (scrolLRef.current) {
      scrolLRef.current.scrollTo({
        top: scrolLRef.current.scrollHeight,
        behavior: "smooth"
      })
    }
  }, [cartData]);

  const handleRemove = (itemId) => {
    dispatch(removeItem(itemId));
  }

  return (
    <div className="px-4 py-2">
      <h1 className="text-lg text-[var(--text-primary)] font-semibold tracking-wide">
        Order Details
      </h1>
      <div className="mt-4 overflow-y-auto  h-[380px]" ref={scrolLRef} >
        {cartData.length === 0 ? (
          <p className="text-[var(--text-muted)] text-sm flex justify-center items-center h-[380px]">Your cart is empty. Start adding items!</p>
        ) : cartData.map((item, index) => {
          return (
            <div key={index} className="bg-[var(--bg-secondary)] rounded-lg px-4 py-4 mb-2 border border-[var(--border-subtle)]">
              <div className="flex items-center justify-between">
                <h1 className="text-[var(--text-secondary)] font-semibold tracling-wide text-md">
                  {item.name}
                </h1>
                <p className="text-[var(--text-muted)] font-semibold">x{item.quantity}</p>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-3">
                  <RiDeleteBin2Fill
                    onClick={() => handleRemove(item.id)}
                    className="text-[var(--text-muted)] hover:text-[var(--color-error)] transition-colors cursor-pointer"
                    size={20}
                  />
                  <FaNotesMedical
                    className="text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-colors cursor-pointer"
                    size={20}
                  />
                </div>
                <p className="text-[var(--text-primary)] text-md font-bold">${item.price}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CartInfo;