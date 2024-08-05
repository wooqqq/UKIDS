import './common.css';

// 역할 태그 관련

interface CharacterTagProps {
  character: string;
}

const CharacterTag = (props: CharacterTagProps) => {
  if (props.character == '엄마') {
    return <div className="character-tag tag-mom">{props.character}</div>;
  } else if (props.character == '아빠') {
    return <div className="character-tag tag-dad">{props.character}</div>;
  } else if (props.character == '딸') {
    return <div className="character-tag tag-daughter">{props.character}</div>;
  } else if (props.character == '아들') {
    return <div className="character-tag tag-son">{props.character}</div>;
  } else if (props.character == '손자' || props.character == '손녀') {
    return (
      <div className="character-tag tag-grand-child">{props.character}</div>
    );
  } else {
    return <div className="character-tag">{props.character}</div>;
  }
};

export default CharacterTag;
