import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/user/user.context";

let rootRSI;

export default function RSI() {
  const [loading, setLoading] = useState(false);
  const { rsi, setRSI, isLoggedIn } = useContext(UserContext);

  const defaultStyles = {
    position: "fixed",
    color: "white",
    fontFamily: "SF Mono, Courier New, monospace",
    fontSize: "0.75rem",
    backgroundColor: "black",
    zIndex: "100000000",
  };

  const leftBottom = {
    left: "1rem",
    bottom: "1rem",
  };

  const leftTop = {
    left: "1rem",
    bottom: "1rem",
  };

  const rightTop = {
    left: "1rem",
    bottom: "1rem",
  };

  const rightBottom = {
    left: "1rem",
    bottom: "1rem",
  };

  const bottom = () => ({
    bottom: "1rem",
    left: `${Math.floor(Math.random() * 100)}%`,
    transform: "translateXY(-50%, 0)",
  });

  const top = {
    top: "1rem",
    left: `${Math.floor(Math.random() * 100)}%`,
    transform: "translateXY(-50%, 0)",
  };

  const posStyles = [leftBottom, leftTop, rightTop, rightBottom, bottom, top];
  const initialRandom = posStyles[Math.floor(posStyles.length * Math.random())];

  const [randomStyles, setRandomStyles] = useState(initialRandom);

  useEffect(() => {
    const interval = setInterval(() => {
      const rand = Math.floor(posStyles.length * Math.random());
      setRandomStyles(
        typeof posStyles[rand] === "function" // @ts-ignore
          ? posStyles[rand]()
          : posStyles[rand],
      );
      setRSI(rootRSI);
    }, 35000);
    return () => {
      clearInterval(interval);
    }; // @ts-ignore
  }, []); // @ts-ignore

  const getRSI = async () => {
    const result = await api.fetchRSI();
    if (result.rsi) {
      rootRSI = result.rsi;
      setRSI(result.rsi);
    } else {
      setTimeout(() => {
        // Retry in 10 seconds
        setLoading(false);
      }, 10000);
    }
  };

  useEffect(() => {
    if (loading || rsi || !isLoggedIn) return;
    setLoading(true);
    getRSI();
    // @ts-ignore
  }, [rsi, isLoggedIn]); // @ts-ignore

  const RSIComponent = ({ code, style }) => (
    <div
      className="fade-in-out"
      style={{
        ...defaultStyles,
        ...style,
      }}
    >
      {code}
    </div>
  );

  return RSIComponent ? (
    <RSIComponent code={rsi} style={randomStyles} />
  ) : (
    <div />
  );
}
