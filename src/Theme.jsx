import React, { useState, useEffect } from "react";

function Theme() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light"; // ใช้ธีมที่ถูกบันทึกไว้หรือใช้ธีมเริ่มต้นเป็น "light"
  });

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="theme">
      <div className="theme-button" onClick={() => toggleTheme("light")}>
        <ion-icon name="sunny"></ion-icon>
        <p>Light</p>
      </div>
      <div className="theme-button" onClick={() => toggleTheme("dark")}>
        <ion-icon name="moon"></ion-icon>
        <p>Dark</p>
      </div>
    </div>
  );
}

export default Theme;
