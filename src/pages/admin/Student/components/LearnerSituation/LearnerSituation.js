import React from 'react';

import { getZeroPaddedNum } from '../../../../../utils/numberHelpers';

import ChartCard from './components/ChartCard';
import CubeGraph from '../../../../../shared/CubeGraph';
import CubeProgress from './components/CubeProgress';
import DiamondChart from '../../../../../shared/DiamondChart';
import TriangleChart from '../../../../../shared/TriangleChart';

import styles from './LearnerSituation.module.css';

const LearnerSituation = (props) => {
  return (
    <div {...props}>
      <p className="font-bold text-18 leading-px-18 text-base-dark">学習状況</p>

      <div className="h-px-544 mt-px-16 flex overflow-x-hidden">
        <div className="relative h-full w-px-280 p-px-20 bg-adminPrimary-800">
          <div className="h-px-30 w-px-180 grid place-items-center bg-basic-400 rounded-px-50">
            <span className="font-bold text-14 leading-px-14 text-primary-500">Y_satoのキューブ Lv.1</span>
          </div>

          <div className={styles.cubeGraphWrapper}>
            <CubeGraph
              labels={{
                knowledge: 150,
                skill: 100,
                verbal: 150,
              }}
              percentage={{
                knowledge: 25,
                skill: 25,
                verbal: 40,
              }}
              width={1000}
            />
          </div>

          <div className="ml-px-9 mt-px-214 grid grid-cols-1 gap-px-12">
            <CubeProgress
              progressNumber={getZeroPaddedNum(3, 0)}
              progressWidth="43px"
              title="知識"
              titleFontSize="14px"
            >
              <img
                alt="idea-icon"
                className="h-px-18 w-px-18"
                src="/images/idea.svg"
              />
            </CubeProgress>

            <CubeProgress
              progressNumber={getZeroPaddedNum(3, 0)}
              progressWidth="19px"
              title="技能"
              titleFontSize="16px"
            >
              <img
                alt="verbal-icon"
                className="h-px-21 w-px-21"
                src="/images/verbal.svg"
              />
            </CubeProgress>

            <CubeProgress
              progressNumber={getZeroPaddedNum(3, 0)}
              progressWidth="19px"
              title="非言語・異文化"
              titleFontSize="16px"
            >
              <img
                alt="language-icon"
                className="h-px-20 w-px-20"
                src="/images/language.svg"
              />
            </CubeProgress>
          </div>
        </div>

        <div className="h-full ml-px-8 grid grid-cols-2 grid-rows-2 gap-px-8">
          <ChartCard
            mainScore={getZeroPaddedNum(4, 0)}
            mainTitle="知識習熟度"
            progressHead="習得した単語"
            progressNum={getZeroPaddedNum(4, 1245)}
            progressPct={29.5}
          >
            <div className={styles.diamondChartWrapper}>
              <DiamondChart
                sizeInPercent={95}
              />
            </div>
          </ChartCard>

          <ChartCard
            progressHead="習得したフレーズ"
            progressNum={getZeroPaddedNum(4, 1245)}
            progressPct={29.5}
          >
            <div className={styles.diamondChartWrapper}>
              <DiamondChart
                sizeInPercent={95}
              />
            </div>
          </ChartCard>

          <ChartCard
            mainScore={getZeroPaddedNum(4, 0)}
            mainTitle="技能習熟度"
            progressHead="習得したフレーズ"
            progressNum={getZeroPaddedNum(4, 1245)}
            progressPct={29.5}
          >
            <div className={styles.diamondChartWrapper}>
              <DiamondChart
                sizeInPercent={95}
              />
            </div>
          </ChartCard>

          <ChartCard
            mainScore={getZeroPaddedNum(4, 0)}
            mainTitle="異文化非言語コミュニケーション"
            progressHead="習得したフレーズ"
            progressNum={getZeroPaddedNum(4, 1245)}
            progressPct={29.5}
          >
            <div className={styles.triangleChartWrapper}>
              <TriangleChart
                reading={0}
                speaking={0}
                sizeInPercent={100}
              />
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
};

export default LearnerSituation;
