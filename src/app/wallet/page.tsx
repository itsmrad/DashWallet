"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MnemonicWordSlot } from "@/utils/generateMnemonic";
import { generateWallet, importWallet } from "@/utils/generateWallet";

interface Wallet {
	mnemonic: string;
	privateKey: string;
	publicKey: string;
}

export default function page() {
	const [mnemonicWords, setMnemonicWords] = useState<string[]>(
		Array(12).fill(""),
	);

	const handleWordChange = (index: number, value: string) => {
		const newWords = [...mnemonicWords];
		newWords[index] = value;
		setMnemonicWords(newWords);
	};

	const handlePastePhrase = (startIndex: number, words: string[]) => {
		const newWords = [...mnemonicWords];
		for (let i = 0; i < words.length && startIndex + i < 12; i++) {
			newWords[startIndex + i] = words[i].slice(0, 8); // Ensure max 8 chars per word
		}
		setMnemonicWords(newWords);
	};

	const [currentView, setCurrentView] = useState<"create" | "import">();
	const [walletId, setWalletId] = useState(1);
	const [wallets, setWallets] = useState<Wallet[]>([]);

	function handleCreateWallet() {
		const newWallet = generateWallet(walletId);
		console.log("Generated Wallet: ", newWallet);
		setWallets((prevWallets) => [...prevWallets, newWallet]);
		setWalletId(walletId + 1);
	}
  
  function handleImportWallet() {
    const mnemonic = mnemonicWords.join(" ").trim();
    importWallet(mnemonic, walletId);
    const newWallet = importWallet(mnemonic, walletId);
    setWallets((prevWallets) => [...prevWallets, newWallet]);
    setWalletId(walletId + 1);
  }

	return (
		<div className="flex flex-col w-full h-full">
			<div className="pt-20 flex flex-col items-center justify-center">
				<h1 className="text-5xl font-bold text-center">Get Your Wallet</h1>
				<div className="w-full flex items-center justify-center border-neutral-400 rounded-lg ">
					<div className="w-80 h-40 flex items-center justify-center">
						<Button
							variant={"outline"}
							onClick={() => setCurrentView("import")}
							className="m-4 w-50 h-15 text-2xl cursor-pointer">
							Import Wallet
						</Button>
					</div>
					<span className="text-xl font-bold">OR</span>
					<div className="w-80 h-40 flex items-center justify-center">
						<Button
							variant={"outline"}
							onClick={() => setCurrentView("create")}
							className="m-4 w-50 h-15 text-2xl cursor-pointer">
							Create Wallet
						</Button>
					</div>
				</div>
			</div>

			<div className="relative flex-1 w-full overflow-hidden flex flex-col items-center justify-start">
				<div
					className={`flex flex-col items-center justify-center w-full transition-all duration-500 ease-in-out ${
						currentView === "create"
							? "opacity-100 translate-y-0"
							: "opacity-0 -translate-y-4 absolute pointer-events-none"
					}`}>
					{wallets.length === 0 ? (
						<div className="flex flex-col items-center">
							<h1 className="text-3xl font-bold mb-4">Create New Wallet</h1>
							<Button
								onClick={handleCreateWallet}
								className="px-6 py-3 text-lg cursor-pointer">
								Generate Wallet
							</Button>
						</div>
					) : (
						<div className="flex flex-col items-center w-full w-full mb-20">
							<h1 className="text-3xl font-bold mb-4">Your Wallet</h1>
							{wallets.map((wallet, index) => (
								<div
									key={index}
									className="border rounded-lg p-4 mb-4 w-full">
									<h3 className="text-xl font-semibold mb-2">
										Wallet {index + 1}
									</h3>
									<div className="mb-2">
										<strong>Public Key:</strong>
										<p className="break-all text-sm p-2 rounded">
											{wallet.publicKey}
										</p>
									</div>
									<div className="mb-2">
										<strong>Private Key:</strong>
										<p className="break-all text-sm p-2 rounded">
											{wallet.privateKey}
										</p>
									</div>
									<div>
										<strong>Mnemonic:</strong>
										<p className="break-all text-sm p-2 rounded">
											{wallet.mnemonic}
										</p>
									</div>
								</div>
							))}
							<Button
								onClick={handleCreateWallet}
								variant="outline"
								className="mt-4 cursor-pointer">
								Create Another Wallet
							</Button>
						</div>
					)}
				</div>

				<div
					className={`flex flex-col items-center justify-center w-full transition-all duration-500 ease-in-out ${
						currentView === "import"
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-4 absolute pointer-events-none"
					}`}>
					<h1 className="text-3xl font-bold">Enter Your Secret Recovery Phrase</h1>
					<div className="grid grid-cols-6 gap-4 mt-6">
						{Array.from({ length: 12 }, (_, i) => (
							<MnemonicWordSlot
								key={i}
								index={i}
								value={mnemonicWords[i]}
								onChange={(value) => handleWordChange(i, value)}
								onPastePhrase={handlePastePhrase}
							/>
						))}
					</div>
          <Button onClick={handleImportWallet} className="mt-6 cursor-pointer">Import Wallet</Button>
          {wallets.map((wallet, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 mb-4 w-full">
              <h3 className="text-xl font-semibold mb-2">
                Wallet {index + 1}
              </h3>
              <div className="mb-2">
                <strong>Public Key:</strong>
                <p className="break-all text-sm p-2 rounded">
                  {wallet.publicKey}
                </p>
              </div>
              <div className="mb-2">
                <strong>Private Key:</strong>
                <p className="break-all text-sm p-2 rounded">
                  {wallet.privateKey}
                </p>
              </div>
              <div>
                <strong>Mnemonic:</strong>
                <p className="break-all text-sm p-2 rounded">
                  {wallet.mnemonic}
                </p>
              </div>
            </div>
          ))}
				</div>
			</div>
		</div>
	);
}
