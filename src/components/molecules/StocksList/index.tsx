import { Ticker } from "../../../shared/types";
import ListItem from "../../atoms/ListItem";

type StocksListProps = {
  items: Ticker[];
};

const StocksList = ({ items }: StocksListProps) => {
  return (
    <div className="mt-3 lg:mx-10 mx-5 flex items-center flex-wrap gap-2">
      {items.map((item, index) => (
        <ListItem key={`${item.name} - ${index}`} item={item} />
      ))}
    </div>
  );
};

export default StocksList;
