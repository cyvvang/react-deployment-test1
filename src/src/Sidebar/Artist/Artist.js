import Icons from "../../components/Icons";
import "./Artist.css";

const Artist = ({ onClickHandler }) => {
  const handleArtistClick = (artistName) => {
    onClickHandler(artistName);
  };

  return (
    <div className="artist-container">
      <Icons onClickHandler={() => handleArtistClick("BIBI")} 
        img="./images/bibi.png" />
      <Icons onClickHandler={() => handleArtistClick("V")} 
        img="./images/v.png" />
      <Icons onClickHandler={() => handleArtistClick("LE SSERAFIM")}
        //title="le sserafim"
        img="./images/le-sserafim.png"
      />
      <Icons onClickHandler={() => handleArtistClick("(G)I-Dle")}
        //title="gidle"
        img="./images/gidle.png"
      />
      <Icons onClickHandler={() => handleArtistClick("TAEYEON")}
        //title="taeyeon"
        img="./images/taeyeon.png"
      />
      <Icons onClickHandler={() => handleArtistClick("WENDY")}
        //title="wendy"
        img="./images/wendy.png"
      />
      <Icons onClickHandler={() => handleArtistClick("NewJeans")}
        //title="newjeans"
        img="./images/newjeans.png"
        //selected={selectedFilters.includes("newjeans")}
      />
      <Icons onClickHandler={() => handleArtistClick("TWICE")}
        //title="twice"
        img="./images/twice.png"
      />
      <Icons onClickHandler={() => handleArtistClick("IU")}
        //title="iu"
        img="./images/iu.png"
      />
      <Icons onClickHandler={() => handleArtistClick("IVE")}
        //title="ive"
        img="./images/ive.png"
      />
      <Icons onClickHandler={() => handleArtistClick("NMIXX")}
        //title="nmixx"
        img="./images/nmixx.png"
      /> 
    </div>
  );
};

export default Artist;


