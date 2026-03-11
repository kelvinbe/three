import World from "@/lib/webgl/world";
import { itemList } from "@/lib/webgl/scripts/itemList";

export default function Home() {
  return (
    <div className="lContainer">
      <div className="lTitle">
        <h1 className="cTitle">
          <span className="cTitle__box">WebGL School</span>
          <span className="cTitle__box">&nbsp; Task.08.</span>
        </h1>
      </div>

      <div className="lDetails">
        <p className="cDetails">This content created with pure WebGL</p>
      </div>

      {/* Pass itemList as prop */}
      <div id="world">
        <World items={itemList} />
      </div>
    </div>
  );
}