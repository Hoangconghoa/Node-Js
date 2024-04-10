import { BiCart } from "react-icons/bi";

const Header = () => {
  return (
    <div className="bg-slate-300 mx-auto my-8 p-2">
      <nav className="flex flex-row justify-between items-center max-w-screen-2xl">
        <div className="logo basis-2/6 text-center text-xl font-semibold">
          SamSung-Shop
        </div>
        <div className="menu basis-3/6">
          <ul className="flex gap-8 font-semiboldbold uppercase">
            <li className="p-2 hover:bg-slate-400">
              <a href="#">Home</a>
            </li>
            <li className="p-2 hover:bg-slate-400">
              <a href="#">Product</a>
            </li>
            <li className="p-2 hover:bg-slate-400">
              <a href="#">Category</a>
            </li>
            <li className="p-2 hover:bg-slate-400">
              <a href="#">About</a>
            </li>
            <li className="p-2 hover:bg-slate-400">
              <a href="#">Help</a>
            </li>
          </ul>
        </div>
        <div className="cart basis-1/6 flex justify-center items-center">
          <a href="#"> Cart </a>
          <BiCart />
        </div>
      </nav>
    </div>
  );
};

export default Header;
