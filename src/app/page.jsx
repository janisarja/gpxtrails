import Link from "next/link";
import ButtonLarge from "../components/button-large";

const { default: Card } = require("../components/card")

const Page = () => {
  return (
    <div>
      <p className=" p-4 m-10 max-w-md mx-auto text-center">
        A platform for discovering, creating and sharing trails for trail running and hiking.
      </p>
      <Card 
        title="Discover"
      >
        <p>
          Find trails from other outdoor enthusiasts!
        </p>
        <Link href="/trails"><ButtonLarge text="Browse Trails"/></Link>
      </Card>
      <Card 
        title="Create"
      >
        <p>
          Create and share your own trails with the trail editor!
        </p>
        <Link href="/trails/new"><ButtonLarge text="Make Your Own"/></Link>
      </Card>
    </div>
  );
}

export default Page;
