import { useEffect, useCallback } from "react";
import { ThreeDots } from "react-loader-spinner";
import { debounce } from "lodash";

import Header from "./components/molecules/Header";
import StocksList from "./components/molecules/StocksList";
import { useFetchStocks } from "./hooks/useFetchStocks";

const App = () => {
  const DEBOUNCE_DELAY = 1000;

  const { items, nextUrl, loading, error, getTickers, loadMore } =
    useFetchStocks();

  const debouncedSearch = useCallback(
    debounce((search: string) => {
      if (search === "") {
        getTickers();
        return;
      }
      getTickers(search);
    }, DEBOUNCE_DELAY),
    []
  );

  const handleSearch = useCallback(
    (search: string) => {
      debouncedSearch(search);
    },
    [debouncedSearch]
  );

  useEffect(() => {
    getTickers();
  }, [getTickers]);

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <Header onSearch={handleSearch} />

      <div className="flex flex-col justify-center items-center">
        <StocksList items={items} />

        {loading && (
          <ThreeDots
            height="80"
            width="80"
            color="white"
            ariaLabel="loading"
            visible
          />
        )}

        {error && <p className="text-red-500">{error}</p>}

        {items.length > 0 && nextUrl && !loading && (
          <button
            className="my-5 text-gray-800 bg-white w-[200px] h-[50px] rounded"
            onClick={loadMore}
            disabled={loading}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
