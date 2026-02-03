import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export default function () {
	return (
		<div className="flex flex-col items-center justify-center space-y-4 text-center my-20">
			<h1 className="text-4xl text-primary font-bold">
				Create your first wallet today
			</h1>
			<h2 className="text-xl text-primary/70">
				Choose a blockchain to get started
			</h2>
			<div className="flex gap-4 mt-4">
				<Link
					href="/wallet/ethereum"
					className={cn(buttonVariants({ variant: "default" }), "cursor-pointer w-32 h-10 bg-white font-semibold")}
        >
					Ethereum
				</Link>
        <Link
					href="/wallet/solana"
					className={cn(buttonVariants({ variant: "default" }), "cursor-pointer w-32 h-10 bg-white font-semibold")}
        >
					Solana
				</Link>
			</div>
		</div>
	);
}
