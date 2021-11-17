import React, { useRef, useEffect, useState } from 'react';

const CubeGraph = ({ height = 250, width = window.innerWidth, percentage, labels }) => {

  let { knowledge, skill, verbal } = percentage;

  const canvasRef = useRef(null);
  const [ctx ,setCtx] = useState(null);
  const [canvas ,setCanvas] = useState(null);

  knowledge = knowledge > 100 ? 100 : knowledge;
  skill = skill > 100 ? 100 : skill;
  verbal = verbal > 100 ? 100 : verbal;

  // outline measurements
  const x = 40;
  const wx = 93;
  const wy = 75;
  const h = 192;
  const color = '#03dac6';

  height = height - 40;

  useEffect(() => {
    setCanvas(canvasRef.current);
    setCtx(canvasRef.current.getContext('2d'));
  },[canvasRef]);

  useEffect(() => {
    if (canvas) draw();
  },[canvas, percentage, labels]);

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    innerOutline();
    drawCube();
    frontOutline();
    sideOutLine();
    upperOutLine();
    loadIcons();
    drawLabels();
  };

  const innerOutline = () => {
    ctx.beginPath();
    ctx.moveTo(x + 1.5, height);
    ctx.lineTo(x + (wy * 0.61) + 1.5, height - wy * 0.49 + 0.5);
    ctx.lineTo((x + wx + (wy * 0.61)) + 1.5, height - wy * 0.49  + 0.5);
    ctx.strokeStyle = "#FFF";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x + (wy * 0.61) + 0.5, height - wy * 0.49 + 0.5);
    ctx.lineTo(x + (wy * 0.61) + 0.5, (height - h * 0.49) - wy * 0.47 - 0.5);
    ctx.stroke();
  };

  const upperOutLine = () => {
    ctx.beginPath();
    ctx.moveTo(x, height - h * 0.498 + 1.5);
    ctx.lineTo(x + (wy * 0.61), (height - h * 0.49) - wy * 0.49 - 0.5);
    ctx.lineTo((x + wx + (wy * 0.61)) + 1.5 , ( height - h * 0.49) - wy * 0.49 - 0.5);
    ctx.strokeStyle = "#FFF";
    ctx.stroke();
  }

  const frontOutline = () => {
    ctx.translate(0.5, 0.5);
    ctx.beginPath();
    ctx.moveTo(x, height);
    ctx.lineTo(x + wx + 1.3, height);
    ctx.lineTo(x + wx + 1.3, height - h * 0.49);
    ctx.lineTo(x, height - h * 0.49);
    ctx.closePath();
    ctx.strokeStyle = "white";
    ctx.stroke();
  }

  const sideOutLine = () => {
    ctx.beginPath();
    ctx.moveTo(x + wx + 0.5, height - h * 0.49 + 0.5);
    ctx.lineTo(x + wx + (wy * 0.61) + 1.8, (height - h * 0.49) - wy * 0.50 + 0.5);
    ctx.lineTo(x + wx + (wy * 0.61) + 1.8, height - wy * 0.50 + 0.5);
    ctx.lineTo(x + wx + 0.5, height + 0.5);
    ctx.strokeStyle = "#FFF";
    ctx.stroke();
  }

  const drawCube = () => {
    knowledge = wx * 0.47;
    skill = h * 0.22;
    verbal = wy * 0.275;

    // front
    ctx.beginPath();
    ctx.moveTo(x + 0.5, height + 0.5);
    ctx.lineTo(x + (x * 0.01) + knowledge, height + (height * 0.001) );
    ctx.lineTo(x + (x * 0.01) + knowledge, height - skill * 0.49  + (height * 0.001) + 0.5);
    ctx.lineTo(x + (x * 0.01), height - skill * 0.49  + (height * 0.001) + 0.5);
    ctx.fillStyle = color;
    ctx.fill();

     //side
    ctx.beginPath();
    ctx.moveTo(x + knowledge + 1, height - skill * 0.49 - 0.5);
    ctx.lineTo(x + knowledge + (verbal * 0.62) - 0.5, (height - skill * 0.49) - verbal * 0.49 - 0.5);
    ctx.lineTo(x + knowledge + (verbal * 0.62) - 0.5, height - verbal * 0.49 - 0.5);
    ctx.lineTo(x + knowledge, height + (height * 0.001) - 0.5);
    ctx.fill();

    // Upper
    ctx.beginPath();
    ctx.moveTo(x + 0.5, height - skill * 0.49 );
    ctx.lineTo(x + (verbal * 0.80) - 0.5, (height - skill * 0.49) - verbal * 0.49 - 0.5);
    ctx.lineTo(x + knowledge + (verbal * 0.62) - 1, (height - skill * 0.49) - verbal * 0.49);
    ctx.lineTo(x + (x * 0.01) + knowledge - 1, height - skill * 0.49);
    ctx.fillStyle = color;
    ctx.fill();

    //front outline
    ctx.beginPath();
    ctx.moveTo(x + (x * 0.01) + knowledge - 0.5, height + (height * 0.001));
    ctx.lineTo(x + (x * 0.01) + knowledge, height - skill * 0.49  + (height * 0.001));
    ctx.lineTo(x + (x * 0.01), height - skill * 0.49  + (height * 0.001));
    ctx.strokeStyle = "#FFF";
    ctx.stroke();

    //side outline
    ctx.beginPath();
    ctx.moveTo(x + knowledge, height - skill * 0.49);
    ctx.lineTo(x + knowledge + (verbal * 0.62), (height - skill * 0.49) - verbal * 0.49 - 0.5);
    ctx.lineTo(x + knowledge + (verbal * 0.62), height - verbal * 0.49 -   0.5);
    ctx.lineTo(x + knowledge, height + (height * 0.001));
    ctx.strokeStyle = "#FFF";
    ctx.stroke();

    //upper outline
    ctx.beginPath();
    ctx.moveTo(x + 0.5, height - skill * 0.49 + 0.5);
    ctx.lineTo(x + (verbal * 0.80) - 0.5, (height - skill * 0.49) - verbal * 0.49 - 0.5);
    ctx.lineTo(x + knowledge + (verbal * 0.62) - 1, (height - skill * 0.49) - verbal * 0.49 - 0.5);
    ctx.strokeStyle = "#FFF";
    ctx.stroke();

  }

  const drawLabels = () => {
    ctx.fillStyle = "#FFF";
    ctx.font = "500 10px Hiragino Sans";
    ctx.fillText(labels.skill, 16, height - h * 0.45);
    ctx.fillText(labels.knowledge, x + wx + 11, height + 8);
    ctx.fillText(labels.verbal, x + wx + (wy * 0.61) + 5, height - wy * 0.49 + 8);
  }

  const loadIcons = () => {
    const skillIcon = new Image();
    skillIcon.src = "/images/language.svg";
    skillIcon.onload = () => {
      ctx.drawImage(skillIcon, 22.5, height - h * 0.57);
    }

    const verbalIcon = new Image();
    verbalIcon.src = "/images/verbal.svg";
    verbalIcon.onload = () => {
      ctx.drawImage(verbalIcon, x + wx + (wy * 0.59) + 12, height - wy * 0.49 - 11.8);
    }

    const knowledgeIcon = new Image();
    knowledgeIcon.src = "/images/idea.svg";
    knowledgeIcon.onload = () => {
      ctx.drawImage(knowledgeIcon, x + wx + 16, height - 13.5);
    }
  }

  return (
    <canvas height={height + 40} width={height + 40} ref={canvasRef} />
  )
}

export default CubeGraph;
