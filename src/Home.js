import React, { useEffect, useState, useRef } from "react";
import "./Home.css";
import smmap from "./smmap.jpg";
import bigmap from "./themap.jpg";
import Tourist from "./Tourist";
import Featured from "./Featured";
import { SideBySideMagnifier } from "react-image-magnifiers";
import HomeAdmin from "./admin/HomeAdmin";
import { useStateValue } from "./Component/StateProvider";

function Home() {
  const [state, dispatch] = useStateValue();
  const [coords, setCoords] = useState([0, 0]);
  const pcthings = {
    alwaysInPlace: true,
    overlayOpacity: 0.4,
    switchSides: false,
    fillAvailableSpace: false,
    fillAlignTop: false,
    fillGapLeft: 0,
    fillGapRight: 10,
    fillGapTop: 10,
    fillGapBottom: 10,
    shadow: false,
    dragToMove: false,
  };

  const textInput = useRef(null);
  const [divHeight, setDivHeight] = useState("100px");
  const [summary, setSummary] = useState(false);
  const [godMode, setGodMode] = useState("Off");

  useEffect(() => {
    setGodMode(state.godMode);
    console.log(state.godMode);
    console.log(godMode);
  }, [state.godMode]);

  const useMouseMove = () => {
    useEffect(() => {
      const handler = ({ clientX, clientY }) => {
        const clientHeight = textInput.current.firstChild.clientHeight;
        const clientWidth = textInput.current.firstChild.clientWidth;
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft =
          window.pageXOffset || document.documentElement.scrollLeft;
        setCoords([
          ((clientX - textInput.current.firstChild.offsetLeft + scrollLeft) /
            clientWidth) *
            100,
          ((clientY - textInput.current.firstChild.offsetTop + scrollTop) /
            clientHeight) *
            100,
        ]);
        setDivHeight(textInput.current.firstChild.clientHeight - 10);
      };

      textInput.current.addEventListener("mousemove", handler);
      /*      return () => {
        textInput.current.removeEventListener("mousemove", handler);
      };*/
    }, []);

    return coords;
  };
  useMouseMove();

  return (
    <div className="home main-width">
      {godMode === "On" && (
        <div className="homeAdmin__container">
          <HomeAdmin />
        </div>
      )}
      <div className="home__main">
        <div className="home__center">
          <div className="home__left" ref={textInput}>
            <SideBySideMagnifier
              className="input-position"
              style={{ order: pcthings.switchSides ? "1" : "0" }}
              imageSrc={smmap}
              largeImageSrc={bigmap}
              dragToMove={pcthings.dragToMove}
              alwaysInPlace={pcthings.alwaysInPlace}
              overlayOpacity={pcthings.overlayOpacity}
              switchSides={pcthings.switchSides}
              zoomPosition="left"
              cursorStyle="zoom-in"
              cursorStyleActive="move"
              mouseActivation="click"
              inPlaceMinBreakpoint={641}
              transitionSpeedInPlace={0.8}
              fillAvailableSpace={pcthings.fillAvailableSpace}
              fillAlignTop={pcthings.fillAlignTop}
              fillGapTop={pcthings.fillGapTop}
              fillGapRight={pcthings.fillGapRight}
              fillGapBottom={pcthings.fillGapBottom}
              fillGapLeft={pcthings.fillGapLeft}
              shadow={pcthings.shadow}
              zoomContainerBorder="1px solid #ccc"
              zoomContainerBoxShadow="none"
              onZoomStart={() => {
                setSummary(true);
              }}
              onZoomEnd={() => {
                setSummary(false);
              }}
            />
          </div>
          <div className="home__right">
            {summary === true ? (
              <Tourist
                activePlace={summary}
                x={coords[0]}
                y={coords[1]}
                h={divHeight || 0}
              />
            ) : (
              <div>
                <h1>Welcome</h1>
                <p>Cyprus is great for blah......</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Featured />
      <div className="diddd">( DEV ) :::::: x: {coords[0]}</div>
      <div className="diddd">( DEV ) :::::: y: {coords[1]}</div>
    </div>
  );
}

export default Home;
