import SubscriptionCard from './SubscriptionCard';
import Table from '../../../../../shared/Table/Table';
import Paginator from '../../../../../shared/Paginator/Paginator';
import dummyData from './dummyData';
import style from './StudentPlanInfo.module.css';

const StudentPlanInfo = () => {
  return (
    <div className="mb-10">
      <p className="text-left font-bold font-hiragino text-18 text-background-300 leading-none">
        プラン情報
      </p>
      <div className="h-px-16" />
      <div className={`grid gap-x-1 grid-cols-3 ${style.card}`}>
        <SubscriptionCard 
          label="課金プラン" 
          content="サブスク（一ヶ月）2021/11/01終了" 
        />
      </div>

      <div className="mt-16">
        <p className="text-left font-bold font-hiragino text-12 leading-none text-adminGray-400 overflow-ellipsis overflow-hidden align-baseline">
          購入履歴
        </p>
      </div>

      <div className="pb-px-30 mt-4">
        <Table type="paginated" className={`w-full`}>
          <tbody>
            <tr className={`text-left text-12 font-normal ${style.table}`}>
              <th className={`py-px-11 pt-px-12 cursor-auto`}>
                <span className={`${style.tableHeader}`}>購入日時</span>
              </th>
              <th className={`py-px-11 pt-px-12 cursor-auto`}>
                <span className={`${style.tableHeader}`}>プラン内容/終了日</span>
              </th>
              <th className={`py-px-11 pt-px-12 cursor-auto`}>
                <span className={`${style.tableHeader}`}>プラン価格</span>
              </th>
              <th className={`py-px-11 pt-px-12 cursor-auto`}>
                <span className={`${style.tableHeader}`}>使用クーポン</span>
              </th>
              <th className={`py-px-11 pt-px-12 cursor-auto`}>
                <span className={`${style.tableHeader}`}>支払い金額</span>
              </th>
              <th className={`py-px-11 pt-px-12 cursor-auto`}>
                <span className={`${style.tableHeader}`}>ステータス</span>
              </th>
            </tr>
            {dummyData.map((plan) => (
              <tr className={`${style.tableDataRow}`}>
                <td>{plan.purchaseDate}</td>
                <td>{plan.planContent}</td>
                <td>{plan.planPrice}</td>
                <td>{plan.coupon}</td>
                <td>{plan.paidAmount}</td>
                <td className={`${plan.status === "支払い失敗" || plan.status === "未払い" ? style.unpaid : ""}`}>{plan.status}</td>
              </tr>
            ))}
            <tr className={`${style.paginatorRow}`}>
              <td colSpan="9" className={style.bottom}>
                <Paginator
                  page={1}
                  pageCount={1}
                />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default StudentPlanInfo;
