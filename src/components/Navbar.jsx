import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import NavItems from "./NavItems";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between h-16 border-b px-[14rem] max-sm:px-3">
      <div className="flex items-center gap-5">
        <h1 className="font-mono text-2xl">BackIt 📦</h1>
        <div className="ml-[5rem] max-sm:hiddenj">
          <NavItems />
        </div>
      </div>
      <div>
        <header>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </header>
      </div>
    </div>
  );
};

export default Navbar;
