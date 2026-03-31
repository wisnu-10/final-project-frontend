import { BackLinkProps } from "@/types/props.dto";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";



export default function backLink({link, page}: BackLinkProps){
    return (
      <Link
        href={link}
        className=" flex items-center gap-2 text-sm text-gray-600 hover:text-[#FF6B4A] transition-colors group"
      >
        <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to {page}
      </Link>
    );
}