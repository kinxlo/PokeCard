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
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70" />
        <Input
          type="text"
          placeholder="Search Pokémon by name..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-11 h-12 text-base bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 focus:border-white/50"
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

