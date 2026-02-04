import { cn } from "@/lib/utils";

export function MnemonicWordSlot({
  index,
  className,
  value,
  onChange,
  onPastePhrase,
  placeholder = "word",
  ...props
}: Omit<React.ComponentProps<"input">, "onChange"> & {
  index: number;
  value?: string;
  onChange?: (value: string) => void;
  onPastePhrase?: (startIndex: number, words: string[]) => void;
}) {
  const handlePaste = (e: React.ClipboardEvent) => {
    const pastedText = e.clipboardData.getData("text");
    const words = pastedText.split(/\s+/).filter((word) => word.length > 0);

    if (words.length > 1 && onPastePhrase) {
      e.preventDefault();
      onPastePhrase(index, words);
    }
  };

  return (
    <div className="flex flex-col">
      <label className="text-xs text-gray-500 mb-1">{index + 1}</label>
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange?.(e.target.value)}
        onPaste={handlePaste}
        placeholder={placeholder}
        maxLength={8}
        className={cn(
          "w-32 h-10 px-3 py-2 border border-input bg-background text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
          className,
        )}
        {...props}
      />
    </div>
  );
}
