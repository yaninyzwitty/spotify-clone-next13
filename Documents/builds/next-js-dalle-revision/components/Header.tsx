import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className="flex p-5 justify-between sticky top-0 bg-white z-50 shadow-md">
      <div className="flex items-center space-x-2">
        <Image
          src={"http://links.papareact.com/4t3"}
          alt="image"
          height={30}
          width={30}
        />

        <div>
          <h1 className="font-bold">
            Witty CLUB <span className="text-blue-400">AI GENERATOR</span>
          </h1>
          <h2 className="text-xs">
            Powered by DALLE: 2.0, CHATGPT AND AZURE CLOUD
          </h2>
        </div>
      </div>

      <div className="flex text-xs md:text-base divide-x items-center text-gray-500 p-2">
        <Link
          href={`https://github.com/yaninyzwitty`}
          className="px-2 font-light text-right"
        >
          Check my GITHUB HERE
        </Link>
        <Link
          href={`https://www.linkedin.com/in/ian-mwangi-a71258242/`}
          className="px-2 font-light"
        >
          Check my LINKEDIN HERE
        </Link>
      </div>
    </header>
  );
}

export default Header;
