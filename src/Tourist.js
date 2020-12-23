import React, { useEffect, useState } from "react";
import { useStateValue } from "./Component/StateProvider";
import "./Tourist.css";
import SimpleTabs from "./Nav";
import reducer from "./Component/reducer";

function Tourist(props) {
  const [state, dispatch] = useStateValue();
  const changeLocation = (place) => {
    // remove from basket
    dispatch({
      type: "CHANGE_LOCATION",
      payload: place.name,
    });
    localStorage.setItem("location", place.name);
    console.log(state);
    console.log(place);
    console.log(localStorage);
  };
  const [place, setPlace] = useState("");
  const placeCoords = [
    {
      name: "Larnaka",
      coords: [59, 68.3],
      body:
        "Larnaca is a city on the southern coast of Cyprus. It is the third-largest city in the country, after Nicosia and Limassol.\n" +
        "\n" +
        "Larnaca is known for its palm-tree seafront also called Foinikoudes as well as the Church of Saint Lazarus, Hala Sultan Tekke, Kamares Aqueduct, and Larnaca Castle. It is built on the ruins of ancient Citium, which was the birthplace of Stoic philosopher Zeno. Larnaca is home to the country's primary airport, Larnaca International Airport. It also has a seaport and a marina.",
    },
    {
      name: "Famagusta",
      coords: [72.5, 52.3],
      body:
        'In antiquity, the town was known as Arsinoe, after the Greek queen Arsinoe II of Egypt, and was mentioned by that name by Strabo. In the 3rd century book Stadiasmus Maris Magni, is written as Ammochostos, meaning "hidden in sand", which is how Greeks still call it. This name developed into Famagusta, and to its Turkish name, Mağusa. In Turkish, the city is also called Gazimağusa, meaning warrior. The old town is nicknamed "the city of 365 churches" owing to a legend that at its peak, Famagusta boasted one church for each day of the year.',
    },
    {
      name: "Limassol",
      coords: [34.2, 88.8],
      body:
        "Limassol was built between two ancient Greek cities, Amathus and Kourion, and during Byzantine rule it was known as Neapolis (new town). Limassol's historical centre is located around its medieval Limassol Castle and the Old Port. Today the city spreads along the Mediterranean coast and has extended much farther than the castle and port, with its suburbs stretching along the coast to Amathus. To the west of the city, is the Akrotiri Area of the British Overseas Territory of Akrotiri and Dhekelia.",
    },
    {
      name: "Nicosia",
      coords: [48, 47.8],
      body:
        "Nicosiakoşa is the largest city, capital, and seat of government of Cyprus. It is located near the centre of the Mesaoria plain, on the banks of the River Pedieos.\n" +
        "\n" +
        "The Greek Cypriot and Turkish Cypriot communities of Nicosia segregated into the south and north of the city respectively in early 1964, following the fighting of the Cyprus crisis of 1963–64. This separation became a militarised border between the Republic of Cyprus and Northern Cyprus after Turkey invaded the island of Cyprus in 1974" +
        "\n" +
        "Apart from its legislative and administrative functions, Nicosia has established itself as the island's financial capital and its main international business centre. In 2018, Nicosia was the 32nd richest city in the world in relative purchasing power.",
    },
    {
      name: "Akamas",
      coords: [3.81, 59],
      body:
        "Akamas is a promontory and cape at the northwest extremity of Cyprus with an area of 230 square kilometres. Ptolemy described it as a thickly wooded headland, divided into two by summits [a mountain range] rising towards the north. The peninsula is named after a son of Theseus, hero of the Trojan War and founder of the city-kingdom of Soli.\n" +
        "\n" +
        "\n" +
        "At the southern end of the peninsula is the town of Pegeia and on its northeast side the town of Polis. Due to the mountainous nature of the peninsula there are no roads running through its heartland. Visitor attractions in Akamas include a loggerhead turtle sanctuary and the Baths of Aphrodite where the goddess is said to have bathed, near Polis.",
    },
    {
      name: "Pafos",
      coords: [7.31, 81],
      body:
        "Paphos is a coastal city in southwest Cyprus and is the capital of Paphos District. \n" +
        "\n" +
        "The current city of Paphos lies on the Mediterranean coast, about 50 km (30 mi) west of Limassol, both of which are connected by the A6 highway. Paphos International Airport is the country's second-largest airport. The city has a subtropical-Mediterranean climate, with the mildest temperatures on the island.\n" +
        "\n" +
        "Paphos is included in the official UNESCO list of cultural and natural treasures of the world's heritage for its ancient ruins and was selected as a European Capital of Culture for 2017 along with Aarhus.",
    },
  ];

  useEffect(() => {
    placeCoords.map((town) => {
      if (
        props.x > town.coords[0] - 6 &&
        props.x < town.coords[0] + 6 &&
        props.y > town.coords[1] - 6 &&
        props.y < town.coords[1] + 6
      ) {
        if (props.activePlace && place === "") {
          setPlace(town);
          changeLocation(town);
          console.log(props.activePlace);
        } else if (!props.activePlace) {
          setPlace("");
        }
      }
    });
  }, [props]);

  return (
    <div>
      <SimpleTabs />
      <div
        className="sideInfo"
        style={{
          height: `${props.h}px`,
        }}
      >
        <div className="sideInfo__title">
          <h2>{place.name}</h2>
          <div className="sideInfo__body">{place.body}</div>
        </div>
      </div>
    </div>
  );
}

export default Tourist;
