/* eslint-disable react/no-unescaped-entities */
"use client";

import { Button } from "@/components/ui/button";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div className="relative">
          <div className="absolute">
            <div className="">
              <h1 className="my-2 text-gray-800 dark:text-white font-bold text-2xl">
                Looks like you've found the doorway to the great nothing
              </h1>
              <p className="my-2 text-gray-800 dark:text-gray-200 ">
                Sorry about that! Please visit our hompage to get where you need
                to go.
              </p>
              <Button
                size={"lg"}
                onClick={() => reset()}
                className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center  text-white focus:outline-none focus:ring-2  focus:ring-opacity-50"
              >
                Try again!
              </Button>
              <Button
                size={"lg"}
                variant={"ghost"}
                onClick={() => reset()}
                className="sm:w-full  ml-6 lg:w-auto my-2 border rounded md py-4 px-8 text-center  text-white focus:outline-none focus:ring-2  focus:ring-opacity-50"
              >
                Go to home
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
      </div>
    </div>
  );
}
