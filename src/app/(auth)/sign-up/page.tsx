import { SignUnForm } from "@/components/forms/sign-up";
import NoAuthHeader from "@/components/layout/Header/NoAuthHeader";

import React, { Suspense } from "react";

function page() {
  return (
    <div className="w-full bg-white min-h-screen h-full ">
      <Suspense>
        <NoAuthHeader />
      </Suspense>

      <SignUnForm />
    </div>
  );
}

export default page;
