import { Search } from "lucide-react";
import { Input } from "@/shared/components/ui/input";

interface TypePageSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  resultCount?: number;
}

export function TypePageSearch({
  searchTerm,
  onSearchChange,
  resultCount,
}: TypePageSearchProps) {
  return (
    <div className="max-w-md">
      <div className="relative">
        <Search className="absolute  left-3 top-1/2 -translate-y-1/2 h-5 w-5" />
        <Input
          type="text"
          placeholder="Search Pokémon by name..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-12 bg-white/20 border-none placeholder:text-white/50 text-white focus:ring-0 focus-visible:ring-0 drop-shadow-md"
        />
      </div>
      {searchTerm && resultCount !== undefined && (
        <p className="mt-2 text-sm text-white/80 drop-shadow">
          Found {resultCount} matching Pokémon
        </p>
      )}
    </div>
  );
}

