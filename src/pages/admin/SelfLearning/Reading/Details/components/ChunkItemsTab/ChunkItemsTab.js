import { Fragment, useContext } from 'react';

import Table from '../../../../../../../shared/Table/Table';
import { getRate } from "./compute.js"
import { TabContext } from '../TabContent';

import style from "./ChunkItemsTab.module.css"

const ChunkItemsTab = ({chunks, name: tabName }) => {
  const {tabPosition} = useContext(TabContext);
  const columnHeaders = [
    {text: "No.", style: {width: '1%'}},
    {text: "チャンク / 日本語訳", style: {width: '20%'}},
    {text: "理解できる", style: {width: '7%'}},
    {text: "わからない", style: {width: '7%'}},
    {text: "time up", style: {width: '7%'}},
  ];

  const notActive = tabPosition !== tabName ? 'hidden' : '';

  const rowHeader = () => {
    return (
      <Fragment>
        <tr className="text-left">
          { 
            columnHeaders.map((item, index) => {
              return (<Fragment key={index}>
                <th style={item.style}>{item.text}</th>
              </Fragment>
              )
            })
          }
        </tr>
      </Fragment>
    );
  }

  const tableBodyRows = () => {
    return !!chunks && chunks.length ? chunks.map((item, index) => {
      return (<Fragment key={index}>
        <tr>
          <td>{index + 1}</td>
          <td style={{paddingRight: '12px'}}>
            <span>{item.chunk}</span><br />
            <span className={`${style.value}`}>{item.chunk_jp}</span>
          </td>
          <td>{getRate(item.countUnderstood, item.totalChunkLogs)}%</td>
          <td>{getRate(item.countNotUnderstood, item.totalChunkLogs)}%</td>
          <td>{getRate(item.countTimeUp, item.totalChunkLogs)}%</td>
        </tr>
        </Fragment>)
    }) : <tr>
      <td colSpan="5" className="text-center">
      <span>チャンクが見つかりません</span>
      </td>
    </tr>;
  }

  return (
    <div className={notActive}>
      <Table type="basic" className="w-full">
        <tbody>
          {rowHeader()}
          {tableBodyRows()}
        </tbody>
      </Table>
    </div>
  )
}

export default ChunkItemsTab
