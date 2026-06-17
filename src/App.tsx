import { useCallback, useEffect, useState } from "react";

const sleep = (ms: number = 0) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// gateway interface
interface CounterGateway {
  getCount: () => Promise<number>;
  incrementCount: () => Promise<number>;
  decrementCount: () => Promise<number>;
}

// in-memory state
let inMemoryStorage = 5;

function App() {
  // entities unit
  const [count, setCount] = useState<number>(0);

  // gateway unit
  const getCount: CounterGateway["getCount"] = useCallback(async () => {
    if (import.meta.env.DEV) {
      await sleep(500);
      return inMemoryStorage;
    }
    const response = await fetch("/api/counter");
    if (!response.ok) {
      throw new Error("Failed to fetch count");
    }
    const data = await response.json();
    return data.value;
  }, []);

  const incrementCount: CounterGateway["incrementCount"] =
    useCallback(async () => {
      if (import.meta.env.DEV) {
        await sleep(500);
        inMemoryStorage += 1;
        return inMemoryStorage;
      }
      const response = await fetch("/api/counter/increment", {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to increment count");
      }
      const data = await response.json();
      return data.value;
    }, []);

  const decrementCount: CounterGateway["decrementCount"] =
    useCallback(async () => {
      if (import.meta.env.DEV) {
        await sleep(500);
        inMemoryStorage -= 1;
        return inMemoryStorage;
      }
      const response = await fetch("/api/counter/decrement", {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to decrement count");
      }
      const data = await response.json();
      return data.value;
    }, []);

  // presenter unit
  const countValue = count;
  const countStatus =
    count === 0 ? "Zero" : count > 0 ? "Positive" : "Negative";

  // NOTE: controller unit
  const onIncrementButtonClick = async (): Promise<void> => {
    const remoteCount = await incrementCount();
    setCount(remoteCount);
  };
  const onDecrementButtonClick = async (): Promise<void> => {
    const remoteCount = await decrementCount();
    setCount(remoteCount);
  };
  const onAppMount = async (): Promise<void> => {
    const remoteCount = await getCount();
    setCount(remoteCount);
  };

  // view unit lifecycle hook
  useEffect(() => {
    onAppMount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // view unit
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-sm w-full">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Counter App</h1>

        {/* Counter Value Display */}
        <div className="bg-gray-50 rounded-xl py-8 mb-8 border-2 border-gray-200">
          <span className="text-6xl font-bold text-indigo-600">
            {countValue}
          </span>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-4 justify-center mb-6">
          <button
            onClick={onDecrementButtonClick}
            className="w-16 h-16 bg-red-500 hover:bg-red-600 text-white text-2xl font-bold rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
          >
            -
          </button>

          <button
            onClick={onIncrementButtonClick}
            className="w-16 h-16 bg-green-500 hover:bg-green-600 text-white text-2xl font-bold rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
          >
            +
          </button>
        </div>

        {/* Output */}
        <p className="text-gray-500 text-sm mt-6">
          Status: <span className={`font-semibold`}>{countStatus}</span>
        </p>
      </div>
    </div>
  );
}

export default App;
