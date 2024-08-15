import './GrowthDiaryList.css';

interface Diary {
  title: string;
  date: string;
  imageUrl: string;
}

export const GrowthDiaryItem = ({ title, date, imageUrl }: Diary) => {
  return (
    <div className="box-box">
      <div className="growth-item">
        <div>{date}</div>
        <div>
        <img src={imageUrl} alt="" crossOrigin="anonymous"/>
        </div>
        <div>{title}</div>
      </div>
    </div>
  );
};
