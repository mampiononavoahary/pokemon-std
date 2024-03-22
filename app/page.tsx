import Image from "next/image";
import styles from "./page.module.css";
import './home.css'

export default function Home() {
  return (
    <div className="main">
        <nav>
          <ul className="nav">
             <li className="logo">Pokemon</li>
             <li>Pokemon details</li>
             <li>About</li>
          </ul>
          <div>
             <h1 className="hello">
                 Bonjour...!!
             </h1>
          </div>
        </nav>
    </div>
  );
}
