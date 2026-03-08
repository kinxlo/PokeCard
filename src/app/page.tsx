"use client"

import {CustomButton, ThemeSwitcher} from "@/shared/components";
import {useGetPokemon} from "@/shared/services/app/app.query";

export default function Home() {
  const {data} = useGetPokemon();
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 px-6 py-8">
      <div className="flex items-center justify-end">
        <ThemeSwitcher/>
      </div>

      <p>
        Hello world! This is the home page.
      </p>
      <CustomButton>Click me</CustomButton>
    </div>
  );
}
