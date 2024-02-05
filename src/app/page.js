import Image from "next/image";
import styles from "./page.module.css";
import * as Popover from '@radix-ui/react-popover';
import popover from "@/components/popover";
import { FaBeer } from "react-icons/fa";


export default function Home() {
  return (
    <div> 
      <h1>This is the home page</h1>
      I need a <FaBeer /> after this!
    </div>
  );
}
