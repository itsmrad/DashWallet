import React from "react";
import { SiBlockchaindotcom } from "react-icons/si";
import { ModeToggle } from "./mode-toggle";

export function Navbar() {
  return (
    <nav className="w-full py-5 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <SiBlockchaindotcom size={32} />
        <h1 className="text-2xl font-bold">Dash Wallet</h1>
      </div>
      <div>
        <ModeToggle />
      </div>
    </nav>
  );
}
