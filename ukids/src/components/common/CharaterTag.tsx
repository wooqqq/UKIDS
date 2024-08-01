import './common.css';

// 역할 태그 관련

interface CharacterTagProps {
  character: string;
}

const CharacterTag: React.FC<CharacterTagProps> = ({ character }) => {
  if (character == '엄마') {
    return <div className="character-tag tag-mom">{character}</div>;
  } else if (character == '아빠') {
    return <div className="character-tag tag-dad">{character}</div>;
  } else if (character == '딸') {
    return <div className="character-tag tag-daughter">{character}</div>;
  } else if (character == '아들') {
    return <div className="character-tag tag-son">{character}</div>;
  } else if (character == '손자' || character == '손녀') {
    return <div className="character-tag tag-grand-child">{character}</div>;
  } else {
    return <div className="character-tag">{character}</div>;
  }
};

export default CharacterTag;
