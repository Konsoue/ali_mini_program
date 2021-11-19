import React, { memo, Fragment } from 'react';
import BoxContainer from './BoxContainer';
import Enum from '../../util/Enum'
const numType = new Enum({
  1: <svg t="1637327989425" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6351" width="128" height="128"><path d="M602.624 983.552c-1.024 11.776-9.728 20.48-22.016 20.992h-168.96c-9.216 0.512-18.432-6.656-20.48-15.872-0.512-1.536-0.512-3.584-0.512-5.12L413.184 217.6c0.512-8.704-6.144-17.92-15.36-20.48-1.536-0.512-3.584-0.512-5.12-0.512H343.04c-11.776 0-17.408-8.192-12.288-17.408l72.704-142.336c6.144-10.24 17.408-16.896 30.208-17.408H611.84c9.216-0.512 17.92 6.656 20.48 15.872 0.512 1.536 0.512 3.584 0.512 5.12l-30.208 943.104z" p-id="6352"></path></svg>,
  2: <svg t="1637328005591" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7841" width="128" height="128"><path d="M591.872 647.68l-27.136 28.16s-24.576 26.112-36.864 41.984c-10.24 12.8-18.944 26.112-27.136 40.448-5.632 9.216-9.216 19.968-10.752 31.232-1.024 9.216-1.024 18.432 0.512 27.648H729.6c11.776 0 20.48 9.216 19.456 20.48l-14.336 145.92c-1.536 11.776-11.264 19.968-23.552 20.48H294.4c-10.752 0-20.992-8.192-23.04-18.944 0-1.024-0.512-1.536-0.512-2.56 0 0-4.096-48.128-5.632-84.48-1.536-36.352 0-71.68 4.096-107.008 4.096-34.816 12.288-68.608 25.088-100.352 12.8-32.256 31.232-60.928 54.784-85.504L504.32 440.32c7.168-7.68 19.456-20.48 26.624-28.672 0 0 9.728-10.752 19.968-23.552 10.24-12.8 15.872-26.112 16.384-40.448l2.048-123.904 0.512-25.088v-2.048c-1.024-10.752-6.144-16.896-15.872-18.944-2.56-0.512-5.632-1.024-8.192-1.024h-31.744c-11.776 0-27.136 0.512-33.792 1.536l-3.072 3.072c-3.072 3.072-5.12 9.728-5.12 19.456l-0.512 29.696c-1.024 12.288-8.704 22.528-19.968 27.136L300.032 307.2c-10.752 3.584-18.944-3.072-18.432-14.848l5.12-174.592 0.512-23.552 0.512-4.096c1.024-10.752 5.12-32.768 15.872-47.616 2.56-3.584 5.632-6.144 8.704-8.704 16.896-13.312 40.96-14.848 52.736-14.848h4.608c1.536 0 12.288 0.512 24.064 0.512h238.08c40.96 1.024 74.752 12.8 100.352 35.84 26.624 24.064 38.912 59.392 36.864 106.496l-6.144 216.064c-0.512 11.264-2.048 30.208-3.584 40.96 0 0-4.608 31.232-16.384 54.784-10.24 22.016-24.576 41.984-41.472 58.88l-109.568 115.2z" p-id="7842"></path></svg>,
  3: <svg t="1637328023795" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9308" width="128" height="128"><path d="M403.968 197.12c-12.288-0.512-24.576-8.704-30.208-20.48L315.904 39.936c-4.608-11.264 0.512-20.48 12.288-20.48h278.016c40.448 1.536 72.192 13.312 95.232 35.84 24.576 24.064 36.864 54.272 35.84 91.648l-7.68 240.64c-0.512 11.264-2.048 30.208-3.584 41.472 0 0-4.608 32.256-18.432 48.64s-41.472 25.6-83.456 28.672c20.48 2.56 37.376 8.192 50.688 16.896 13.312 8.704 23.552 18.944 31.232 31.232 7.68 12.288 12.8 25.088 15.36 39.424 2.56 13.312 3.584 26.624 3.072 39.936l-7.168 252.928c-0.512 11.264-1.024 24.576-1.024 28.672l-0.512 3.584c-3.584 26.112-13.312 46.08-30.72 60.928-19.456 16.896-52.224 25.088-98.304 25.088H323.584c-9.216 0.512-17.92-6.656-20.48-15.872-0.512-1.536-0.512-3.584-0.512-5.12l4.608-145.408c1.024-11.776 9.728-20.48 22.016-20.992h129.536c11.776 0 29.696-0.512 39.936-1.024l7.168-2.048c7.168-2.048 10.752-10.752 11.776-25.088l4.608-134.144c0.512-11.264 0-30.208-0.512-41.984 0 0 0-2.56-6.656-11.264-6.656-9.216-17.408-13.824-32.768-13.824h-112.64c-11.776 0-20.992-9.216-20.48-20.992l4.096-133.12c1.024-11.776 9.728-20.48 22.016-20.992H471.04c11.776 0 29.696-0.512 39.936-1.536l7.68-3.072c7.68-3.072 11.776-12.288 12.288-27.648l4.096-125.44c0.512-11.264 0.512-30.208 0.512-41.984 0 0 0-1.024-4.096-7.168s-13.824-9.728-29.184-9.728l-98.304 0.512z" p-id="9309"></path></svg>,
  4: <svg t="1637328051663" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10772" width="128" height="128"><path d="M779.776 776.704c-4.096 11.264-14.336 18.432-27.136 19.456h-1.024c-12.288 0.512-20.992 8.704-22.016 20.992l-5.632 166.912c-1.024 11.776-9.728 20.48-22.016 20.992h-160.768c-11.776 0-20.992-9.216-20.48-20.992l5.632-166.912c1.024-8.704-6.144-17.92-15.36-20.48-1.536-0.512-3.584-0.512-5.12-0.512H254.464c-9.216 0.512-18.432-6.656-20.48-15.872-0.512-1.536-0.512-3.072-0.512-5.12l4.096-165.376c0.512-13.824 3.584-27.136 8.192-39.424l217.088-532.48c5.12-10.752 15.872-17.92 28.672-18.432h242.176c11.776 0 20.992 9.216 20.48 20.992l-18.432 587.264c-1.024 8.704 6.144 17.92 15.36 20.48 1.536 0.512 3.584 0.512 5.12 0.512h10.752c11.776 0 18.432 8.704 15.36 19.456l-2.56 108.544z m-271.36-128.512c12.288-0.512 20.992-9.216 22.016-20.992l8.704-315.904c0.512-11.264-2.56-12.288-5.632-2.048l-101.888 302.08c-3.584 10.24-6.656 23.04-6.656 27.648 0 4.608 9.216 8.704 20.992 8.704l62.464 0.512z" p-id="10773"></path></svg>,
  5: <svg t="1637328073965" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12262" width="128" height="128"><path d="M574.464 196.949333a27.434667 27.434667 0 0 0-25.685333 20.864l-37.12 177.749334a16.64 16.64 0 0 0 16.938666 20.906666h95.616l27.605334 0.085334 3.029333 0.170666c29.653333 1.749333 52.565333 12.074667 68.650667 30.890667 17.493333 20.778667 22.656 49.749333 14.848 86.741333l-78.378667 380.245334a287.829333 287.829333 0 0 1-12.288 40.661333s-7.594667 18.816-25.514667 31.018667-41.429333 18.304-70.314666 18.304H230.442667c-11.733333 0-17.024-8.576-11.776-19.072L293.12 836.693333a37.930667 37.930667 0 0 1 30.890667-19.072h95.36c11.733333 0 30.933333-0.554667 42.624-1.237333 0 0 6.144-0.341333 9.386666-3.541333 3.456-3.157333 6.826667-10.154667 10.538667-20.949334l33.706667-162.090666c2.389333-11.477333 4.309333-25.386667 4.266666-30.890667l-2.730666-2.944c-2.944-3.114667-7.893333-4.693333-14.848-4.693333H289.152a16.725333 16.725333 0 0 1-17.024-20.906667L381.525333 40.277333a27.434667 27.434667 0 0 1 25.642667-20.906666h382.805333a16.64 16.64 0 0 1 16.938667 20.864l-28.586667 135.808a27.52 27.52 0 0 1-25.728 20.864h-178.133333z" fill="#2c2c2c" p-id="12263"></path></svg>,
  6: <svg t="1637328096063" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13740" width="128" height="128"><path d="M710.613333 826.496c-2.346667 11.477333-5.248 25.258667-6.442666 30.592l-1.194667 4.693333c-11.306667 44.458667-29.269333 78.762667-54.229333 102.869334-27.434667 26.624-66.090667 39.978667-115.712 39.978666H360.618667l-29.354667-0.085333-3.882667-0.170667c-46.378667-2.304-81.109333-18.218667-104.149333-47.786666-24.96-32.085333-30.890667-77.013333-17.877333-134.869334L337.109333 182.613333c2.346667-11.52 4.992-24.234667 5.888-28.330666l0.896-3.626667c10.752-44.032 30.250667-76.501333 58.538667-97.365333 30.549333-22.613333 70.144-33.92 118.997333-33.92h290.346667c11.733333 0 16.896 8.490667 11.434667 18.901333l-73.002667 139.733333a38.784 38.784 0 0 1-31.232 18.901334h-132.224c-11.733333 0-30.506667 2.858667-41.685333 6.4 0 0-11.306667 3.541333-14.976 23.381333l-21.333334 105.130667c-2.346667 11.52 5.376 20.906667 17.109334 20.906666h106.453333l28.928 0.085334 3.669333 0.128c22.741333 0.896 42.026667 4.522667 57.856 10.922666 15.872 6.4 28.288 15.530667 37.290667 27.477334 19.328 25.770667 24.661333 64.853333 15.658667 117.248l-65.109334 317.909333z m-140.373333-287.488c2.346667-11.477333 5.248-25.258667 6.4-30.549333l0.170667-3.882667c0.213333-5.674667-0.896-9.984-3.285334-12.928-4.053333-4.949333-13.354667-7.424-27.776-7.424H498.048a27.392 27.392 0 0 0-25.642667 20.906667L413.44 791.253333c-2.389333 11.477333-4.906667 25.6-5.589333 31.402667l0.810666 3.797333a12.629333 12.629333 0 0 0 7.296 9.429334c7.125333 3.2 15.530667 4.736 25.557334 4.736h17.92c11.733333 0 25.898667-0.256 31.488-0.597334l3.925333-1.194666a20.992 20.992 0 0 0 11.562667-7.722667c4.309333-6.272 7.466667-14.464 9.344-24.362667l54.485333-267.733333z" fill="#2c2c2c" p-id="13741"></path></svg>,
  7: <svg t="1637328114714" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15173" width="128" height="128"><path d="M586.666667 984.234667l150.528-738.56V39.765333H286.72v169.813334H519.68l-167.424 774.656z" fill="#2c2c2c" p-id="15174"></path></svg>,
  8: <svg t="1637328131031" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16581" width="128" height="128"><path d="M338.858667 137.856c2.389333-11.477333 7.893333-29.824 12.202666-40.704 0 0 14.208-35.968 36.650667-52.650667S444.501333 19.413333 490.496 19.413333h215.893333l28.928 0.085334 3.669334 0.170666c38.570667 1.92 67.754667 13.824 87.381333 35.669334 21.504 23.936 28.458667 54.442667 20.906667 91.434666L799.146667 377.984c-2.389333 11.477333-7.168 30.037333-10.666667 41.258667 0 0-10.026667 32.426667-26.24 48.725333-16.213333 16.256-45.397333 25.770667-87.594667 28.458667 20.010667 1.834667 35.797333 7.210667 47.530667 16.256 11.605333 9.045333 20.138667 19.626667 25.728 31.829333 5.589333 12.245333 8.405333 25.301333 8.192 39.296a218.282667 218.282667 0 0 1-3.882667 39.978667l-50.688 250.112c-2.346667 11.52-7.509333 29.952-11.477333 40.96 0 0-13.610667 37.76-33.962667 58.581333-20.352 20.778667-53.504 31.146667-99.626666 31.146667h-232.106667c-11.733333 0-26.538667-0.085333-32.938667-0.213334l-5.504-0.469333c-35.669333-3.029333-62.762667-15.872-81.194666-38.613333-21.248-26.197333-27.776-59.178667-19.456-98.901334l50.048-239.274666c2.389333-11.477333 7.210667-30.037333 10.709333-41.258667 0 0 10.282667-32.938667 26.837333-50.090667 16.469333-17.152 45.994667-26.624 88.277334-28.458666-20.096-2.773333-35.797333-8.362667-46.933334-16.981334-11.093333-8.533333-19.157333-18.688-24.277333-30.506666a91.733333 91.733333 0 0 1-7.466667-38.613334c0.085333-13.994667 1.92-27.306667 5.333334-39.978666l51.072-243.370667z m108.757333 702.762667c11.733333 0 29.738667-0.597333 39.978667-1.322667l7.381333-2.688c7.466667-2.773333 12.8-11.306667 16.042667-25.770667l38.698666-183.765333c2.432-11.477333 5.930667-30.336 7.808-41.941333 0 0 0.256-1.536-2.602666-8.789334-2.944-7.210667-12.074667-10.88-27.434667-10.88h-22.016c-11.733333 0-29.610667 0.725333-39.722667 1.578667l-6.997333 3.157333c-6.869333 3.2-11.904 12.458667-15.104 27.776l-38.698667 183.765334c-2.432 11.477333-5.674667 30.378667-7.296 42.026666 0 0-0.128 1.024 3.925334 7.296 4.181333 6.357333 13.952 9.472 29.397333 9.472h16.64zM585.386667 177.962667c-11.733333 0-29.525333 0.597333-39.509334 1.322666l-6.485333 2.688c-6.613333 2.773333-11.477333 11.349333-14.762667 25.770667l-35.029333 162.133333c-2.517333 11.434667-6.101333 30.293333-8.021333 41.898667 0 0-0.341333 2.005333 2.261333 10.112 2.474667 8.149333 11.434667 12.245333 26.752 12.245333h23.424c11.733333 0 29.482667-0.512 39.424-1.152l6.656-2.261333c6.528-2.261333 11.392-11.008 14.549333-26.410667l34.773334-167.466666c2.389333-11.477333 5.717333-30.378667 7.424-41.984 0 0 0.170667-1.066667-3.498667-7.338667-3.754667-6.357333-13.312-9.472-28.629333-9.472h-19.328z" fill="#2c2c2c" p-id="16582"></path></svg>,
  9: <svg t="1637328150624" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17984" width="128" height="128"><path d="M310.869333 175.829333l6.186667-30.037333 1.066667-4.352c10.624-43.434667 28.928-74.197333 54.826666-92.245333 28.586667-19.84 67.2-29.824 116.053334-29.824h176.512l30.037333 0.085333 4.224 0.170667c45.781333 2.005333 79.658667 14.805333 101.504 38.4 23.978667 25.770667 30.250667 67.072 18.986667 123.946666L680.832 856.32c-2.389333 11.477333-6.826667 30.165333-9.898667 41.472 0 0-6.613333 24.362667-15.488 41.045333a106.752 106.752 0 0 1-34.517333 39.296 140.373333 140.373333 0 0 1-51.072 20.309334 356.693333 356.693333 0 0 1-70.613333 6.101333H211.626667c-11.733333 0-16.682667-8.405333-11.008-18.645333L283.605333 836.266667a39.936 39.936 0 0 1 31.658667-18.645334h112.384c11.733333 0 30.208-0.810667 41.045333-1.834666l6.954667-3.626667c6.954667-3.584 11.989333-13.056 15.146667-28.458667l15.786666-71.296c2.517333-11.477333-4.992-20.821333-16.725333-20.821333H375.253333c-11.733333 0-26.922667-0.128-33.749333-0.256l-5.845333-0.469333c-39.082667-3.242667-67.029333-17.450667-83.712-42.624-19.285333-28.970667-23.808-67.754667-13.610667-116.565334l72.533333-355.84z m137.045334 325.461334l-5.845334 27.776 0.085334 2.901333a15.189333 15.189333 0 0 0 5.290666 11.861333 27.221333 27.221333 0 0 0 9.088 5.077334c3.370667 1.152 7.125333 1.706667 11.136 1.706666h51.882667c11.733333 0 23.296-9.386667 25.685333-20.864l64.768-310.570666c2.389333-11.477333 4.906667-24.192 5.546667-28.288v-3.029334c0-6.698667-2.005333-11.093333-6.016-13.312a34.346667 34.346667 0 0 0-9.344-3.413333 65.066667 65.066667 0 0 0-13.994667-1.365333h-16.725333c-11.733333 0-24.277333 0.128-27.861333 0.298666l-2.944 0.554667c-15.146667 3.029333-24.576 13.568-28.245334 31.744l-62.506666 298.922667z" fill="#2c2c2c" p-id="17985"></path></svg>,
  10: <svg t="1637327954986" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5187" width="128" height="128"><path d="M243.2 770.56H76.8l53.76-389.12-69.12 10.24 15.36-92.16 235.52-33.28-69.12 504.32zM455.68 335.36c2.56-17.92 10.24-30.72 23.04-40.96 12.8-10.24 28.16-17.92 46.08-17.92h435.2l-61.44 435.2c-2.56 17.92-10.24 30.72-23.04 40.96-12.8 10.24-28.16 17.92-43.52 17.92h-435.2l58.88-435.2z m163.84 23.04l-46.08 330.24h163.84L783.36 358.4h-163.84z" p-id="5188"></path></svg>,
  11: <svg t="1637327969525" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5542" width="128" height="128"><path d="M424.96 768h-166.4l53.76-389.12-69.12 10.24 12.8-89.6 235.52-33.28L424.96 768zM760.32 768h-166.4l53.76-389.12-69.12 10.24 12.8-89.6 235.52-33.28L760.32 768z" p-id="5543"></path></svg>,
  12: <svg t="1637327940520" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4649" width="128" height="128"><path d="M245.76 770.56H79.36l53.76-389.12-69.12 10.24 12.8-89.6 235.52-33.28-66.56 501.76zM780.8 358.4H614.4l-7.68 66.56h-166.4l20.48-148.48h494.08l-40.96 296.96H568.32l-15.36 115.2h314.88l38.4-33.28-15.36 115.2h-435.2c-17.92 0-30.72-5.12-40.96-17.92-10.24-10.24-12.8-25.6-10.24-40.96l30.72-222.72h330.24l15.36-130.56z" p-id="4650"></path></svg>,
})

const createRandomStr = () => {
  return Math.random().toString(36).slice(-6);
}

function BoxesContainer(props) {
  const { boxNums, playNode, remarkArr } = props;
  const components = [];
  for (let i = boxNums; i > 0; i--) {
    components.push(
      <div className="boxes-container" key={createRandomStr()} >
        <div className="box-order">{numType[i]}</div>
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