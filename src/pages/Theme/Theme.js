import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../shared/Header';
import Cube from '../../shared/icons/Cube';
import Footer from '../../shared/Footer';
import Button from '../../shared/Button';
import ProgressBar from '../../shared/ProgressBar';
import TranslateIcon from '../../shared/icons/TranslateIcon';
import Tag from '../../shared/Tag';
import Menu from '../../shared/Menu';
import CubeGraph from '../../shared/CubeGraph';
import Tab from '../../shared/Menu/components/Tab';
import Player from '../../shared/Header/Player';
import Calendar from '../../shared/Calendar';
import Close from '../../shared/Header/Close';
import ObjectiveList from '../../shared/ObjectiveList';
import StepLineChart from '../../shared/StepLineChart';
import TriangleChart from '../../shared/TriangleChart';
import Table from '../../shared/Table';
import Paginator from '../../shared/Paginator';

import AccountBoxIcon from '../../shared/icons/AccountBoxIcon';
import DiamondChart from '../../shared/DiamondChart/DiamondChart';
import Modal from '../../shared/Modal';
import ConfirmationModal from '../../shared/ConfirmationModal';
import Breadcrumb from '../../shared/Breadcrumb';
import Card from '../../shared/Card';
import Input from '../../shared/Input';
import ArrowBackIcon from '../../shared/icons/ArrowBackIcon';
import Recorder from '../../shared/Recorder';
import Agenda from '../user/IntegratedLearning/Exam/components/Agenda';
import QuestionResultItem from '../../shared/QuestionResultItem';
import RatingButton from '../../shared/RatingButton';
import SoftKeyboard from '../../shared/SoftKeyboard';

import './Theme.module.css';

import data from './data';
import PieChart from '../../shared/PieChart';

