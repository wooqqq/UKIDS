import './common.css';

// 역할 태그 관련

interface CharacterTagProps {
  character: string;
}

const CharacterTag = (CharacterTagProps: CharacterTagProps) => {
  if (CharacterTagProps.character == '엄마') {
    return (
      <div className="character-tag tag-mom">{CharacterTagProps.character}</div>
    );
  } else if (CharacterTagProps.character == '아빠') {
    return (
      <div className="character-tag tag-dad">{CharacterTagProps.character}</div>
    );
  } else if (CharacterTagProps.character == '딸') {
    return (
      <div className="character-tag tag-daughter">
        {CharacterTagProps.character}
      </div>
    );
  } else if (CharacterTagProps.character == '아들') {
    return (
      <div className="character-tag tag-son">{CharacterTagProps.character}</div>
    );
  } else if (
    CharacterTagProps.character == '손자' ||
    CharacterTagProps.character == '손녀'
  ) {
    return (
      <div className="character-tag tag-grand-child">
        {CharacterTagProps.character}
      </div>
    );
  } else {
    return <div className="character-tag">{CharacterTagProps.character}</div>;
  }
};

export default CharacterTag;
