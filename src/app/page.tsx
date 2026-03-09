"use client";

import {HomeTypeGrid} from "@/shared/components/home-type-grid";

export default function Home() {
  return (
    <div className="h-full overflow-y-auto p-5">
      <div className="mx-auto max-w-360">
        <HomeTypeGrid/>
      </div>
    </div>
  );
}