const Theme = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [inputFieldValue, setInputFieldValue] = useState('');

  const toggle = () => {
    setIsPlaying(!isPlaying);
  };

  const showConfirmationModal = () => {
    setOpenConfirmationModal(prevOpenModal => !prevOpenModal)
  };

  return (
    <div className="mx-auto mt-4 pb-10">
      <h1 className="font-bold text-5xl mb-6"> Components </h1>
      {/* Buttons */}
      <div className="bg-black-100 bg-basic-500 rounded-lg mb-6">
        <a href="#buttons" className="mb-4">
          <h2 id="buttons" className="text-3xl underline mb-2">Buttons</h2>
        </a>
        <div className="flex flex-wrap">
          <Button
            className="m-3"
            type="blue-square"
            icon={<AccountBoxIcon color="white" width="16" height="16" />}
          >
            ボタン作成
          </Button>
          <Button
            className="m-3"
            type="blue-square-outline"
            icon={<AccountBoxIcon color="#0D89EE" width="16" height="16" />}
          >
            ボタン作成
          </Button>
          <Button className="m-3" type="blue-square">ページを移動</Button>
          <Button className="m-3" type="blue-square-outline">ボタン作成</Button>
          <Button className="m-3" type="gray-square-outline">キャンセル</Button>
          <Button className="m-3" type="white-bold">トレーニングを再チャレンジ</Button>
          <Button className="m-3" type="white-small">単語</Button>
          <Button className="m-3" type="white-small-outline">フレーズ</Button>
          <Button className="m-3" type="lightblue">音声認識型意味選択</Button>
          <Button className="m-3" type="lightblue-outline">音声意味選択</Button>
          <Button className="m-3" type="white-square-narrow">前の解説</Button>
          <Button className="m-3" type="white-square-wide">解答結果へ進む</Button>
          <Button className="m-3" type="darkblue-square">本文を見る</Button>
          <Button className="m-3" type="lightgray-square">本文を見る</Button>
          <Button className="m-3" type="darkblue-square-icon">
            <TranslateIcon />
          </Button>
          <Button className="m-3" type="lightgray-square-icon">
            <TranslateIcon />
          </Button>
          <Button className="m-3" type="white-square-wider">本文を見る</Button>
        </div>
        <h3 className="text-xl">Usage:</h3>
        <ul className="pl-4 list-disc list-inside">
          <li>{'<Button className="classes_to_btn_wrapper" type="btn_type">btn_text</Button>'}</li>
        </ul>
        <h3 className="text-xl">Props:</h3>
        <ul className="pl-4 list-disc list-inside">
          <li>
            <span className="font-bold">className</span>
            &nbsp;- string
          </li>
          <li>
            <span className="font-bold">icon</span>
            &nbsp;- component [default null]
          </li>
          <li>
            <span className="font-bold">type</span>
            &nbsp;- string [ white-bold / white-small / white-small-outline / gray-square-outline / blue-square / blue-square-outline / lightblue / lightblue-outline / white-square-narrow / white-square-wide / darkblue-square / lightgray-square / darkblue-square-icon / lightgray-square-icon  / white-square-wider ]
          </li>
        </ul>
      </div>

      {/* Cubes */}
      <div className="bg-black-100 bg-basic-500 p-5 rounded-lg mb-6">
        <a href="#cube" className="mb-4">
          <h2 id="cube" className="text-3xl underline mb-2">Cubes</h2>
        </a>
        <div className="flex flex-wrap">
          <h4 className="text-xl font-bold">Sizes: </h4><br />
          <Cube className="mr-4" size="lg" color="darkBlue" />
          <Cube className="mr-4" size="md" color="darkBlue" />
          <Cube className="mr-4" size="sm" color="darkBlue" />
          <Cube className="mr-4" size="xsm" color="darkBlue" />
          <br />
        </div>
        <h3 className="text-xl">Usage:</h3>
        <ul className="pl-4 list-disc list-inside">
          <li>Large: {'<Cube size="lg"/>'}</li>
          <li>Medium: {'<Cube size="md"/>'}</li>
          <li>Small: {'<Cube size="sm"/>'}</li>
          <li>Extra Small: {'<Cube size="xsm"/>'}</li>
        </ul>
        <h3 className="text-xl">Props:</h3>
        <ul className="pl-4 list-disc list-inside">
          <li><span className="font-bold">size</span> - string(default: md) [ xsm / sm / md / lg ]</li>
        </ul>

        <div className="flex flex-wrap mt-4">
          <h4 className="text-xl font-bold">Colors: </h4><br />
          <Cube className="mr-4" color="red" />
          <Cube className="mr-4" color="pink" />
          <Cube className="mr-4" color="darkBlue" />
          <Cube className="mr-4" color="lightBlue" />
          <Cube className="mr-4" color="lightGreen" />
          <Cube className="mr-4" color="darkGreen" />
          <Cube className="mr-4" color="violet" />
          <Cube className="mr-4" color="yellow" />
          <Cube className="mr-4" color="orange" />
          <Cube className="mr-4" color="gray" />
        </div>
        <h3 className="text-xl">Usage:</h3>
        <ul className="pl-4 list-disc list-inside">
          <li>{'<Cube color="gray"/>'}</li>
        </ul>
        <h3 className="text-xl">Props:</h3>
        <ul className="pl-4 list-disc list-inside">
          <li><span className="font-bold">color</span> - string(default: gray) [ red / pink / darkBlue / lightBlue / lightGreen / darkGreen / violet / yellow / orange / gray ]</li>
        </ul>
      </div>

      {/* Footer */}
      <div className="bg-black-100 bg-basic-500 rounded-lg mb-6">
        <a href="#footer" className="mb-4">
          <h2 id="footer" className="text-3xl underline mb-2">Footer</h2>
        </a>
        <Footer/>
        <h3 className="text-xl">Usage:</h3>
        <ul className="pl-4 list-disc list-inside">
          <li>{'<Footer>'}</li>
        </ul>
        <h3 className="text-xl">Props:</h3>
        <ul className="pl-4 list-disc list-inside">

        </ul>
      </div>

      {/* Tags */}
      <div className="bg-black-100 bg-basic-500 p-5 rounded-lg mb-6">
        <a href="#tags" className="mb-4">
          <h2 id="tags" className="text-3xl underline mb-2">
            Tags
          </h2>
        </a>
        <div className="flex flex-wrap gap-2">
          <Tag color="teal" size="s" width="60px" weightLight>意味理解</Tag>
          <Tag color="lightTeal" size="s" width="60px" weightLight>発音</Tag>
          <Tag color="teal" size="s" width="60px" weightLight>音声認識</Tag>
          <Tag color="lightTeal" size="s" width="60px" weightLight>スペリング</Tag>
          <Tag color="orange" size="xs" width="66px" pill>Reading</Tag>
          <Tag color="orange" size="m" width="124px" light>Master !</Tag>
          <Tag color="gray" size="xs" width="66px" pill weightLight>Reading</Tag>
        </div>

        <div className="flex items-center h-10">
          <div style={{marginRight:'3px'}}>
            <Cube className="mr-4" color="orange" size="xsm" />
          </div>
          <Tag color="orange" size="xs" width="66px" pill weightLight>Reading</Tag>
          <Tag color="gray" size="xs" width="66px" pill weightLight>Listening</Tag>
          <Tag size="l" color="lightGray" width="118.27px" darkBlue pill weightBold>Question.1</Tag>
        </div>

        <div className="flex items-center h-5">
          <div style={{marginRight:'3px'}}>
            <Cube className="mr-4" color="orange" size="xsm" />
          </div>
          <Tag color="orange" size="xs" width="66px" className="mr-2" pill>Reading</Tag>
          <div style={{marginRight:'3px'}}>
            <Cube className="mr-4" color="orange" size="xsm" />
          </div>
          <Tag color="orange" size="xs" width="66px" pill weightLight>Listening</Tag>
        </div>

        <h3 className="text-xl">Usage:</h3>
        <ul className="pl-4 list-disc list-inside text-xs">
          <li>{'<Tag color="teal" size="s" width="60px">意味理解</Tag>'}</li>
        </ul>
        <h3 className="text-xl">Props:</h3>
        <ul className="pl-4 list-disc list-inside">
          <li><b>color</b> - (string) [default is 'gray'] [orange / gray / lightGray / lightTeal / teal / light / dark]</li>
          <li><b>size</b> - (string) [default is 'm'] [xs / s / m / l / lg]</li>
          <li><b>width</b> - (string)</li>
          <li><b>pill</b> - (boolean) <i>makes the tag rounded-full</i></li>
          <li><b>darkBlue</b> - boolean - <i>text dark blue</i></li>
          <li><b>light</b> - boolean - <i>text light</i></li>
          <li><b>weightBold</b> - boolean - <i>font weight bold 550</i></li>
          <li><b>weightLight</b> - boolean - <i>font weight bold 200</i></li>
        </ul>
      </div>

      {/* Menus and Tabs */}
      <div className="bg-black-100 bg-basic-500 py-5 rounded-lg mb-6">
        <a href="menu-and-tabs" className="mb-4">
          <h2 className="text-3xl underline mb-2">Menus and Tabs</h2>
        </a>
        <Menu bgColor="primary-500" spaceX="2" paddingx="" isTabFlat>
          <Tab type="flat" size="sm" isActive>
            知識
          </Tab>
          <Tab type="flat" size="sm">
            技能
          </Tab>
          <Tab type="flat" size="sm">
            非言語・異文化
          </Tab>
        </Menu>
        <br />
        <Menu bgColor="primary-500" spaceX="16" paddingX="2" paddingY="3">
          <Tab type="rounded2" size="sm" isActive>
            学習ログ
        </Tab>
          <Tab type="rounded2" size="sm">
            単語・フレーズ
        </Tab>
        </Menu>
        <br />
        <Menu bgColor="primary-500" spaceX="8" paddingX="4" paddingY="3">
          <Tab type="rounded3" isActive>
            学習結果
          </Tab>
          <Tab type="rounded3">
            単語
          </Tab>
          <Tab type="rounded3" >
            フレーズ
          </Tab>
        </Menu>
        <br />
        <div className="px-5">
          <h3 className="text-xl">Usage:</h3>
          <ul className="pl-4 list-disc list-inside">
            <li>
              {`<Menu bgColor="class_to_backgroundcolor" spaceX="x-axis_space _between_tabs" paddingX="padding_x-axis" paddingY="padding_y-axis">
                <Tab  type="tab_type" isActive="boolean"> </Tab>
                </Menu>`
              }
            </li>
          </ul>
          <h3 className="text-xl">Props Menu Component:</h3>
          <ul className="pl-4 list-disc list-inside">
            <li>
              <span className="font-bold">bgColor</span>
              &nbsp;- string
            </li>
            <li>
              <span className="font-bold">spaceX</span>
              &nbsp;- string ['1/2/4/8/16/32']
            </li>
            <li>
              <span className="font-bold">paddingX</span>
              &nbsp;- string ['1/2/4/8/16/32']basis here <a href="https://tailwindcss.com/docs/padding" target="_blank" rel="noreferrer">Tailwind Docs For Sizing</a>
            </li>
            <li>
              <span className="font-bold">paddingY</span>
              &nbsp;- string ['1/2/4/8/16/32'] basis here <a href="https://tailwindcss.com/docs/padding" target="_blank" rel="noreferrer">Tailwind Docs For Sizing</a>
            </li>
          </ul>
          <h3 className="text-xl">Props Tab Component:</h3>
          <ul className="pl-4 list-disc list-inside">
            <li>
              <span className="font-bold">type</span>
              &nbsp;- string ['flat/rounded2/rounded3']
              <i> rounded2 Compose 2 tabs</i>
              <i> rounded3 Compose 3 tabs</i>
            </li>
            <li>
              <span className="font-bold">isActive</span>
              &nbsp;- boolean ['true/false']
            </li>
          </ul>
        </div>
      </div>

      {/* Headers */}
      <div className="bg-black-100 bg-basic-500 py-5 rounded-lg mb-6">
        <a href="#headers" className="mb-4">
          <h2 id="headers" className="text-3xl underline mb-2">Headers</h2>
        </a>

        <Header
          hasBack={false}
          title="EDGe School"
        />
        <h3 className="text-xl">Usage: </h3>
        <ul className="pl-4 list-disc list-inside">
          <li>{'<Header hasBack=false  title="EDGe School" action="" />'}</li>
        </ul>
        <h3 className="text-xl">Props:</h3>
        <ul className="pl-4 list-disc list-inside">
          <li><span className="font-bold">hasBack</span> - boolean - false</li>
          <li><span className="font-bold">to</span> - string - back route destination</li>
          <li><span className="font-bold">title</span> - string - EDGe School</li>
          <li><span className="font-bold">titleClass</span> - string - title class</li>
        </ul>

        <br /><br />
        <Header
          hasBack={false}
          title="技能 習熟度"
        >
          <Close />
        </Header>
        <h3 className="text-xl">Usage: </h3>
        <ul className="pl-4 list-disc list-inside">
          <li>{'<Header hasBack=false  title="技能 習熟度" action="CLOSE" />'}</li>
        </ul>
        <h3 className="text-xl">Props:</h3>
        <ul className="pl-4 list-disc list-inside">
          <li><span className="font-bold">hasBack</span> - boolean - false</li>
          <li><span className="font-bold">title</span> - string - EDGe School</li>
          <li><span className="font-bold">child component</span> - component - CLOSE</li>
        </ul>

        <br /><br />

        <Header
          hasBack={true}
          title="筋トレコース一覧"
        />
        <h3 className="text-xl">Usage: </h3>
        <ul className="pl-4 list-disc list-inside">
          <li>{'<Header hasBack=true  title="筋トレコース一覧" action="" />'}</li>
        </ul>
        <h3 className="text-xl">Props:</h3>
        <ul className="pl-4 list-disc list-inside">
          <li><span className="font-bold">hasBack</span> - boolean - true</li>
          <li><span className="font-bold">title</span> - string - 筋トレコース一覧</li>
        </ul>

        <br /><br />

        <Header
          hasBack={false}
          title="Reading 検討事項を確認する"
        >
          <Player action="PLAY" isPlaying={isPlaying} onClick={toggle}/>
        </Header>
        <h3 className="text-xl">Usage: </h3>
        <ul className="pl-4 list-disc list-inside">
          <li>{'<Header  hasBack={false} title="Reading 検討事項を確認する"> <Player action="PLAY" isPlaying={isPlaying}  onClick={toggle}/> </Header>'}
          </li>
        </ul>
        <h3 className="text-xl">Props:</h3>
        <ul className="pl-4 list-disc list-inside">
          <li><span className="font-bold">hasBack</span> - boolean - false</li>
          <li><span className="font-bold">title</span> - string - Reading 検討事項を確認する</li>
          <li><span className="font-bold">child compoent</span> - component - Player</li>
          <li><span className="font-bold">child compoent</span> - Player - action - "PLAY"</li>
          <li><span className="font-bold">child compoent</span> - Player - isPlaying - isPlaying</li>
          <li><span className="font-bold">child compoent</span> - onclick - toggle</li>
        </ul>
        <h3 className="text-xl">Note:</h3>
        <div className="font-bold"> Declare the lines 10 - 13 found in Theme.js in your program</div>
        <br /><br />
      </div>

      {/* Calendar */}
      <div className="bg-black-100 bg-basic-500 p-5 rounded-lg mb-6">
        <a href="#calendar" className="mb-4">
          <h2 id="calendar" className="text-3xl underline mb-2">Calendar</h2>
        </a>
        <div className="flex flex-wrap">
          <Calendar
            className="w-px-338"
            markExisting={[
              '2021-03-07',
              '2021-03-08',
              '2021-03-11',
              '2021-03-12',
              '2021-03-14',
              '2021-03-15',
            ]}
            markComplete={[
              '2021-03-09',
              '2021-03-10',
            ]}
          />
        </div>
        <h3 className="text-xl">Usage:</h3>
        <ul className="pl-4 list-disc list-inside">
          <li>{'<Calendar className="w-full" markExisting={[\'2020-12-15\']} markComplete={[\'2020-12-17\']}'}</li>
        </ul>
        <h3 className="text-xl">Props:</h3>
        <ul className="pl-4 list-disc list-inside">
          <li>
            <span className="font-bold">markExisting - for circle blue border</span>
            &nbsp;- array of string [YYYY-MM-DD, ..]
          </li>
          <li>
            <span className="font-bold">markComplete - for green circle background</span>
            &nbsp;- array of string [YYYY-MM-DD, ..]
          </li>
          <li>
            <span className="font-bold">others..</span>
            &nbsp;- more in <a href="https://github.com/wojtekmaj/react-calendar" target="_blank" rel="noreferrer" className="text-blue-500">react-calendar</a>
          </li>
        </ul>
      </div>

      {/* Progress bar */}
      <div className="bg-black-100 bg-basic-500 p-5 rounded-lg mb-6">
        <a href="#progressBar" className="mb-4">
          <h2 id="progressBar" className="text-3xl underline mb-2">Progress Bar</h2>
        </a>
        <div className="flex flex-wrap">
          <ProgressBar done="30" color="bg-secondary-500" bgColor="bg-basic-300" type="rounded" width="261" height="8"/>
          <span className="ml-2">done: 30 color: bg-secondary-500 background-color: bg-basic-300 type: rounded width: 261px height: 8px (these are demonstrations on how to use)</span>
        </div>
        <div className="flex flex-wrap">
          <ProgressBar done="40" color="bg-secondary-500" bgColor="bg-basic-300" type="rounded" width="70" height="8"/>
          <span className="ml-2">done: 40 color: bg-secondary-500 background-color: bg-basic-300 type: rounded width: 70px height: 8px</span>
        </div>
        <div className="flex flex-wrap">
          <ProgressBar done="100" color="bg-secondary-500" bgColor="bg-basic-300" doneBarColor="bg-progressBar-orange" type="rounded" width="70" height="8"/>
          <span className="ml-2">done: 100 color: bg-secondary-500 background-color: bg-basic-300 doneBarColor: bg-progressBar-orange type: rounded width: 70px height: 8px</span>
        </div>
        <div className="flex flex-wrap">
          <ProgressBar  color="bg-primary-500" bgColor="bg-primary-100" type="square" done="70" width="70" height="8"/>
          <span className="ml-2">done: 100 color: bg-secondary-500 background-color: bg-primary-100 type: square width: 70px height: 8px</span>
        </div>
        <h3 className="text-xl">Usage:</h3>
        <ul className="pl-4 list-disc list-inside break-all">
          <li>{'<ProgressBar done="done_percentage" color="color_of_progress_bar" bgColor="background_color_of_progress_bar" doneBarColor="color_of_progress_bar_when_done_is_100" type="shape_of_the_sides_of_progress_bar" width="progressbar_width_in_px" height="progressbar_height_in_px/>'}</li>
        </ul>
        <h3 className="text-xl">Props:</h3>
        <ul className="pl-4 list-disc list-inside">
          <li>
            <span className="font-bold">width</span>
            &nbsp;- String. Width of progressBar in px. Default is 261.
          </li>
          <li>
            <span className="font-bold">height</span>
            &nbsp;- String. Height of progressBar in px. Default is 8.
          </li>
          <li>
            <span className="font-bold">color</span>
            &nbsp;- String. Color of progressBar.
          </li>
          <li>
            <span className="font-bold">bgColor</span>
            &nbsp;- String. background color of progressBar. Portion of the progress bar that has not yet been filled.
          </li>
          <li>
            <span className="font-bold">type</span>
            &nbsp;- String. Either "rounded" or "square". Rounded has rounded sides. Square has boxed sides.
          </li>
          <li>
            <span className="font-bold">doneBarColor</span>
            &nbsp;- String. color of the progressbar if done is equal to 100.
          </li>
        </ul>
      </div>

      {/* Charts */}
      <div className="bg-black-100 bg-basic-500 p-5 rounded-lg">
        <a href="#charts">
          <h2 className="text-3xl mb-5 underline">Charts</h2>
        </a>
        <div className="bg-black-100 bg-basic-500 p-5 rounded-lg mb-6">
          <h2 className="text-2xl">Triangle Chart</h2>

          <div className="flex flex-wrap mt-10">
            <div className="flex-1">
              <TriangleChart reading={80} speaking={100} sizeInPercent={80}/>
            </div>

            <div>
              <h3 className="text-xl">Usage:</h3>
              <ul className="pl-4 list-disc list-inside">
                <li>{'<TriangleChart reading="score for reading" speaking="score for speaking"/>'}</li>
              </ul>
              <h3 className="text-xl">Props:</h3>
              <ul className="pl-4 list-disc list-inside">
                <li>
                  <span className="font-bold">reading</span>
                  &nbsp;- (Number) The score of reading training result.
                </li>
                <li>
                  <span className="font-bold">speaking</span>
                  &nbsp;- (Number) The score of speaking training result.
                </li>
                <li>
                  <span className="font-bold">sizeInPercent</span>
                  &nbsp;- (Number) Specify the size of the chart.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Diamond Chart */}
      <div className="bg-black-100 bg-gray-200 p-5 rounded-lg mb-6">
        <h2 className="text-2xl">Diamond Chart</h2>
        <div className="flex flex-wrap mt-10">
          <div className="justify-center" style={{marigin: '0', padding: '0'}}>
            <DiamondChart
              sizeInPercent={100}
              isEnglish={true}
            />
          </div>
          <div className="justify-center" style={{marigin: '0', padding: '0'}}>
            <DiamondChart
              sizeInPercent={100}
              isEnglish={false}
            />
          </div>
          <div>
            <h3 className="text-xl">Usage:</h3>
            <ul className="pl-4 list-disc list-inside">
              <li>{'<DiamondChart sizeInPercent="size of width percentage" dataset="array of data"  isEnglish="true"/>'}</li>
            </ul>
            <h3 className="text-xl">Props:</h3>
            <div>
              <span className="font-bold">datasets</span> -(Array) <br/>
              <div className="ml-2">
                [
                  fillColor: "rgba(3,218,198,0.6)"<br/>
                  strokeStyle: "rgba(3,218,198,0)"<br/>
                  reading: 60 <br/>
                  writting: 90 <br/>
                  listening: 80 <br/>
                  speaking: 90 <br/>
                ]
              </div>
            </div>
            <ul className="pl-4 list-disc list-inside">
              <li>
                <span className="font-bold">sizeInPercent</span>
                &nbsp;- (Number) Specify the size of the chart.
              </li>
              <li>
                <span className="font-bold">isEnglish</span>
                &nbsp;- (Boolean) Specify the language version of the chart.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* StepLineChart */}
      <div className="bg-black-100 bg-gray-200 p-5 rounded-lg mb-6">
        <h2 className="text-2xl">Step Line Chart</h2>
        <div className="flex flex-wrap mt-10">
          <div className="justify-center pr-4">
            <StepLineChart dataset={data['stepLineChart']} width="388" />
          </div>
          <div>
            <h3 className="text-xl">Usage:</h3>
            <ul className="pl-4 list-disc list-inside">
              <li>{'<StepLineChart dataset={dataset} />'}</li>
            </ul>
            <h3 className="text-xl">Props:</h3>
            <ul className="pl-4 list-disc list-inside">
              <li>
                <span className="font-bold">dataset</span>
                &nbsp;- (Array) Check this <a className="text-primary-500 underline" href="https://jsfiddle.net/escbooster12/1uc4dk23/14/">fiddle</a>
              </li>
              <li>
                <span className="font-bold">width</span>
                &nbsp;- (Number)
              </li>
              <li>
                <span className="font-bold">height</span>
                &nbsp;- (Number)
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Objective List  */}
      <div className="bg-black-100 bg-basic-500 p-5 rounded-lg mb-6">
        <a href="#objectiveList" className="mb-8">
          <h2 id="objectiveList" className="text-3xl underline mb-8">Objective List</h2>
        </a>
        <ObjectiveList title="今月の目標" />
        <h3 className="text-xl mt-8">Usage:</h3>
        <ul className="pl-4 list-disc list-inside">
            <li>{'<ObjectiveList title="title_of_list" goal1="true" goal2="true" goal3="true" goal4="true" isColoredBg="true"/>'}</li>
        </ul>
        <h3 className="text-xl">Props:</h3>
        <ul className="pl-4 list-disc list-inside">
          <li>
            <span className="font-bold">title</span>
            &nbsp;- String. Title of list.
          </li>
            <li>
              <span className="font-bold">goal 1</span>
            &nbsp;- Boolean. Goal 1 Progress
          </li>
            <li>
              <span className="font-bold">goal 2</span>
            &nbsp;- Boolean. Goal 1 Progress
          </li>
            <li>
              <span className="font-bold">goal 3</span>
            &nbsp;- Boolean. Goal 1 Progress
          </li>
            <li>
              <span className="font-bold">goal 4</span>
            &nbsp;- Boolean. Goal 1 Progress
          </li>
            <li>
              <span className="font-bold">isColoredBg</span>
            &nbsp;- Boolean. Put background
          </li>
        </ul>
      </div>

      {/* Modal */}
      <div className="bg-black-100 bg-basic-500 p-5 rounded-lg mb-6">
        <a href="#modal" className="mb-8">
          <h2 id="modal" className="text-3xl underline mb-8">Modal</h2>
        </a>
        <Button
          className="m-3"
          onClick={() => setIsShowModal(true)}
          type="darkblue-square"
        >Open Modal</Button>
        {isShowModal && (
          <Modal
            closeModalFunc={() => setIsShowModal(false)}
            zIndex={10}
          >
            <div>Children 1</div>
            <div>Children 2</div>
            <div>Children 3</div>
          </Modal>
        )}
        <h3 className="text-xl mt-8">Usage:</h3>
        <ul className="pl-4 list-disc">
          <li　className="whitespace-pre-wrap">{'<Modal\n  closeModalFunc={() => closeModal()}\n  zIndex={10}\n>\n  <div>Children 1</div>\n  <div>Children 2</div>\n  <div>Children 3</div>\n</Modal>'}</li>
        </ul>
        <h3 className="text-xl">Props:</h3>
        <ul className="pl-4 list-disc list-inside">
          <li>
            <span className="font-bold">closeModalFunc</span>
            &nbsp;- Function
          </li>
          <li>
            <span className="font-bold">zIndex</span>
            &nbsp;- Number (default: 20)
          </li>
        </ul>
      </div>

      {/* Breadcrumb  */}
      <div className="bg-black-100 bg-basic-500 p-5 rounded-lg mb-6">
        <a href="#breadcrumb" className="mb-8">
          <h2 id="breadcrumb" className="text-3xl underline mb-8">Breadcrumb</h2>
        </a>
        <div className="h-px-25 flex mb-px-16">
          <Breadcrumb text="ダッシュボード" to="#1" />
          <Breadcrumb text="管理者" to="#2" />
          <Breadcrumb text="新規登録" to="#3" active last />
        </div>

        <h3 className="text-xl mt-8">Usage:</h3>
        <ul className="pl-4 list-disc list-inside">
            <li>{'<Breadcrumb text="ダッシュボード" to="#1" />'}</li>
        </ul>
        <h3 className="text-xl">Props:</h3>
        <ul className="pl-4 list-disc list-inside">
          <li>
            <span className="font-bold">text</span>
            &nbsp;- String
          </li>
            <li>
              <span className="font-bold">to</span>
            &nbsp;- String. url route
          </li>
            <li>
              <span className="font-bold">active</span>
            &nbsp;- Boolean.
          </li>
            <li>
              <span className="font-bold">last</span>
            &nbsp;- Boolean. last item
          </li>
        </ul>
      </div>

      {/* Card */}
      <div className="bg-black-100 bg-basic-500 p-5 rounded-lg mb-6">
        <a href="#card" className="mb-8">
          <h2 id="card" className="text-3xl underline mb-8">Card</h2>
        </a>
        <Card>
          <div className="h-px-59 flex items-center border-b-px-1 border-adminGray-200">
            <Link to="#">
              <ArrowBackIcon
                className="mx-px-16"
                color="#9CA3AF"
                width="24px"
                height="24px"
              />
            </Link>
            <span className="text-base-dark font-bold leading-px-20 text-20">
              管理者登録
            </span>
          </div>
          <h1 className="mx-4">Your content here</h1>
        </Card>

        <h3 className="text-xl mt-8">Usage:</h3>
        <ul className="pl-4 list-disc list-inside">
            <li>{'<Card></Card>'}</li>
        </ul>
      </div>

      {/* Input */}
      <div className="bg-black-100 bg-basic-500 p-5 rounded-lg mb-6">
        <a href="#input" className="mb-8">
          <h2 id="input" className="text-3xl underline mb-8">Input</h2>
        </a>
        <Input
          type="text"
          placeholder="半角英数字8文字以上"
          label={<>パスワード（確認） <i className="text-adminRed-400">*</i></>}
          hint="もう一度入力してください"
          className="pt-px-41"
          value={inputFieldValue}
          onChange={({target: { value }})=>setInputFieldValue(value)}
        />

        <h3 className="text-xl mt-8">Usage:</h3>
        <ul className="pl-4 list-disc list-inside">
            <li>{'<Input type="text" placeholder="半角英数字8文字以上" label={<>パスワード（確認） <i className="text-adminRed-400">*</i></>} hint="もう一度入力してください" className="pt-px-41"/>'}</li>
        </ul>
        <h3 className="text-xl">Props:</h3>
        <ul className="pl-4 list-disc list-inside">
          <li>
            <span className="font-bold">text</span>
            &nbsp;- String
          </li>
            <li>
              <span className="font-bold">placeholder</span>
            &nbsp;- String.
          </li>
            <li>
              <span className="font-bold">label</span>
            &nbsp;- String.
          </li>
          <li>
            <span className="font-bold">value</span>
            &nbsp;- String.
          </li>
          <li>
            <span className="font-bold">hint</span>
            &nbsp;- String.
          </li>
          <li>
            <span className="font-bold">label</span>
            &nbsp;- String.
          </li>
          <li>
            <span className="font-bold">value</span>
            &nbsp;- String.
          </li>
          <li>
            <span className="font-bold">hint</span>
            &nbsp;- String.
          </li>
          <li>
            <span className="font-bold">onChange</span>
            &nbsp;- Callback
          </li>
        </ul>
      </div>

      {/* Tables */}
      <div className="bg-black-100 bg-basic-500 p-5 rounded-lg mb-6">
        <a href="#table" className="mb-8">
          <h2 id="table" className="text-3xl underline mb-8">Table</h2>
        </a>
        <Table type="paginated" className="mb-6" style={{maxWidth: '1024px'}}>
          <tbody>
            <tr className="text-left">
              <th style={{width: '15px'}}>
                <Input type="checkbox" className="flex self-center" defaultChecked />
              </th>
              <th style={{width: '186px'}}>名前</th>
              <th style={{width: '129px'}}>ユーザーネーム</th>
              <th style={{width: '254px'}}>メールアドレス</th>
              <th style={{width: '128px'}}>ログイン回数</th>
              <th>学習回数</th>
            </tr>
            {[1,2,3,4,5,6,7,8,9,10].map((x,key) => {
              return (
                <tr key={key}>
                  <td style={{width: '15px'}}>
                    <Input type="checkbox" className="flex self-center" />
                  </td>
                  <td style={{width: '186px'}} className="text-14">
                    <Link to="" className="text-adminPrimary-400">佐藤 佑樹</Link>
                  </td>
                  <td style={{width: '129px'}}>idid_ysato</td>
                  <td style={{width: '254px'}}>yuki.sato@edgeschool.com</td>
                  <td style={{width: '128px'}}>15回</td>
                  <td>45回</td>
                </tr>
              );
            })}
            <tr>
              <td colSpan="6" style={{padding: '0'}}>
                <Paginator />
              </td>
            </tr>
          </tbody>
        </Table>
        <Table type="basic" style={{maxWidth: '544px'}}>
          <tbody>
            <tr className="text-left" >
              <th style={{width: '112px'}}>コース</th>
              <th style={{width: '132px'}}>トレーニング</th>
              <th style={{width: '112px'}}>問題</th>
              <th>集中度</th>
            </tr>
            {[1,2,3,4].map((x,key) => {
              return (
                <tr key={key}>
                  <td style={{width: '112px'}}>Unit.01</td>
                  <td style={{width: '132px', paddingRight: '12px'}}>クイックスタート</td>
                  <td style={{width: '112px'}}>単語</td>
                  <td>集中度MAX</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <h3 className="text-xl mt-8">Usage:</h3>
        <ul className="pl-4 list-disc list-inside">
          <li>{'<Table type="paginated"}}>{html}</Table>'}</li>
        </ul>
        <h3 className="text-xl">Props:</h3>
        <ul className="pl-4 list-disc list-inside">
          <li><span className="font-bold">type</span> - string [ paginated | basic ]</li>
          <li><span className="font-bold">className</span> - string</li>
        </ul>
      </div>

      {/* Cube Graph */}
      <div className="bg-black-100 bg-basic-500 p-5 rounded-lg mb-6">
        <a href="#cubeGraph" className="mb-8">
          <h2 id="objectiveList" className="text-3xl underline mb-8">Cube Graph</h2>
        </a>
        <div className="bg-primary-500 w-full h-full p-2">
          <CubeGraph
            percentage={{
              knowledge: 25,
              skill: 25,
              verbal: 40,
            }}
            labels={{
              knowledge: 100,
              skill: 150,
              verbal: 150,
            }}
          />
        </div>
        <h3 className="text-xl mt-8">Usage:</h3>
        <ul className="pl-4 list-disc list-inside">
          <li className="bg-gray-200 px-2">
            {'<CubeGraph'} <br/>
              <span className="pl-10"> {'percentage={{'} </span> <br/>
                <span className="ml-14"> {'knowledge: 25'} </span>
                <br/>
                <span className="ml-14"> {'skill: 25'} </span>
                <br/>
                <span className="ml-14"> {'verbal: 40'} </span>
                <br />
              <span className="pl-10"> {'}}'} </span> <br/>

              <span className="pl-10"> {'value={{'} </span> <br/>
                <span className="ml-14"> {'knowledge: 150'} </span>
                <br/>
                <span className="ml-14"> {'skill: 150'} </span>
                <br/>
                <span className="ml-14"> {'verbal: 150'} </span>
                <br/>
              <span className="pl-10"> {'}}'} </span>
              <br/>
            <span className="pl-5"> {'/>'} </span> <br/>
          </li>
        </ul>
        <h3 className="text-xl mt-2">Props:</h3>
        <ul className="pl-4 list-disc list-inside">
          <li>
            <span className="font-bold">Percentage</span>
            <ul>
              <li className="pl-5">
                - Cube Graph Percentage.
              </li>
              <li className="pl-5">
                - Object with knowledge, skill, and verbal properties.
              </li>
              <li className="pl-5">
                - All properties are in number format.
              </li>
            </ul>
          </li>
          <br/>
          <li>
            <span className="font-bold">Labels</span>
            <ul>
              <li className="pl-5">
                - Cube labels
              </li>
              <li className="pl-5">
                - Object with knowledge, skill, and verbal properties.
              </li>
              <li className="pl-5">
                - All properties are in number format.
              </li>
            </ul>
          </li>
        </ul>
      </div>

      {/* Confirmation Modal */}
      <div className="bg-black-100 p-5 rounded-lg mb-6 bg-basic-500">
        <a href="#confirmationModal" className="mb-4">
          <h2 id="confirmationModal" className="text-3xl underline mb-2">Confirmation Modal</h2>
        </a>
        <div className="flex flex-wrap">
          <Button className="ml-px-16" type="blue-square" onClick={showConfirmationModal}>Click to open modal</Button>
          <ConfirmationModal
            showConfirmationModal={openConfirmationModal}
            setShowConfirmationModal={setOpenConfirmationModal}
            message="編集内容を破棄してページを移動しますか"
            onSubmit={showConfirmationModal}
          />
        </div>
        <h3 className="text-xl mt-8">Usage:</h3>
        <ul className="pl-4 list-disc list-inside">
          <li>{'<Modal showConfirmationModal={openConfirmationModal} setShowConfirmationModal={setOpenConfirmationModal} message="編集内容を破棄してページを移動しますか" onSubmit={someFunction}/>'}</li>
        </ul>
        <h3 className="text-xl">Props:</h3>
        <ul className="pl-4 list-disc list-inside">
          <li>
            <span className="font-bold">showConfirmationModal</span>
            &nbsp;- Boolean
          </li>
          <li>
            <span className="font-bold">setShowConfirmationModal</span>
            &nbsp;- Function
          </li>
          <li>
            <span className="font-bold">message</span>
            &nbsp;- String
          </li>
          <li>
            <span className="font-bold">onSubmit</span>
            &nbsp;- Function
          </li>
        </ul>
      </div>

      {/* Recorder */}
      <div className="bg-black-100 bg-basic-500 p-5 rounded-lg mt-5">
        <div className="bg-black-100 p-5 rounded-lg mb-3">
          <a href="#recorder" className="mb-4">
            <h2 id="recorder" className="text-3xl underline mb-2">Recorder</h2>
          </a>
          <div className="flex flex-wrap">
            <Recorder className="m-3" type="disabled"/>
            <Recorder className="m-3" type="default"/>
            <Recorder className="mx-3 my-1" type="recording"/>
          </div>
        </div>
        <h3 className="text-xl mt-3">Usage:</h3>
        <ul className="pl-4 list-disc list-inside">
          <li>{'<Recorder className="m-3" type="disabled"/>'}</li>
          <li>{'<Recorder className="m-3" type="default"/>'}</li>
          <li>{'<Recorder className="mx-3 my-1" type="recording"/>'}</li>
        </ul>
        <h3 className="text-xl">Props:</h3>
        <ul className="pl-4 list-disc list-inside">
          <li>
            <span className="font-bold">type</span>
            &nbsp;- string [default/disabled/recording]
          </li>
        </ul>
      </div>

      {/* Agenda */}
      <div className=" bg-basic-500 p-2 rounded-lg mt-5">
        <div className="bg-black-100 rounded-lg mb-3">
          <a href="#agenda" className="mb-4">
            <h2 id="agenda" className="text-3xl underline mb-2">Agenda</h2>
          </a>
          <Agenda
            members="Nancy, Sam, Ken"
            date="09/07/2021 10:00 - 11:00"
            location="@Room B"
          />
        </div>
        <h3 className="text-xl mt-3">Usage:</h3>
        <ul className="pl-4 list-disc list-inside">
          <li>{' <Agenda members="Nancy, Sam, Ken" date="09/07/2021 10:00 - 11:00"location="@Room B" contents=""/> '}</li>
        </ul>
        <h3 className="text-xl">Props:</h3>
        <ul className="pl-4 list-disc list-inside">
          <li>
            <span className="font-bold">members</span>
            &nbsp;- persons involved in the agenda
          </li>
          <li>
            <span className="font-bold">date</span>
            &nbsp;- date of agenda
          </li>
          <li>
            <span className="font-bold">location</span>
            &nbsp;- location of agenda
          </li>
          <li>
            <span className="font-bold">contents</span>
            &nbsp;- contents of agenda
          </li>
        </ul>
      </div>

      {/* QuestionResultItem */}
      <div className="bg-basic-500 p-2 rounded-lg mt-5">
        <a href="#question-result-item" className="mb-8">
          <h2 id="question-result-item" className="text-3xl underline mb-8">Question Result Item</h2>
        </a>

        <div
          className="grid grid-cols-1 gap-2"
          style={{ maxWidth: '359px' }}
        >
          <QuestionResultItem
            questionNumber={1}
            textRightSpaceInPx={34}
          >
            <p className="font-bold text-14 leading-px-20 text-basic-100">What are they discussing?</p>
          </QuestionResultItem>

          <QuestionResultItem
            isCorrectAnswer={true}
            isShowArrow={true}
            questionNumber={2}
            textRightSpaceInPx={34}
          >
            <p className="font-bold text-14 leading-px-20 text-basic-100">What are they discussing?</p>
          </QuestionResultItem>

          <QuestionResultItem
            isCorrectAnswer={false}
            isShowArrow={true}
            questionNumber={3}
            textRightSpaceInPx={34}
          >
            <p className="font-bold text-14 leading-px-20 text-basic-100">What are they discussing?</p>
          </QuestionResultItem>
        </div>

        <h3 className="text-xl mt-8">Usage:</h3>
        <ul className="pl-4 list-disc">
          <li　className="whitespace-pre-wrap">{'Without evaluation icon\n<QuestionResultItem\n  questionNumber={1}\n  textRightSpaceInPx={34}\n>\n  <p className="font-bold text-14 leading-px-20 text-basic-100">What are they discussing?</p>\n</QuestionResultItem>'}</li>
          <br />
          <li　className="whitespace-pre-wrap">{'With evaluation icon\n<QuestionResultItem\n  isCorrectAnswer={true}\n  questionNumber={1}\n  textRightSpaceInPx={34}\n>\n  <p className="font-bold text-14 leading-px-20 text-basic-100">What are they discussing?</p>\n</QuestionResultItem>'}</li>
          <br />
          <li　className="whitespace-pre-wrap">{'With right arrow icon\n<QuestionResultItem\n  isShowArrow={true}\n  questionNumber={1}\n  textRightSpaceInPx={34}\n>\n  <p className="font-bold text-14 leading-px-20 text-basic-100">What are they discussing?</p>\n</QuestionResultItem>'}</li>
        </ul>
        <br />

        <h3 className="text-xl">Props:</h3>
        <ul className="pl-4 list-disc list-inside">
          <li>
            <span className="font-bold">className</span>
            &nbsp;- String
          </li>
          <li>
            <span className="font-bold">isCorrectAnswer</span>
            &nbsp;- Undefined / Boolean
          </li>
          <li>
            <span className="font-bold">isShowArrow</span>
            &nbsp;- Boolean
          </li>
          <li>
            <span className="font-bold">questionNumber</span>
            &nbsp;- Number
          </li>
          <li>
            <span className="font-bold">textRightSpaceInPx</span>
            &nbsp;- Number
          </li>
        </ul>
      </div>

      {/* RatingButton */}
      <div className="bg-basic-500 p-2 rounded-lg mt-5">
        <a href="#rating-button" className="mb-8">
          <h2 id="rating-button" className="text-3xl underline mb-8">Rating Button</h2>
        </a>

        <div className="grid grid-cols-1 gap-4">
          <RatingButton
            buttonText="集中度MAX!"
            navigateTo="#rating-button"
          />
          <RatingButton
            buttonText="まぁまぁ集中"
            navigateTo="#rating-button"
          />
          <RatingButton
            buttonText="あまり集中できなかった"
            navigateTo="#rating-button"
          />
        </div>

        <h3 className="text-xl mt-8">Usage:</h3>
        <ul className="pl-4 list-disc">
          <li　className="whitespace-pre-wrap">{'<RatingButton\n  buttonText="集中度MAX!"\n  navigateTo="#rating-button"\n/>'}</li>
        </ul>
        <br />

        <h3 className="text-xl">Props:</h3>
        <ul className="pl-4 list-disc list-inside">
          <li>
            <span className="font-bold">buttonText</span>
            &nbsp;- String
          </li>
          <li>
            <span className="font-bold">navigateTo</span>
            &nbsp;- String
          </li>
          <li>
            <span className="font-bold">onClick</span>
            &nbsp;- Function
          </li>
        </ul>
      </div>
      {/* PieChart */}
      <div className="bg-basic-500 p-2 rounded-lg mt-5">
        <a href="#pieChart" className="mb-8">
          <h2 id="pieChart" className="text-3xl underline mb-8">Pie Chart</h2>
        </a>
        <div className="flex flex-wrap mt-10">
          <div className="justify-center p-0 m-0">
            <PieChart
              dataset={data['pieChart']}
              width='270'
              height='250'
            />
          </div>
          <div className="pl-4">
            <h3 className="text-xl">Usage:</h3>
            <ul className="pl-4 list-disc list-inside">
              <li>{'<PieChart dataset={dataset} width="600" height="400"/>'}</li>
            </ul>
            <h3 className="text-xl">Props:</h3>
            <ul className="pl-4 list-disc list-inside">
              <li>
                <div>
                  <span className="font-bold">datasets</span> -(Array) <br/>
                  <div className="ml-2">
                    [
                      name: 'Master' <br />
                      score: 10 <br />
                      color: '#F5B160' <br />
                      spacing: 31 <br />
                    ]
                  </div>
                </div>
              </li>
              <li>
                <span className="font-bold">width</span>
                &nbsp;- (Number) default = 500
              </li>
              <li>
                <span className="font-bold">height</span>
                &nbsp;- (Number) default = 400
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Soft Keyboard */}
      <div className="bg-basic-500 p-2 rounded-lg mt-5">
        <a href="#SoftKeyboard" className="mb-8">
          <h2 id="pieChSoftKeyboardart" className="text-3xl underline mb-8">Soft Keyboard Sample</h2>
        </a>
        <div className="flex flex-wrap mt-10">
          <div className="justify-center p-0 m-0 w-full">
            <SoftKeyboard />
          </div>
          <div className="pl-4">
            <h3 className="text-xl">Usage:</h3>
            <ul className="pl-4 list-disc list-inside">
              <li>{'<SoftKeyboard setAnswer={setAnswer} answer={answer} wordLength={value} submitHandler={myFunction()} />'}</li>
            </ul>
            <h3 className="text-xl">Props:</h3>
            <ul className="pl-4 list-disc list-inside">
              <li>
                <span className="font-bold">setAnswer</span> - (Function) set state <br/>
                <div className="ml-2">
                </div>
              </li>
              <li>
                <span className="font-bold">answer</span>
                &nbsp;- (String) - the input values
              </li>
              <li>
                <span className="font-bold">submitHandler</span>
                &nbsp;- (Function) - handler for when submitting
              </li>
              <li>
                <span className="font-bold">wordLength</span>
                &nbsp;- (integer) - length of the word for limiting.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Theme;
