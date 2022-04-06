import React, { memo, useRef, useEffect } from 'react';
import Game from '../../game/Game';
import { TileSize, UISize } from '../../constant';

function Snake({
  rows,
  cols,
  targetScore,
  onComplete
}) {
  const ref = useRef();
  const ratio = window.devicePixelRatio;
  const width = cols * TileSize;
  const height = rows * TileSize + UISize;
  const widthRatio = width * ratio;
  const heightRatio = height * ratio;
  useEffect(() => {
    const game = new Game(rows, cols, ratio, targetScore, onComplete, ref.current);
    game.initialize();
    return () => {
      game.shutdown();
    };
  }, [rows, cols, targetScore, onComplete, ratio]);
  return /*#__PURE__*/React.createElement("canvas", {
    ref: ref,
    width: widthRatio,
    height: heightRatio,
    style: {
      width,
      height,
      touchAction: 'none',
      display: 'block'
    }
  });
}

export default /*#__PURE__*/memo(Snake, (prevProps, nextProps) => {
  return prevProps.rows === nextProps.rows && prevProps.cols === nextProps.cols && prevProps.targetScore === nextProps.targetScore;
});