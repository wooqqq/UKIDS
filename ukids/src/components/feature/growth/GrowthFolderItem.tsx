import growth from "@/assets/growth.png"

interface Folder {
    folderName: string;
}

// 전체 보기 화면에 나오는 성장 폴더들

export const GrowthFolderItem = ({folderName} : Folder) => {

    return(
        <>
            {/* 아래 폴더사진에 div대신 이미지(폴더 사진) 넣어야함 */}
            <div><img width="71" height="97" src={growth} alt="그림 일기" /></div>
            <div>{folderName}</div>
        </>
    )

}