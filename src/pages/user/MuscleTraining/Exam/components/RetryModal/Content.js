import React, {Fragment} from 'react';

// Components
import Checkbox from '../../../../../../shared/GreenCheckbox';

// Styles
import styles from './Content.module.css';

const Content = ({handleOnClick, isChecked}) => {
  return (
    <Fragment>
      <div className="items-center">
        <p className={`${styles.title}`}>Retry</p>

        <img src="/images/retry_modal.svg" alt="Retry Image"/>
        
        <div className={`${styles.content_one}`}>
          <p>不正解だった問題が再度出題されます。</p>
          <p>全問正解を目指し頑張りましょう！</p>
        </div>

        <div className={`${styles.content_two}`}>
          <p>※ Retryの途中でトレーニングを終了しても、</p>
          <p>このセットの学習結果は保存されます。</p>
        </div>
        <div className={`${styles.checkbox}`}>
          <Checkbox
            width={24}
            height={24}
            isChecked={isChecked}
            onClick={handleOnClick}
            className="-mt-px-3 ml-px-1"
            color="#03DAC6"
            initialColor="#7A91A6"
          />
          {/* <input type="checkbox" className={`${styles.checkBox} text-center mr-px-16 align-bottom`} /> */}
          <span className="text-14 ml-px-16 ">次回から表示しない</span>
        </div>
      </div>
    </Fragment>
  )
}

export default Content;
