import { SignInForm } from "@/components/forms/sign-in";
import NoAuthHeader from "@/components/layout/Header/NoAuthHeader";
import React, { Suspense } from "react";

function page() {
  return (
    <div className="w-full h-screen flex  flex-col  gap-x-8 gap-y-16">
      <Suspense>
        <NoAuthHeader />
      </Suspense>

      <SignInForm />
    </div>
  );
}

export default page;
