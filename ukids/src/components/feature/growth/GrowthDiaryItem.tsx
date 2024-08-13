
interface Diary{
    title: number;
    date: string;
    imageUrl: string;
}
export const GrowthDiaryItem = ({title, date, imageUrl} : Diary) => {

    return(
        <>  <div className="growth-diary-item">
            <div><img src={imageUrl} alt="" /></div>
            <div>{date}</div>
            <div>{title}</div>
            </div>

        
        </>
    )

}