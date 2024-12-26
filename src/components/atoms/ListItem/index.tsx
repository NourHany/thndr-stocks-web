import { Ticker } from "../../../shared/types";
import "./ListItem.scss";

type ListItemProps = {
  item: Ticker;
};

const ListItem = ({ item }: ListItemProps) => {
  return (
    <div className="item flex flex-col justify-center items-center p-4 bg-white text-black rounded-xl m-2">
      <div>Ticker: {item.ticker}</div>
      <div>Name: {item.name}</div>
    </div>
  );
};

export default ListItem;
