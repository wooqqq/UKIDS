
interface Diary{
    title: number;
    date: string;
    imageUrl: string;
}
export const GrowthDiaryItem = ({title, date, imageUrl} : Diary) => {

    return(
        <>
            <div><img src={imageUrl} alt="" /></div>
            <div>{title}</div>
            <div>{date}</div>
        </>
    )

}