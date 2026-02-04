import { Keypair } from "@solana/web3.js";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";

export function generateWallet(num: number) {
  const mnemonic = generateMnemonic();
  const seed = mnemonicToSeedSync(mnemonic);
  console.log("Seed: ", seed.toString("hex"));
  const path = `m/44'/501'/${num}'/0'`; // This is the derivation path
  const derivedSeed = derivePath(path, seed.toString("hex")).key;
  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;

  return {
    mnemonic,
    privateKey: Buffer.from(secret).toString("hex"),
    publicKey: Keypair.fromSecretKey(secret).publicKey.toBase58(),
  };
}

export function importWallet(mnemonic: string, num: number) {
  const seed = mnemonicToSeedSync(mnemonic);
  console.log("Seed: ", seed.toString("hex"));
  const path = `m/44'/501'/${num}'/0'`; // This is the derivation path
  const derivedSeed = derivePath(path, seed.toString("hex")).key;
  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;

  return {
    mnemonic,
    privateKey: Buffer.from(secret).toString("hex"),
    publicKey: Keypair.fromSecretKey(secret).publicKey.toBase58(),
  };
}