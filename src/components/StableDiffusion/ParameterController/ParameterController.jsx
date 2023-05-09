import { useState } from "react";
import Switch from "./Switch";
import SliderBar from "./SliderBar";

function ParameterController({ parameters, onChangeParameters }) {
  const HAIR_COLOR = [
    "light blue",
    "light red",
    "sliver",
    "brown",
    "platinum blonde",
    "platinum pink",
    "platinum purple",
  ];
  const [sex, setSex] = useState("Male");
  const [isBangs, setIsBangs] = useState("No");
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
      "<lora:koreanDollLikeness_v15:1>(best quality), (high resolution), (intricate details), (photorealistic), (cinematic light), no reflection, solo";

    prompt += `, ${color} hair`;

    if (sex === "Male") {
      prompt += ", korea style man hair, casual";
    }

    if (isBangs === "Yes") {
      prompt += ", grow out bangs";
    }

    prompt += ", realistic, daily";

    onChangeParameters("prompt", prompt);
  };

  return (
    <div className="parameter_controller">
      <div className="parameter sex">
        <div className="title">성별 선택</div>
        <Switch
          items={["Male", "Female"]}
          currentColor={sex}
          onChangeItem={onChangeSex}
        />
      </div>
      <div className="parameter bangs">
        <div className="title">앞머리 여부</div>
        <Switch
          items={["Yes", "No"]}
          currentColor={isBangs}
          onChangeItem={onChangeBangs}
        />
      </div>
      <div className="parameter hair_color">
        <div className="title">머리 색깔</div>
        <Switch
          items={HAIR_COLOR}
          currentColor={hairColor}
          onChangeItem={onChangeHairColor}
        />
      </div>
      <div className="parameter cfg_scale">
        <div className="title">CFG scale</div>
        <SliderBar
          min={0}
          max={30}
          step={0.5}
          currentValue={parameters.cfgScale}
          onChangeValue={(value) => onChangeParameters("cfgScale", value)}
        />
      </div>
      <div className="parameter denoising_strength">
        <div className="title">Denoising Strength</div>
        <SliderBar
          min={0}
          max={1}
          step={0.01}
          currentValue={parameters.denoisingStrength}
          onChangeValue={(value) =>
            onChangeParameters("denoisingStrength", value)
          }
        />
      </div>
    </div>
  );
}

export default ParameterController;
