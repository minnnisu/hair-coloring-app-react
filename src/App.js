import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const BASE_URL = "http://127.0.0.1:7861"
  const [cfgScale ,setCfgScale] = useState(Number(30).toFixed(1));
  const [selectedSex, setSelectedSex] = useState("male")
  const [denoisingStrength ,setDenoisingStrength] = useState(Number(1).toFixed(2));
  const [img2imgInitImg, setImg2imgInitImg] = useState(null);
  const [predictImgByText, setPredictImgByText] = useState(null);
  const [predictImgByImg, setPredictImgByImg] = useState(null);

  // const getImgByText = async () => {
  //   const payload = {
  //     prompt: "a pretty korean girl",
  //   }

  //   const response = await fetch(`${BASE_URL}/sdapi/v1/txt2img`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(
  //       {...payload}
  //     ),
  //   });

  //   const resJson = await response.json();
  //   console.log(resJson);
  //   setPredictImgByText(`data:image/png;base64,${resJson.images[0]}`);
  // };

  const selectSexHandler = function(sex) {
    if(sex === "M") {
      setSelectedSex("male")
    }else {
      setSelectedSex("female")
    }
  }

  const submitImgHandler = async function(event) {
    event.preventDefault();
    if (img2imgInitImg) {
      const file = img2imgInitImg[0];
      const base64 = await encodeFileToBase64(file)
      const prompt = selectedSex === "male" ? "a handsome man" : "a pretty girl"
      
      const payload = {
        init_images:[base64],
        prompt: `<lora:koreanDollLikeness_v15:0.7>${prompt} white background`,
        steps:85,
        resize_mode:2,
        sampler_index:"DPM++ SDE Karras",
        restore_faces:true,
        cfg_scale: cfgScale,
        denoising_strength: denoisingStrength,
      }
      console.log(payload);

      const response = await fetch(`${BASE_URL}/sdapi/v1/img2img`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {...payload}
        ),
      });
  
      const resJson = await response.json();
      console.log(resJson);
      setPredictImgByImg(`data:image/png;base64,${resJson.images[0]}`);

      const imgInfo = await fetch(`${BASE_URL}/sdapi/v1/png-info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {image: `data:image/png;base64,${resJson.images[0]}`}
        ),
      });


      const resInfo = await imgInfo.json();
      console.log(resInfo);
    }else {
      alert("이미지를 업로드 하세요")
    }
  }

  const getImgByImg = async (event) => {
    setImg2imgInitImg(event.target.files);
  };


  const encodeFileToBase64 = (image) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
    });
  };  

  return (
    <div className="App">
        {/* <div>
          <button onClick={getImgByText}>텍스트 전송</button>
          <br />
          {predictImgByText && (
            <img src={predictImgByText} width={500} alt="predict_img" />
          )}
        </div> */}
        <div className="wrapper">
            <div className="result-img-container">
              {predictImgByImg && (
                <img src={predictImgByImg} width={500} alt="predict_img" />
              )}
            </div>
            <div className="input-form-container">
              <div className="img-upload-form">
                <div className="title">이미지 업로드</div>
                <input type="file" className="value" onChange={getImgByImg} />
              </div>
              <form onSubmit={submitImgHandler}>
                <div className="sex_container">
                  <div className="title">성별 선택</div>
                  <span className={`sex_switch ${selectedSex==="male" ? "active" : ""}`} onClick={() => selectSexHandler("M")}>남자</span>
                  <span className={`sex_switch ${selectedSex==="female" ? "active" : ""}`} onClick={() => selectSexHandler("F")}>여자</span>
                </div>
                {/* <div className="title">prompt</div>
                <input name="prompt" type="text" /> */}
                <div className="title">CFG scale</div>
                <input
                  type="range"
                  className="value"
                  min={0}
                  max={30}
                  color="gray"
                  step={0.5}
                  onChange={(event) => {
                    if(Number.isInteger(event.target.valueAsNumber)){
                      setCfgScale(event.target.valueAsNumber.toFixed(1));
                    }else{
                      setCfgScale(event.target.valueAsNumber);
                    }
                  }}
                />
                <span>{cfgScale}</span>
                <div className="title">Denoising Strength</div>
                <input
                  type="range"
                  className="value"
                  min={0}
                  max={1}
                  color="gray"
                  step={0.01}
                  onChange={(event) => {
                    if(Number.isInteger(event.target.valueAsNumber)){
                      setDenoisingStrength(event.target.valueAsNumber.toFixed(1));
                    }else{
                      setDenoisingStrength(event.target.valueAsNumber);
                    }
                  }}
                />
                <span>{denoisingStrength}</span>
                <button className="sub_btn">subimt</button>
              </form>
            </div>
          </div>
    </div>
  );
}

export default App;

