import React, { useState } from "react";
import { menus } from "../../constants";
import { GrRadialSelected } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItems } from "../../redux/slices/cartSlice";


const MenuContainer = () => {
  const [selected, setSelected] = useState(menus[0]);
  const [itemCount, setItemCount] = useState(0);
  const [itemId, setItemId] = useState();
  const dispatch = useDispatch();

  const increment = (id) => {
    setItemId(id);
    if (itemCount >= 4) return;
    setItemCount((prev) => prev + 1);
  };

  const decrement = (id) => {
    setItemId(id);
    if (itemCount <= 0) return;
    setItemCount((prev) => prev - 1);
  };

  const handleAddToCart = (item) => {
    if (itemCount === 0) return;

    const { name, price } = item;
    // todos make sure the data is seconds not like that Mon Jan 05 2026 21:00:54 
    const newObj = { id: new Date(), name, pricePerQuantity: price, quantity: itemCount, price: price * itemCount };
    dispatch(addItems(newObj));
    setItemCount(0);
  }


  return (
    <>
      <div className="grid grid-cols-4 gap-4 px-10 py-4 w-[100%]">
        {menus.map((menu) => {
          return (
            <div
              key={menu.id}
              className={`flex flex-col items-start ${menu.bgColor} justify-between p-4 rounded-lg h-[100px] cursor-pointer shadow-sm border border-[var(--border-default)] hover:border-[var(--color-primary)] transition-all`}
              onClick={() => {
                setSelected(menu);
                setItemId(0);
                setItemCount(0);
              }}
            >
              <div className="flex items-center justify-between w-full">
                <h1 className="text-[var(--text-primary)] text-lg font-semibold">
                  {menu.icon} {menu.name}
                </h1>
                {selected.id === menu.id && (
                  <GrRadialSelected className="text-[var(--text-primary)]" size={20} />
                )}
              </div>
              <p className="text-[var(--text-secondary)] text-sm font-semibold">
                {menu.items.length} Items
              </p>
            </div>
          );
        })}
      </div>

      <hr className="border-[var(--border-subtle)] border-t-2 mt-4" />

      <div className="responsive gap-4 px-10 py-4 w-[100%]">
        {selected?.items.map((item) => {
          return (
            <div
              key={item.id}
              className="flex flex-col items-start justify-between p-4 rounded-lg h-[150px] cursor-pointer hover:bg-[var(--bg-hover)] bg-[var(--bg-card)] border border-[var(--border-default)] transition-colors shadow-sm">
              <div className="flex items-start justify-between w-full">
                <h1 className="text-[var(--text-primary)] text-lg font-semibold">
                  {item.name}
                </h1>
                <button onClick={() => handleAddToCart(item)} className="bg-[var(--bg-secondary)] text-[var(--color-primary)] p-2 rounded-lg border border-[var(--border-default)] hover:bg-[var(--color-primary)] hover:text-white transition-colors"><FaShoppingCart size={20} /></button>
              </div>
              <div className="flex items-center justify-between w-full">
                <p className="text-[var(--text-primary)] text-xl font-bold">
                  ${item.price}
                </p>
                <div className="flex items-center justify-between bg-[var(--bg-secondary)] px-4 py-3 rounded-lg gap-6 w-[50%] border border-[var(--border-subtle)]">
                  <button
                    onClick={() => decrement(item.id)}
                    className="text-2xl text-[var(--color-warning)] hover:scale-110 transition-transform"
                  >
                    &minus;
                  </button>
                  <span className="text-[var(--text-primary)] font-bold">
                    {itemId == item.id ? itemCount : "0"}
                  </span>
                  <button
                    onClick={() => increment(item.id)}
                    className="text-2xl text-[var(--color-warning)] hover:scale-110 transition-transform"
                  >
                    &#43;
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MenuContainer;