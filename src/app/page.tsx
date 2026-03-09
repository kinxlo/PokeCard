"use client";

import {HomeTypeGrid} from "@/shared/components/home-type-grid";

export default function Home() {
  return (
    <div className="h-full overflow-y-auto hide-scrollbar">
      <div className="mx-auto">
        <HomeTypeGrid/>
      </div>
    </div>
  );
}
