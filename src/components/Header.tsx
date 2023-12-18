import Link from "next/link";
import HeaderAuth from "./HeaderAuth";
import paths from "@/path";

export default function Header() {
    return (
        <section className="flex items-center justify-between mt-5 px-20 py-5 rounded-lg shadow-lg">
            <Link href={paths.homePage()} className="font-bold text-2xl"> Discuss </Link>
            <input type="text" placeholder="search" className="border border-slate-600 py-2 px-3 rounded-lg outline-none" />
            {/* delgating auth dynamic functionality to a client component. since This component wraps all pages. */}
            <HeaderAuth />
        </section>
    )
}
