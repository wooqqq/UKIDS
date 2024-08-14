import './GrowthDiaryList.css';

interface Diary {
  title: number;
  date: string;
  imageUrl: string;
}
export const GrowthDiaryItem = ({ title, date, imageUrl }: Diary) => {
  return (
    <div className="box-box">
      <div className="growth-diary-item">
        <div>{date}</div>
        <div>
          <img src={imageUrl} alt="" crossOrigin="anonymous" />
        </div>
        <div>{title}</div>
      </div>
    </div>
  );
};
