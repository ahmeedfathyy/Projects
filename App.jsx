import React, { useState, useEffect } from "react";

const getMockPrice = () => {
  return parseFloat((Math.random() * 100 + 50).toFixed(2));
};

const App = () => {
  const [investments, setInvestments] = useState(() => {
    const saved = localStorage.getItem("portfolio");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    symbol: "",
    quantity: "",
    purchasePrice: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addInvestment = () => {
    if (!form.symbol || !form.quantity || !form.purchasePrice) return;

    const newInvestment = {
      ...form,
      quantity: parseFloat(form.quantity),
      purchasePrice: parseFloat(form.purchasePrice),
      currentPrice: getMockPrice(),
    };

    const updated = [...investments, newInvestment];
    setInvestments(updated);
    localStorage.setItem("portfolio", JSON.stringify(updated));

    setForm({ symbol: "", quantity: "", purchasePrice: "" });
  };

  const totalInvested = investments.reduce(
    (acc, inv) => acc + inv.quantity * inv.purchasePrice,
    0
  );

  const totalValue = investments.reduce(
    (acc, inv) => acc + inv.quantity * inv.currentPrice,
    0
  );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">💰 Investment Tracker</h1>

      <div className="bg-gray-100 p-4 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">Add Investment</h2>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <input
            name="symbol"
            placeholder="Symbol (e.g. AAPL)"
            className="p-2 border rounded"
            value={form.symbol}
            onChange={handleChange}
          />
          <input
            name="quantity"
            type="number"
            placeholder="Quantity"
            className="p-2 border rounded"
            value={form.quantity}
            onChange={handleChange}
          />
          <input
            name="purchasePrice"
            type="number"
            placeholder="Purchase Price"
            className="p-2 border rounded"
            value={form.purchasePrice}
            onChange={handleChange}
          />
        </div>
        <button
          onClick={addInvestment}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">📊 Portfolio</h2>
        {investments.length === 0 ? (
          <p>No investments added yet.</p>
        ) : (
          <div className="space-y-4">
            {investments.map((inv, index) => {
              const invested = inv.quantity * inv.purchasePrice;
              const current = inv.quantity * inv.currentPrice;
              return (
                <div
                  key={index}
                  className="p-4 border rounded shadow-sm bg-white"
                >
                  <h3 className="text-lg font-bold">{inv.symbol.toUpperCase()}</h3>
                  <p>Quantity: {inv.quantity}</p>
                  <p>Purchase Price: ${inv.purchasePrice.toFixed(2)}</p>
                  <p>Current Price: ${inv.currentPrice.toFixed(2)}</p>
                  <p>Invested: ${invested.toFixed(2)}</p>
                  <p>Current Value: ${current.toFixed(2)}</p>
                  <p>
                    Gain/Loss:{" "}
                    <span
                      className={
                        current - invested >= 0 ? "text-green-600" : "text-red-600"
                      }
                    >
                      ${(current - invested).toFixed(2)}
                    </span>
                  </p>
                </div>
              );
            })}
            <div className="p-4 border-t">
              <h3 className="text-lg font-bold">💼 Summary</h3>
              <p>Total Invested: ${totalInvested.toFixed(2)}</p>
              <p>Total Value: ${totalValue.toFixed(2)}</p>
              <p>
                Overall Gain/Loss:{" "}
                <span
                  className={
                    totalValue - totalInvested >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  ${(totalValue - totalInvested).toFixed(2)}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
