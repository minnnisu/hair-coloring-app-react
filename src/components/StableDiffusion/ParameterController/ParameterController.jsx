import { useState } from "react";
import Switch from "./Switch";
import SliderBar from "./SliderBar";
import ColorSwitch from "./ColorSwitch";

import "./css/ParameterController.css";

function ParameterController({ parameters, onChangeParameters }) {
  const HAIR_COLOR = [
    "light_blue",
    "light_red",
    "sliver",
    "brown",
    "platinum_blonde",
    "platinum_pink",
    "platinum_purple",
  ];
  const [sex, setSex] = useState("male");
  const [isBangs, setIsBangs] = useState("no");
  const [hairColor, setHairColor] = useState("brown");

  const onChangeSex = (sex) => {
    setSex(sex);
    setPrompt(sex, isBangs, hairColor);
  };

  const onChangeBangs = (value) => {
    setIsBangs(value);
    setPrompt(sex, value, hairColor);
  };

  const onChangeHairColor = (color) => {
    setHairColor(color);
    setPrompt(sex, isBangs, color);
  };

  const setPrompt = (sex, isBangs, color) => {
    let prompt =
      "<lora:koreanDollLikeness_v15:1>(best quality), (high resolution), (intricate details), (photorealistic), (cinematic light), (only hair), no reflection, solo";

    prompt += `, ${color} hair`;

    if (sex === "male") {
      prompt += ", korea style man hair, casual";
    }

    if (isBangs === "yes") {
      prompt += ", grow out bangs";
    }

    prompt += ", realistic, daily";

    onChangeParameters("prompt", prompt);
  };

  return (
    <div className="parameter_controller_container">
      <div className="parameter sex">
        <div className="title">Sex</div>
        <Switch
          items={["male", "female"]}
          currentColor={sex}
          onChangeItem={onChangeSex}
        />
      </div>
      <div className="parameter bangs">
        <div className="title">Bangs</div>
        <Switch
          items={["yes", "no"]}
          currentColor={isBangs}
          onChangeItem={onChangeBangs}
        />
      </div>
      <div className="parameter hair_color">
        <div className="title">Hair Color</div>
        <ColorSwitch
          items={HAIR_COLOR}
          currentColor={hairColor}
          onChangeItem={onChangeHairColor}
        />
      </div>
    </div>
  );
}

export default ParameterController;
