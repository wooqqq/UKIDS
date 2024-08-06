package com.modernfamily.ukids.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CustomException {

    //400
    NOT_EMPTY_ROLE_EXCEPTION(400,"NotEmptyRoleException","권한이 존재하지 않습니다."),
    NOT_FOUND_USER_EXCEPTION(400,"NotFoundUserException","유저가 존재하지 않습니다."),
    ID_PASSWORD_INPUT_EXCEPTION(400,"IdPasswordInputException", "아이디 패스워드 입력이 잘못 되었습니다."),
    NOT_AUTH_NUMBER_EXCEPTION(400,"NotAuthNumberException","인증되지 않은 번호입니다."),
    DUPLICATED_NUMBER_EXCEPTION(400,"DuplicatedNumberException","가입된 전화번호가 존재합니다."),
    DUPLICATED_ID_EXCEPTION(400,"DuplicatedIDException","가입된 아이디가 존재합니다."),
    NOT_FOUND_LETTER_EXCEPTION(400, "NotFoundLetterException", "편지가 존재하지 않습니다."),
    DUPLICATED_EMAIL_EXCEPTION(400,"DuplicatedEmailException","가입된 이메일이 존재합니다."),
    NOT_FOUND_SESSION_EXCEPTION(400,"NotFoundSessionException","세션 ID가 존재하지 않습니다."),


    // 가족방
    NOT_FOUND_FAMILY_EXCEPTION(400, "NotFoundFamilyException", "가족방이 존재하지 않습니다."),
    INPUT_FAMILY_EXCEPTION(400, "InputFamilyException", "가족방 입력이 잘못되었습니다."),
    NOSUCH_ALGORITHM_EXCEPTION(400, "NoSuchAlgorithmException", "가족방 고유코드 생성이 실패했습니다."),
    NOT_SAME_REPRESENTATIVE_EXCEPTION(400, "NotSameRepresentativeException", "사용자와 대표자가 일치하지 않습니다."),
    NOT_SAME_PASSWORD_EXCEPTION(400, "NotSamePasswordException", "가족방 비밀번호가 일치하지 않습니다."),

    // 가족 구성원
    NOT_FOUND_FAMILYMEMBER_EXCEPTION(400, "NotFoundFamilyMemberException", "가족구성원이 존재하지 않습니다."),
    NOT_SAME_FAMILYMEMBER_USER_EXCEPTION(400, "NotSameFamilyMemberUserException", "가족구성원과 사용자가 일치하지 않습니다."),
    APPROVAL_FAMILYMEMBER_EXCEPTION(400, "ApprovalFamilyMemberException", "이미 승인된 인원입니다."),
    NOT_APPROVAL_FAMILYMEMBER_EXCEPTION(400, "NotApprovalFamilyMemberException", "가족 구성원이 아닙니다."),

    // 그림일기
    NOT_FOUND_PICTUREDIARY_EXCEPTION(400, "NotFoundPictureDiaryException", "그림일기가 존재하지 않습니다."),
    
    // 앨범
    DUPLICATED_ALBUM_EXCEPTION(400, "DuplicatedAlbumException", "해당 날짜에 앨범이 이미 존재합니다."),
    NOT_FOUND_ALBUM_EXCEPTION(400, "NotFoundAlbumException", "해당 앨범이 존재하지 않습니다."),
    // 자녀성장일지
    NOT_FOUND_GROWTHFOLDER_EXCEPTION(400, "NotFoundGrowthFolderException", "자녀 성장일지 폴더가 존재하지 않습니다."),
    NOT_FOUND_GROWTHRECORD_EXCEPTION(400, "NotFoundGrowthRecordException", "자녀 성장일지가 존재하지 않습니다."),
    NOT_SAME_WRITER_EXCEPTION(400, "NotFoundWriterException", "사용자와 작성자가 일치하지 않습니다."),
    NOT_PERMISSION_GROWTHRECORD_EXCEPTION(400, "NotPermissionGrowthRecordException", "20세 미만 자녀에게 허가되지 않았습니다."),

    FAIL_TO_CONVERT_FILE_EXCEPTION(400, "FailToConvertFileException", "파일 변환에 실패했습니다."),
    NOT_FOUND_PHOTO_EXCEPTION(400, "NotFoundPhotoException", "해당 사진이 존재하지 않습니다."),

    //인증 에러 401
    EXPIRED_JWT_EXCEPTION(401,"ExpiredJwtException","토큰이 만료했습니다."),
    NOT_VALID_JWT_EXCEPTION(401,"NotValidJwtException","토큰이 유효하지 않습니다."),

    //403
    ACCESS_DENIEND_EXCEPTION(403,"AccessDeniendException","권한이 없습니다")
    ;

    private int statusNum;
    private String errorCode;
    private String errorMessage;
}