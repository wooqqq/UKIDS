

interface DiaryItem {
    pictureUrl: string;
    content: string;
    date: string;
}

export const PictureDiaryItem = ({pictureUrl, content, date}: DiaryItem) => {


    return (
        <div className="card-item">
            <img src={pictureUrl} alt="" />
            <div>{date}</div>
            <div>{content}</div>
        </div>
    ) 
}