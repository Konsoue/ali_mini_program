import React, { memo, Fragment } from 'react';
import BoxContainer from './BoxContainer';

const createRandomStr = () => {
  return Math.random().toString(36).slice(-6);
}

function BoxesContainer(props) {
  const { boxNums, playNode, remarkArr } = props;
  const components = [];
  for (let i = boxNums; i > 0; i--) {
    components.push(
      <div className="boxes-container" key={createRandomStr()} >
        <div className="box-order">{i}</div>
        <BoxContainer remarkArr={remarkArr} timeLine={i} playNode={playNode} />
      </div>
    )
  }
  return (
    <Fragment>
      {components}
    </Fragment>
  )
}

export default memo(BoxesContainer)